<?php

namespace App\Http\Controllers;

use App\Thread;
use App\Mail;
use App\Global_Variable;
use Illuminate\Http\Request;
use Google_Client; 
use Google_Service_Gmail;
use GuzzleHttp\Client;
use DateTime;
use DateTimeZone;

class FetchGmailController extends Controller
{
    public function index(){
        require __DIR__ . '/../../../vendor/autoload.php';

        $client = new Google_Client();
        $httpClient = new Client([
            'verify' => false, // otherwise HTTPS requests will fail.
        ]);
        $client->setHttpClient($httpClient);
        $client->setAuthConfig(  __DIR__ . '/../../../client_secret.json');
        $client->setAccessType("offline");        // offline access
        $client->setIncludeGrantedScopes(true);   // incremental auth
        $client->addScope(Google_Service_Gmail::GMAIL_READONLY);
        $client->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/oauth2callback.php');
        $client->setPrompt('consent');

        if (isset($_GET['code'])) {
            $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);

            $refreshToken = Global_Variable::where('name','refreshToken')->first();
            $refreshToken->value = $client->getRefreshToken();
            $refreshToken->save();

            $this->handle();
        }
        else{   
            $auth_url = $client->createAuthUrl();

            return redirect($auth_url);
        }
    }

    public function handle()
    {
        $client = new Google_Client();
        $httpClient = new Client([
            'verify' => false, // otherwise HTTPS requests will fail.
        ]);
        $client->setHttpClient($httpClient);
        $client->setAuthConfig(  __DIR__ . '/../../../client_secret.json');
        $client->setAccessType("offline");        // offline access
        $client->setIncludeGrantedScopes(true);   // incremental auth
        $client->addScope(Google_Service_Gmail::GMAIL_READONLY);
        $client->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/oauth2callback.php');
        $client->setPrompt('consent');

        $refreshToken = Global_Variable::where('name','refreshToken')->first();

        if($refreshToken->value != null){
            $client->setAccessType("offline");        // offline access
            $client->addScope(Google_Service_Gmail::GMAIL_READONLY);
            try{
                $token = $client->fetchAccessTokenWithRefreshToken($refreshToken->value);
                $client->setAccessToken($token);
                $_SESSION['upload_token'] = $token;
                
                $this->retrieveData($client);
            }
            catch(Exception $error){
                Log::error('The access of Google API failed. Please get a new refresh token');
            }
        }
    }

    public function retrieveData($client){
        $service = new Google_Service_Gmail($client);

        $profile = $service->users->getProfile('me');
        $email = Global_Variable::where('name','current_email')->first();
        $email->value = $profile->emailAddress;
        $email->save();

        // Threads
        $threads = array();
        $pageToken = NULL;
        
        $lastUpdateTime = Global_Variable::where('name','last_update_time')->first();
        
        if($lastUpdateTime->value != null){

            $previousFetchTime = $lastUpdateTime->value;

            $lastUpdateTime->value = time();
            $lastUpdateTime->save();

            $threads = array();
            $messages = array();

            do {
                try {
                    $opt_param = array();
                    $opt_param['q'] ="in:{inbox sent} -category:{social promotions forums updates} after:" . $previousFetchTime;
                    
                    if ($pageToken) {
                        $opt_param['pageToken'] = $pageToken;
                    }
                    $threadsResponse = $service->users_threads->listUsersThreads("me", $opt_param);
                    if ($threadsResponse->getThreads()) {
                        $threads = array_merge($threads, $threadsResponse->getThreads());
                        $pageToken = $threadsResponse->getNextPageToken();
                    }
                } catch (Exception $e) {
                    print 'An error occurred: ' . $e->getMessage();
                    $pageToken = NULL;
                }
            } while ($pageToken);

            do {
                try {
                    $opt_param = array();
                    $opt_param['q'] ="in:{inbox sent} -category:{social promotions forums updates} after:" . $previousFetchTime;
                    
                    if ($pageToken) {
                        $opt_param['pageToken'] = $pageToken;
                    }

                    $messagesResponse = $service->users_messages->listUsersMessages('me', $opt_param);
                    if ($messagesResponse->getMessages()) {
                        $messages = array_merge($messages, $messagesResponse->getMessages());
                        $pageToken = $messagesResponse->getNextPageToken();
                    }
                } catch (Exception $e) {
                    print 'An error occurred: ' . $e->getMessage();
                }
            } while ($pageToken);
            
            $newMessagesId = array();

            foreach($messages as $message){
                array_push($newMessagesId, $message->getId());
            }

            foreach($threads as $thread){
                $insertThread = Thread::where('threadId',$thread->getId())->first();
                
                if(!$insertThread){
                    $insertThread = new Thread;
                    $insertThread->threadId = $thread->getId();
                    $insertThread->save();
                }
                
                $threadResponse = $service->users_threads->get('me', $thread->getId());
                $messages = $threadResponse->getMessages();

                $num = 0;

                $threadSubject = '';

                foreach($messages as $key => $message){
                    $emailId = $message->getId();

                    if(in_array($emailId, $newMessagesId)){
                        $messageDetail = $service->users_messages->get("me", $emailId);
                        $messagePart = $messageDetail->getPayload();
                        $headers = $messagePart->getHeaders();
                        
                        foreach($headers as $header){
                            
                            if($header->name == "From"){
                                if(strpos($header->value,"<")){
                                    $pos = strpos($header->value,"<");
                                    $pos2 = strpos($header->value,">");
                                    $fromDisplayName = substr($header->value,0,$pos-1);
                                    $from = substr($header->value,$pos+1,$pos2-$pos-1);
                                }
                                else{
                                    $from = $header->value;
                                }
                            }
                            if($header->name == "To"){
                                if(strpos($header->value,"<")){
                                    $pos = strpos($header->value,"<");
                                    $pos2 = strpos($header->value,">");
                                    $toDisplayName = substr($header->value,0,$pos-1);
                                    $to = substr($header->value,$pos+1,$pos2-$pos-1);
                                }
                                else{
                                    $to = $header->value;
                                }
                            }
                            if($header->name == "Date"){
                                if(strpos($header->value,"(UTC)")){
                                    $date = DateTime::createFromFormat('D, d M Y H:i:s O*', $header->value);
                                }
                                else{
                                    if(strpos($header->value,"(")){
                                        $string = explode("(",$header->value);
                                        $date = DateTime::createFromFormat('D, d M Y H:i:s O ', $string[0]);
                                    }
                                    else{
                                        if(is_numeric($header->value[0])){
                                            $date = DateTime::createFromFormat('d M Y H:i:s O', $header->value);
                                        }
                                        else{
                                            $date = DateTime::createFromFormat('D, d M Y H:i:s O', $header->value);
                                        }
                                    }
                                }
                                $date->setTimezone(new DateTimeZone('Asia/Kuala_Lumpur'));
                            }
                            if($header->name == "Subject"){
                                $subject = $header->value;
                            }
                        }

                        if($num == 0){
                            if($from != $email->value){
                                $emailerName = $fromDisplayName;
                                $emailer = $from;
                            }
                            else{
                                $emailerName = $toDisplayName;
                                $emailer = $to;
                            }
                            $threadSubject = $subject;
                        }

                        if($threadSubject == ''){
                            $threadSubject = $subject;
                        }

                        if($key == count($messages)-1){
                            if($from != $email->value){
                                $status = 0;
                            }
                            else{
                                $status = 2;
                            }
                        }

                        $mail = new Mail([
                            'mailId'=>$emailId,
                            'to'=>$to,
                            'from'=>$from,
                            'date'=>$date
                        ]);
                        
                        $insertThread->mails()->save($mail);

                        $num++;
                    }
                }

                $target = \App\Client::where('email',$emailer)->first();
                if(!$target){
                    $target = new \App\Client(['email'=>$emailer]);
                    if($emailerName && $emailerName != null){
                        $target->displayName = $emailerName;
                    }
                    $target->save();
                }
                
                if($insertThread->status){
                    if($status == 0){
                        $insertThread->status = $status;
                    }
                }
                else{
                    $insertThread->status = $status;
                }

                if(!$insertThread->subject){
                    $insertThread->subject = $threadSubject;
                }
                
                $target->threads()->save($insertThread);
            }

        }
        else{
            $lastUpdateTime->value = time();
            $lastUpdateTime->save();

            $threads = array();

            do {
                try {
                    $opt_param = array();
                    $opt_param['q'] ="in:{inbox sent} -category:{social promotions forums updates}";
                    if ($pageToken) {
                        $opt_param['pageToken'] = $pageToken;
                    }
                    $threadsResponse = $service->users_threads->listUsersThreads("me", $opt_param);
                    if ($threadsResponse->getThreads()) {
                        $threads = array_merge($threads, $threadsResponse->getThreads());
                        $pageToken = $threadsResponse->getNextPageToken();
                    }
                } catch (Exception $e) {
                    print 'An error occurred: ' . $e->getMessage();
                    $pageToken = NULL;
                }
            } while ($pageToken);

            foreach($threads as $thread){
                $insertThread = new Thread;
                $insertThread->threadId = $thread->getId();
                $insertThread->save();

                $threadResponse = $service->users_threads->get('me', $thread->getId());
                $messages = $threadResponse->getMessages();

                foreach($messages as $key => $message){
                    $emailId = $message->getId();
                    $messageDetail = $service->users_messages->get("me", $emailId);
                    $messagePart = $messageDetail->getPayload();
                    $headers = $messagePart->getHeaders();
                    $toDisplayName = null;
                    $fromDisplayName = null;
                    
                    foreach($headers as $header){
                        
                        if($header->name == "From"){
                            if(strpos($header->value,"<")){
                                $pos = strpos($header->value,"<");
                                $pos2 = strpos($header->value,">");
                                $fromDisplayName = substr($header->value,0,$pos-1);
                                $from = substr($header->value,$pos+1,$pos2-$pos-1);
                            }
                            else{
                                $from = $header->value;
                            }
                        }
                        if($header->name == "To"){
                            if(strpos($header->value,"<")){
                                $pos = strpos($header->value,"<");
                                $pos2 = strpos($header->value,">");
                                $toDisplayName = substr($header->value,0,$pos-1);
                                $to = substr($header->value,$pos+1,$pos2-$pos-1);
                            }
                            else{
                                $to = $header->value;
                            }
                        }
                        if($header->name == "Date"){
                            if(strpos($header->value,"(UTC)")){
                                $date = DateTime::createFromFormat('D, d M Y H:i:s O*', $header->value);
                            }
                            else{
                                if(strpos($header->value,"(")){
                                    $string = explode("(",$header->value);
                                    $date = DateTime::createFromFormat('D, d M Y H:i:s O ', $string[0]);
                                }
                                else{
                                    if(is_numeric($header->value[0])){
                                        $date = DateTime::createFromFormat('d M Y H:i:s O', $header->value);
                                    }
                                    else{
                                        $date = DateTime::createFromFormat('D, d M Y H:i:s O', $header->value);
                                    }
                                }
                            }
                            $date->setTimezone(new DateTimeZone('Asia/Kuala_Lumpur'));
                        }
                        if($header->name == "Subject"){
                            $subject = $header->value;
                        }
                    }

                    if($key == 0){
                        if($from != $email->value){
                            $emailerName = $fromDisplayName;
                            $emailer = $from;
                        }
                        else{
                            $emailerName = $toDisplayName;
                            $emailer = $to;
                        }
                        $threadSubject = $subject;
                    }

                    if($key == count($messages)-1){
                        if($from != $email->value){
                            $status = 0;
                        }
                        else{
                            $status = 2;
                        }
                    }

                    $mail = new Mail([
                        'mailId'=>$emailId,
                        'to'=>$to,
                        'from'=>$from,
                        'date'=>$date
                    ]);
                    
                    $insertThread->mails()->save($mail);
                }

                $target = \App\Client::where('email',$emailer)->first();
                if(!$target){
                    $target = new \App\Client(['email'=>$emailer]);
                    if($emailerName != null){
                        $target->displayName = $emailerName;
                    }
                    $target->save();
                }
                
                $insertThread->status = $status;
                $insertThread->subject = $threadSubject;
                $target->threads()->save($insertThread);
            }
        }
    }
}
