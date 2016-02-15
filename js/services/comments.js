app.factory('CommentsFactory', ['$http', function CommentsFactory($http) {
    var api = 'https://sheetsu.com/apis/v1.0/6b76822e';
    var comments = [];
		return {
			getAllFromApi: function(){
				return $http({method: 'GET', url: api});
			},
			getByIdFromApi: function(id){
				return $http({method: 'GET', url: api + '/id/' + id});
			},
            getByPostFromApi: function(id){
				return $http({method: 'GET', url: api + '/post/' + id});
			},
            getById: function(id){
				if(comments.length){
                    for(var i = 0; i<comments.length; i++){
                        if(comments[i].id == id){
                            return comments[i];
                        }
                    }
                }
                return null;
			},
            getByPost: function(post){
                var commentOnPost = [];
                for(var i = 0; i<comments.length; i++){
                    if(comments[i].post == post){
                        commentOnPost.push(comments[i]);
                    }
                }
                return commentOnPost;
            },
            setComments: function(list){
                comments = list;
            },
            getNextId: function(){
                if(comments.length){
                    var higher = 0;
                    for(var i = 0; i<comments.length; i++){
                        if(comments[i].id > higher){
                            higher = parseFloat(comments[i].id,10);
                        }
                    }
                    return higher+1;
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
            refresh: function(callback, post){
                var $this = this;
                this.getAllFromApi().then(function(resp){
                    comments = resp.data;
                    callback($this.getByPost(post));
                });
            }
		}
}]);
