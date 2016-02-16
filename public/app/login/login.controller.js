angular.module('app')

.controller('LoginCtrl', ['$auth', '$state', '$scope', '$rootScope', '$http', 'Auth', function($auth, $state, $scope, $rootScope, $http, Auth ){
  $rootScope.isLoginPage = true;
  $scope.credential = {};
  $scope.login = function(credential){
    $auth.login(credential).then(function(res) {
      $state.go('admin.dashboard');
    });
  }

}])