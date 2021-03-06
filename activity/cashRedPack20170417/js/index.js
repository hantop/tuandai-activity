(function() {
    FastClick.attach(document.body);
	    //do your thing.
	window.onload = function() {
        setTimeout(function() {
            // body...
    		$("#index-title p").addClass('transform');
        }, 500)
	}
	    //跳转到规则页面
    $("#go_rule").on("click", function(e) {
        // window.location.href = "./rule.html";
        // disableScroll();
        $("#rule_sec").show();
        setTimeout(function(e) {
            $("#rule_sec").find('.rule-scroll').removeClass('zoomIn')
        }, 500)
    });
    $("#btn_share").on("click", function(e) {
    	// window.location.href = "./toopen.html";
        window.location.href = 'weixin://'
    });
    $("#tab-welfare .tab").on('click',function(e){
        var index = $(this).attr('data-index') - 1;
        $(this).addClass('on').siblings().removeClass('on');
        $("#welfare-cons .welfare-con").eq(index).removeClass('hide').siblings().addClass('hide');
    })

    // 规则关闭按钮事件绑定
    $("#rule_sec").on("click", ".masker, .icon-close", function(e) {
        $("#rule_sec").hide();
        $("#rule_sec").find('.rule-scroll').addClass('zoomIn')
        // enableScroll();
    });
    // 福利按钮
    $("#btn-welfare").on('click',function() {
        if($("#welfare").offset().top > 10 || $("#welfare").offset().top < 0){
            $(".scroll").animate({scrollTop: -($(".page-index").offset().top-$("#welfare").offset().top)}, 700);
        }
    })

    // 查看详情弹窗
    $(".welfare-con>.btn-detail").on('click',function(e){
        var index = $(this).attr('data-index') - 1;
        $("#detail-dialog").show();
        $("#detail-dialog .rule-wrapper").eq(index).removeClass('hide');
    })
    $("#detail-dialog").hide();
    $(".btn-rules_cls").on('click',function() {
        $("#detail-dialog").hide();
        $("#detail-dialog .rule-wrapper").addClass('hide');
    })

    // 现金红包按钮
    $("#btn-red-pack").on('click',function() {
        Util.tip({
            'content': '暂时没有红包可送，去投资赚利息？',
            "btns": [{
                "name": "取消",
                "cb": function() {
                    console.log('cancel')
                }
            },{
                "name": "我要投资",
                "cb": function() {
                    console.log('confirm')
                }
            }]
        });
    })

    // 转盘抽奖
    function rotateFn(type, angles) {
        $('#lottery-turntable').stopRotate();
        $('#lottery-turntable').rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 5000,
            callback: function() {
                var _num = 0;
                var _type = 0;
                switch (type) {
                    case 1:
                        //588元现金红包
                        _num += 588;
                        _type = 2;
                        break;
                    case 2:
                        //100团币
                        _num += 100;
                        _type = 0;
                        break;
                    case 3:
                        //288元现金红包
                        _num += 288;
                        _type = 2;
                        break;
                    case 4:
                        //10元投资红包
                        _num += 10;
                        _type = 1;
                        break;
                    case 5:
                        //3元投资红包
                        _num += 3;
                        _type = 1;
                        break;
                    case 6:
                        //50元现金红包
                        _num += 50;
                        _type = 2;
                        break;
                }
                $(".lottery-num").html(qmCount);
                // 抽奖次数用完，转盘指针置灰
                if(qmCount < 1){
                    $(".turntable-finger").addClass("gray");
                }
                showPopup(_type,_num);
            }
        });

    };

    // 中奖弹窗
    function showPopup(type, num) {
        Util.showPrize({
            "type": type,
            "num": num
        })
        // Util.disableScroll();
    }
    //开始抽奖
    var qmCount = 3;
    // var qmInvest = true;
    $("#turntable-finger").off('click').on('click', function() {
        if (qmCount < 1) {
            // 抽奖次数用完
            Util.tip({
                "content": "您的抽奖次数已用完",
                btns: [{
                    "name": "确定",
                    "cb": function() {}
                }]
            });
            return;
        }
        var type = 4; 
        var angles = 60 * type;
        rotateFn(type, angles);
        qmCount -= 1;
    });

    
})();