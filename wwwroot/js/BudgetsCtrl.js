var app = angular.module('Budgets', []);

app.controller('BudgetsCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.budget = "default";
    $scope.name = "its working!";

    $http.get("/budgets/" + $scope.budget)
        .then(function (r) {
            $scope.transactions = r.data.transactions;
            $scope.left = r.data.left;
        });

    $scope.getClass = function (amount) {
        return amount < 0 ? "neg" : "pos";
    }


}]);