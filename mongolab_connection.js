// This is a module for cloud persistance in mongolab - https://mongolab.com
angular.module('mongolab', ['ngResource']).
    factory('Game', function($resource) {
      var Game = $resource('https://api.mongolab.com/api/1/databases' +
          '/squash/collections/games/:id',
          { apiKey: '50884517e4b027180ea4dc54' }, {
            destroy: { method: 'DELETE' }
          }
      );

      Game.prototype.destroy = function(cb) {
        return Game.remove({id: this._id.$oid}, cb);
      };

      return Game;
    });/**
 * Created by IntelliJ IDEA.
 * User: Eier
 * Date: 24.10.12
 * Time: 21:53
 * To change this template use File | Settings | File Templates.
 */
