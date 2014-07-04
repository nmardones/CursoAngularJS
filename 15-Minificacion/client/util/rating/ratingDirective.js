angular.module('util-Rating', [])
    .directive('myRating', function () {
        return {
            restrict: 'A',
            templateUrl: '/util/rating/starsTemplate.html' ,
            scope: {
                valor: '=',
                max: '=',
                readonly: '@'
            },
            link: function (scope, elem, attrs) {
                var actualizar = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            marcada: i < scope.valor
                        });
                    }
                };

                scope.toggle = function (index) {
                    if (scope.readonly && scope.readonly === 'true') {
                        return;
                    }
                    scope.valor = index + 1;
                    actualizar();                  
                };
                actualizar();
            }
        }
    });