//All global variables go here
angular
    .module('rapidAssignmentApp')
    .service('loader', [function() {
        this.loaderProgress = 0;

        this.incrementLoader = function() {
            this.loaderProgress++;
        }

        this.decrementLoader = function() {
            this.loaderProgress--;
        }
    }])
    .constant("globals", {
        "url": "http://localhost",
        "port": "3000"
    });
