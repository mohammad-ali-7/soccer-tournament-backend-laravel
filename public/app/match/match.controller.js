angular
  .module('app')

  .controller('MatchCtrl', function($scope, $state, $q, Match, Round, Day, Team){
    $scope.matches = [];
    $scope.match = {};
    
    $scope.rounds = [];
    $scope.round_id = "";

    $scope.teams  = [];
    
    $scope.days   = [];
    $scope.currentDay = "";



    Round
      .get()
      .then(function(res){
        $scope.rounds = res.data;
      });

    Day
      .get()
      .then(function(res){
        $scope.days = res.data;
      });


      $scope.getDataFromRound = function(round_id){
        Team.getFromRound(round_id)
        .then(function(res){
          $scope.teams = res;
        });
      }

      $scope.createMatch = function(match){
        Match.create(match);
      }

      $scope.loadMatchList = function(currentDay){
        Match
          .get()
          .then(function(res){
            $scope.matches = res.data.filter(function(element){
              if(element.day_id === currentDay){
                $q.all([
                  Team.getTeam(element.team_a_id),
                  Team.getTeam(element.team_b_id),
                ])
                .then(function(res){
                  element.team_a = res[0].data[0];
                  element.team_b = res[1].data[0];
                });
                return element;
              }

            });
          })
          .then(function(data){
            console.log("match.controller.js :64", $scope.matches);
          })
      }
    
    // if( $state.current.name === 'admin.match' ){
    //   $scope.loadMatchList();
    // }

  });