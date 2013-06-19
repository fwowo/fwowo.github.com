kf['overlay'] = function(config){
	this.config = {
		width: 'auto',
		height: 'auto',
		closeBtn: true,
		headContent: null,
		bodyContent: null,
		footContent: null,
		mask: true,
		maskClose: true
	};
	if (config) {
		$.extend(this.config, config);
	}
	this.contentConfig = {
		closeBtn: this.config['closeBtn'],
		headContent: this.config['headContent'],
		bodyContent: this.config['bodyContent'],
		footContent: this.config['footContent']
	}
	this.isReady = false;
	this.isShow = false;
	
	this.position = 'fixed';
	var ua = navigator.userAgent.toLowerCase();
	if (/msie 6/.test(ua)) {
		this.position = 'absolute';
	}
};
kf.augment(kf['overlay'], {
	// 初始化
	ready: function(){
		if (!this.isReady) {
			var _this = this;
			if ($('.kf-overlay').length == 0) {
				this.overlay = $('<div class="kf-overlay fn-hide" style="position:' + this.position + ';z-index:99;"></div>');
				if (this.config['width'] != 'auto') {
					this.overlay.width(this.config['width']);
				}
				if (this.config['height'] != 'auto') {
					this.overlay.height(this.config['height']);
				}
				this.closebtn = $('<a class="kf-overlay-close" href="javascript:void(0);"></a>');
				this.head = $('<div class="kf-overlay-head"></div>');
				this.body = $('<div class="kf-overlay-body"></div>');
				this.foot = $('<div class="kf-overlay-foot"></div>');
				this.overlay.append(this.closebtn, this.head, this.body, this.foot);
				$('body').append(this.overlay);
			} else {
				this.overlay = $('.kf-overlay');
				this.closebtn = this.overlay.find('.kf-overlay-close');
				this.head = this.overlay.find('.kf-overlay-head');
				this.body = this.overlay.find('.kf-overlay-body');
				this.foot = this.overlay.find('.kf-overlay-foot');
			}
			this.closebtn.click(function(){
				_this.hide();
				return false;
			});
			if (this.config['mask']) {
				if ($('.kf-mask').length == 0) {
					this.mask = $('<div class="kf-mask fn-hide" style="position:' + this.position + ';left:0;right:0;top:0;bottom:0;z-index:90;background-color:#000;opacity:0.5;filter:alpha(opacity=50);"></div>');
					$('body').append(this.mask);
				} else {
					this.mask = $('.kf-mask');
				}
				if (this.config['maskClose']) {
					this.mask.click(function(){
						_this.hide();
					});
				}
			}
			this.content();
			this.auto();
			this.isReady = true;
		}
	},
	// 设置内容
	content: function(contentConfig){
		if (contentConfig) {
			$.extend(this.contentConfig, contentConfig);
		}
		if (this.contentConfig['closeBtn']) {
			this.closebtn.removeClass('fn-hide');
		} else {
			this.closebtn.addClass('fn-hide');
		}
		if (this.contentConfig['headContent']) {
			this.head.html(this.contentConfig['headContent']);
			this.head.removeClass('fn-hide');
		} else {
			this.head.addClass('fn-hide');
		}
		if (this.contentConfig['bodyContent']) {
			this.body.html(this.contentConfig['bodyContent']);
			this.body.removeClass('fn-hide');
		} else {
			this.body.addClass('fn-hide');
		}
		if (this.contentConfig['footContent']) {
			this.foot.html(this.contentConfig['footContent']);
			this.foot.removeClass('fn-hide');
		} else {
			this.foot.addClass('fn-hide');
		}
	},
	// 显示
	show: function(){
		this.ready();
		this.overlay.removeClass('fn-hide');
		if (this.config['mask']) {
			this.mask.removeClass('fn-hide');
		}
		this.center();
		this.isShow = true;
	},
	// 隐藏
	hide: function(){
		this.overlay.addClass('fn-hide');
		if (this.config['mask']) {
			this.mask.addClass('fn-hide');
		}
		this.isShow = false;
	},
	// 居中
	center: function(){
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		var overlayWidth = this.overlay.width();
		var overlayHeight = this.overlay.height();
		var left = (winWidth - overlayWidth) / 2;
		var top = (winHeight - overlayHeight) / 2;
		this.overlay.css({
			'left': left,
			'top': top
		});
		if (this.config['mask'] && this.position == 'absolute') {
			this.mask.css({
				'width': $(document).width(),
				'height': $(document).height()
			});
		}
	},
	// 自动
	auto: function(){
		var _this = this;
		$(window).resize(function(){
			if (_this.isShow) {
				_this.center();
			}
		});
	}
});