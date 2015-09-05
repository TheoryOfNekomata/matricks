(function(alert, _, undefined) {
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

            _checkForSquare = function(matrix) {
                var _width = _getWidth(matrix);
                var _height = matrix.length;

                return _width === _height
            },

            _checkForZero = function(matrix) {
                var _width = _getWidth(matrix);
                var _height = matrix.length;

                var i, j;

                for(i = 0; i < _height; i++) {
                    for(j = 0; j < _width; j++) {
                        if(matrix[i][j] !== 0) {
                            return false;
                        }
                    }
                }
                return true;
            },

            _checkForDiagonal = function(matrix) {
                if(!_checkForSquare(matrix)) {
                    return false;
                }

                var _size = matrix.length;
                var i, j;

                for(i = 0; i < _size; i++) {
                    for(j = 0; j < _size; j++) {
                        if(i !== j && matrix[i][j] !== 0) {
                            return false;
                        }
                    }
                }

                return true;
            },

            _checkForScalar = function(matrix, scalarValue) {
                if(!_checkForDiagonal(matrix)) {
                    return false;
                }

                var _size = matrix.length;
                var i, j;
                var _scalarValue;

                _scalarValue = scalarValue || (!!matrix[0] ? matrix[0][0] : 0);

                for(i = 0; i < _size; i++) {
                    for(j = 0; j < _size; j++) {
                        if(i === j && matrix[i][j] !== _scalarValue ||
                            i !== j && matrix[i][j] !== 0) {
                            return false;
                        }
                    }
                }

                return true;
            },

            _checkForIdentity = function(matrix) {
                return _checkForScalar(matrix, 1);
            },

            _checkForLowerTri = function(matrix) {
                if(!_checkForSquare(matrix)) {
                    return false;
                }

                var _size = matrix.length;
                var i, j;

                for(i = 0; i < _size; i++) {
                    for(j = 0; j < _size; j++) {
                        if(i < j && matrix[i][j] !== 0 ||
                            i >= j && matrix[i][j] === 0) {
                            return false;
                        }
                    }
                }
                return true;
            },

            _checkForUpperTri = function(matrix) {
                if(!_checkForSquare(matrix)) {
                    return false;
                }

                var _size = matrix.length;
                var i, j;

                for(i = 0; i < _size; i++) {
                    for(j = 0; j < _size; j++) {
                        if(i > j && matrix[i][j] !== 0 ||
                            i <= j && matrix[i][j] === 0) {
                            return false;
                        }
                    }
                }
                return true;
            },

            _checkForSymmetric = function(matrix) {
                if(!_checkForSquare(matrix)) {
                    return false;
                }

                var _size = matrix.length;
                var i, j;

                for(i = 0; i < _size; i++) {
                    for(j = 0; j < _size; j++) {
                        if(i === j && matrix[i][j] !== matrix[j][i]) {
                            return false;
                        }
                    }
                }

                return true;
            },

            _checkForSkewSymmetric = function(matrix) {
                if(!_checkForSquare(matrix)) {
                    return false;
                }

                var _size = matrix.length;
                var i, j;

                for(i = 0; i < _size; i++) {
                    for(j = 0; j < _size; j++) {
                        if(i === j && matrix[i][j] !== -(matrix[j][i])) {
                            return false;
                        }
                    }
                }

                return true;
            },

            _getTranspose = function(matrix) {
                var _transpose = [];

                var _width = _getWidth(matrix);
                var _height = matrix.length;

                var i, j;

                for(i = 0; i < _width; i++) {
                    _transpose[i] = [];
                    for(j = 0; j < _height; j++) {
                        _transpose[i][j] = matrix[j][i];
                    }
                }

                return _transpose;
            };

        ctrl.parseMatrix = function() {
            ctrl.matrix.rep = _parseMatrix(ctrl.matrix.rawData);
        };

        ctrl.getOutput = function() {
            try {
                var _matrix = ctrl.matrix.rep;

                if(_.flattenDeep(_matrix).length < 1) {
                    throw new Error();
                }

                var _output = {
                    width: _getWidth(_matrix),
                    height: _matrix.length
                };

                _output['if'] = {
                    'Zero': _checkForZero(_matrix),
                    'Square': _checkForSquare(_matrix),
                    'Diagonal': _checkForDiagonal(_matrix),
                    'Scalar': _checkForScalar(_matrix),
                    'Identity': _checkForIdentity(_matrix),
                    'Lower Triangular': _checkForLowerTri(_matrix),
                    'Upper Triangular': _checkForUpperTri(_matrix),
                    'Symmetric': _checkForSymmetric(_matrix),
                    'Skew-symmetric': _checkForSkewSymmetric(_matrix)
                };

                _output.transpose = _getTranspose(_matrix);

                ctrl.output = _output;
            } catch(e) {
                alert('Invalid input!');
            }
        };

        ctrl.clearOutput = function() {
            ctrl.output = undefined;
        };
    };

    MainCtrl.$inject = [];

    angular.module('matrix.determine.controllers')
        .controller('MainCtrl', MainCtrl);
})(window.alert, _);
