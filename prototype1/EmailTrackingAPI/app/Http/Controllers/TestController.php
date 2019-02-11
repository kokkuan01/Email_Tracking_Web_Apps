<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Google_Client; 
use Google_Service_Gmail;
use GuzzleHttp\Client;

class TestController extends Controller
{
    public function index(){
        require __DIR__ . '/../../../vendor/autoload.php';

        $httpClient = new Client([
            'verify' => false, // otherwise HTTPS requests will fail.
        ]);
        $client = new Google_Client();
        $client->setHttpClient($httpClient);
        $client->setAuthConfig(  __DIR__ . '/../../../client_secret.json');
        $client->setAccessType("offline");        // offline access
        $client->setIncludeGrantedScopes(true);   // incremental auth
        $client->addScope(Google_Service_Gmail::GMAIL_READONLY);
        $token = $client->fetchAccessTokenWithRefreshToken('1/nEl54EHdCBlJyElpfYDX3rqgfIJY2iuva7cvlizeVCz0-RN-mKA1LhVAqmBeWKaT');
        
        $client->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/oauth2callback.php');
        $client->setPrompt('consent');

        $auth_url = $client->createAuthUrl();
        
        // If refresh token work
        if($token != null){
            $messages = array();
            $pageToken = null;
            
            $client->setAccessToken($token);
            $_SESSION['upload_token'] = $token;

            $service = new Google_Service_Gmail($client);

            $message = $service->users_messages->get("me", "168d0aeca18315b5",['format'=>'full']);

            var_dump($message);
            var_dump($message->getPayload());
            var_dump($message->getPayload()->getHeaders());
            var_dump($message->getPayload()->getBody());
            var_dump($message->getPayload()->getParts());
            
            // $array2 = get_object_vars($message);
            // foreach($array2 as $key=> $value){
            //     if(is_array($value)){
            //         echo($key . " : ");
            //         $this->loop($value);
            //     }
            //     else{
            //         echo($key . ' : ' . $value . '<br/>');
            //     }
            // }
            
            // $opt_param = ['maxResults'=>'10'];
            // $messagesResponse = $service->users_messages->listUsersMessages("me",$opt_param);
        
            // if ($messagesResponse->getMessages()){
            //     $messages = array_merge($messages, $messagesResponse->getMessages());
            //     $pageToken = $messagesResponse->getNextPageToken();
            // }
            
            // foreach($messages as $m){
            //     $array2 = get_object_vars($m);
            //     foreach($array2 as $key=>$value){
            //         echo($key . ' : ' . $value . '<br/>');
            //     }
            //     echo('<br/><br/>');
            // }
        }
        // when get the token 
        else if (isset($_GET['code'])) {
            $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);

            echo('\n\n\n' . $client->getRefreshToken());

            $client->setAccessToken($token);
            // store in the session also
            $_SESSION['upload_token'] = $token;

            $service = new Google_Service_Gmail($client);
            $user = $service->users->getProfile('me');
            // echo $user;
            // return 0;
        }
        // when no token
        else{
            return redirect($auth_url);
        }
    }

    public function show(Request $request){
        echo($request->token);
    }

    public function loop($s){
        foreach($s as $key=>$value){
            if(is_array($value)){
                echo($key . " : ");
                loop($value);
            }
            else{
                echo($key . ' : ' . $value . '<br/>');
            }
        }
    }
}
