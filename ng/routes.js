angular.module('app')
.config(function ($routeProvider) {
	$routeProvider
	.when('/list', { controller:'ListCtrl', templateUrl: 'list.html'})

})