'use strict';

/**
 * @ngdoc overview
 * @name rapidAssignmentApp
 * @description
 * # rapidAssignmentApp
 *
 * Main module of the application.
 */
angular
  .module('rapidAssignmentApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    //Configure CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // For any unmatched url, redirect to login
  $urlRouterProvider.otherwise("main/login");
  // Now set up the states
  $stateProvider
    .state('main', {
      abstract:true,
      url: "/main",
      templateUrl: "views/main.html"
    })
    .state('main.login', {
      url: "/login",
      templateUrl: "views/login.html",
      controller: "LoginCtrl"
    })
    .state('main.home',{
      url: "/home",
      requiresAuth: true,
      controller: "HomeCtrl",
      templateUrl:"views/home.html"
    })
    .state('main.signup',{
      url: "/signup",
      controller: "SignupCtrl",
      templateUrl:"views/signup.html"
    });
})
.run(['$rootScope', '$http', '$window', '$state', 'authFactory', 'facebookService','userService', 'storageService',
  function($rootScope, $http, $window, $state, authFactory, facebookService, userService, storageService) {

  $rootScope.user = {};

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    FB.init({ 

      /* 
       The app id of the web app;
       To register a new app visit Facebook App Dashboard
       ( https://developers.facebook.com/apps/ ) 
      */

      appId: '246272682383473', 

      /* 
       Adding a Channel File improves the performance 
       of the javascript SDK, by addressing issues 
       with cross-domain communication in certain browsers. 
      */

      channelUrl: 'app/channel.html', 

      /* 
       Set if you want to check the authentication status
       at the start up of the app 
      */

      status: true, 

      /* 
       Enable cookies to allow the server to access 
       the session 
      */

      cookie: true, 

      /* Parse XFBML */

      xfbml: true 
    });
  };

  (function(d){
    // load the Facebook javascript SDK

    var js, 
    id = 'facebook-jssdk', 
    ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script'); 
    js.id = id; 
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";

    ref.parentNode.insertBefore(js, ref);

  }(document));

  var expiryToken = storageService.getLocalData("expiryToken");
  $http.defaults.headers.common['x-access-token'] = expiryToken;

  if(expiryToken) {
    $state.go('main.home');
  }
  else {
    $state.go('main.login');
  }
  

  //Allow only authenticated users
  $rootScope.$on("$stateChangeStart", function(event, next, current){
    if(next.requiresAuth){
      var userAuth = authFactory.getAccessToken();
      var expiryToken = storageService.getLocalData("expiryToken");
      if(!userAuth && !expiryToken){
        event.preventDefault();
        $state.go('main.login');
      }

      if(next.name === "main.home"){
        $rootScope.$broadcast("onTokenVerified");
      }
    }
  });

}]);