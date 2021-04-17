window.addEventListener('load', function() {
    // 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 鼠标经过，隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    })
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            var timer = setInterval(function() {
                arrow_r.click();
            }, 2000);
        })
        // 动态生成小圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建li
        var li = document.createElement('li');
        // 圆圈索引号 自定义属性做
        li.setAttribute('index', i);
        // 把li插入ol
        ol.appendChild(li);
        // 小圈排他思想
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击圆圈移动图片 移动是ul
            // ul移动距离=圆圈索引号*图片宽度（负值）
            // 点击li 拿到当前li索引号
            var index = this.getAttribute('index');
            // 点击了某个li 把这个li的索引号给num
            num = index;
            // 点击了某个li 把这个li的索引号给circle
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    // 克隆第一张图片 放到ul后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 右侧按钮控制图片
    var num = 0;
    // circle控制小圆圈播放
    var circle = 0;
    // 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; //打开节流阀
            });
            // 点右侧按钮，圆圈跟随一起变化，circle控制圆圈播放
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 点右侧按钮，圆圈跟随一起变化，circle控制圆圈播放
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });

    function circleChange() {
        // 先清除其余圆圈current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 自动轮播
    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000);
})