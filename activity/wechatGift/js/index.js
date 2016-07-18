(function() {
    FastClick.attach(document.body);
    //do your thing.
    window.onload = function() {
        //加载音乐
        var win_music = $("#win_music"),
            lose_music = $("#lose_music"),
            award_music = $("#award_music");
        if (win_music.length > 0) {
            win_music[0].load();
        }
        if (lose_music.length > 0) {
            lose_music[0].load();
        }
        if (award_music.length > 0) {
            award_music[0].load();
        }

        //弹出规则
        $(".content").on("click", "#show_rule", function(e) {
            showPopup("#rule_part");
        });

        //关闭所有弹窗
        $(".masker, .close").bind("click", function(e) {
            hidePopup();
        });

        //点击按钮弹窗
        $(".item").on("click", ".btn-active", function(e) {
            var _content = '<p>成功开启</p>' +
                '<p class="font-green">微信专属月度包</p>' +
                '<p>并获得<span class="font-yellow">59团币</span></p>';
            showAlert(1, _content, function(e) {
                window.location.href = "./present.html";
                hidePopup("#alert");
            });
        });

        //第二页分享按钮
        $(".present-content").on("click", "#btn_share", function(e) {
            showPopup("#share_part");
        });

        //显示popup
        function showPopup(selector) {
            $(selector).show();
            $(".scroll").removeClass("active");
        }
        //隐藏popup
        function hidePopup() {
            $(".popup").hide();
            $(".scroll").addClass("active");
        }

        // 弹窗提示 type: 0-－ negative; 1 -- positive; content : 内容
        function showAlert(type, content, callback) {
            var _type = "";
            if (type == 1) {
                win_music[0].play();
                _type = "alert-positive";
                //绑定negative btn事件
                $("#alert").off("click", ".btn-transparent").on("click", ".btn-transparent", function(e) {
                    if (callback) {
                        callback();
                    }
                    // hidePopup("#alert");
                });

            } else {
                lose_music[0].play();
                _type = "alert-negative";
                content = '<p>奖品们都粗去玩惹</p>' +
                    '<p>下次要早点来找他们哦～</p>';
                //绑定negative btn事件
                $("#alert").off("click", ".btn-transparent").on("click", ".btn-transparent", function(e) {
                    hidePopup("#alert");
                });
            }
            $("#alert").removeClass("alert-positive").removeClass("alert-negative").addClass(_type);
            $("#alert").find(".alert-content").html(content);

            showPopup("#alert");
        }
         //领取奖品页面
            var present_open_part = $(".present-open-part");
            if(present_open_part.length > 0) {
                award_music[0].play();
                present_open_part.addClass("bounceInDown").removeClass("transparent");
                // present_open_part.show();
            }

    }




})();