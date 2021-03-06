(function() {
	FastClick.attach(document.body);
	var postData = {}; //海报数据

	function init() {
		var data = {
			imgUrl: '../images/model0.jpg',
			content: 'aaaa',
			name: 'alice'
		};
		data = {};
		if (data && data.imgUrl) {
			$(".step-container").addClass('has-preview');
			$(".btn-upload-txt").html('重新上传');
			$("#uploadImg")[0].src = data.imgUrl;
			$(".label-input[data-type='content']").html(data.content);
			$(".label-input[data-type='name']").html(data.name);
		}
	}
	init();
	$(".icon-rule").on('click', function() {
		$(".rule-mask").show();
	});
	$(".rule-submit").on('click', function() {
		$(".rule-mask").hide();
	});
	// $(".btn-upload").on('click', function() {
	// if ($(".step-container").hasClass('has-preview')) {
	// 	$(".step-container").removeClass('has-preview');
	// 	$(".btn-upload").html('点击上传');
	// } else {
	// 	$(".step-container").addClass('has-preview');
	// 	$(".btn-upload").html('重新上传');
	// }
	// });
	// $("#file").on('click', function(e) {
	// 	e.preventDefault();
	// });
	//图片上传
	$("#file").on('change', function(e) {
		if (e.target.files.length <= 0) {
			return;
		}

		var _file_url = e.target.value;
		// var _name = e.target.files[0].name;
		// console.info("_file_url----", _file_url);
		$(".step-container").addClass('has-preview');
		$(".btn-upload-txt").html('重新上传');
		$(".loading").show();
		lrz(e.target.files[0], {
				"fieldName": "Filedata"
			})
			.then(function(rst) {
				console.info('rst-----', rst);
				//模拟ajax请求
				setTimeout(function() {
					$(".loading").hide();
					$("#uploadImg")[0].src = rst.base64;
					postData.img = rst.base64;
				}, 1000);
				/*// 额外添加参数
				rst.formData.append('fileLen', rst.fileLen);
				$.ajax({
					url: '图片上传地址',
					data: rst.formData,
					processData: false,
					contentType: false,
					type: 'post', 
					success: function(data) {

					},
					complete: function() {
						$(".loading").hide();
					}
				});*/
			})
			.catch(function(error) {
				console.log(error);
			})
			.always(function() {
				// e.target.value = '';
			});
	});

	var inputType = '';

	$(".label-input").on('click', function() {
		inputType = $(this).attr('data-type');
		$('.pop-input').val($(this).html());
		$('.pop-input').focus();
		if (inputType === 'content') {
			$(".p-input-tips").html('*字数不能超过28个字');
			$('.pop-input').attr('maxLength', 28);
		} else {
			$(".p-input-tips").html('*字数不能超过8个字');
			$('.pop-input').attr('maxLength', 8);
		}
		$(".normal-mask").show();
	});
	$(".input-submit").on('click', function() {
		var value = $('.pop-input').val().trim();
		$(".label-input[data-type='" + inputType + "']").html(value);
		postData[inputType] = value;
		$('.pop-input').val('');
		$(".normal-mask").hide();
	});

	//一键生成海报
	$(".btn-create").on('click', function() {
		console.info('postData----', postData);
		if(!postData.img) {
			alert('请上传您的照片');
			return;
		}
		if (!postData.content || postData.content.length === 0) {
			showErrorTips('content', '请输入您要对家说的一句话 / 字数<font>不超过<i>28</i>个字</font>');
			return;
		} 
		if(!postData.name || postData.name.length === 0) {
			showErrorTips('name', '请输入您的署名 / <font>不能超过<i>8</i>个字</font>');
			return;
		}
		window.location.href = './preview.html';
	});

	function showErrorTips(type, tips) {
		var obj = $(".error-tips[data-type='" + type + "']");
		obj.html(tips);
		obj.show();
	}

})();