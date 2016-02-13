app
    .directive("timelineNotes", ['PeoplesFactory', function(PeoplesFactory){
    return {
        restrict: 'E',
        templateUrl: 'js/directives/tpl/notes.html',
        link: function($scope, elem, attrs){
            $scope.people = PeoplesFactory.getById($scope.note.owner);
            if($scope.note.files.length){
                $scope.noteFiles = $scope.note.files.split(',');
            } else {
                $scope.noteFiles = [];
            }
            
            $scope.noteShares = [];
            if($scope.note.shares.length){
                var sharesId = $scope.note.shares.split(',');
                for(var i = 0; i<sharesId.length; i++){
                    $scope.noteShares.push(PeoplesFactory.getById(sharesId[i]));
                }
            }
            
            if($scope.note.folders.length){
                $scope.noteFolders = $scope.note.folders.split(',');
            } else {
                $scope.noteFolders = [];
            }
            
        }
    }
}]);