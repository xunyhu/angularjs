$(function(){
	$("header").load("header1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$(".header1").find("div").text("找回密码");
			setTimeout(function(){
				$("header").show();
			},50)
		}
	});
	$(".findpass").find("input[name='radomnunm']").val(mathematical());
	$(document).on("touchstart",function(evt){
		if($(evt.target).is("input[name='radomnunm']")){
			$(evt.target).val(mathematical());
		}
		if($(evt.target).is("input[name='findpass']")){
			var findpass = checkres({
				target:".findpass",
				name:[
						{"namedom":'account',"message":"手机号不能为空"},
						{"namedom":'checknum',"message":"验证码不能为空"},
						{"namedom":'password',"message":"密码不能为空"},
						{"namedom":'repassword',"message":"两次密码不一致"}
					],
				random:'radomnunm'
			});
			if(findpass.account && findpass.password){
				$.post(baseurl+"php/findpass.php",{account:findpass.account,newpwd:findpass.password},function(rep){
					var result = eval('('+rep+')');
					console.log(result);
					alert(result.message);
					if(result.state){
						location.assign("login.html");
					}
				})
			}
		}
	})
})