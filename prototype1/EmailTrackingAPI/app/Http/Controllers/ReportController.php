<?php

namespace App\Http\Controllers;

use App\User;
use App\Mail;
use App\Client;
use App\Reply;
use App\Global_Variable;
use Illuminate\Http\Request;
use DB;
use App\Thread;
use DateTime;

class ReportController extends Controller
{
    public function index(Request $request){
        $current_address = Global_Variable::where('name', 'current_email')->first();

        $startDate = new DateTime();
        $endDate = new DateTime();
        if($request->month == "0"){
            $startDate = (new DateTime())->modify('first day of this month');
            $endDate = (new DateTime())->modify('last day of this month');
        }
        else if($request->month == "1"){
            $startDate = (new DateTime())->modify('first day of previous month');
            $endDate = (new DateTime())->modify('last day of previous month');
        }
        else if($request->month == "2"){
            $startDate = (new DateTime())->modify('-2 months')->modify('first day of this month');
            $endDate = (new DateTime())->modify('-2 months')->modify('last day of this month');
        }

        $mails = Mail::with('thread','thread.client')
            ->where('from', '!=' , $current_address->value)
            ->whereBetween('date', [$startDate,$endDate])
            ->get();

        $countOfClients = 
            DB::select('(SELECT DISTINCT(c.email)
                FROM mails m, clients c, threads t
                WHERE t.threadId = m.thread_id AND t.client_id = c.id AND m.from != "' . $current_address->value .'"
                AND m.date BETWEEN "' . $startDate->format('Y-m-d') . '" AND "' . $endDate->format('Y-m-d') . '")'
            );

        $replies = Reply::whereBetween('created_at', [$startDate,$endDate])->get();

        $emails = array();

        foreach($countOfClients as $client){
            array_push($emails, $client->email);
        }

        $clients = Client::whereIn('email', $emails)->get();

        return response()->json([
            'countOfReplies' => count($replies),
            'countOfClient'=>count($countOfClients),
            'countOfEmail'=>count($mails),
        ],200);
    }

    public function getClientData(){
        $current_address = Global_Variable::where('name', 'current_email')->first();
        $clients = Client::with('threads','threads.mails')
            ->where(function($query) use($current_address){
                $query->whereHas('threads.mails',function($subquery) use($current_address){
                        $subquery->where('from','!=' , $current_address->value);
                    });
            })
            ->get();

        $threads = Thread::with('mails')
        ->where(function($query) use($current_address){
            $query->whereHas('mails',function($subquery) use($current_address){
                    $subquery->where('from','!=' , $current_address->value);
                });
        })
        ->get();

        $age = array(0,0,0,0,0);
        $races = array(0,0,0,0);
        $gender = array(0,0);
        $type = array(0,0,0,0,0,0,0,0);

        foreach($clients as $client){
            if(!is_null ($client->gender)){
                switch($client->gender){
                    case 0: $gender[0]++;
                        break;
                    case 1: $gender[1]++;
                        break;
                }
            }

            if(!is_null ($client->race)){
                switch($client->race){
                    case 0: $races[0]++;
                        break;
                    case 1: $races[1]++;
                        break;
                    case 2: $races[2]++;
                        break;
                    case 3: $races[3]++;
                        break;
                }
            }

            if(!is_null ($client->age)){
                if($client->age <= 20){
                    $age[0]++;
                }
                else if($client->age <= 30){
                    $age[1]++;
                }
                else if($client->age <= 40){
                    $age[2]++;
                }
                else if($client->age <= 50){
                    $age[3]++;
                }
                else{
                    $age[4]++;
                }
            }
        }

        foreach($threads as $thread){
            if(!is_null ($thread->problem_type)){
                if($thread->problem_type == 1){
                    $type[0]++;
                }
                else if($thread->problem_type == 2){
                    $type[1]++;
                }
                else if($thread->problem_type == 3){
                    $type[2]++;
                }
                else if($thread->problem_type == 4){
                    $type[3]++;
                }
                else if($thread->problem_type == 5){
                    $type[4]++;
                }
                else if($thread->problem_type == 6){
                    $type[5]++;
                }
                else if($thread->problem_type == 7){
                    $type[6]++;
                }
                else if($thread->problem_type == 8){
                    $type[7]++;
                }
            }
        }

        return response()->json([
            'ageCount' => $age,
            'raceCount' => $races,
            'genderCount' => $gender,
            'typeCount' => $type
        ],200);
    }

    public function getEmailData(Request $request){
        $current_address = Global_Variable::where('name', 'current_email')->first();

        if($request->month == "0"){
            $startDate = (new DateTime())->modify('first day of this month');
            $endDate = (new DateTime())->modify('last day of this month');
        }
        else if($request->month == "1"){
            $startDate = (new DateTime())->modify('first day of previous month');
            $endDate = (new DateTime())->modify('last day of previous month');
        }
        else if($request->month == "2"){
            $startDate = (new DateTime())->modify('-2 months')->modify('first day of this month');
            $endDate = (new DateTime())->modify('-2 months')->modify('last day of this month');
        }

        $mails =  Mail::with('thread','thread.client')
            ->where('from','!=' , $current_address->value)
            ->whereBetween('date', [$startDate,$endDate])
            ->get();

        $age = array(0,0,0,0,0);
        $races = array(0,0,0,0);
        $gender = array(0,0);
        $type = array(0,0,0,0,0,0,0,0);
        $priority = array(0,0,0);

        foreach($mails as $mail){
            $client = $mail->thread->client;
            if(!is_null ($client->gender)){
                switch($client->gender){
                    case 0: $gender[0]++;
                        break;
                    case 1: $gender[1]++;
                        break;
                }
            }

            if(!is_null ($client->race)){
                switch($client->race){
                    case 0: $races[0]++;
                        break;
                    case 1: $races[1]++;
                        break;
                    case 2: $races[2]++;
                        break;
                    case 3: $races[3]++;
                        break;
                }
            }

            if(!is_null ($client->age)){
                if($client->age <= 20){
                    $age[0]++;
                }
                else if($client->age <= 30){
                    $age[1]++;
                }
                else if($client->age <= 40){
                    $age[2]++;
                }
                else if($client->age <= 50){
                    $age[3]++;
                }
                else{
                    $age[4]++;
                }
            }

            $thread = $mail->thread;
            if(!is_null ($thread->problem_type)){
                if($thread->problem_type == 1){
                    $type[0]++;
                }
                else if($thread->problem_type == 2){
                    $type[1]++;
                }
                else if($thread->problem_type == 3){
                    $type[2]++;
                }
                else if($thread->problem_type == 4){
                    $type[3]++;
                }
                else if($thread->problem_type == 5){
                    $type[4]++;
                }
                else if($thread->problem_type == 6){
                    $type[5]++;
                }
                else if($thread->problem_type == 7){
                    $type[6]++;
                }
                else if($thread->problem_type == 8){
                    $type[7]++;
                }
            }
        }

        $threads = Thread::with('mails')
                ->where(function($query) use($current_address,$startDate,$endDate){
                    $query->whereHas('mails',function($subquery) use($current_address){
                            $subquery->where('from','!=' , $current_address->value);
                        })->whereHas('mails',function($subquery) use($startDate,$endDate){
                            $subquery->whereBetween('date', [$startDate,$endDate]);
                        });
                })
                ->get();

        foreach($threads as $thread){
            if(!is_null ($thread->problem_type)){
                if($thread->problem_type == 1){
                    $type[0]++;
                }
                else if($thread->problem_type == 2){
                    $type[1]++;
                }
                else if($thread->problem_type == 3){
                    $type[2]++;
                }
                else if($thread->problem_type == 4){
                    $type[3]++;
                }
                else if($thread->problem_type == 5){
                    $type[4]++;
                }
                else if($thread->problem_type == 6){
                    $type[5]++;
                }
                else if($thread->problem_type == 7){
                    $type[6]++;
                }
                else if($thread->problem_type == 8){
                    $type[7]++;
                }
            }

            if(!is_null ($thread->priority)){
                if($thread->priority == 1){
                    $priority[0]++;
                }
                else if($thread->priority == 2){
                    $priority[1]++;
                }
                else if($thread->priority == 3){
                    $priority[2]++;
                }
            }
        }


        return response()->json([
            'ageCount' => $age,
            'raceCount' => $races,
            'genderCount' => $gender,
            'typeCount' => $type,
            'priorityCount' => $priority
        ],200);
    }

    public function getVolunteerData(Request $request){
        if($request->month == "0"){
            $startDate = (new DateTime())->modify('first day of this month');
            $endDate = (new DateTime())->modify('last day of this month');
        }
        else if($request->month == "1"){
            $startDate = (new DateTime())->modify('first day of previous month');
            $endDate = (new DateTime())->modify('last day of previous month');
        }
        else if($request->month == "2"){
            $startDate = (new DateTime())->modify('-2 months')->modify('first day of this month');
            $endDate = (new DateTime())->modify('-2 months')->modify('last day of this month');
        }

        $volunteers = User::with(['replies'=>function($query) use($startDate,$endDate){
                $query->whereBetween('created_at', [$startDate,$endDate]);
            }])
            ->where('role',1)
            ->get();

        foreach($volunteers as $volunteer){
            $count = count($volunteer->replies);
            $volunteer->count = $count;

            $totalDuration = 0;
            if($count != 0){
                foreach($volunteer->replies as $reply){
                    $totalDuration += $reply->duration;
                }
    
                $avgDuration = $totalDuration / $count;
                $volunteer->avgDuration = $avgDuration;
            }
            else{
                $volunteer->avgDuration = 0;
            }
            
        }

        return response()->json([
            'volunteers'=>$volunteers
        ],200);
    }
}
