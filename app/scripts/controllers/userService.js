'use strict';

/**
 * @ngdoc function
 * @name rapidAssignmentApp.controller:userService
 * @description
 * # userService
 * Controller of the rapidAssignmentApp
 */

/*
Use this factory for Facebook service
*/
angular.module('rapidAssignmentApp')
    .service('userService', ['$http', 'globals', function($http, globals) {
        this.userDetails = {
            expiryToken: null,
            username: null
        };

        this.signup = function(user) {
            return $http({
                method: 'POST',
                url: globals.url + ":" + globals.port + '/users/create',
                data: user
            });
        };

        this.login = function(user) {
            return $http({
                method: 'POST',
                url: globals.url + ":" + globals.port + '/users/login',
                data: user
            });
        };

        this.getAuthToken = function(userID) {
            return $http({
                method: 'POST',
                url: globals.url + ":" + globals.port + '/users/fb/token',
                data: {
                    facebookID: userID
                }
            });
        };

        this.verifyToken = function(expiryToken) {
            return $http({
                method: 'POST',
                url: globals.url + ":" + globals.port + '/users/verify/token',
                data: {
                    token: expiryToken
                }
            });
        };

        this.setUserDetails = function(user) {
            this.userDetails.expiryToken = user.token;
            this.userDetails.username = user.username;
        };

        this.getUserDetails = function() {
            return this.userDetails;
        };
    }]);
