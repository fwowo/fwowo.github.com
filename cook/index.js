var rand = Math.random();

// 获取模板
var wrapObj = $('#kj-wrap');
var navObj = $('#kj-nav');

var modelObj = $('#kj-model');
var model = $.trim(modelObj.val());
modelObj.remove();

var itemObj = $('#kj-item');
var modelItem = $.trim(itemObj.val());
itemObj.remove();

// 获取数据
$.getJSON( 'json/cook.txt?r=' + rand, function(response){
	var menuData = {};
	var data = response.data;
	$.each(data, function(){
		var cname = this['class'];
		if (!menuData[cname]){
			menuData[cname] = [];
		}
		menuData[cname].push({
			id: this['id'],
			img: this['img'],
			title: this['title'],
			em: this['em']
		});
	});
	var ci = 65;
	$.each(menuData, function(cname, list){
		var mark = String.fromCharCode(ci);
		var menuLink = $('<a href="javascript:void(0)">' + mark + '. ' + cname + '</a>');
		var newModel = $(model.replace('{$class}', mark + '. ' + cname));
		wrapObj.append(newModel);
		navObj.append(menuLink);
		menuLink.click(function(){
			navObj.find('a').removeClass('current');
			$(this).addClass('current');
			$('.kj-tr').addClass('fn-hide');
			newModel.removeClass('fn-hide');
			if (newModel.data('load') != 'ok') {
				newModel.data('load', 'ok');
				showItem(newModel, list);
			}
			return false;
		});		
		ci ++;
	});
	navObj.find('a:eq(0)').click();
});

// 显示数据
var showItem = function(obj, data){
	var rank = -1;
	var len = data.length;
	var tdObj = obj.find('.u-td');
	function rankShow(){
		rank ++;
		if (rank < len) {
			var val = data[rank];
			var newImg = new Image();
			newImg.src = val['img'];
			if (newImg.complete) {
				rankShowApp(val);
			} else {
				newImg.onload = function(){
					rankShowApp(val);
				};
				newImg.onerror = function(){
					rankShow();
				};
			}
		}
	}
	function rankShowApp(val){
		// 获取最短的td
		var minObj = tdObj.eq(0);
		var minHeight = minObj.height();
		tdObj.each(function(){
			if ($(this).height() < minHeight) {
				minHeight = $(this).height();
				minObj = $(this);
			}
		});
		// 创建数据
		var newItem = modelItem;
		newItem = newItem.replace('{$img}', val['img']);
		newItem = newItem.replace('{$title}', val['title']);
		newItem = newItem.replace('{$em}', val['em']);
		var newItemObj = $(newItem);		
		newItemObj.click(function(){
			showbox(val['id']);
		});
		// 插入数据
		newItemObj.css('display', 'none');
		minObj.append(newItemObj);
		newItemObj.fadeIn('fast', rankShow);
	}
	rankShow();
};

// 显示box
var showbox = function(id){
	var href = 'page/' + id.toLowerCase() + '.html?r=' + rand;
	$('#kj-box').load(href);
	$('.layer-bg').removeClass('fn-hide');
	var docTop = $(document).scrollTop();
	var boxLeft = ($('.layer-bg').width() - $('.layer').width()) / 2;
	$('.layer').css({'left': boxLeft, 'top': (docTop + 40)});
	$('.layer').removeClass('fn-hide');
};
// 关闭box
$('.layer .u-close').click(function(){
	$('#kj-box').html('');
	$('.layer').addClass('fn-hide');
	$('.layer-bg').addClass('fn-hide');
	return false;
});
$('.layer-bg').click(function(){
	$('.layer .u-close').click();
});