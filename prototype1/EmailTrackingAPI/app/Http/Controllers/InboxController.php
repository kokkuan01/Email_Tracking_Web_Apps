<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Thread;
use App\Mail;
use App\Client;
use App\Reply;
use App\User;
use App\Http\Resources\InboxCollection;
use DB;

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

            if($request->search != null){
                $threads = Thread::with('client')
                    ->where('status',$status)
                    ->where(function($query) use($request){
                        $query->where('subject','like', '%' . $request->search. '%')
                            ->orWhereHas('client',function($subquery) use($request){
                                $subquery->where('email','like', '%' . $request->search. '%');
                            })
                            ->orWhereHas('client',function($subquery) use($request){
                                $subquery->where('displayName','like', '%' . $request->search. '%');
                            });
                    })
                    ->select('threads.*',DB::raw('(SELECT date FROM mails where mails.thread_id = threads.threadId ORDER BY mails.date DESC LIMIT 1) as date'))
                    ->orderBy('date','desc')
                    ->paginate(50);
            }
            else{
                $threads = Thread::with('client')
                ->where('status',$status)
                ->select('threads.*',DB::raw('(SELECT date FROM mails where mails.thread_id = threads.threadId ORDER BY mails.date DESC LIMIT 1) as date'))
                ->orderBy('date','desc')
                ->paginate(50);
            }

            $threads->appends(['type' => $request->type])->links();
            
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
        $client->gender = $request->gender;
        $client->race = $request->race;
        $client->nationality = $request->nationality;
        $client->job = $request->job;

        $client->save();

        return response()->json([
            "client" => $client,
        ],200);
    }

    public function getThreadDetail($id){
        $thread = Thread::with('client','replies.user')->find($id);

        if(!$thread) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        $status = $thread->status;
        if($status != 2){
            $thread->status = 1;
            $thread->save();
        }

        return response()->json([
            'threadDetail'=>$thread,
            'status' => $status
        ],200);
    }

    public function addComment(Request $request){
        $thread = Thread::find($request->threadId);
        $thread->status = 2;
        $thread->priority = $request->priority;
        $thread->problem_type = $request->type;
        $thread->save();

        $reply = new Reply;
        $reply->comment = $request->comment;
        $reply->duration = $request->duration;
        
        $user = User::find($request->userId);

        $thread->replies()->save($reply);
        $user->replies()->save($reply);

        return response()->json([
            'message'=>'success'
        ],200);
    }

    public function unlock($id){
        $thread = Thread::find($id);
        $thread->status = 0;
        $thread->save();

        return response()->json([
            'message'=>'success'
        ],200);
    }

    public function getStatistic($id){
        $thread = Thread::where('id',$id)->first();

        $replies = Reply::select('user_id')->where('thread_id',$thread->threadId)->groupBy('user_id')->get();
        if(count($replies) == 0){
            return response()->json([
                'count'=>0
            ],200);
        }
        
        $count = count($replies);

        $avgDuration = Reply::where('thread_id',$thread->threadId)->sum('duration') / $count;

        $mostReplies = 
            DB::select('(SELECT  user_id, COUNT(user_id) AS countValue 
                FROM replies WHERE thread_id="'. $thread->threadId . '" 
                GROUP BY user_id 
                ORDER BY countValue DESC 
                LIMIT 1)'
            );
        
        $user = User::find($mostReplies[0]->user_id);

        return response()->json([
            'statistic'=>[
                'count' => $count,
                'most' => $user->name,
                'avgDuration' => $avgDuration
            ]
        ],200);
    }
}
