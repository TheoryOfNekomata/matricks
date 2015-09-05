(function(alert, _, math, undefined) {
    var MainCtrl = function() {
        var ctrl = this;

        ctrl.matrix = {};

        var _getWidth = function(matrix) {
                var _width = 0;

                matrix.forEach(function(row) {
                    if(_width < row.length) {
                        _width = row.length;
                    }
                });

                return _width;
            },

            _padZeroes = function(matrix) {
                var _width = _getWidth(matrix);
                var _height = matrix.length;
                var i, j;

                for(i = 0; i < _height; i++) {
                    for(j = 0; j < _width; j++) {
                        if(!matrix[i][j]) {
                            matrix[i][j] = 0;
                        }
                    }
                }

                return matrix;
            },

            _parseMatrix = function(rawData) {
                var _data = rawData.map(function(line) {
                    return line
                        .replace(/,+/g, " ")
                        .split(' ')
                        .filter(function(col) {
                            return col.trim().length > 0;
                        })
                        .map(function(item) {
                            while(item.length > 0) {
                                var parsed = parseInt(item);
                                if(!isNaN(parsed)) {
                                    return parsed
                                }
                                item = item.substr(1);
                            }

                            return Math.NaN;
                        })
                        .filter(function(item) {
                            return !isNaN(item);
                        });
                });
                return _padZeroes(_data);
            },

            _isAddable = function(matrix1, matrix2) {
                var _isSameWidth = _getWidth(matrix1) === _getWidth(matrix2);
                var _isSameHeight = matrix1.length === matrix2.length;

                return _isSameWidth && _isSameHeight;
            },

            _isMultiplicable = function(matrix1, matrix2) {
                return _getWidth(matrix1) === matrix2.length;
            },

            _add = function(matrix1, matrix2) {
                if(!_isAddable(matrix1, matrix2)) {
                    throw new Error('Cannot add matrices of different sizes.');
                }

                return math.add(matrix1, matrix2);
            },

            _multiply = function(matrix1, matrix2) {
                if(!_isMultiplicable(matrix1, matrix2)) {
                    throw new Error('Matrices cannot be multiplied.');
                }

                return math.multiply(matrix1, matrix2);
            }
            ;

        ctrl.parseMatrix = function() {
            ctrl.matrix1.rep = _parseMatrix(ctrl.matrix1.rawData);
            ctrl.matrix2.rep = _parseMatrix(ctrl.matrix2.rawData);
        };

        ctrl.getProduct = function() {
            try {
                var _matrix1 = ctrl.matrix1.rep;
                var _matrix2 = ctrl.matrix2.rep;

                if(_.flattenDeep(_matrix1).length < 1 || _.flattenDeep(_matrix2).length < 1) {
                    throw new Error('Invalid input!');
                }

                ctrl.output = _multiply(_matrix1, _matrix2);
            } catch(e) {
                alert(e.message);
            }
        };

        ctrl.getSum = function() {
            try {
                var _matrix1 = ctrl.matrix1.rep;
                var _matrix2 = ctrl.matrix2.rep;

                if(_.flattenDeep(_matrix1).length < 1 || _.flattenDeep(_matrix2).length < 1) {
                    throw new Error('Invalid input!');
                }

                ctrl.output = _add(_matrix1, _matrix2);

            } catch(e) {
                alert(e.message);
            }
        };

        ctrl.clearOutput = function() {
            ctrl.output = undefined;
        };
    };

    MainCtrl.$inject = [];

    angular.module('matrix.operate.controllers')
        .controller('MainCtrl', MainCtrl);
})(window.alert, _, math);
