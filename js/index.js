$(document).ready(function () {
    "use strict";
    /*页面信息初始化*/
    //获取图片地址、描述信息
    $.ajax({
        method: "GET",
        url: "data/img-data.json"
    }).done(function (msg) {
        var list = $(".list");
        list.each(function (index) {
            $(this).find("img").attr("data-src", msg[index].url);
            $(this).find("h3").html(msg[index].title);
            $(this).find("span").html(msg[index].author);
        });
    });

    /*点击事件*/
    // 底部固定栏关闭
    $("#shutdown").on("click", function () {
        $(".f-footer").css("display", "none");
    });
    //回到顶部按钮
    $("#sideNav a:last").on("click", function () {
        $("body").animate({"scrollTop": 0});
    });

    /*个人信息 鼠标移入显示*/
    var login = {
        hover: function () {
            var userInfo = $(".useInfo");
            var timer = null;
            $(".u-icon").on("mouseenter", function () {
                userInfo.fadeIn();
                $(".u-icon").on("mouseleave", function () {
                    timer = setTimeout(function () {
                        userInfo.css("display", "none");
                        $(".u-icon").off("mouseleave");
                    }, 1200);
                });
            });

            userInfo.on("mouseenter", function () {
                clearInterval(timer);
                userInfo.css("display", "inlineblock");
                userInfo.on("mouseleave", function () {
                    userInfo.fadeOut().off("mouseleave");
                });
            })
        },
        logIn: function () {

        }
    };
    login.hover();

    /*轮播动画*/
    var autoPlay = {
        picUrl: ["img/autopic/autopic1.jpg", "img/autopic/autopic2.jpg", "img/autopic/autopic3.jpg",
            "img/autopic/autopic4.jpg", "img/autopic/autopic5.jpg", "img/autopic/autopic6.jpg",
            "img/autopic/autopic7.jpg"],
        bgColor: ["#040814", "#7150D2", "#ecc848", "#30413B", "#040404", "#73A4C5", "#7F6BB3"],
        show: function (index) {
            var oImg = $(".autoplay img").eq(0);
            var aLi = $(".pic-ico li");
            var bg = $(".autowrap").eq(0);

            oImg.attr("src", this.picUrl[index]).css("opacity", 0).animate({"opacity": 1});
            aLi.css({"height": 8, "background": "#b3b3b3"});
            aLi.eq(index).finish().css({"background": "#fff"}).animate({height: 16});
            bg.css({"background": this.bgColor[index]}).fadeIn(2000);
        },
        cIndex: function () {
            var oDiv = $(".autoplay").eq(0);
            var aLi = $(".pic-ico li");
            var index = 0;
            var len = this.picUrl.length;
            var _this = this;
            var timer = null;

            function autoIncrement() {
                index < len - 1 ? index++ : index = 0;
            }

            // 开个定时器改变index的值
            timer = setInterval(function () {
                autoIncrement();
                _this.show(index);
            }, 3000);
            // 事件委托给父级
            oDiv.on("click", function (e) {
                oDiv.on("mousedown", function () {
                    return false;
                });
                var target = e.target;
                var num = index;
                clearInterval(timer);
                // 每个li运动之前先清除之前的运动再开始运动
                if ($(target).is("span.prebtn")) {
                    aLi.eq(index).stop(true, true);
                    index <= 0 ? index = len - 1 : index--;
                }
                if ($(target).is("span.nextbtn")) {
                    aLi.eq(index).stop(true, true);
                    autoIncrement();
                }
                if ($(target).is("li")) {
                    index = $(target).index();
                }
                // 点击其他不应该重复加载此图片
                if (num !== index) {
                    _this.show(index);
                }

                // 定时器重启
                timer = setInterval(function () {
                    autoIncrement();
                    _this.show(index);
                }, 3000);
            });
        }

    };

    autoPlay.cIndex(this.index);

    /*鼠标移入 课程清单菜单显示*/
    function courDetail() {
        var oUl = $(".list-wrap").eq(0);
        var aLi = $(".courses-list");
        var aSec = $(".cour-wrap");
        $(".course-others span").on("click", function () {
            $(".cour-wrap").css({"display": "none"});
        });
        aLi.on("mouseenter", function (e) {
            var target = e.target;
            var cur = $(".search .show");
            var index = $(target).is("div.courses-list") ? $(target).index() : $(target).parents("div.courses-list").index();
            // 鼠标首次移入淡入显示,如果是首次就addClass("show"),然后移除
            if (!cur.length) {
                aSec.eq(index).fadeIn(300, function () {
                    aSec.eq(index).addClass("show");
                });
            } else {
                // 使用fadeIn会增加一个内联样式display:block,造成增加样式show无效，故需removeAttr("style")
                cur.removeClass("show").removeAttr("style");
                aSec.eq(index).addClass("show");
            }

        });

        /*鼠标移出 课程清单菜单消失*/
        oUl.on("mouseleave", function () {
            var t = 0;
            // 设置鼠标离开的时间间隔，时间小于0.3s则不会消失，防止鼠标误滑出区域后菜单消失
            var timer = setInterval(function () {
                t++;
                if (t > 3) {
                    clearInterval(timer);
                    setTimeout(function () {
                        $(".search .show").removeClass("show");
                        aSec.removeAttr("style");
                    }, 200);
                }
            }, 100);

            oUl.mouseenter(function () {
                clearInterval(timer);
                // 取消事件否则出现多个独立的事件，独立的t值
                oUl.off("mouseenter");
            });
        });

    }

    courDetail();
    /* 滚动监听 侧边栏、顶部固定栏的显示与隐藏*/
    $(window).scroll(function () {
        var t = $(window).scrollTop();
        var sideNav = $("#sideNav");
        var fixNav = $(".f-nav");
        var fixBottom = $(".f-footer");
        /*侧边栏*/
        if (t > 0) {
            sideNav.css("display", "block");
        } else if (t === 0) {
            sideNav.css("display", "none");
        }
        /*顶部固定导航*/
        if (t > 0 && t < 562) {
            fixNav.css("display", "none");
        } else if (t > 622) {
            fixNav.css("display", "block");
        }
        /*底部固定导航*/
        if (t > $(window).height()) {
            fixBottom.css("display", "block");
        }else if(t < $(window).height()){
            fixBottom.css("display", "none");
        }
    });

    /*课程添加内容，切换课程的左右按钮*/
    var courses = {
        data: [
            {"class": "icon-e62b", "a1": "Android开发工程师", "a2": "4个月从入门到精通"},
            {"class": "icon-e62e", "a1": "iOS开发工程师", "a2": "网易一线资深开发工程师亲授"},
            {"class": "icon-e913", "a1": "产品运营", "a2": "运营大咖强强联合"},
            {"class": "icon-e901", "a1": "Java 开发工程师", "a2": "浙大Java男神翁恺执教"},
            {"class": "icon-e629", "a1": "新任管理者", "a2": "源自中欧国际工商学院"},
            {"class": "icon-e917", "a1": "Python Web开发工程师", "a2": "快速上手的全栈训练营"},
            {"class": "icon-e62c", "a1": "C++开发工程师", "a2": "侯捷大师亲自教学"},
            {"class": "icon-e926", "a1": "新媒体视频导演", "a2": "让业余拍片儿的你变专业"},
            {"class": "icon-e61a", "a1": "自由职业摄影师", "a2": "培养一个能赚钱的爱好"},
            {"class": "icon-e628", "a1": "产品经理", "a2": "网易亿级产品负责人亲授"},
            {"class": "icon-e635", "a1": "测试工程师", "a2": "打造最专业的测试人"},
            {"class": "icon-e62f", "a1": "MySQL数据库工程师", "a2": "网易一线DBA团队打造"},
            {"class": "icon-e912", "a1": "UI设计师", "a2": "网易UEDC首席设计师亲授"},
            {"class": "icon-e900", "a1": "独立音乐制作人", "a2": "最易懂的音乐制作课程"}
        ],
        insert: function () {
            var data = this.data;
            var str = "";

            for (var i = 0; i < data.length; i++) {
                str += '<div class="joblist"><div>' +
                    '<span class="f-icon ' + data[i].class + '"></span></div>' +
                    '<div><a href="" target="">' + data[i].a1 + '</a><br>' +
                    '<a href="" target="">' + data[i].a2 + '</a></div></div>';
            }
            $(".list-r").html(str);
        },
        exchange: function () {
            this.insert();
            var pre = $(".job .pre").eq(0);
            var next = $(".job .next").eq(0);

            function step(boolean) {
                var aLi = $(".joblist");
                var n = Math.round(parseFloat(aLi.width()));
                var add = boolean ? n : -n;
                var oDiv = $(".list-r");
                var l = Math.round(parseFloat(oDiv.css("left")));
                if ((boolean && l + n < 0) || (!boolean && l + n > -((aLi.length - 5) * n))) {
                    oDiv.css("left", l + add);
                }
            }

            $(".job").on("click", function (e) {
                var target = e.target;
                if ($(target).is(pre)) {
                    step(false);
                } else if ($(target).is(next)) {
                    step(true);
                }
            });

        }
    };

    courses.exchange();

    /*延迟加载*/
    function lazyload(obj) {
        var h = $(window).height();
        var H = $(window).scrollTop();
        /*loaded用于判断是否加载，防止重复加载*/
        if (obj.offset().top < h + H && !obj.hasClass("loaded")) {
            var img = $("<img>");
            obj.addClass("loaded");
            img.attr("src", obj.attr("data-src"));
            img.on("load", function () {
                obj.attr("src", obj.attr("data-src"))
                    .removeClass("loaded")
                    .removeAttr("data-src");
            });
            img = null;
        }

    }

    $(window).on("scroll", function () {
        var images = $("img[data-src]");
        if (images.length) {
            images.each(function () {
                var _this = this;
                lazyload($(_this));
            })
        }

    });


    /*页脚文字切换显示*/
    function changeText() {
        var oUl = $(".s4 ul");
        var boolean = true;
        var timer = null;
        timer = setInterval(function () {
            boolean = !boolean;
            var n = boolean ? 0 : -20;
            $(".s4 ul").css("margin-top", n);
        }, 2000);

        oUl.on("mouseenter", function () {
            clearInterval(timer);
            oUl.on("mouseleave", function () {
                timer = setInterval(function () {
                    boolean = !boolean;
                    var n = boolean ? 0 : -20;
                    $(".s4 ul").css("margin-top", n);
                }, 2000);
            });
        });

    }

    changeText();

});