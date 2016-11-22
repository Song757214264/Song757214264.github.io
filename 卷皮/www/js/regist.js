
var app = angular.module("myRegist",[]);

app.controller("ctrl",["$scope","$http",function($scope,$http){
	
	$scope.submit = function(){
		resgistObj = {
			tel:$scope.myForm.tel.$modelValue,
			psw:$scope.myForm.psw.$modelValue
		}
		
		$http.post("/regist",resgistObj)
		.then(function(resData){
			if(resData.data.err==0){
				alert(resData.data.msg);
				location.href = "login.html";
			}else if(resData.data.err==1){
				alert(resData.data.msg);
			}
		});
		
	}
	
}]);
