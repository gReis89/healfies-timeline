app
    .controller('TimelineCtrl', ['$scope', 'NotesFactory', function($scope, NotesFactory){
        //Buscar notas da api
        
        $scope.loading = true;
        NotesFactory.getAll().then(function(resp){
			$scope.notes = resp.data;
            $scope.loading = false;
		});;
}]);