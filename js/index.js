(function () {
    var curPageIndex = 0;
    var pageContainer = $('.page-container');

    //切换页面
    function toPage() {
        //添加过渡效果
        pageContainer.style.transition = '500ms';
        // 视口高度window.innerHeight
        pageContainer.style.marginTop = -curPageIndex * document.documentElement.clientHeight + "px";
    }
    toPage();

    pageContainer.ontouchstart = function (e) {
        var Y = e.changedTouches[0].clientY;//手指点下时的坐标
        pageContainer.style.transition = 'none';
        pageContainer.ontouchmove = function (e) {

            var pageMTop = -curPageIndex * document.documentElement.clientHeight;
            var dis = e.changedTouches[0].clientY - Y;
            if (curPageIndex == 0 && dis > 0) {
                return;
            } else if (curPageIndex == 2 && dis < 0) {
                return;
            }
            pageContainer.style.marginTop = (pageMTop + parseInt(dis)) + "px";
        }

        pageContainer.ontouchend = function (e) {
            var endDis = Math.floor(e.changedTouches[0].clientY - Y);
            if (Math.abs(endDis) < 50) {
                toPage();
                return;
            }
            if (endDis > 0 && curPageIndex != 0) {//下滑
                curPageIndex--;
                toPage();
            } else if (endDis < 0 && curPageIndex != 2) { //上滑
                curPageIndex++;
                toPage();
            }
        }
    }
})()

//给背景音乐按钮注册点击事件
var bgMusicSwich = $(".music");
var bgMusic = $("#bgMusicAudio");
bgMusicSwich.onclick = function () {
    bgMusicSwich.classList.toggle('music-close');
    AudioSwitch(bgMusic);
}

//页面加载完毕时自动播放背景音乐
window.onload = function () {
    AudioSwitch(bgMusic);
    $('.page-container .g-modle').style.display = "none";
    if (bgMusic.paused) {
        alert("您的浏览器不支持自动播放，请手动开启背景音乐")
        return;
    }
    bgMusicSwich.classList.toggle('music-close');
}
// 将获取数据包裹在一个异步函数中

// (async function getServerData() {
//     var resp = await fetch(`
//     https://bless.yuanjin.tech/api/bless?id=${location.search.replace("?", "")
//         }`
//     ); // 获取服务器的响应，该步骤需要等待?id=5fe70be490eb6c3c4e8d2128
//     resp = await resp.json(); // 将服务器响应的json数据解析为js对象
//     // resp 即为从服务器拿到的数据对象
//     resp = resp.data;
//     // console.log(resp);
//     
//     bgMusic.src = `./assets/media/0.mp3`;
//     /*  */
//     var authorName = $('.page1 .g-btn');
//     authorName.innerText = `来自【巧克力】的祝福`;

//     var pre = $('.page2 .note pre');
//     pre.innerText = resp.content;

//     if (pre.clientHeight !== pre.scrollHeight) {
//         pre.dataset.default = true;
//         pre.ontouchmove = function (e) {
//             e.stopPropagation();
//         }
//         pre.ontouchend = function (e) {
//             e.stopPropagation();
//         }
//     }

// })()

var zfBtn = $(".page2 .g-btn");
console.log(zfBtn)
var zfAudio = $('#soundAudio');
zfAudio.src = "./assets/media/blessing.mp3";
zfBtn.onclick = function () {
    if (!bgMusic.paused) {
        bgMusic.pause();
        bgMusicSwich.classList.toggle('music-close');
    }
    $(".page-container .page2 .g-tape").classList.toggle("run");
    AudioSwitch(zfAudio);
}


var zhufuBtn = $('.page3 .g-modle .g-btn');

zhufuBtn.onclick = function () {
    $('.page3 .g-modle').style.display = "none";
    /**
* 启用摇一摇事件
* 由于某些手机的限制，该方法必须在某个元素点击后调用
**/
    // console.log();
    (async function regShakenEvent() {
        try {
            await utils.regShakenEvent(); // 启用摇一摇
        } catch (err) {
            /* 
            * 不支持devicemotion事件的手机
            * 或
            * 用户不允许监听设备运动
            */
            alert("由于权限问题，无法使用摇一摇功能");
        }
    })();
    /**
    * 监听摇一摇事件
    * 必须保证上面的regShakenEvent方法被调用后才能监听到
    **/
    window.addEventListener("shaken", function () {
        console.log("用户摇动了手机");

        let shakenAdio = $('#shakenAudio');
        const Y = true;
        AudioSwitch(shakenAdio, Y);

        setTimeout(function () {
            creatCard();
        }, 500)

        //随机生成祝福卡片
        function creatCard() {

            var divBlessCard = $('.page3 #divBless-card');
            if (divBlessCard.children[0]) {
                closeBelssCard();
            }
            setTimeout(function () {
                var num = Math.floor(Math.random() * 7);
                divBlessCard.innerHTML = `
                    <div class="bless-card">
                      <img src="./assets/bless-card/${num}.png" alt="">
                      <div class="close">
                        <div class="close-btn" data-default="true"></div>
                      </div>
                      <div class="g-seal"></div>
                    </div>`;
                divBlessCard.style.display = "flex";
                setTimeout(function () {
                    divBlessCard.children[0].style.transform = "scale(1)";
                    $('.close-btn').onclick = function () {
                        closeBelssCard();
                    };
                }, 100)

            }, 500)

        }
        //关闭祝福卡片
        function closeBelssCard() {
            var divModle = $(".page3 #divBless-card");
            var blessCard = divModle.querySelector(".bless-card");
            if (!blessCard) {
                return;
            }

            //1. 先缩小
            blessCard.style.transform = "scale(0)";
            //2. 再关闭
            setTimeout(function () {
                blessCard.remove();
                divModle.style.display = "none"
            }, 500);

        }
    });
}