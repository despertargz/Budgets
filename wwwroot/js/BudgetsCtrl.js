var app = angular.module('Budgets', []);

app.controller('BudgetsCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.budget = "default";
    $scope.name = "its working!";

    $scope.$watch("transactions", function (val) {
        console.log("Transactions updated!");
        $("#newName").focus();
    });

    $scope.getTransactions = function() {
        $http.get("/budgets/" + $scope.budget)
            .then(function (r) {
                $scope.transactions = r.data.transactions;
                $scope.left = r.data.left;
            });
    };

    $scope.getClass = function (amount) {
        return amount < 0 ? "neg" : "pos";
    };

    $scope.addTransaction = function () {
        console.log($scope.newAmount + "__" + $scope.newName + " -- " + $scope.newCategory);

        $http.post("/budgets/" + $scope.budget, {
            Amount: $scope.newAmount,
            Name: $scope.newName,
            Category: $scope.newCategory
        }).then(function () {
            $scope.getTransactions();
        });

        $scope.newAmount = null;
        $scope.newName = null;
        $scope.newCategory = null;
    };

    $scope.editable = function(transaction, isEditable, e) {
        transaction.showEdit = isEditable;
        //$(e.target).focus();
    }

    $scope.getTransactions();
}]);

app.directive('myFocus', ['$timeout', function ($timeout) {
    return {
        link: function (scope, element) {
            element.on('click', function () {
                element.find('input').focus();
            });
        }
    };
}]);