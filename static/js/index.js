$(function(){
	var wrapWidth = $('.u-wrap').width() - 20;
	var tdWidth = $('.u-td').width();
	var tdLen = Math.floor(wrapWidth / tdWidth);
	$('.u-wrap').width(tdWidth * tdLen);
	var tdObj = [];
	$('.u-wrap').html('');
	for (i=0; i<tdLen; i++) {
		tdObj[i] = {
			"obj": $('<div class="u-td"></div>'),
			"height": 0
		};
		$('.u-wrap').append(tdObj[i].obj);
	}
	var minIndex = function(){
		var index = 0;
		for (i=0; i<tdLen; i++) {
			if (tdObj[i].height < tdObj[index].height) {
				index = i;
			}
		}
		return index;
	};
	$.getJSON("index.txt?r=" + Math.random(), function(response){
		var data = response.data;
		$.each(data, function(){
			var liObj = $('<div class="wrap">\
				<div class="contain">\
					<div class="pic"><a target="_blank" href="' + this.url + '"><img src="' + this.pic + '"></a></div>\
					<div class="title">' + this.title + '</div>\
				</div>\
			</div>');
			var pic = new Image();
			pic.src = this.pic;
			if (pic.complete) {
				var index = minIndex();
				tdObj[index].obj.append(liObj);
				tdObj[index].height = tdObj[index].obj.height();
			} else {
				pic.onload = function(){
					var index = minIndex();
					tdObj[index].obj.append(liObj);
					tdObj[index].height = tdObj[index].obj.height();
				};
			}
		});
	});
});