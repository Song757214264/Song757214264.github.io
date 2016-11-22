var app = angular.module("myLogin",[]);

app.controller("ctrl",["$scope","$http",function($scope,$http){
	
	$scope.submit = function(){
		loginObj = {
			tel:$scope.myForm.tel.$modelValue,
			psw:$scope.myForm.psw.$modelValue
		}
		
		$http.post("/login",loginObj)
		.success(function(resData){
			if(resData.err==0){
				alert(resData.msg);
				location.href = "index.html";
			}
		});
	}
	
}]);
