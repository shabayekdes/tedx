<?php

namespace App\Http\Controllers\Admin;

use App\Models\Speaker;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\SpeakerResource;
use Illuminate\Support\Facades\Storage;

class SpeakerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $speakers = Speaker::paginate();
        return SpeakerResource::collection($speakers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SpeakerRequest $request)
    {
        if($request->thumbnail){

            $request->merge(['thumbnail' => $this->uploadImage($request) ]);
        }

        $speaker = Speaker::create($request->all());
        return new SpeakerResource($speaker);
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
    public function update(Request $request,Speaker $speaker)
    {
        if($request->thumbnail != $speaker->thumbnail){
            Storage::delete('/img/speakers/'.$speaker->thumbnail);

            $request->merge(['thumbnail' => $this->uploadImage($request) ]);
        }

        $speaker->update($request->all());
        return new SpeakerResource($speaker);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Speaker $speaker)
    {
        $speaker->delete();
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
        \Image::make($request->thumbnail)->save(public_path('img/speakers/').$name);

        return $name;

    }

}