angular.module('Budgets', []).controller('BudgetCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.budget = "default";
        $http.get("/budgets/" + $scope.budget)
            .then(function (r) {
            $scope.transactions = r.data;
        });
    }]);
