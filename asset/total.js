angular.module('app', [
	'ngRoute'])

// LIST 데이터 가져오고 다루는 부분 
angular.module('app') 
.controller('ListCtrl', function($scope, $routeParams, listSvc) {
  $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.types = $routeParams;    
  // create the list of sushi rolls 
  $scope.lists = [
    { name: 'Cali Roll', detail: 'Crab', task: 2 },
    { name: 'Philly', detail: 'Tuna', task: 4 },
    { name: 'Tiger', detail: 'Eel', task: 7 },
    { name: 'Rainbow', detail: 'Variety', task: 6 }
  ];

//   	$scope.dbdata = function () {
 // 	return $http.get('/list/'+ types.type)
//  }
	listSvc.fetch()
	.success(function (data) {
		$scope.dbdata = data;
	})

	
})

angular.module('app')
.service('listSvc', function($http) {
	this.fetch = function() {
        return $http.get('/api/list/os')
    }
})


angular.module('app')
.config(function ($routeProvider) {
	$routeProvider
	.when('/list/:type', { controller:'ListCtrl', templateUrl: 'list.html'})

})
