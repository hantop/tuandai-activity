(function() {
	FastClick.attach(document.body);
	//输入框获取焦点
	$('body').on('focus', 'input', function(e) {
		$(this).parent().removeClass('correct').removeClass('error');
	});
	//输入框失去焦点校验输入是否正确
	$('body').on('blur', 'input', function(e) {
		var type = $(this).attr('name');
		var value = $(this).val();
		var flag, reg;

		if (type === 'name') {
			//姓名校验
			if (value.trim().length > 0) {
				flag = true;
			}
		} else if (type === 'idNo') {
			//身份证号校验
			reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
			flag = reg.test(value);
		} else if (type === 'phone') {
			//手机号校验
			reg = /^1[3|4|5|7|8][0-9]{9}$/;
			flag = reg.test(value);
		}
		if (flag) {
			$(this).parent().addClass('correct');
		} else {
			$(this).parent().addClass('error');
		}
	});
	//添加跑友
	$(".btn-add").on('click', function() {
		var num = $("#num").html();
		var label = "";
		if (num == 2) {
			label = "跑友一";
		} else {
			label = "跑友二"
		}
		var temp = '<div class="add-item"><div class="add-title">' +
			'<i class="icon-label">' + label + '</i><i class="icon-del">一</i></div>' +
			'<ul class="signup"><li class="s-row"><div>姓名</div>' +
			'<div><input type="text" name="name" placeholder="请输入您的真实姓名"></div></li>' +
			'<li class="s-row"><div>身份证号</div><div>' +
			'<input type="text" name="idNo" placeholder="请输入您的身份证号码"></div></li></ul></div>';
		$(".add-cont").append(temp);
		if (num == 1) {
			$(this).hide();
		}
		$("#num").html(+num - 1);
	});
	//删除跑友
	$('body').on('click', '.icon-del', function() {
		var num = $("#num").html();
		obj = $(this).parent().parent();
		obj.remove();
		$("#num").html(+num + 1);
		$(".btn-add").show();
		$(".icon-label").html('跑友一');
	});
	//提交
	$("#submit").on('click', function() {
		var isCorrect = true;
		var mySignup = {
			name: $("#myName").val(),
			phone: $("#myPhone").val(),
			id: $("#myId").val()
		};
		if (mySignup.name.trim().length == 0 || mySignup.phone.trim().length == 0 || mySignup.id.trim().length == 0) {
			isCorrect = false;
		}

		var arr = $(".add-item");
		var friends = [];
		for (var i = 0; i < arr.length; i++) {
			var item = arr.eq(i);
			var friend = {
				name: item.find("input[name='name']").val(),
				id: item.find("input[name='idNo']").val()
			};
			if (friend.name.trim().length == 0 || friend.id.trim().length == 0) {
				isCorrect = false;
			}
			friends.push(friend);
		}
		// console.info(friends);
		if ($(".correct").length > 0) {
			isCorrect = false;
		}
		if (!isCorrect) {
			console.info("输入不正确");
			return;
		}
		/*// var msg = {
		// 	title: '提交成功！',
		// 	content: '报名信息提交成功后，请保持手机信息畅通，确保工作人员能够第一时间联系您领取装备包！'
		// };
		var msg = {
			title: '提交失败！',
			content: '<span class="e-tips">您的报名人数已超出剩余<br>名额，感谢您的参与！</span>'
		}
		showPopup(msg);*/

	});
	$(".pop-btn, .icon-close").on('click', function() {
		hidePopup();
	});

	function showPopup(msg) {
		$(".pop-title").find("span").html(msg.title);
		$(".pop-msg").html(msg.content);
		$(".mask").show();
	}
	function hidePopup() {
		$(".mask").hide();
	}
})();