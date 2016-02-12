app
    .directive("timelineNotes", ['PeoplesFactory', function(PeoplesFactory){
    return {
        restrict: 'E',
        templateUrl: 'js/directives/tpl/notes.html',
        link: function($scope, elem, attrs){
            $scope.people = PeoplesFactory.getById($scope.note.owner);
        }
    }
}]);