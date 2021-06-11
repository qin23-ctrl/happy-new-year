
function $(selector) {
    return document.querySelector(selector);
}

function $$(selectorAll) {
    return document.querySelector(selectorAll);
}

//创建元素
function $$$(element) {
    return document.createElement(element);
}

// 阻止 touchstart 事件的默认行为
document.body.addEventListener(
    "touchstart",
    function (e) {
        if (e.target.dataset.default) { // 事件源包含 data-default 属性
            return; // 该事件源无须阻止默认行为
        }
        if (e.cancelable) {
            e.preventDefault();
        }
    },
    { passive: false }
);

// 阻止 touchmove 事件的默认行为
document.body.addEventListener(
    "touchmove",
    function (e) {
        if (e.target.dataset.default) { // 事件源包含 data-default 属性
            return; // 该事件源无须阻止默认行为
        }
        if (e.cancelable) {
            e.preventDefault();
        }
    },
    { passive: false }
);

/**
 * Audio元素控制函数
 * @param {*传入的音频对象} target 
 * @param {*是否重新播放} form 
 */
function  AudioSwitch(target, form) {
    if (target.paused) {
        if (form) {
            target.currentTime = 0;
        }
        target.play();
    } else {
        target.pause();
    }
}