<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Thread;
use App\Mail;
use App\Client;
use App\Http\Resources\InboxCollection;

class InboxController extends Controller
{
    public function index(Request $request){
        if($request->has('type')){
            $threadArray = array();
            if($request->type == "unreply"){
                $status = 0;
            }
            else if($request->type == "replying"){
                $status = 1;
            }
            else if($request->type == "sent"){
                $status = 2;
            }
            else{
                return response()->json([
                    'error' => 'wrong type'
                ],404);
            }

            $threads = Thread::with('client')
                ->where('status',$status)
                ->select('threads.*',\DB::raw('(SELECT date FROM mails where mails.thread_id = threads.threadId ORDER BY mails.date DESC LIMIT 1) as date'))
                ->orderBy('date','desc')
                ->get();
            return response()->json([
                'items' => $threads
            ],200);
        }
        return response()->json([
            'error' => 'please enter type'
        ],404);
    }

    public function checkClient($id){
        $client = Thread::find($id)->client()->first();

        if(!$client) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        if($client->name == null){
            $fill = "required";
        }
        else{
            $fill = "Skip";
        }

        return response()->json([
            'fill' => $fill,
            'id' => $client->id
        ],200);
    }

    public function updateClient(Request $request, $id){
        $client = Client::find($id);

        if(!$client) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        $client->name = $request->name;
        $client->age = $request->age;
        $client->race = $request->race;
        $client->nationality = $request->nationality;
        $client->job = $request->job;

        $client->save();

        return response()->json([
            "client" => $client,
        ],200);
    }

    public function getThreadDetail($id){
        $thread = Thread::with('client','replies')->find($id);

        return response()->json([
            'threadDetail'=>$thread
        ],200);
    }
}
