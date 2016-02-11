angular.module("app").controller("AdminCtrl",["$auth","$scope","$rootScope","$state","Auth","authResolve",function($auth,$scope,$rootScope,$state,Auth,authResolve){console.log("admin.controller.js :8",authResolve.auth),authResolve.auth||$state.go("public.login"),$scope.logout=function(){$auth.logout(),$state.reload()}}]),angular.module("app").service("Day",["$http",function($http){this.get=function(){return $http.get("/api/day")},this.getFromRound=function(round_id){return $http.get("/api/day?round_id="+round_id)},this.create=function(day){return console.log("day.service.js :10 creating new day:",day),$http.post("/api/day",day)},this["delete"]=function(day){return $http["delete"]("/api/day/"+day.id)}}]),angular.module("app").filter("spaceless",function(){return function(input){return input.replace(new RegExp(" ","g"),"_")}}).filter("trustedUrl",["$sce",function($sce){return function(input){return $sce.trustAsResourceUrl(input)}}]),angular.module("app").service("Auth",["$http","$rootScope",function($http,$rootScope){this.login=function(credential){return $http.post("/api/auth",credential)},this.check=function(){return $http.get("/api/auth/check")}}]),angular.module("app").controller("LoginCtrl",["$auth","$state","$scope","$rootScope","$http","Auth",function($auth,$state,$scope,$rootScope,$http,Auth){$scope.credential={},$scope.login=function(credential){$auth.login(credential).then(function(res){console.log("login.controller.js :8",res),$state.go("admin")})}}]),angular.module("app").controller("MatchCtrl",["$scope","$state","Match","Round","Day","Team","toastr",function($scope,$state,Match,Round,Day,Team,toastr){function getRounds(){Round.get().then(function(res){$scope.rounds=res.data})}function getMatchs(){Match.get().then(function(res){$scope.matches=res.data},function(err){console.log("match.controller.js :27",err)})}function getDays(){Day.getFromRound($scope.filters.round_id).then(function(res){$scope.days=res.data})}$scope.matches=[],$scope.match={},$scope.rounds=[],$scope.round_id="",$scope.teams=[],$scope.days=[],$scope.choosen_day_id="",$scope.filters={day_id:void 0,round_id:void 0},$scope.$watch("filters",function(current,prev){console.log("match.controller.js :21","changed"),getDays(),getMatchs()},!0),getRounds(),$scope.getDataFromRound=function(round_id){Team.getFromRound(round_id).then(function(res){$scope.teams=res.data},function(err){console.log("match.controller.js :37",err)})},$scope.create=function(match){Match.create(match).then(function(res){$scope.match={},toastr.success("Match creato!"),console.log("match.controller.js :63",res),getMatchs()},function(err){console.log("match.controller.js :46",err)})},$scope["delete"]=function(match){confirm("Sicuro di volerlo rimuovere?")&&Match["delete"](match).then(function(res){console.log("match.controller.js :30",res),toastr.warning("Rimosso!"),getMatchs()},function(err){toastr.error(err,"Errore..."),console.log("match.controller.js :32",err)})},$scope.selectRound=function(round){$scope.selectedRound=round.id}}]),angular.module("app").service("Match",["$http",function($http){this.get=function(){return $http.get("/api/match")},this.single=function(id){return $http.get("/api/match/"+id)},this.getWithFilter=function(filters){return $http.get("/api/match?day_id="+filters.day_id+"&round_id="+filters.round_id)},this.create=function(data){return console.log("match.service.js :14",data),$http.post("/api/match",data)},this["delete"]=function(match){return $http["delete"]("/api/match/"+match.id)},this.edit=function(result){return $http.put("/api/match/"+result.id,result)}}]),angular.module("app").controller("ResultCtrl",["$scope","$state","$stateParams","toastr","Match",function($scope,$state,$stateParams,toastr,Match){function getMatch(){Match.single($stateParams.match_id).then(function(res){$scope.match=res.data,$scope.match.team_a.player.forEach(function(player){player.score=0,$scope.match.scores.forEach(function(score){score.player_id===player.id&&player.score++}),player.attendance.forEach(function(attend){attend.match_id===$scope.match.id?player.attendance=!0:player.attendance=!1})}),$scope.match.team_b.player.forEach(function(player){player.score=0,$scope.match.scores.forEach(function(score){score.player_id===player.id&&player.score++}),player.attendance.forEach(function(attend){attend.match_id===$scope.match.id?player.attendance=!0:player.attendance=!1})})})}$scope.match={},$scope.teamAScores=[],$scope.teamBScores=[],getMatch(),$scope.edit=function(result){result.attendances=[],result.all_scores=$scope.teamAScores.concat($scope.teamBScores),Match.edit(result).then(function(res){console.log("result.controller.js :25",res.data),getMatch()})},$scope.$watch("match",function(newVal,oldVal){if("undefined"!=typeof newVal.id){var match=newVal,teamAScores=[],teamBScores=[];match.team_a.player.forEach(function(player){if(player.score&&player.score>=0){player.player_id=player.id,player.match_id=$scope.match.id;for(var i=0;i<player.score;i++)teamAScores.push(player)}$scope.teamAScores=teamAScores}),match.team_b.player.forEach(function(player){if(player.score&&player.score>=0){player.player_id=player.id,player.match_id=$scope.match.id;for(var i=0;i<player.score;i++)teamBScores.push(player)}$scope.teamBScores=teamBScores}),$scope.teamAScores.length===$scope.teamBScores.length&&($scope.match.winner_id=null),$scope.teamAScores.length>$scope.teamBScores.length&&($scope.match.winner_id=$scope.match.team_a.id),$scope.teamAScores.length<$scope.teamBScores.length&&($scope.match.winner_id=$scope.match.team_b.id)}},!0)}]),angular.module("app").controller("MediaCtrl",["$scope","$auth","$sce","toastr","Media",function($scope,$auth,$sce,toastr,Media){function getVideos(){Media.getVideos().then(function(data){$scope.videos=data.data},function(err){console.log("media.controller.js :39",err)})}function getPhotos(){Media.getPhotos().then(function(data){$scope.photos=data.data},function(err){console.log("media.controller.js :48",err)})}$scope.upload={},$scope.videos=[],$scope.photos=[],getPhotos(),getVideos(),$scope.createVideo=function(video){Media.createVideo(video).then(function(res){toastr.success("Video aggiunto!"),getVideos()},function(err){toastr.error("Impossibile aggiungere il video","Error...")})},$scope.uploadSucces=function(){toastr.success("Photo Uploaded!"),getPhotos()},$scope["delete"]=function(media){confirm("Sicuro di volerlo rimuovere?")&&Media["delete"](media).then(function(res){toastr.warning("Media rimosso!"),getVideos(),getPhotos()})}}]),angular.module("app").service("Media",["$http",function($http){this.createVideo=function(video){return $http.post("/api/video",video)},this["delete"]=function(media){return $http["delete"]("/api/media/"+media.id)},this.get=function(){return $http.get("/api/media")},this.getPhotos=function(){return $http.get("/api/media?type=photo")},this.getVideos=function(){return $http.get("/api/media?type=video")}}]),angular.module("app").controller("NewsCtrl",["$scope","toastr","News","Season",function($scope,toastr,News,Season){function getPosts(){News.index($scope.postType).then(function(res){$scope.posts=res.data})}$scope.postType=void 0,$scope.posts=[],$scope.post={},getPosts(),$scope.create=function(post){News.create(post).then(function(res){200===res.status&&(toastr.success("Post creato!","Success!"),$scope.editMode=!1,getPosts())})},$scope["delete"]=function(post){confirm("Sicuro di volerlo cancellare?")&&News["delete"](post).then(function(res){console.log("news.controller.js :26",res),200==res.status&&(toastr.warning("Post cancellato!"),getPosts())})},Season.get().then(function(res){$scope.seasons=res.data})}]),angular.module("app").service("News",["$http",function($http){this.create=function(post){return $http.post("/api/news",post)},this.index=function(type){return type?$http.get("/api/news?type="+type):$http.get("/api/news")},this["delete"]=function(post){return $http["delete"]("/api/news/"+post.id)}}]),angular.module("app").service("Player",["$http",function($http){this.get=function(){return $http.get("/api/player")},this.create=function(data){return $http.post("/api/player",data)},this["delete"]=function(player){return $http["delete"]("/api/player/"+player.id)}}]),angular.module("app").controller("RoundsCtrl",["$rootScope","$scope","$http","toastr","Season","Round",function($rootScope,$scope,$http,toastr,Season,Round){function getRounds(){Round.get().then(function(res){$scope.rounds=res.data},function(err){console.log("season.controller.js :12",err)})}$scope.rounds=[],$scope.round={},getRounds(),$scope.create=function(round){Round.create(round).then(function(res){200===res.status&&($scope.round={},toastr.success("Girone creato!")),getRounds()},function(err){toastr.error(err,"Errore...")})},$scope.edit=function(round){Round.edit(round).then(function(res){getRounds(),toastr.success("Modificato!")},function(err){toastr.error(err,"Error...")})},$scope["delete"]=function(round){confirm("Sicuro di volerlo rimuovere?")&&Round["delete"](round).then(function(res){getRounds(),toastr.warning("Rimosso!")},function(err){console.log("round.controller.js :42",err),toastr.error(err,"Error...")})}}]),angular.module("app").service("Round",["$http",function($http){this.get=function(){return $http.get("/api/round")},this.getSingle=function(id){return $http.get("/api/round/"+id)},this.create=function(round){return $http.post("/api/round",round)},this.edit=function(round){return console.log("round.service.js :14",round),$http.put("/api/round/"+round.id,round)},this["delete"]=function(round){return $http["delete"]("/api/round/"+round.id)}}]),angular.module("app").controller("RoundCtrl",["$stateParams","$scope","$http","toastr","Season","Round","Day",function($stateParams,$scope,$http,toastr,Season,Round,Day){function getRound(){Round.getSingle($stateParams.round_id).then(function(res){$scope.round=res.data,console.log("single.controller.js :53",res.data)},function(err){console.log("season.controller.js :12",err)})}$scope.round={},$scope.editMode=!1,getRound(),$scope.createDay=function(){Day.create({round_id:$scope.round.id}).then(function(res){console.log("day.controller.js :27",res),200===res.status&&(toastr.success("Giornata creata!"),getRound())},function(err){console.log("day.controller.js :33",err),toastr.error(err,"Errore...")})},$scope.editRound=function(round){Round.edit(round).then(function(res){$scope.editMode=!1,getRound(),toastr.success("Modificato!")},function(err){toastr.error(err,"Error...")})},$scope.deleteDay=function(day){confirm("Sicuro di volerlo rimuovere?")&&Day["delete"](day).then(function(res){getRound(),toastr.warning("Rimosso!")},function(err){console.log("day.controller.js :42",err),toastr.error(err,"Error...")})}}]),angular.module("app").controller("SeasonCtrl",["$scope","$http","Season","toastr",function($scope,$http,Season,toastr){function getSeasons(){Season.get().then(function(data){$scope.seasons=data.data},function(err){console.log("season.controller.js :12",err)})}$scope.seasons=null,getSeasons(),$scope.create=function(season){Season.create(season).then(function(res){200===res.status&&toastr.success("New Season Created!"),getSeasons()},function(err){toastr.error(err,"Errore...")})},$scope["delete"]=function(season){confirm("Sicuro di volerlo rimuovere?")&&Season["delete"](season).then(function(res){console.log("season.controller.js :30",res),toastr.warning("Rimosso!"),getSeasons()},function(err){toastr.error(err,"Errore..."),console.log("season.controller.js :32",err)})},$scope.edit=function(season){confirm("Vuoi settare la stagione "+season.year+" come stagione corrente?")&&Season.edit(season).then(function(data){console.log("season.controller.js :39",data),$scope.seasons=[],getSeasons()},function(err){console.log("season.controller.js :41",err)})}}]),angular.module("app").service("Season",["$http","$rootScope",function($http,$rootScope){this.get=function(){return $http.get("/api/season")},this.getCurrentSeason=function(callback){$http.get("/api/season").then(function(data){var seasons=data.data;seasons.forEach(function(season){return season.current?callback(season):void 0})})},this.create=function(season){return $http.post("/api/season",season)},this["delete"]=function(season){return $http["delete"]("/api/season/"+season.id)},this.edit=function(season){return $http.put("/api/season/"+season.id,season)}}]),angular.module("app").controller("TeamCtrl",["$scope","$stateParams","toastr","Team","Round","Player",function($scope,$stateParams,toastr,Team,Round,Player){function getTeam(){Team.getTeam($stateParams.team_id).then(function(res){$scope.team=res.data,console.log("single.controller.js :11",res.data)})}function getRounds(){Round.get().then(function(res){console.log("single.controller.js :66",res.data),$scope.rounds=res.data})}$scope.team={},$scope.rounds=void 0,$scope.editMode=!1,getTeam(),getRounds(),$scope.submit=function($files,$event,$flow,team){$flow.opts.target="/api/media?type=avatar&team_id="+team.id,$flow.upload()},$scope.editTeam=function(team){Team.edit(team).then(function(res){console.log("single.controller.js :14",res.data),toastr.warning("Modificato"),getTeam(),$scope.editMode=!1},function(err){toastr.error(err,"Error...")})},$scope.deletePlayer=function(player){confirm("Sicuro di volerlo rimuovere?")&&Player["delete"](player).then(function(res){console.log("player.controller.js :30",res),toastr.warning("Rimosso!"),getTeam()},function(err){toastr.error(err,"Errore..."),console.log("player.controller.js :32",err)})},$scope.createPlayer=function(player){player.team_id=$scope.team.id,Player.create(player).then(function(res){200===res.status&&($scope.player={},toastr.success("Giocatore creato!"),getTeam())},function(err){console.log("player.controller.js :33",err),toastr.error(err,"Error...")})}}]),angular.module("app").controller("TeamsCtrl",["$scope","toastr","Team","Round",function($scope,toastr,Team,Round){function getRounds(){Round.get().then(function(res){$scope.rounds=res.data})}function getTeams(){Team.get().then(function(res){res.status&&($scope.teams=res.data)},function(err){$scope.error=err})}$scope.teams=[],$scope.team={round_id:void 0,name:""},$scope.rounds=[],getRounds(),getTeams(),$scope.create=function(team){Team.create(team).then(function(res){200===res.status&&($scope.team={},toastr.success("Team creato!"),getTeams())},function(err){err&&toastr.error(err,"Errore...")})},$scope["delete"]=function(team){confirm("Sicuro di volerlo rimuovere?")&&Team["delete"](team).then(function(res){toastr.warning("Rimosso!"),getTeams()},function(err){toastr.error(err,"Errore...")})}}]),angular.module("app").service("Team",["$http",function($http){this.get=function(){return $http.get("/api/team")},this.getFromRound=function(round_id){return $http.get("/api/team?round_id="+round_id)},this.getTeam=function(team_id){return $http.get("/api/team/"+team_id)},this.create=function(data){return console.log("team.service.js :10",data),$http.post("/api/team",data)},this.edit=function(team){return $http.put("/api/team/"+team.id,team)},this["delete"]=function(team){return $http["delete"]("/api/team/"+team.id)}}]),angular.module("app").controller("UserCtrl",["$scope","Auth","$http",function($scope,Auth,$http){$scope.user={},$scope.createUser=function(credential){credential.username?credential.pwd===credential.pwdRetype?$http.post("/api/user",credential).then(function(data){console.log("user.controller.js :10",data)},function(err){console.log("user.controller.js :14",err),err&&($scope.error=err.data)}):$scope.error="Password mismatch!":$scope.error="No username provided!"}}]);