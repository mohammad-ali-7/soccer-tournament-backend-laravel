<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Round;
use App\Season;

use Hashids;

class RoundCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Round::with('day','team')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
      $round = new Round();

      $round->fill([
      'season_id' => Season::getCurrentSeason()->id,
      'name' => $request->name
      ]);

      if($round->save()){
          $res['saved'] = true;
          $res['status'] = 200;
      }
      return response()->json($res, $res['status']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){
        if(!$data = Round::where('id','=', $id)->with('day')->first()){
            $data['error'] = 'Item Not Found';
            $status = 404;
        }
        $status = 200;

        return response()->json($data, $status);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $name = $request->get('name');

        $round = Round::find($id);

        $round->name = $name;

        if(!$round->save()){
            $res['err'] = 'Cannot edit document';
            $res['status'] = 401;
        }
        
        $res['status'] = 200;

        return response()->json($res, $res['status']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if($round = Round::find($id)){
            if($round->delete()){
                $res['status'] = 202;
                $res['message'] = 'resource deleted successfully';
            }else{
                $res['status'] = 401;
            }
        }
        return response()->json( $res ,$res['status']);

    }
}
