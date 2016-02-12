app.factory('PeoplesFactory', ['$http', 'CacheFactory', function PeoplesFactory($http, CacheFactory) {
    var api = 'https://sheetsu.com/apis/v1.0/652c7bb7';
		return {
			getAll: function(){
				return $http({method: 'GET', url: api});
			},
			getById: function(id){
                return CacheFactory.getPeopleCache(id) || $http({method: 'GET', url: api +'/id/' + id});
			}
		}
}]);