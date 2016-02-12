app.factory('CacheFactory', ['$http', function CacheFactory($http) {
    var cache = {peoples: [], comments: []};
		return {
			getPeopleCache: function(id){
                for(var i =0; i<cache.peoples.length; i++){
                    if(cache.peoples[i].id == id) {
                        return  {
                            then: function (callback) { 
                                callback({data: [cache.peoples[i]]});
                            }
                        }
                    }
                }
				return null;
			},
            setPeopleCache: function(obj){
                var newItem = true;
                for(var i =0; i<cache.peoples.length; i++){
                    if(cache.peoples[i].id == obj.id) {
                        newItem = false;
                    }
                }
                if(newItem) cache.peoples.push(obj);
            }
		}
}]);