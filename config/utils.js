'use strict';

var path = require('path');

exports.getRootFiles = function (APP_PATH) {
    return [
        path.join(APP_PATH, 'manifest.json'),
        path.join(APP_PATH, 'service-worker.js')
    ];
};
