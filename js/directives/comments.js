app
    .directive("comments", ['PeoplesFactory','CacheFactory','CommentsFactory', function(PeoplesFactory,CacheFactory,CommentsFactory){
    return {
        restrict: 'E',
        templateUrl: 'js/directives/tpl/comments.html',
        link: function($scope, elem, attrs){
            $scope.loading = true;
            CommentsFactory.getByPost($scope.note.id).then(function(resp){
                $scope.comments = resp.data;
                $scope.loading = false;
            });
            
            
            $scope.loadingPeople = true;
            PeoplesFactory.getById($scope.note.owner).then(function(resp){
                $scope.people = resp.data[0];
                CacheFactory.setPeopleCache($scope.people);
                $scope.loadingPeople = false;
            });

        }
    }
}]);