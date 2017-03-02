$(document).ready(function () {
    "use strict";
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

            oImg.attr("src", this.picUrl[index]).finish().css("opacity", 0).animate({"opacity": 1});
            aLi.css({"height": 8, "background": "#b3b3b3"});
            aLi.eq(index).finish().css({"background": "#fff"}).animate({height: 16});
            bg.css({"background": this.bgColor[index]}).fadeIn(2000);
        },
        index: 0,
        cIndex: function () {
            var oDiv = $(".autoplay").eq(0);
            var aLi = $(".pic-ico li");
            var len = this.picUrl.length;
            var index = this.index;
            var _this = this;
            // 事件委托给父级
            oDiv.on("click", function (e) {
                var target = e.target;
                var num = index;
                // 每个li运动之前先清除之前的运动再开始运动
                if ($(target).is("span.prebtn")) {
                    aLi.eq(index).stop(true,true);
                    index <= 0 ? index = len - 1 : index--;
                }
                if ($(target).is("span.nextbtn")) {
                    aLi.eq(index).stop(true,true);
                    index < len - 1 ? index++ : index = 0;
                }
                if ($(target).is("li")) {
                    index = $(target).index();
                }
                // 点击其他不应该重复加载此图片
                if (num === index) {
                    return;
                }
                
                oDiv.finish();
                _this.show(index);
                console.log(index);
            });

        },
        slide: function () {
            var i = this.index;
            var len = this.picUrl.length;
            var _this = this;
            setInterval(function () {
                $(".pic-ico li").eq(i).stop(true,true);
                i < len - 1 ? i++ : i = 0;
                _this.show(i);
                console.log(i);
            }, 1000);
        }

    };

    autoPlay.cIndex(this.index);
    autoPlay.slide();


});