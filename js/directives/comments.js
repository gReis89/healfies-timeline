app
    .directive("comments", ['PeoplesFactory','CommentsFactory', '$mdToast', function(PeoplesFactory,CommentsFactory, $mdToast){
    return {
        restrict: 'E',
        templateUrl: 'js/directives/tpl/comments.html',
        link: function($scope, elem, attrs){
            //Passando os comentarios para o template
            $scope.comments = CommentsFactory.getByPost($scope.note.id);
            $scope.loadingComment = false;
            
            //buscando a pessoa do comentario e adicionando ao objeto
            function addPeopleToScope(){
                if($scope.comments != undefined && $scope.comments.length){
                    angular.forEach($scope.comments, function(comment, i){
                        comment.people = PeoplesFactory.getById(comment.created_by);
                    });
                }
            }
            addPeopleToScope();
            
            //Método responsável por adicionar novos comentários
            $scope.addComment = function(event){
                if($scope.note.newComment != undefined && $scope.note.newComment.length){
                    $scope.loadingComment = true;
                    var newComment = { 
                        id: CommentsFactory.getNextId(),
                        post: $scope.note.id,
                        content: $scope.note.newComment,
                        created_by: $scope.loggedUser.id,
                        created_at: formattedDate(new Date())
                    }
                    $scope.note.newComment = '';
                    CommentsFactory.create(newComment).then(function(resp){
                        //Recarregar comentários da nota
                        CommentsFactory.refresh(function(list){
                            $scope.comments = list;
                            addPeopleToScope();
                            $scope.loadingComment = false;
                            Alert('Comment successfully posted!', $mdToast);
                        }, $scope.note.id);
                    });
                } else {
                    Alert('Your comment is empty!', $mdToast);
                }
            }
            
            //Método responsável por excluir comentários
            $scope.deleteComment = function(id){
                $scope.loadingComment = true
                CommentsFactory.delete(id).then(function(){
                    CommentsFactory.refresh(function(list){
                        $scope.comments = list;
                        addPeopleToScope();
                        $scope.loadingComment = false;
                        Alert('Your Comment has been deleted!', $mdToast);
                    }, $scope.note.id);
                });
            }
            
        }
    }
}]);