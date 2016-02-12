app
    .directive("timelineNotes", ['PeoplesFactory','CacheFactory', function(PeoplesFactory,CacheFactory){
    return {
        restrict: 'E',
        templateUrl: 'js/directives/tpl/notes.html',
        link: function($scope, elem, attrs){
            $scope.loadingPeople = true;
            PeoplesFactory.getById($scope.note.owner).then(function(resp){
                $scope.people = resp.data[0];
                CacheFactory.setPeopleCache($scope.people);
                $scope.loadingPeople = false;
            });
        }
    }
}]);