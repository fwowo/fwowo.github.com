var wrapWidth = $('.u-wrap').width() - 20;
var tdWidth = $('.u-td').width();
var tdLen = Math.floor(wrapWidth / tdWidth);
$('.u-wrap').width(tdWidth * tdLen);
$('.u-wrap').html('');
for (i=0; i<tdLen; i++) {
	var tdObj = $('<div class="u-td kf-waterfall-column"></div>');
	$('.u-wrap').append(tdObj);
}
kf['host'] = '';
kf.use('waterfall1.2', function(){
	var waterfall = new kf.waterfall('kj-waterfall', {
		action: 'json/photo_{$page}.txt',
		effect: 'fade',
		buffer: 'smallimg'
	});
});

var showbox = function(bigimg){
	var docHeight = $(document).height();
	var docTop = $(document).scrollTop();
	$('.layer-bg').height(docHeight);
	$('.layer-bg').removeClass('fn-hide');
	
	var mainLeft = ($('.layer-bg').width() - $('.layer').width()) / 2;
	$('.layer').css({'left': mainLeft, 'top': (docTop + 40)});
	$('.layer').removeClass('fn-hide');
	
	loadPic(bigimg);
};
var closebox = function(id){
	$('.layer').addClass('fn-hide');
	$('.layer-bg').addClass('fn-hide');
	$("#J-info .pic .success").addClass("fn-hide");
};
$('.layer-bg').click(closebox);

var layersize = function(height){
	var docHeight = $(document).height();
	if (docHeight > $('.layer-bg').height()) {
		$('.layer-bg').height(docHeight + 20);
	}
};

var loadPic = function(src){
	$("#J-info .pic .error").addClass("fn-hide");
	$("#J-info .pic .success").addClass("fn-hide");
	$("#J-info .pic .loadimg").removeClass("fn-hide");
	var bigpic = new Image();
	bigpic.src = src;
	if (bigpic.complete) {
		$("#J-info .pic .success").html(bigpic);
		$(bigpic).width("100%");
		$(bigpic).height("auto");
		$("#J-info .pic .loadimg").addClass("fn-hide");
		$("#J-info .pic .error").addClass("fn-hide");
		$("#J-info .pic .success").removeClass("fn-hide");
		layersize();
	} else {
		bigpic.onload = function(){
			$("#J-info .pic .success").html(bigpic);
			$(bigpic).width("100%");
			$(bigpic).height("auto");
			$("#J-info .pic .loadimg").addClass("fn-hide");
			$("#J-info .pic .error").addClass("fn-hide");
			$("#J-info .pic .success").removeClass("fn-hide");
			layersize();
		};
		bigpic.onerror = function(){
			setTimeout(function(){
				$("#J-info .pic .loadimg").addClass("fn-hide");
				$("#J-info .pic .success").addClass("fn-hide");
				$("#J-info .pic .error").removeClass("fn-hide");
				$('#J-info .pic .error a').data("src", src);
				layersize();
			}, 1000);
		};
	}
};
$('#J-info .pic .error a').click(function(){
	if ($(this).data('src')) {
		loadPic($(this).data('src'));
	}
	return false;
});

$('.u-close a').click(function(){
	closebox();
	return false;
});
