// 获取参数
var hash = document.location.hash;
if (hash != '') {
	var id = hash.replace('#', '');
	var sign = id.split('_')[0];
} else {
	location.href = '/wallpaper/';
}

var showFull = function(sign, id){
	// loading
	$('#kj-pic').html('<div class="loadimg">\
		<div class="loadtxt">loading</div>\
		<div class="loading"></div>\
	</div>');
	$('#kj-size').html('&nbsp;');
	
	// 获取内容
	$.getJSON('json/' + sign + '.txt?r=' + Math.random(), function(response){
		var data = response.data;
		var dataLen = data.length;
		var thisData = null;
		var thisIndex = -1;
		for (i=0; i<dataLen; i++) {
			if (data[i]['id'] == id) {
				thisIndex = i;
				thisData = data[i];
				break;
			}
		}
		if (thisData) {
			// 获取前后id
			var getNext = function(){
				var preId = thisIndex - 1;
				var nextId = thisIndex + 1;
				$('#kj-pic').height($('#kj-pic img').height());
				var turnTop = ($('#kj-pic').height() - 120) / 2;
				if (preId > -1) {
					var turnPreId = data[preId]['id'];
					var turnPreObj = $('<a href="#' + turnPreId +'" class="u-turn"><div class="arrows"></div></a>');
					turnPreObj.css('margin-top', turnTop);
					$('#kj-pic').prepend(turnPreObj);
					turnPreObj.click(function(){
						showFull(sign, turnPreId);
					});
				}
				if (nextId < dataLen) {
					var turnNextId = data[nextId]['id'];
					var turnNextObj = $('<a href="#' + turnNextId +'" class="u-turn u-turn-next"><div class="arrows"></div></a>');
					turnNextObj.css('margin-top', turnTop);
					$('#kj-pic').prepend(turnNextObj);
					turnNextObj.click(function(){
						showFull(sign, turnNextId);
					});
				}
				// 显示上一下一
				$('#kj-pic').hover(function(){
					$(this).find('.u-turn').removeClass('fn-hide');
				}, function(){
					$(this).find('.u-turn').addClass('fn-hide');
				});
			};
			// 展示当前图片
			var newImg = new Image();
			newImg.src = thisData['fullsize'];
			if (newImg.complete) {
				$('#kj-size').html(newImg.width + 'x' + newImg.height);
				$('#kj-pic').html(newImg);
				getNext();
			} else {
				newImg.onload = function(){
					$('#kj-size').html(newImg.width + 'x' + newImg.height);
					$('#kj-pic').html(newImg);
					getNext();
				};
				newImg.onerror = function(){
					// 图片加载失败
					var errPic = $('<p class="error"><a href="#"><img src="img/jpeg.png"></a></p>')
					$('#kj-pic').html('');
					$('#kj-pic').append(errPic);
					$('#kj-pic').append('<p class="errtxt">图片加载失败</p>');
					errPic.click(function(){
						showFull(sign, id);
						return false;
					});
				};
			}
		} else {
			$('#kj-pic').html('');
			$('#kj-pic').append('<p class="error"><img src="img/jpeg.png"></p>');
			$('#kj-pic').append('<p class="errtxt">图片加载失败</p>');
		}
	}).error(function(){
		$('#kj-pic').html('');
		$('#kj-pic').append('<p class="error"><img src="img/jpeg.png"></p>');
		$('#kj-pic').append('<p class="errtxt">图片加载失败</p>');
	});
};
showFull(sign, id);