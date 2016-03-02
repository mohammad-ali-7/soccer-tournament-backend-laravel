<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Score extends Model{
  protected static function boot(){
    parent::boot();
    static::addGlobalScope(new \App\Scopes\SeasonScope);
  }

  protected $fillable = ['team_id','player_id','match_id','season_id'];


  public function match(){
    return $this->belongsTo('App\Match');
  }

  public function player(){
    return $this->belongsTo('App\Player');
  }
}
