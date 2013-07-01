// 获取参数
var url = document.URL;
var query = {};
var urlParam = url.split('?')[1];
if (urlParam) {
	urlParam = urlParam.split('#')[0];
	var param = urlParam.split('&');
	$.each(param, function(){
		var newParam = this.split('=');
		if (newParam[0] && newParam[1]) {
			query[newParam[0]] = newParam[1];
		}
	});
} else {
	location.href = '/menu/';
}
if (query['sign']) {
	var sign = query['sign'];
} else {
	location.href = '/menu/';
}

// 获取模板
var wrapObj = $('#kj-wrap');

var modelObj = $('#kj-model');
var model = $.trim(modelObj.val());
modelObj.remove();

var itemObj = $('#kj-item');
var modelItem = $.trim(itemObj.val());
itemObj.remove();

// 创建cart数据
var cartData = {};
if (query['item']) {
	var items = query['item'].split(',');
	$.each(items, function(){
		cartData[this] = {id: this};
	});
}
var tasteData = {
	'微辣': ['lajiao', 1],
	'小辣': ['lajiao', 2],
	'中辣': ['lajiao', 3],
	'特辣': ['lajiao', 4],
	'变态辣': ['lajiao', 5],
	'推荐': ['tuijian', 1],
	'强力推荐': ['tuijian', 2],
	'必点': ['tuijian', 3]
};

// 获取店名
var shopUrl = 'json/' + sign + '_h.txt?r=' + Math.random();
$.getJSON(shopUrl, function(response){
	var data = response.data[0];
	$('#kj-h1').html(data['title']);
	$('#kj-h2').html(data['em']);
});

// 获取菜单数据
var menuUrl = 'json/' + sign + '.txt?r=' + Math.random();
$.getJSON(menuUrl, function(response){
	var menuData = {};
	var data = response.data;
	$.each(data, function(){
		var cname = this['class'];
		if (!menuData[cname]){
			menuData[cname] = [];
		}
		menuData[cname].push(this);
	});
	$.each(menuData, function(cname, list){
		var newModel = $(model.replace('{$class}', cname));
		wrapObj.append(newModel);
		$.each(list, function(){
			// 创建数据
			var _this = this;
			var id = this['id'];
			var newItem = modelItem;
			$.each(this, function(key, val){
				if (key == 'taste') {
					var tasteVal = val.split(',');
					val = '';
					$.each(tasteVal, function(){
						if (tasteData[this]) {
							for (i=0; i<tasteData[this][1]; i++) {
								val += '<span class="' + tasteData[this][0] + '" title="' + this + '"></span>';
							}
							val += '<span class="jiange"></span>';
						}
					});
				}
				var newReg = new RegExp('{\\$' + key + '}', 'g');
				newItem = newItem.replace(newReg, val);
			});
			var newItemObj = $(newItem);
			var newItemCon = newItemObj.find('.contain');
			if (cartData[id]) {
				cartData[id] = this;
				newItemCon.addClass('current');
			}
			newItemCon.click(function(){
				if (newItemCon.hasClass('current')) {
					delete cartData[id];
					newItemCon.removeClass('current');
				} else {
					cartData[id] = _this;
					newItemCon.addClass('current');
				}
			});
			newModel.find('ul').append(newItemObj);
		});
	});
});

// 创建分享按钮
var wb_content = 'default_text';
var shareBtn = function(){
	var share = fnShare();
	if (share['shareContent'] != wb_content) {
		wb_content = share['shareContent'];
		// 生成短链接
		var wbUrl = 'http://api.t.sina.com.cn/short_url/shorten.json?source=3006087460&url_long=' + encodeURIComponent(share['shareUrl']);
		$.get(wbUrl, function(response){
			var shortUrl = response[0]['url_short'];
			var content = wb_content + ' ' + shortUrl;
			WB2.anyWhere(function(W){
				W.widget.publish({
					id: "kj-cart-share",
					default_text: content,
					refer: "n"
				});
				$('#kj-cart-share').removeClass('fn-hide');
				$('#kj-cart-sharetemp').addClass('fn-hide');
			});
		}, 'jsonp');
	} else {
		$('#kj-cart-share').removeClass('fn-hide');
		$('#kj-cart-sharetemp').addClass('fn-hide');
	}
};
$('#kj-cart-sharetemp').click(function(){
	alert('微博接口超时，请重新发送微博！');
	return false;
});

// cart
var cartObj = $('#kj-cart');
var cartList = cartObj.find('.cartlist');
cartObj.hover(function(){
	reviewCart();
	cartObj.addClass('current');
	cartList.css('margin-left', -cartList.width() + 88);
}, function(){
	cartObj.removeClass('current');
});

// 创建cart
var cartItemObj = cartObj.find('#kj-cart-item');
var cartItem = $.trim(cartItemObj.val());
cartItemObj.remove();
var cartWrap = cartObj.find('#kj-cart-wrap');
var reviewCart = function(){
	$('#kj-cart-share').addClass('fn-hide');
	$('#kj-cart-sharetemp').removeClass('fn-hide');
	cartWrap.html('');
	var totleCount = 0;
	var totlePrice = 0;
	$.each(cartData, function(id, data){
		if (data['title']) {
			totleCount ++;
			var newItem = cartItem;
			$.each(data, function(key, val){
				var newReg = new RegExp('{\\$' + key + '}', 'g');
				newItem = newItem.replace(newReg, val);
				if (key == 'price') {
					totlePrice += + val;
				}
			});
			var newItemObj = $(newItem);
			newItemObj.find('.del a').click(function(){
				var id = $(this).data('id');
				delete cartData[id];
				reviewCart();
				wrapObj.find('.kj-item-' + id + ' .contain').removeClass('current');
				return false;
			});
			cartWrap.append(newItemObj);
		} else {
			delete cartData[id];
		}
	});
	cartObj.find('#kj-cart-count').html(totleCount);
	cartObj.find('#kj-cart-price').html(totlePrice);
	shareBtn();
};

// cart btn
function fnShare(){
	var baseUrl = 'http://fwowo.com/menu/m.html?sign=' + sign;
	var baseContent = '亲爱的 ';
	if (sign == 'home') {
		baseContent += '@小佳v多多，我想吃你烧的 ';
	} else {
		baseContent += '@你的好友，我想吃 ' + $('#kj-h1').html() + $('#kj-h2').html() + ' 的 ';
	}
	var itemId = '';
	var itemTitle = '';
	$.each(cartData, function(id, val){
		if (itemId != '') itemId += ',';
		if (itemTitle != '') itemTitle += '、';
		itemId += id;
		itemTitle += val['title'];
	});
	if (itemId != '') baseUrl += '&item=' + itemId;
	if (itemTitle != '') {
		baseContent += itemTitle;
	} else {
		baseContent = '';
	}	
	return {
		shareUrl: baseUrl,
		shareContent: baseContent
	}
}
// 创建弹出框
kf.use('overlay1.0', function(){
	var overlay = new kf.overlay({
		width: '400',
		headContent: '生成菜单地址：',
		bodyContent: '<div class="content">http://fwowo.com/menu/m.html?sige=' + sign + '</content>',
		mask: true,
		maskClose: true
	});
	overlay.ready();
	$('#kj-cart-url').click(function(){
		var share = fnShare();
		overlay.content({
			bodyContent: '<div class="content">' + share['shareUrl'] + '</content>',
		});
		overlay.show();
		return false;
	});
});