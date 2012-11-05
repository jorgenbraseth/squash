angular.module('squash', ['mongolab']).
        config(function($routeProvider) {
    $routeProvider.
            when('/', {controller:GameCtrl}).
            otherwise({redirectTo:'/'});
});

function GameCtrl($scope, Game) {

    $scope.addGame = function() {
        var newGame = new Game( {"spiller1":$scope.nyspiller1, "spiller2":$scope.nyspiller2, "poengspiller1":$scope.poengspiller1, "poengspiller2":$scope.poengspiller2} );
        newGame.$save();
        $scope.updateList();

        $scope.nyspiller1 = "";
        $scope.nyspiller2 = "";
        $scope.poengspiller1 = "";
        $scope.poengspiller2 = "";

    };

    $scope.deleteGame = function(id) {
        Game.destroy({"id": id}, $scope.updateList);
    }

    $scope.clearGames = function() {
        $scope.games.map(function(g){
            g.destroy($scope.updateList);
        });
    }

    $scope.updateList = function() {
        var games = Game.query(function(data){
            $scope.games = games;
            $scope.updateScores();
        });


    }

    $scope.updateScores = function() {
        var scores = {};
        var games = Game.query(function(){
            games.map(function(game){
                var winnerName = $scope.winnerName(game);
                if(!scores[winnerName]){
                    scores[winnerName] = 0;
                }
                scores[winnerName] += 1;
            });
        });
       $scope.players = scores;
    }

    $scope.winnerName = function(game){
        if(game.poengspiller1 > game.poengspiller2){
            return game.spiller1;
        }else if (game.poengspiller2 > game.poengspiller1){
            return game.spiller2;
        }else{
            return "";
        }
    }



    $scope.updateList();
}



