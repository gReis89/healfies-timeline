app.factory('PeoplesFactory', ['$http', function PeoplesFactory($http) {
    var api = 'https://sheetsu.com/apis/v1.0/652c7bb7';
    var peoples = [];
		return {
			getAllFromApi: function(){
				return $http({method: 'GET', url: api});
			},
			getByIdFromApi: function(id){
                return $http({method: 'GET', url: api +'/id/' + id});
			},
            getById: function(id){
                if(peoples.length){
                    for(var i = 0; i<peoples.length; i++){
                        if(peoples[i].id == id){
                            return peoples[i];
                        }
                    }
                }
                return null;
            },
            setPeoples: function(list){
                peoples = list;
            }
        }
}]);