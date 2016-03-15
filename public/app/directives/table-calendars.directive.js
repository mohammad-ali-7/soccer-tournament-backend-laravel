//Creat a directive module, and create directive named 'blink'
angular
.module('app')
.directive('tableCalendars',function() {
  return {
    restrict: 'E', // this allows restriction of blink to an HTML element.
    templateUrl: 'app/directives/templates/table-calendars.html',
    scope:{
      days: '=days',
    },

    link: function (scope, el, attr, ctrl, transclude){

    },

    controller: function($scope, $rootScope, $stateParams){
      $rootScope.$watch('rounds', function(newVal, oldVal){
        $scope.rounds = newVal || [];
      });

      $scope.ready = true;

      $scope.changeRound = function(round){
        $scope.roundFilterId = round.id;
        return true;
      }

      if($stateParams.round){
        $scope.changeRound({ id: Number($stateParams.round) });
      }

    }
  };
})
