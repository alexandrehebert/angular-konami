// angular-konami 0.3
// https://github.com/alexandrehebert/angular-konami
// based on https://github.com/dos1/angular-konami
// based on https://gist.github.com/benajnim/5238495
angular.module('konami', []).directive("konami", ['$document', function ($document) {

    function link(scope, element, attrs) {

        var konamiKeys = !angular.isUndefined(attrs.keys)
            ? attrs.keys : [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        var konamIndex = 0;

        var handler = function (event) {
            var keyCode = event.keyCode ? event.keyCode : event.which;
            if (keyCode === konamiKeys[konamIndex++]) {
                if (konamIndex === konamiKeys.length) {
                    scope.$apply(scope.konami);
                }
            } else {
                konamIndex = 0;
            }
        };

        $document.on('keydown', handler);

        scope.$on('$destroy', function () {
            $document.off('keydown', handler);
        });

    }

    return {
        restrict: 'A',
        scope: {
            konami: '&'
        },
        link: link
    };

}]);
