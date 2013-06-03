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
kf.use('waterfall1.0', function(){
	var waterfall = new kf.waterfall('kj-waterfall', {
		action: '/index.txt',
		moreBtn: false
	});
});
	