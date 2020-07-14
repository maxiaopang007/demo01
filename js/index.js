// 【特效】
// 点击添加按钮添加任务
// 给按钮注册click
$('.add').click(function () {
  // 获取文本框的内容
  var v = $('.txt').val();
  // 检测是否为空
  if (v.trim().length == 0) {
    // 是：提示用户重新输入
    alert('内容不能为空！');
  } else {
    // 否：创建li，这li的内容为文本框的内容，追加到ol
    $('<li></li>').hide() // 先隐藏，便于后面的动画有效
      .attr('num', arr.length)
      .html('<input type="checkbox"><span>' + v + '</span>') // 设置内容
      .prependTo('ol') // 追加到ol中
      .slideDown(500); // 动画显示
    // 清空文本框
    $('.txt').val('');

    // 更新数组
    arr.push({
      name: v,
      isOk: false
    });
    // 把数组转换为 字符串
    str = JSON.stringify(arr);
    // 更新数据到本地
    localStorage.setItem('toDoList', str);
  }


});

/**   
 *   主要是这俩
 *   JSON.stringify()
 *   JSON.parse()
 */

// 【特效】
// 按键添加任务
// 给document注册keydown
$(document).keydown(function (e) {
  // 判断按键
  if (e.keyCode == 13) {
    $('.add').trigger('click');
  }
});

// 【特效3】
// 点击复选框移动ol中 的li到ul中
// 给ol注册click，委托input
$('ol').on('click', 'input', function () {
  // 根据点击的input复选框，找到当前的li，追加到ul中
  var li = $(this).parent(); // 找到li
  // 先动画隐藏li,动画完毕后，再追加到ul中，再动画显示
  li.hide(500, function () {
    li.prependTo('ul').fadeIn(500);
  });
  // 隐藏复选框
  $(this).hide();

  // 更改数组中哪个对象
  var i = li.attr('num');
  arr[i].isOk = true;
  // 转换为字符串
  str = JSON.stringify(arr);
  // 更新到本地
  localStorage.setItem('toDoList', str);
});

// 【页面加载完后，是否要渲染本地数据】
// 读取本地数据
// 约定
// key→ toDoList
// value → [{name:"任务名称",isOk:false}]
var str = localStorage.getItem('toDoList');
// 判断本地是否有地方存储数据
if (str == null) {
  // 向浏览器本地申请一个地方
  localStorage.setItem('toDoList', '[{"name":"吃饭","isOk":true},{"name":"睡觉","isOk":false}]');
  // 重新读取本地数据
  str = localStorage.getItem('toDoList');
}
// 把字符串数组 转换为 数组
var arr = JSON.parse(str);
// 循环遍历
for (var i = 0; i < arr.length; i++) {
  // 取出一个对象
  var obj = arr[i]; // {name: "吃饭", isOk: true}
  // 判断
  if (obj.isOk == true) {
    // 完成
    $('<li></li>').attr('num', i).html('<span>' + obj.name + '</span>').appendTo('ul');
  } else {
    // 没完成
    $('<li></li>').attr('num', i).html('<input type="checkbox"><span>' + obj.name + '</span>').appendTo('ol');

  }
}