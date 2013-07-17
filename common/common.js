$('.kc-head').html('<div class="wrap fn-clear">\
	<div class="logo">fwowo.com</div>\
	<div class="nav fn-clear">\
		<span id="kj-headnavact" class="fn-left">\
			<div id="kj-headnav" class="icon fn-hide">\
				<ul class="fn-clear"></ul>\
			</div>\
			<a class="link" href="/">频道栏目</a>\
		</span>\
		<a class="link" href="/topic/">推荐浏览</a>\
		<a class="link" href="/message/">联系留言</a>\
	</div>\
</div>');
$('.kc-foot').html('<div class="wrap">\
	<div class="fn-clear">\
		<div class="link">\
			<a href="/">网站首页</a>\
			<a href="#">关于本站</a>\
			<a href="#">友情链接</a>\
		</div>\
		<div class="weibo"><a target="_blank" href="http://weibo.com/beofish/profile"></a></div>\
	</div>\
	<div class="fn-clear">\
		<div class="fn-left"><span class="en">http://www.fwowo.com</span></div>\
		<div class="fn-right"><span class="en">xjia.jin@gmail.com</span></div>\
	</div>\
</div>');

var headNav = $('#kj-headnav');
var headNavLi = '<li><a href="{$href}"><img src="{$img}"></a></li>';
var headVt = '20130717';
$.getJSON("/index/nav.txt?t=" + headVt, function(response){
	var data = response['data'];
	var dataLen = data.length;
	var obj = headNav.find('ul');
	$.each(data, function(){
		var newContent = headNavLi;
		$.each(this, function(key, val){
			var newReg = new RegExp('{\\$' + key + '}', 'g');
			newContent = newContent.replace(newReg, val);
		});
		obj.append(newContent);
	});
	$('#kj-headnavact').hover(function(){
		headNav.removeClass('fn-hide');
	}, function(){
		headNav.addClass('fn-hide');
	});
});