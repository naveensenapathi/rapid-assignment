'use strict';

/**
 * @ngdoc function
 * @name rapidAssignmentApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the rapidAssignmentApp
 */
angular.module('rapidAssignmentApp')
    .controller('SignupCtrl', ['$scope', 'userService', function($scope, userService) {
        $scope.signUpDetails = {
            username: null,
            email: null,
            password: null
        }

        $scope.successMessage = "";
        $scope.signup = function() {
            userService.signup(this.signUpDetails).then(function(response) {
                console.log(response.data);
                $scope.successMessage = response.data.message;
            }, function(err) {
                console.log("Failed creating user:" + JSON.stringify(err));
            });
        }
    }]);
