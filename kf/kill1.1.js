kf['kill'] = function(config){
	this.config = {
		'msie': '6'
	};
	if (config) {
		$.extend(this.config, config);
	}
	
	var rMsie = /(msie) ([\w.]+)/,
		ua = navigator.userAgent.toLowerCase();
	var uaMatch = rMsie.exec(ua) || [];
	var browser = {browser: uaMatch[1] || "", version: uaMatch[2] || ""};
	if (browser['browser'] == 'msie') {
		var version = this.config['msie'].split(',');
		$.each(version, function(){
			if (browser['version'] == this) {
				this.init();
				if (this.config['callback']) {
					this.config['msie']();
				}
			}
		});
	}
};
kf.augment(kf['kill'], {
	init: function(){
		if ($('.kf-mask').length == 0) {
			this.mask = $('<div class="kf-mask" style="position:absolute;left:0;right:0;top:0;bottom:0;z-index:90;background-color:#000;display:none;opacity:0.5;filter:alpha(opacity=50);"></div>');
			this.mask.css({
				'width': $(document).width(),
				'height': $(document).height()
			});
			$('body').append(this.mask);
		} else {
			this.mask = $('.kf-mask');
		}
		if ($('.kf-kill').length == 0) {
			this.kill = $('<div class="kj-kill" style="position:absolute;top:30px;width:420px;z-index:99;background-color:#141414;color:#fff;"></div>');
			this.message = $('<div class="message" style="padding:14px 21px;font-size:14px;line-height:26px;">若您看到此信息，表明您当前的浏览器版本已太陈旧。为了您电脑系统的安全，及更好的上网体验，本站有义务提醒您是该更新或更换目前的浏览器了。以下是本站开发人员为您推荐的优秀浏览器，尤其是Google Chrome浏览器，绝对是快速上网必备浏览器。</div>');
			this.browser = $('<ul class="browser" style="height:92px;padding-top:2px;background-color:#2c2c2c;">\
				<li>\
					<p><a target="_blank" href="http://firefox.com.cn/download/"><img src="http://img02.taobaocdn.com/tps/i2/T1MgSVXsdgXXXbJaDm-70-70.gif"></a></p>\
					<p>Mozilla Firefox</p>\
				</li>\
				<li>\
					<p><a target="_blank" href="http://support.apple.com/kb/DL1531?viewlocale=zh_CN"><img src="http://img03.taobaocdn.com/tps/i3/T1F9uYXxdaXXXbJaDm-70-70.gif"></a></p>\
					<p>Apple Safari</p>\
				</li>\
				<li>\
					<p><a target="_blank" href="https://www.google.com/intl/zh-CN/chrome/browser/"><img src="http://img04.taobaocdn.com/tps/i4/T1WG5YXwXbXXXbJaDm-70-70.gif"></a></p>\
					<p>Google Chrome</p>\
				</li>\
			</ul>');
			this.browser.find('li').css({
				'float': 'left',
				'width': 140,
				'text-align': 'center',
				'color': '#969696'
			});
			this.exp = $('<div class="exp" style="text-align:right;padding:10px;color:#8a8a8a;">点击图标可进入浏览器下载页面</div>');
			this.kill.append(this.message, this.browser, this.exp);
			$('body').append(this.kill);
		}else {
			this.kill = $('.kf-kill');
		}
		this.show();
		this.center();
		this.auto();
	},
	// 显示
	show: function(){
		this.kill.css('display', 'block');
		this.mask.css('display', 'block');
	},
	// 隐藏
	hide: function(){
		this.kill.css('display', 'none');
		this.mask.css('display', 'none');
	},
	// 居中
	center: function(){
		var winWidth = $(window).width();
		var killWidth = this.kill.width();
		var left = (winWidth - killWidth) / 2;
		this.kill.css({
			'left': left
		});
		this.mask.css({
			'width': $(document).width(),
			'height': $(document).height()
		});
	},
	// 自动
	auto: function(){
		var _this = this;
		$(window).resize(function(){
			_this.center();
		});
	}
});