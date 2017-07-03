angular.isUndefinedOrNull = function (obj) {
    return angular.isUndefined(obj) || obj === null;
};

angular.isUndefinedOrNullOrEmpty = function (obj) {
    return angular.isUndefined(obj) || obj === null || obj.length === 0 || typeof obj === 'object' && Object.keys(obj).length === 0;
};

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};

angular.deepEquals = function (obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2) 
};

