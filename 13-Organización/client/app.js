var controlCajaApp = angular.module('controlCajaApp', ['ngRoute', 'ngCookies', 'ngResource','util-Filtros','util-Directivas', 'util-Rating']);

controlCajaApp.constant("cfg",{maestrosLocal:false});

controlCajaApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'ControlCajaCtrl',
                controllerAs: 'controlCaja',
                templateUrl: 'controlcaja/total.html'
            })
            .when('/nuevo', {
                controller: 'ControlCajaCtrl',
                controllerAs: 'controlCaja',
                templateUrl: 'controlcaja/nuevo.html'
            }).when('/ver/:movId', {
                controller: 'VisorCajaCtrl',
                controllerAs: 'visorCaja',
                templateUrl: 'ver/ver.html'
            })
            .when('/lista', {
                controller: 'ControlCajaCtrl',
                controllerAs: 'controlCaja',
                templateUrl: 'controlcaja/lista.html'
            }).when('/registro', {
                controller: 'RegistroCtrl',
                templateUrl: 'registro/registro.html'
            })
            .otherwise({
                redirectTo: '/'
            });
}]);

controlCajaApp.config(['$httpProvider',
    function ($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$log', '$location', '$cookieStore', '$rootScope',
            function ($q, $log, $location, $cookieStore, $rootScope) {
                return {
                    request: function (request) {
                        $log.info('request:' + request.url);
                        request.headers["sessionId"] = $cookieStore.get("sessionId");
                        return request || $q.when(request);
                    },
                    responseError: function (response) {
                        $log.error("excepción: " + response.status + " de :" + response.config.url);
                        if (response.status === 400) {
                            $rootScope.mensaje = "Culpa mía :-(";
                        } else if (response.status === 401) {
                            $rootScope.mensaje = "No hay derecho!!!";
                            $location.path('registro');
                        } else if (response.status === 419) {
                            $rootScope.mensaje = "Estoy caduco!!!";
                            $cookieStore.remove("sessionId")
                            $location.path('registro');
                        } else if (response.status === 404) {
                            $rootScope.mensaje = "No se ha encontrado algo!!!";
                        } else if (response.status === 500) {
                            $rootScope.mensaje = "El servidor ha fallado :-)";
                        }
                        return $q.reject(response);
                    }
                };
    }]);
}]);