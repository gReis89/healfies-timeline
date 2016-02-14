app
    .directive("writeNote",['$mdDialog', 'NotesFactory', '$mdToast', function($mdDialog, NotesFactory, $mdToast){
    return {
        restrict: 'E',
        templateUrl: 'js/directives/tpl/write-note.html',
        link: function($scope, elem, attrs){
            $scope.showDialog = function($event){
                $mdDialog.show({
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: 'js/directives/tpl/write-note-dialog.html',
                    controller: function($scope, $mdDialog){
                        $scope.newNote = {};
                        
                        
                        var self = $scope;
                        self.querySearch = querySearch;
                        self.allContacts = $scope.listOfPeoples;
                        self.contacts = [self.allContacts[0]];
                        self.filterSelected = true;
                        self.foldersList = [];
                        
                        $scope.closeDialog = function() {
                          $mdDialog.hide();
                        }
                        
                        function querySearch (query) {
                          var results = query ?
                              self.allContacts.filter(createFilterFor(query)) : [];
                          return results;
                        }
                        
                        function createFilterFor(query) {
                          var lowercaseQuery = angular.lowercase(query);
                          return function filterFn(contact) {
                            return (angular.lowercase(contact.name).indexOf(lowercaseQuery) != -1);
                          };
                        }
                        
                        $scope.saveNote = function(){
                            $scope.loading = true;
                            $scope.newNote.id = NotesFactory.getNextId();
                            $scope.newNote.owner = $scope.loggedUser.id;
                            $scope.newNote.post_time = formattedDate(new Date());
                            $scope.newNote.shares = ''
                            if(self.contacts.length){
                                for(var i = 0; i< self.contacts.length; i++){
                                    if(i == self.contacts.length-1){
                                        $scope.newNote.shares += self.contacts[i].id;
                                    } else {
                                        $scope.newNote.shares += self.contacts[i].id + ',';
                                    }
                                }
                            }
                            if(self.foldersList.length){
                                $scope.newNote.folders = '';
                                for(var i = 0; i< self.foldersList.length; i++){
                                    if(i == self.foldersList.length-1){
                                        $scope.newNote.folders += self.foldersList[i];
                                    } else {
                                        $scope.newNote.folders += self.foldersList[i] + ',';
                                    }
                                }
                            }
                            
                            NotesFactory.create($scope.newNote).then(function(resp){
                                $scope.closeDialog();
                                NotesFactory.refresh(function(list){
                                    $scope.notes = list;
                                    $scope.loading = false;
                                    Alert('Note saved successfully.', $mdToast);
                                });
                            });
                        }
                        
                    }
                });
            }
        }
    }
}]);