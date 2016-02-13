app
    .directive("timelineHeader", function(){
    return {
        restrict: 'E',
        template: '<header class="mdl-layout__header"><div layout="row" class="mdl-layout__header-row">'
            +   '<div flex="50"><a href=""><img src="https://healfies.com/assets/img/logo.png"></a></div>'
            +   '<div flex="50" layout="row" layout-align="end center">{{loggedUser.name}} <img ng-src="{{loggedUser.photo}}" class="md-avatar" /></div>'
            +   '</div></header>'
    }
});