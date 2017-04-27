angular.isUndefinedOrNull = function(obj){
    return angular.isUndefined(obj) || obj === null;
};

angular.isUndefinedOrNullOrEmpty = function (obj) {
    return angular.isUndefined(obj) || obj === null ||  obj.length === 0 || typeof obj === 'object' && Object.keys(obj).length === 0;
};

angular.showNavBar = function() {
    var noHome = window.location.hash.indexOf("home") < 0,
        isServiceList = window.location.hash.indexOf("servicios/list") > 0,
        isServiceType = window.location.hash.indexOf("servicios/") > 0;

        if(!noHome && !isServiceType){
            return false;
        }

        if(isServiceList){
            return true;
        }

        if(isServiceType) {
            return false;
        }

        return true;
};

angular.showBackSection = function () {
    var isServiceList = window.location.hash.indexOf("servicios/list") > 0,
        isServiceType = window.location.hash.indexOf("servicios/") > 0;

    if (isServiceType) {
        if(isServiceList) { return false; }
        return true;
    }

    return false;
};