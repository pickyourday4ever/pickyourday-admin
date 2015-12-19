var adminController = {};
var adminFactory = {};
var adminFilter = {};
var adminDirective = {};

var app = angular.module('myAdmin', ['ui.router', "ngResource", 'ui.bootstrap', 'contenteditable'])
.controller(adminController)
.factory(adminFactory)
.filter(adminFilter)
.directive(adminDirective)

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {


    $stateProvider
        .state("login", {
        url: "/login",
        onEnter: function ($rootScope) {
            if (getJSONLocal("user")) {

                $rootScope.go("app");
            }
        },
        templateUrl: 'app/login/main.html',
        controller: 'LoginCtrl'

    })
        .state("app", {
        url: '/',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        templateUrl: 'app/main.html',
        controller: 'TabCtrl'
    })
        .state("app.categories", {
        url: "categories",
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {
                $rootScope.go("login");
            }
        },
        views: {
            'categories': {
                templateUrl: 'app/categories/main.html',
                controller:"CategoriesCtrl"
            }
        }
    })
        .state("services", {
        url: "services",
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {
                $rootScope.go("login");
            }
        },
        views: {
            'services': {
                templateUrl: 'app/services/main.html',
                controller:""
            }
        }
    })
        .state("app.customers", {
        url: "customers",
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {
                $rootScope.go("login");
            }
        },
        views: {
            'customers': {
                templateUrl: 'app/customers/main.html',
                controller:""
            }
        }
    })
        .state("app.companies", {
        url: "companies",
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {
                $rootScope.go("login");
            }
        },
        views: {
            'companies': {
                templateUrl: 'app/companies/main.html',
                controller:""
            }
        }
    })
        .state("app.picks", {
        url: "picks",
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {
                $rootScope.go("login");
            }
        },
        views: {
            'picks': {
                templateUrl: 'app/picks/main.html',
                controller:""
            }
        }
    })






    $urlRouterProvider.otherwise("/login");
    $httpProvider.interceptors.push('AuthInterceptor');

})

.run(function ($rootScope, $state) {

    $rootScope.go = function (state, params) {
        $state.go(state, params);
    };

    $rootScope.success=function(message){
        notie.alert(1, message, 1.5);
    };

    $rootScope.error=function(message){
        notie.alert(3, message, 2.5);
    };

    $rootScope.warning=function(message){
        notie.alert(2, message, 2);
    };

    $rootScope.confirm=function(message, cb){
        notie.confirm(message, 'Yes', 'Cancel', function() {
            cb();
        });
    };

    $rootScope.input=function(message, type, placeholder, cb){
        notie.input(message, 'Submit', 'Cancel', type, placeholder, cb);
    };











});
