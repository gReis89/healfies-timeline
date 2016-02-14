app
    .controller('TimelineCtrl', ['$scope', 'NotesFactory', 'PeoplesFactory', 'CommentsFactory', '$interval',
                                 function($scope, NotesFactory, PeoplesFactory, CommentsFactory, $interval){
        //Iniciando loader
        var apiLoaded = 0;
        $scope.loading = true;
                                     
        //Buscar notas da api
        NotesFactory.getAllFromApi().then(function(resp){
			NotesFactory.setNotes(resp.data);
            apiLoaded++;
		});
        
        //Buscar pessoas da api
        PeoplesFactory.getAllFromApi().then(function(resp){
            PeoplesFactory.setPeoples(resp.data);
            $scope.listOfPeoples = resp.data;
            apiLoaded++;
        });
        
        
        //Iniciando thread para verificar o carregamento de todos os dados
        var requestedComments = false;
        var interval = $interval(function(){
            //Devido a limitacoes da api, será necessário buscar os comentários após o retorno das outras chamadas
            if(apiLoaded == 2 && !requestedComments){
                requestedComments = true; 
                CommentsFactory.getAllFromApi().then(function(resp){
                    CommentsFactory.setComments(resp.data);
                    apiLoaded++;
                });
            }
            //Inicia a aplicação quando todos os dados forem baixados da api
            if(apiLoaded == 3){
                $scope.loading = false;
                $scope.notes = NotesFactory.getAll();
                $interval.cancel(interval);
                $scope.loggedUser = PeoplesFactory.getById(Math.floor(Math.random()*(3-1+1)+1));
            }
            console.log('checando download...');
        }, 500);
        
}]);