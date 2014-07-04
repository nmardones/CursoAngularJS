(function () {
    angular.module('util-Filtros', [])
        .filter('limpiarURL', function () {
            return function (input) {
                if (input) {
                    var resultado = input.toLowerCase();
                    var patron = /[^-A-Za-z0-9]+/g;
                    return resultado.replace(patron, '-');
                };
            }
        })
        .filter('recortar', function () {
            return function (input, long) {
                if (!long) {
                    long = 10
                }
                if (!input) {
                    return ''
                }
                if (input.length <= long) {
                    return input
                } else {
                    return input.substring(0, long) + '...'
                }
            }
        }).filter('importantes', function () {
            return function (data, valorCorte) {
                if (valorCorte) {
                    var filtrados = [];
                    for (var i = 0; i < data.length; i++) {
                        var mov = data[i];
                        if (mov.importe >= valorCorte) {
                            filtrados.push(mov);
                        }
                    }
                    return filtrados;
                } else {
                    return data;
                }

            }
        });
}());