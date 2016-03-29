'use strict';

/**
 * @ngdoc function
 * @name rapidAssignmentApp.controller:storageService
 * @description
 * # storageService
 * Controller of the rapidAssignmentApp
 */

/*
Use this factory for storage
*/
angular.module('rapidAssignmentApp')
    .service('storageService', [function() {

        this.saveLocalData = function(key, data) {
            localStorage.setItem(key, data);
        };

        this.getLocalData = function(key) {
            return localStorage.getItem(key);
        };

        this.removeLocalData = function(key) {
            localStorage.removeItem(key);
        }
    }]);
