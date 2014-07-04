(function () {
    angular.module('util-Directivas', [])
        .directive('cabecera', function () {
            return {
                restrict: 'AE',
                replace: 'true',
                template: '<span><h1>Controla tu Cash Flow</h1><p class="lead">Comprueba de dónde viene y a dónde va tu dinero.</p></span>'
            };
        }).directive('cabeceraUrl', function () {
            return {
                restrict: 'AE',
                replace: 'false',
                templateUrl: '/cabeceraUrl.html'
            };
        }).directive('mensaje', function () {
            return {
                restrict: 'E',
                templateUrl: '/mensaje.html',
                replace: true,
                transclude: true
            };
        }).directive('button', function () {
            return {
                restrict: 'E',
                compile: function (element, attributes) {
                    element.addClass('btn');
                    if (attributes.type === 'submit') {
                        element.addClass('btn-primary');
                    }
                    if (attributes.size) {
                        element.addClass('btn-' + attributes.size);
                    }
                }
            };
        }).directive('seleccionado', function () {
            return {
                link: function ($scope, element, attrs) {
                    element.bind('mouseenter', function () {
                        element.css('background-color', 'yellow');
                    });
                    element.bind('mouseleave', function () {
                        element.css('background-color', 'white');
                    });
                }
            };
        }).directive('filaMovimiento', function () {
            return {
                restrict: 'AE',
                replace: 'true',
                templateUrl: '/movimientoTemplate.html',
                scope: {
                    movimiento: "=mov"
                }
            };
        });
}());