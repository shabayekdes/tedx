<?php

namespace App\Http\Controllers\Admin;

use App\Models\Team;
use Illuminate\Http\Request;
use App\Http\Requests\TeamRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\TeamResource;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $teams = Team::paginate();
        return TeamResource::collection($teams);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TeamRequest $request)
    {
        if($request->thumbnail){


            $request->merge(['thumbnail' => $this->uploadImage($request) ]);
        }

        $team = Team::create($request->all());
        return new TeamResource($team);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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
    public function update(Request $request,Team $team)
    {
        if($request->thumbnail != $team->thumbnail){
            Storage::delete('/img/teams/'.$team->thumbnail);

            $request->merge(['thumbnail' => $this->uploadImage($request) ]);
        }

        $team->update($request->all());
        return new TeamResource($team);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Team $team)
    {
        $team->delete();
        return ["message" => "Deleted!!"];
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    protected function uploadImage($request)
    {

        $name = $request->name . '_'. $request->title .'.' . explode('/', explode(':', substr($request->thumbnail, 0, strpos($request->thumbnail, ';')))[1])[1];
        \Image::make($request->thumbnail)->save(public_path('img/teams/').$name);

        return $name;

    }

}