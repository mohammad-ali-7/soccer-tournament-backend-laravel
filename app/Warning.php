<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Warning extends Model{
  
  protected $fillable = ['player_id', 'match_id'];

  protected $appends = ['player'];

  public function getPlayerAttribute(){
    return $this->attributes['player'] = \DB::table('players')->where('id', $this['player_id'])->select('id', 'name')->first();
  }

  public function player(){
    return $this->belongsTo('App\Player');
  }
  public function match(){
    return $this->hasOne('App\Match');
  }
}
