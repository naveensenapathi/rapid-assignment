'use strict';

/**
 * @ngdoc function
 * @name rapidAssignmentApp.controller:HomeCtrl
 * @description
 * # MainCtrl
 * Controller of the rapidAssignmentApp
 */
angular.module('rapidAssignmentApp')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$state', '$window', 'facebookService', 'feedService', 'userService', 'storageService', function($rootScope, $scope, $state, $window, facebookService, feedService, userService, storageService) {
        $scope.searchQuery = "rapidbizapps";
        $scope.savedSearchQuery = {
            query: "",
            limit: 5
        };
        $scope.posts = facebookService.getPagePosts();
        $scope.savedPosts = feedService.getSavedPosts();
        $rootScope.$on("setSocialFeed", function(args) {
            $scope.setFeed();
            $scope.searchSavedPosts();
        });

        $scope.getUserFeed = function() {
            facebookService.getUserFeed().then(function(response) {
                $scope.posts = response.data.data;
                $scope.searchSavedPosts();
            }, function(err) {
                console.log(JSON.stringify(err));
            });
        };

        $scope.searchPosts = function() {
            facebookService.getUserFeed($scope.searchQuery).then(function(response) {
                $scope.posts = response.data.data;
                facebookService.setPagePosts($scope.posts);
                console.log($scope.posts);
                $scope.setFeed();
            }, function(err) {
                console.log(JSON.stringify(err));
            });
        }

        $scope.setFeed = function() {
            $scope.posts = facebookService.getPagePosts();
            console.log("Home - Posts");
            console.log($scope.posts);
        }

        $scope.saveFeed = function() {
            var fbuser = facebookService.getUserDetails();
            var user = userService.getUserDetails();
            var id = fbuser.userID || user.username;
            feedService.saveFeed($scope.posts, id).then(function(response) {
                console.log("Saved posts successfully");
                $scope.searchSavedPosts();
            }, function(err) {
                console.log("Failed saving posts" + err);
            });
        }

        $scope.searchSavedPosts = function() {
            var fbuser = facebookService.getUserDetails();
            var user = userService.getUserDetails();
            var id = fbuser.userID || user.username;
            feedService.getSavedFeed($scope.savedSearchQuery, id).then(function(response) {
                $scope.savedPosts = response.data;
                feedService.setSavedPosts($scope.savedPosts);
                $scope.setSavedFeed();
                console.log(response.data);
            }, function(err) {
                console.log("Failed getting posts" + JSON.stringify(err));
            });
        }

        $scope.setSavedFeed = function() {
            $scope.savedPosts = feedService.getSavedPosts();
        }

        $scope.clearSearch = function() {
            $scope.savedSearchQuery.query = "";
            $scope.searchSavedPosts();
        }

        $scope.logout = function() {
            storageService.removeLocalData("expiryToken");
            storageService.removeLocalData("facebookID");
            storageService.removeLocalData("username");
            storageService.removeLocalData("userID");
            storageService.removeLocalData("expiresIn");
            $state.go('main.login');
            $window.location.reload();
        }

        $scope.getUserFeed();
    }]);
