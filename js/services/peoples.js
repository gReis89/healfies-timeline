app.factory('PeoplesFactory', ['$http', function PeoplesFactory($http) {
    var api = 'https://sheetsu.com/apis/v1.0/652c7bb7';
		return {
			getAll: function(){
				return $http({method: 'GET', url: api});
			},
			getById: function(id){
				return $http({method: 'GET', url: api +'/id/' + id});
			}
		}
}]);