app.factory('NotesFactory', ['$http', function NotesFactory($http) {
    var api = 'https://sheetsu.com/apis/v1.0/90e15674';
    var notes = [];
		return {
			getAllFromApi: function(){
				return $http({method: 'GET', url: api});
			},
			getByIdFromApi: function(id){
				return $http({method: 'GET', url: api + '/id/' + id});
			},
            getAll: function(){
				return notes;
			},
            getById: function(id){
                if(notes.length){
                    for(var i = 0; i<notes.length; i++){
                        if(notes[i].id == id){
                            return notes[i];
                        }
                    }
                }
                return null;
            },
            setNotes: function(list){
                notes = list;
            },
            getNextId: function(){
                if(notes.length){
                    var higher = 0;
                    for(var i = 0; i<notes.length; i++){
                        if(notes[i].id > higher){
                            higher = notes[i].id;
                        }
                    }
                    return parseFloat(higher,10)+1;
                }
                return 1;
            },
            create: function(obj){
				return $http({method: 'POST', url: api, data: obj});
			},
			delete: function(id){
				return $http({method: 'DELETE', url: api + '/id/' + id});
			},
			update: function(id, obj){
				return $http({method: 'PUT', url: api + '/id/' + id, data: obj});
			},
            refresh: function(callback){
                this.getAllFromApi().then(function(resp){
                    notes = resp.data;
                    callback(notes);
                });
            }
		}
}]);