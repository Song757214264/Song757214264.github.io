var express = require("express");

var bodyParser = require("body-parser");

var app = express();

var cookieParser = require("cookie-parser");

app.use(express.static("www"));

app.use(bodyParser.json());

app.use(cookieParser());

var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/shopUser");
var db = mongoose.connection;
db.on("open",function(){
	console.log("数据库连接成功");
});
//.on("error",function(){
//	console.log("数据库连接失败");
//});

var UserSchema = mongoose.Schema({
	tel:String,
	psw:String,
	token:String
});
var User = mongoose.model("users",UserSchema);

app.post("/regist",function(req,res){
	User.find({tel:req.body.tel})
	.count()
	.exec(function(err,data){
		if(data>0){
			res.json({err:1,msg:"此用户已注册"});
		}else{
			var user = new User(req.body);
			user.save(function(){
				res.json({
					err:0,
					msg:"注册成功"
				});
			});
		}
	});
		
});

function makeToken(){
	var tokenSource = '1234567890qwertyuioplkjhgfdsazxcvbnm';
	var token = "";
	for(var i=0;i<10;i++){
		var index = Math.floor(Math.random()*tokenSource.length);
		token += tokenSource[index];
	}
	return token;
}

app.post("/login",function(req,res){
	User.find({tel:req.body.tel})
	.exec(function(err,data){
		if(data.length>0){
			if(req.body.psw==data[0].psw){
				var token = makeToken();
				data[0].token = token;
				data[0].save(function(){
					res.cookie("token",token);
					res.send({
						err:0,
						msg:"登录成功"
					});
				});				
			}else{
				res.send({
					err:1,
					msg:"密码错误"
				});
			}
		}else{
			res.send({
				err:2,
				msg:"此用户未注册"
			});
		}
	});	
});

app.post("/check",function(req,res){
	User.find({token:req.body.token})
	.exec(function(err,data){
		if(data){
//			console.log(data);
			res.send({err:0,msg:data});
		}
	});
});

app.post("/goods",function(req,res){
//	console.log(req.body);
	res.cookie("goods",req.body);
	res.send({err:0,msg:"物品加载完毕"});
});


app.listen(8080,function(){
	console.log("服务器已开启");
});
