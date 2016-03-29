'use strict';

/**
 * @ngdoc function
 * @name rapidAssignmentApp.controller:authFactory
 * @description
 * # authFactory
 * Controller of the rapidAssignmentApp
 */

/*
Use this factory for user authentication
*/
angular.module('rapidAssignmentApp')
    .factory('authFactory', function() {
        var authFactory = {};

        authFactory.setAccessToken = function(token) {
            authFactory.token = token;
        };

        authFactory.getAccessToken = function() {
            return authFactory.token;
        };

        authFactory.setExpiryToken = function(token) {
            authFactory.expiryToken = token;
        }

        authFactory.getExpiryToken = function() {
            return authFactory.expiryToken;
        }

        return authFactory;
    });
