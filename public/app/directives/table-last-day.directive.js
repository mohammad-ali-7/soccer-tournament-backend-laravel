//Creat a directive module, and create directive named 'blink'
angular
.module('app')
.directive('tableLastDay',function() {
  return {
    restrict: 'E', // this allows restriction of blink to an HTML element.
    templateUrl: 'app/directives/templates/table-last-day.html',
    scope:{
      days: '=days',
    },

    link: function (scope, el, attr, ctrl, transclude){

    },

    controller: function($scope, $rootScope){
      $rootScope.$watch('rounds', function(newVal, oldVal){
        $scope.rounds = newVal || [];
      });

      $scope.ready = true;

      $scope.changeRound = function(round){
        $scope.roundFilterId = round.id;
        return true;
      }

      if($scope.roundFilterId){
        $scope.changeRound({ id: Number($scope.roundFilterId) });
      }

    }
  };
})
