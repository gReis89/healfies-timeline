app
    .directive("timelineHeader", function(){
    return {
        restrict: 'E',
        template: '<header class="mdl-layout__header"><div class="mdl-layout__header-row"><a href="">'
            +   '<img src="https://healfies.com/assets/img/logo.png">'
            +   '</a></div></header>'
    }
});