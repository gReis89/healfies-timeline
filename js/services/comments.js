app.factory('CommentsFactory', ['$http', function CommentsFactory($http) {
    var api = 'https://sheetsu.com/apis/v1.0/6b76822e';
		return {
			getAll: function(){
				return $http({method: 'GET', url: api});
			},
			getById: function(id){
				return $http({method: 'GET', url: api + '/id/' + id});
			},
            create: function(obj){
				return $http({method: 'POST', url: api, data: obj});
			},
			delete: function(id){
				return $http({method: 'DELETE', url: api + '/id/' + id});
			},
			update: function(id, obj){
				return $http({method: 'PUT', url: api + '/id/' + id, data: obj});
			}
		}
}]);