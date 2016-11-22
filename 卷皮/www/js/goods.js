var app = angular.module("goods",[]);

app.controller("ctrl",["$scope","$http",function($scope,$http){
	
	$scope.numbe = 1;
	$scope.add = function(){
		$scope.numbe++;
	}
	$scope.minus = function(){
		$scope.numbe--;
		if($scope.numbe<1){
			$scope.numbe=1;
		}
	}
	
	var str = JSON.parse($.cookie("goods").substring(2));
	$scope.goodsObj = str;
	
}]);
