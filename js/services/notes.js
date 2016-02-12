app.factory('NotesFactory', ['$http', function NotesFactory($http) {
    var api = 'https://sheetsu.com/apis/v1.0/90e15674';
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