'use strict';

/**
 * @ngdoc function
 * @name rapidAssignmentApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rapidAssignmentApp
 */
angular.module('rapidAssignmentApp')
    .controller('LoginCtrl', ['$http', '$rootScope', '$scope', '$state', 'facebookService', 'authFactory', 'userService', 'storageService', function($http, $rootScope, $scope, $state, facebookService, authFactory, userService, storageService) {
        $scope.feed = [];
        $scope.loginDetails = {
            username: null,
            password: null
        };
        $scope.errorMessage = "";

        $scope.loginFacebook = function() {
            //Get login status. If logged in, call Facebook Graph APIs, login otherwise
            facebookService.getLoginStatus()
                .then(function(response) {
                    authFactory.setAccessToken(response.authResponse.accessToken);
                    facebookService.setUserDetails(response.authResponse);
                    $scope.saveUserDetails(response.authResponse);
                    $scope.getAuthToken();
                }, function(error) {
                    //Not logged in. Call FB login function
                    $scope.loginFB();
                });
        };

        $scope.saveUserDetails = function(user) {
            storageService.saveLocalData("facebookID", user.userID);
            storageService.saveLocalData("expiresIn", user.expiresIn);
        };

        $scope.getAuthToken = function() {
            var user = facebookService.getUserDetails();
            userService.getAuthToken(user.userID).then(function(response) {

                storageService.saveLocalData("expiryToken", response.data.token);
                authFactory.setExpiryToken(response.data.token);
                $scope.setCommonHeaders();

                //Already logged in. Call Facebook Graph APIs
                $scope.getUserFeed();
                $state.go('main.home');
            }, function(err) {
                // console.log(JSON.stringify(err));
            });
        };

        $scope.getUserFeed = function() {
            facebookService.getUserFeed().then(function(response) {
                $scope.feed = response.data.data;
                facebookService.setPagePosts(response.data.data);
                console.log($scope.feed);
                //Broadcast the data to HomeCtrl
                $rootScope.$broadcast("setSocialFeed");
            }, function(err) {
                console.log(JSON.stringify(err));
            });
        };

        $scope.loginFB = function() {
            facebookService.loginFB()
                .then(function(response) {
                    authFactory.setAccessToken(response.authResponse.accessToken);
                    facebookService.setUserDetails(response.authResponse);
                    $scope.saveUserDetails(response.authResponse);
                    //Logged in. Call Facebook APIs
                    $state.go('main.home');
                    $scope.getUserFeed();
                }, function(error) {
                    //Login failed
                });
        }

        $scope.login = function() {
            userService.login($scope.loginDetails).then(function(response) {
                // console.log(response.data);
                var user = {};
                userService.setUserDetails(response.data);
                storageService.saveLocalData("expiryToken", response.data.token);
                storageService.saveLocalData("username", response.data.username);
                authFactory.setExpiryToken(response.data.token);
                $scope.setCommonHeaders();
                $state.go('main.home');
            }, function(err) {
                $scope.errorMessage = err.data.message;
                // console.log(JSON.stringify(err));
            });
        }

        $scope.setCommonHeaders = function() {
            $http.defaults.headers.common['x-access-token'] = authFactory.getExpiryToken();
        }

    }]);
