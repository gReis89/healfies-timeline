app
    .directive("comments", ['PeoplesFactory','CommentsFactory', function(PeoplesFactory,CommentsFactory){
    return {
        restrict: 'E',
        templateUrl: 'js/directives/tpl/comments.html',
        link: function($scope, elem, attrs){
            //Passando os comentarios para o template
            $scope.comments = CommentsFactory.getByPost($scope.note.id);
            
            //buscando a pessoa do comentario e adicionando ao objeto
            if($scope.comments != undefined && $scope.comments.length){
                angular.forEach($scope.comments, function(comment, i){
                    comment.people = PeoplesFactory.getById(comment.created_by);
                });
            }
        }
    }
}]);