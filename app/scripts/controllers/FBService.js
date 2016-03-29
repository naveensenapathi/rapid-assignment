'use strict';

/**
 * @ngdoc function
 * @name rapidAssignmentApp.controller:facebookService
 * @description
 * # facebookService
 * Controller of the rapidAssignmentApp
 */

/*
Use this factory for Facebook service
*/
angular.module('rapidAssignmentApp')
    .service('facebookService', ['$q', '$http', 'globals', 'storageService', function($q, $http, globals, storageService) {
        var app_id = "246272682383473";
        this.posts = [];
        this.userDetails = {
            expiresIn: null,
            userID: null
        };

        this.getUserFeed = function(query) {
            !query ? query = "rapidbizapps" : "";
            return $http.get(globals.url + ":" + globals.port + "/fbservice/search/" + query + "/" + app_id);
        };

        this.getLoginStatus = function() {
            var deferred = $q.defer();
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    console.log('Logged in.');
                    deferred.resolve(response);
                } else {
                    deferred.reject('Not logged in');
                }
            });
            return deferred.promise;
        };

        this.loginFB = function() {
            var deferred = $q.defer();
            FB.login(function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        };

        this.setPagePosts = function(posts) {
            this.posts = posts;
        };

        this.getPagePosts = function() {
            return this.posts;
        }

        this.setUserDetails = function(user) {
            this.userDetails.expiresIn = user.expiresIn;
            this.userDetails.userID = user.userID;
        }

        this.getUserDetails = function(user) {
            return this.userDetails;
        }
    }]);
