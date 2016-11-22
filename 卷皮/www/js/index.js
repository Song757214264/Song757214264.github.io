
var app = angular.module("juanPi",[]);

app.controller("ctrl",["$scope","$interval","carousel","countDown","$http",function($scope,$interval,carousel,countDown,$http){
	$scope.showBlock = function(){
		$("#shopping-bag").css("background-color","white").css("border-right","1px solid #e8e2e8")
		.css("border-bottom","1px solid white");
		$("#hide-login").css("display","block").css("border","1px solid #e8e2e8");
	}
	$scope.hideBlock = function(){
		$("#shopping-bag").css("background-color","").css("border-right","");
		$("#hide-login").css("display","none").css("border","1px solid #e8e2e8");
	}
	
	$scope.peor = function(){
		$("#hide-peo").css("display","block").css("animation","movel 1s linear")
		.css("right","36px");
	}
	$scope.peol = function(){
		$("#hide-peo").css("display","none").css("right","36px");
	}
	
	$scope.heartr = function(){
		$("#hide-heart").css("display","block").css("animation","movel 1s linear")
		.css("right","36px");
	}
	$scope.heartl = function(){
		$("#hide-heart").css("display","none").css("right","36px");
	}
	
	$scope.moneyr = function(){
		$("#hide-money").css("display","block").css("animation","movel 1s linear")
		.css("right","36px");
	}
	$scope.moneyl = function(){
		$("#hide-money").css("display","none").css("right","36px");
	}
	
	$scope.penr = function(){
		$("#hide-pen").css("display","block").css("animation","movel 1s linear")
		.css("right","36px");
	}
	$scope.penl = function(){
		$("#hide-pen").css("display","none").css("right","36px");
	}
	
	$scope.mar = function(){
		$("#hide-ma").css("display","block").css("animation","movel 1s linear")
		.css("right","36px");
	}
	$scope.mal = function(){
		$("#hide-ma").css("display","none").css("right","36px");
	}
	
	$scope.topr = function(){
		$("#hide-top").css("display","block").css("animation","movel 1s linear")
		.css("right","36px");
	}
	$scope.topl = function(){
		$("#hide-top").css("display","none").css("right","36px");
	}
	
	carousel();

	countDown($scope);

	$http.get("shoplist.json")
	.then(function(res){
		$scope.shoplist = res.data;
	});
	
//	console.log($.cookie("token"));
	
	if(!$.cookie("token")){
//		alert("未登录");
	}else{
		$http.post("/check",{token:$.cookie("token")})
		.success(function(resData){
//			console.log(resData.msg.tel);
			$("#user-login").text("");
			$("#user-login").text(resData.msg[0].tel);
		});
	}
	
	$scope.goodsClick = function(){
		console.dir(this.data);

		$http.post("/goods",this.data)
		.success(function(resData){
			if(resData.err==0){
				location.href = "goods.html";
			}
		});
	}
	
	
	
	
}]);

app.factory("carousel",[function(){
	 var abc = function(){
		
		$("#point-box .point")[0].style.backgroundColor = "transparent";
		$("#point-box .point")[0].style.border = "3px solid white";
		
		var currentIndex = 0;
		function changeImg(){
            $("#img-box img").fadeOut(100);
		    $("#point-box .point").css("background-color","white").css("border","");			
            currentIndex++;
            if(currentIndex>4){
            	currentIndex=0;
            };                    
			$($("#point-box .point")[currentIndex]).css("background-color","transparent").css("border","3px solid white");
            $($("#img-box img")[currentIndex]).fadeIn(100);           
            clearTimeout(timer);
            timer = setInterval(changeImg,2000);
		}
		
		
		for(var i=0;i<$("#point-box .point").length;i++){
			$($("#point-box .point")[i]).attr("pindex",i);	
		}
		$("#point-box .point").click(function(e){
			$("#img-box img").fadeOut();
			$("#point-box .point").css("background-color","white").css("border","");
			$($("#img-box img")[$(e.target).attr("pindex")]).fadeIn();
			$(e.target).css("background-color","transparent").css("border","3px solid white");
			currentIndex=$(e.target).attr("pindex");
			clearTimeout(timer);
			timer = setTimeout(changeImg,2000);
		});
		
		$("#left").click(function(e){
			currentIndex--;
			$("#img-box img").fadeOut();
			if(currentIndex<0){
				currentIndex=4
			}
			$("#point-box .point").css("background-color","white").css("border","");
			$($("#img-box img")[currentIndex]).fadeIn();
			$($("#point-box .point")[currentIndex]).css("background-color","transparent").css("border","3px solid white");
			
			clearTimeout(timer);
			timer=setTimeout(changeImg,2000);
		});
		$("#right").click(function(e){
			currentIndex++;
			$("#img-box img").fadeOut();
			if(currentIndex>4){
				currentIndex=0
			}
			$("#point-box .point").css("background-color","white").css("border","");
			$($("#img-box img")[currentIndex]).fadeIn();
			$($("#point-box .point")[currentIndex]).css("background-color","transparent").css("border","3px solid white");
			
			clearTimeout(timer);
			timer=setTimeout(changeImg,2000);
		});
		
		var timer = setInterval(changeImg,2000);	
	}
	return abc;
}]);

app.factory("countDown",["$interval",function($interval){	
	return function($scope){
		$interval(function(){
			var endTime = new Date(2016,11,20,0,0,0);
			var nowTime = new Date();
			var middleTime = endTime.getTime() - nowTime.getTime();
			var day = Math.floor(middleTime/(1000*60*60*24));
			var hour = Math.floor(middleTime/1000/60/60%24);
			var minute = Math.floor(middleTime/1000/60%60);
			var second = Math.floor(middleTime/1000%60);
			$scope.shicha = day+"天"+hour+"时"+minute+"分"+second+"秒";
		},1000)
	}
}]);


