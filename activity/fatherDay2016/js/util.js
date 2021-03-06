(function($, win) {
    var Util = {

        // 阻止冒泡事件。
        stopBubble: function(el) {
            if (el && el.stopPropagation) {
                //因此它支持W3C的stopPropation()方法
                el.stopPropagation();
            } else {
                //否则,我们得使用IE的方式来取消事件冒泡
                window.event.cancelBubble = true;
            }
        },

        isWeiXin: function() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        getParam: function(name, url) {
            if (!url) {
                url = location.href;
            }
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var returnValue;
            for (var i = 0; i < paraString.length; i++) {
                var tempParas = paraString[i].split('=')[0];
                var parasValue = paraString[i].split('=')[1];
                if (tempParas === name)
                    returnValue = parasValue;
            }

            if (!returnValue) {
                return "";
            } else {
                if (returnValue.indexOf("#") != -1) {
                    returnValue = returnValue.split("#")[0];
                }
                return returnValue;
            }
        },
        //冒泡提示
        toast: function(msg, duration) {
            duration = isNaN(duration) ? 2000 : duration;
            var m = document.createElement('div');
            $(m).addClass("toast-content");
            m.innerHTML = msg;
            m.style.cssText = "width:70%; min-width:150px; background:#000; opacity:0.5;  color:#fff; padding:10px 10px; text-align:center; border-radius:5px; position:fixed; bottom:18%; left:15%; margin-left:-10px; z-index:999999; font-weight:bold;font-size:16px;";
            document.body.appendChild(m);
            setTimeout(function() {
                var d = 0.5;
                m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
                m.style.opacity = '0';
                setTimeout(function() {
                    if ($(".toast-content").size() > 0) {
                        document.body.removeChild(m);
                    }
                }, d * 1000);
            }, duration);
        },
        showLoading: function() {
            if ($(".loader").length <= 0) {
                var loader = document.createElement('div');
                $(loader).addClass("loader");
                document.body.appendChild(loader);
            } else {
                $(".loader").show();
            }

        },
        hideLoading: function() {
            if ($(".loader").length == 1) {
                $(".loader").hide();
            } else {
                $(".loader").remove();
            }
        },
        popup: function(title, msg, hasClose, btnTxt, btnCallback, cancelCallback) {
            var me = this;
            var closeTemp = "";
            var maskTemp = "";
            if (hasClose) {
                closeTemp = '<i class="icon-close-white"></i>';
            }
            if ($(".mask").length < 1) {
                maskTemp = '<div class="mask masker"></div>';
            }

            if ($(".popup").length > 0) {
                $(".ptitle").html(title);
                $(".popdetcont").html(msg);
                $(".pop-btn").html(btnTxt);
                if (hasClose) {
                    $(".icon-close-white").show();
                } else {
                    $(".icon-close-white").hide();
                }
            } else {
                var temp = maskTemp + '<div class="popup">' + closeTemp + '<span class="ptitle">' + title +
                    '</span><section class="popdetcont">' + msg + '</section><div class="pop-btn">' + btnTxt + '</div></div>';
                $("body").append(temp);

            }
            $(".mask").show();
            $(".popup").show();
            $("body").off('click', '.pop-btn').on('click', '.pop-btn', function() {
                $(".mask").hide();
                $(".popup").hide();
                if (btnCallback && typeof btnCallback == "function") {
                    btnCallback.apply(this, arguments);
                }
            });
            $("body").off('click', ".mask, .icon-close-white");
            if (hasClose) {
                $("body").on('click', ".icon-close-white", function() {
                    $(".mask").hide();
                    $(".popup").hide();
                    $(".weixin-share").hide();
                    me.enableScrolling();
                    if (cancelCallback && typeof cancelCallback == "function") {
                        cancelCallback.apply(this, arguments);
                    }
                });

            } else {
                $("body").on('click', ".mask", function() {
                    $(".mask").hide();
                    $(".popup").hide();
                    $(".weixin-share").hide();
                    me.enableScrolling();
                    if (cancelCallback && typeof cancelCallback == "function") {
                        cancelCallback.apply(this, arguments);
                    }
                });
            }


        },
        checkLogin: function(t, s) {
            // var url = "http://hd.tuandai.com/ajaxCross/Login.ashx?Action=UserLogin51"; //正式地址
            var url = "http://10.100.11.110:9006/ajaxCross/Login.ashx?Action=UserLogin"; //110地址
            console.info("t--", t, "s=" + s);
            if (Jsbridge.isNewVersion()) {
                if (s) {
                    //最新4.3.6app登录
                    if (s == 1) {
                        //app已登录并获取到loginToken
                        var params = {
                            "Data": {
                                "LoginToken": t
                            }
                        };
                        Jsbridge.actLogin(url, params, function(data) {
                            if (result.Status == 1) {
                                return true;
                                // window.location.reload();
                            } else if (result.Status == 0) {
                                return false;
                                if (confirm("登陆失效，需要重新登陆吗？")) {
                                    Jsbridge.toAppLogin();
                                }
                            } else {
                                return false;
                            }
                        }, function(e) {
                            console.info("login---error--", e);
                        });

                    } else if (s == 2) {
                        //app已登录，但是未获取到loginToken
                        this.toast("无法获取登录凭证！");
                        return false;
                    } else {
                        //app未登录
                        return false;
                    }
                } else {
                    //4.4.4及4.4.5app通过获取app返回的loginToken登录
                    Jsbridge.appLifeHook(null, function(data) {
                        console.info("lifehook----data-----", data);
                        if (data) {
                            data = JSON.parse(data);
                            /*data = JSON.parse(data);
                            var returncode = data.ReturnCode;
                            data = data.Data
                            var v_token = data.LoginToken;*/

                            //returncode == 1调用登陆接口
                            if (data.ReturnCode == '1') {
                                Jsbridge.actLogin(url, data, function(data) {
                                    console.info("login----", data);
                                    if (result.Status == 1) {
                                        return true;
                                        // window.location.reload();
                                    } else if (result.Status == 0) {
                                        return false;
                                        if (confirm("登陆失效，需要重新登陆吗？")) {
                                            Jsbridge.toAppLogin();
                                        }
                                    } else {
                                        return false;
                                    }
                                }, function(e) {
                                    console.info("login---error--", e);
                                });
                            } else {
                                var message = data.ReturnMessage;
                                // returncode为4表示用户未登录
                                if (returncode != 4) {
                                    this.toast(message);
                                }
                                return false;


                            }
                        } else {
                            console.info('原生没有返回任何数据');
                            return false;
                        }

                    },  null, null, null);
                }
            }
        },
        openLogin: function(isAppOpen, mobileUrl) {
            if (Jsbridge.isNewVersion()) {
                Jsbridge.toAppLogin();
            } else if (isAppOpen) {
                //旧版本app登录
                window.location.href = "ToAppLogin";
            } else {
                //非app端登录
                window.location.href = mobileUrl + "/user/Login.aspx?ReturnUrl=" + window.location.href;

            }
        },
        // ===============禁止滑动================
        preventDefault: function(e) {
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        },
        scrolling: function(e) {
            // var that = this;
            // that.preventDefault(e);
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        },
        disableScrolling: function() {
            var that = this;
            if (window.addEventListener) {
                window.addEventListener('DOMMouseScroll', that.scrolling, false);
                window.addEventListener('touchmove', that.scrolling, false);
                // window.onmousewheel = document.onmousewheel = scrolling;
            }
        },
        enableScrolling: function() {
            var that = this;
            if (window.removeEventListener) {
                window.removeEventListener('DOMMouseScroll', that.scrolling, false);
                window.removeEventListener('touchmove', that.scrolling, false);
            }
            // window.onmousewheel = document.onmousewheel = null;
        }


    }
    win.Util = Util;
    // return Util;

})(jQuery, window);