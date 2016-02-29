angular.module('app', [
  'ngAnimate',
  'angular.filter',
  'ui.router',
  'toastr',
  'ui.tinymce',
  'flow',
  'satellizer',
])

.config([
  'flowFactoryProvider',
  '$authProvider', 
  '$stateProvider', 
  '$urlRouterProvider',
  '$httpProvider',
  function(flowFactoryProvider, $authProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

  //$httpProvider.defaults.cache = true;

  flowFactoryProvider.defaults = {
    chunkSize: 2048 * 2048,
  };

  $authProvider.loginUrl = '/api/auth';

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");


  $stateProvider  
    /**
      * PUBLIC
      */
    .state('public', {
      abstract:true,
      url: "/",
      templateUrl: 'app/public/public-template.html',
      controller: 'PublicCtrl'
    })
      .state('public.home', {
        url:'',
        templateUrl: 'app/public/home/index.html',
        controller: 'HomeCtrl',
      })

      .state('public.login', {
        url: "login",
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
      })

      .state('public.calendars', {
        url:'calendari',
        templateUrl: 'app/public/calendars/calendars.html',
        controller: 'PublicCalendarsCtrl',
      })
      .state('public.contacts', {
        url:'contatti',
        templateUrl: 'app/public/contacts/contacts.html',
        controller: 'PublicContactsCtrl',
      })
      .state('public.medias', {
        url:'media?type',
        templateUrl: 'app/public/medias/medias.html',
        controller: 'PublicMediasCtrl',
      })
      .state('public.news', {
        url:'news?type',
        templateUrl: 'app/public/news/news.html',
        controller: 'PublicNewsCtrl',
      })
      .state('public.rankings', {
        url:'classifiche',
        templateUrl: 'app/public/rankings/rankings.html',
        controller: 'PublicRankingsCtrl',
      })
      .state('public.rules', {
        url:'regolamento',
        templateUrl: 'app/public/rules/rules.html',
        controller: 'PublicRulesCtrl',
      })
      .state('public.scorers', {
        url:'marcatori',
        templateUrl: 'app/public/scorers/scorers.html',
        controller: 'PublicScorersCtrl',
      })
      .state('public.team', {
        url:'team/{team_id}',
        templateUrl: 'app/public/team/team.html',
        controller: 'PublicTeamCtrl',
      })

    /**
      * ADMIN
      **/
    .state('admin', {
      abstract: true,
      //cache: false,
      url:'/admin',
      templateUrl: 'app/admin/admin-template.html',
      controller: 'AdminCtrl',
    })
      .state('admin.dashboard', {
        url:'',
        templateUrl: 'app/admin/dashboard.html'
      })
      .state('admin.user', {
        url:'/user',
        templateUrl: 'app/user/index.html',
        controller: 'UserCtrl'
      })

      .state('admin.news',{
        url: '/news',
        templateUrl: 'app/news/index.html',
        controller: 'NewsCtrl',
      })

      .state('admin.medias',{
        url: '/medias',
        templateUrl: 'app/media/index.html',
        controller: 'MediaCtrl',
      })

      .state('admin.prizes',{
        url: '/prizes',
        templateUrl: 'app/prize/index.html',
        controller: 'PrizeCtrl',
      })

      .state('admin.season', {
        url:'/season',
        templateUrl: 'app/season/index.html',
        controller: 'SeasonCtrl',
      })

      .state('admin.rounds', {
        url:'/rounds',
        templateUrl: 'app/round/index.html',
        controller: 'RoundsCtrl',
      })
        .state('admin.round', {
          url:'/rounds/{round_id}',
          templateUrl: 'app/round/round.html',
          controller: 'SingleRoundCtrl',
        })


      .state('admin.teams', {
        url:'/teams',
        templateUrl: 'app/team/index.html',
        controller: 'TeamsCtrl',
      })
        .state('admin.team', {
          url:'/team/{team_id}',
          templateUrl: 'app/team/team.html',
          controller: 'SingleTeamCtrl',
        })

      .state('admin.players', {
        url: '/players',
        templateUrl: 'app/player/players.html',
        controller: 'PlayerCtrl'
      })
      .state('admin.player', {
        url: '/player/{player_id}',
        templateUrl: 'app/player/single.html',
        controller: 'SinglePlayerCtrl'
      })

      .state('admin.match', {
        url:'/match',
        templateUrl: 'app/match/index.html',
        controller: 'MatchCtrl',
      })
      .state('admin.results', {
        url:'/match/results',
        templateUrl: 'app/match/results.html',
        controller: 'MatchCtrl',
      })
        .state('admin.result', {
          url:'/match/result/{match_id}',
          templateUrl: 'app/match/result.html',
          controller: 'ResultCtrl',
        })
}])


.run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth){
  $rootScope.isLoginPage = false;
  $rootScope.sitename = '_MyTournament_';

  $rootScope.$on('$stateChangeStart', function(e, stateTo, toParams, stateFrom){
    if (stateTo.name.match(/^admin/) && !stateFrom.name.match(/^admin/)){
      Auth.check()
      .then(function(data){
        $state.transitionTo(stateTo.name, toParams);
      }, function(err){
        $state.transitionTo('public.login');
      });
    }
  });

  $rootScope.$on('$stateChangeStart', function(e, stateTo, toParams, stateFrom){
    $rootScope.stateLocation = stateTo.name;
    if ( stateTo.name.match(/^admin/) ){
      $rootScope.location = 'admin';
    }else{
      $rootScope.location = 'public';
    }
  });

  console.log("init.js :4", "Core Loaded!");
}])