(function() {
    FastClick.attach(document.body);
    var pageContentEl = $(".content");
    var ruleEl = $(".dialog-rule");
    var awardEl = $(".dialog-award");
    var warnPopupEl = $("#popup_warn");
    var warnDrawedPopupEl = $("#popup_warn_drawed");

    // 查看规则
    pageContentEl.on("click", ".btn-rule", function() {
        onShowRule();
    });

    var machine1, machine2, machine3;
    onInitMachine();
    // 抽奖
    pageContentEl.on("click", ".btn-draw", function(e) {
        var currentTarget = $(e.currentTarget);
        if (currentTarget.hasClass("disable")) { //无法点击状态
            return;
        }
        currentTarget.addClass("disable");
        currentTarget.parent().find(".tips").text("明日再来~");
        onStartMachine();

        // 老虎机停止， TODO:删除setTimeout
        setTimeout(function() {
            //  停止抽奖 停止位置 0-话费 1-流量 2-红包 3-团币
            onStopMachine(3, onShowAawrd);
        }, 3000)

    });


    // 初始化抽奖
    function onInitMachine() {
        machine1 = pageContentEl.find(".machine01").slotMachine({
            active: 1,
            delay: 500,
            direction: 'down'
        });

        machine2 = pageContentEl.find(".machine02").slotMachine({
            active: 2,
            delay: 500,
            direction: 'down'
        });

        machine3 = pageContentEl.find(".machine03").slotMachine({
            active: 0,
            delay: 500,
            direction: 'down'
        });
    }

    // 启动抽奖
    function onStartMachine() {
        machine1.shuffle();

        setTimeout(function() {
            machine2.shuffle();
            setTimeout(function() {
                machine3.shuffle();
            }, 200);
        }, 200);
    }

    // 停止抽奖 index 停止位置 0-话费 1-流量 2-红包 3-团币
    function onStopMachine(index, cb) {
        // 设置停止位置
        machine1.setRandomize(index);
        machine2.setRandomize(index);
        machine3.setRandomize(index);

        // 停止
        machine1.stop();
        setTimeout(function() {
            machine2.stop();
            setTimeout(function() {
                machine3.stop();
                setTimeout(function() {
                    cb && cb.call(this, index);
                }, 1200);
            }, 200);
        }, 200);

    }

    //显示奖品 
    function onShowAawrd(index) {
        awardEl.find(".icon-award").removeClass("award01 award02 award03 award04").addClass("award0" + (index + 1));
        awardEl.show();
        $(".scroll").removeClass("scroll-active");
    }

    //隐藏奖品 
    function onHideAawrd(index) {
        awardEl.hide();
        $(".scroll").addClass("scroll-active");
    }

    // 关闭奖品 
    awardEl.on("click", ".icon-close", function() {
        onHideAawrd();
    });

    // 关闭规则
    ruleEl.on("click", ".icon-close", function() {
        onHideRule();
    });

    // 显示规则
    function onShowRule() {
        ruleEl.show();
        $(".scroll").removeClass("scroll-active");
    }

    // 隐藏规则
    function onHideRule() {
        ruleEl.hide();
        $(".scroll").addClass("scroll-active");
    }

    // 异常弹窗按钮——去摇签按钮： 点击事件
    warnPopupEl.on("click", "#btn_warn", function () {
        console.log('to do')
    });

    // 关闭抽过奖提示
    warnDrawedPopupEl.on("click", "#btn_warn_drawed", function() {
        warnDrawedPopupEl.hide();
        $(".scroll").addClass("scroll-active");
    });
})();