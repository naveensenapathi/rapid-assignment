'use strict';

/**
 * @ngdoc function
 * @name rapidAssignmentApp.controller:feedService
 * @description
 * # feedService
 * Controller of the rapidAssignmentApp
 */

/*
Use this factory for Facebook service
*/
angular.module('rapidAssignmentApp')
    .service('feedService', ['$http', 'globals', function($http, globals) {
        this.posts = [];
        this.saveFeed = function(posts, id) {
            return $http({
                method: 'POST',
                url: globals.url + ":" + globals.port + '/feedservice/savefeed',
                params: {
                    "userID": id
                },
                data: posts
            });
        };

        this.getSavedFeed = function(feedQuery, id) {
            return $http({
                method: 'GET',
                url: globals.url + ":" + globals.port + '/feedservice/getfeed',
                params: {
                    "query": feedQuery.query,
                    "limit": feedQuery.limit,
                    "userID": id
                }
            });
        }

        this.setSavedPosts = function(posts) {
            this.posts = posts;
        }

        this.getSavedPosts = function() {
            return this.posts;
        }
    }]);
