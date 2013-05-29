kf['slide'] = function(obj, config){
	this.config = {
		effect: 'horizontal', // vertical
		autoPlay: true,
		autoTime: 5000,
		autoRound: true,
		iconState: true,
		iconEvent: 'mouseover'
	};
	if (config) {
		$.extend(this.config, config);
	}
	if (typeof(obj) == 'object') {
		this.obj = obj;
	} else {
		this.obj = $('#' + obj);
	}
	this.wrap = this.obj.find('.kf-slide-wrap');
	this.content = this.wrap.find('.kf-slide-content');
	this.pannel = this.content.find('.kf-slide-pannel');
	if (this.content.length == 0) {
		this.content = this.wrap.find('ul');
	}
	if (this.pannel.length == 0) {
		this.pannel = this.content.find('li');
	}
	this.length = this.pannel.length;
	if (this.length > 1) {
		this.ready();
	}
};
kf.augment(kf['slide'], {
	// 初始化
	ready: function(){
		// 是否循环
		if (this.config['autoRound']) {
			this.pannel.eq(0).clone().appendTo(this.content);
			this.pannel.eq(-1).clone().prependTo(this.content);
			this.pannel = this.content.find('.kf-slide-pannel');
			if (this.pannel.length == 0) {
				this.pannel = this.content.find('li');
			}
			this.index = 1;
			this.length = this.pannel.length;
		} else {
			this.index = 0;
		}
		// 滑动方式
		if (this.config['effect'] == 'horizontal') {
			this.content.addClass('fn-clear');
			this.pannel.addClass('fn-left');
			this.long = this.pannel.width();
			this.content.width(this.long * this.length);
			this.wrap.scrollLeft(this.long * this.index);
		} else {
			this.long = this.pannel.height();
			this.wrap.scrollTop(this.long * this.index);
		}
		// 是否有icon
		if (this.config['iconState']) {
			this.creaticon();
		}
		// 是否自动播放
		if (this.config['autoPlay']) {
			var _this = this;
			this.autoTime = setTimeout(function(){
				_this.next();
			}, this.config['autoTime']);
		}
	},
	play: function(){
		var _this = this;
		// 是否有icon
		if (this.config['iconState']) {
			this.icon.removeClass('current');
			if (this.config['autoRound']) {
				var changeIndex = this.index;
				if (this.index == 0) {
					changeIndex = this.length - 2;
				} else if (this.index == this.length - 1) {
					changeIndex = 1;
				}
				var index = changeIndex - 1;
			} else {
				var index = this.index;
			}			
			this.icon.eq(index).addClass('current');
		}
		// 清除重建自动时间
		if (this.config['autoPlay']) {
			clearTimeout(this.autoTime);
			this.autoTime = setTimeout(function(){
				_this.next();
			}, this.config['autoTime']);
		}
		// 滑动动画
		goLong = this.long * this.index;
		if (this.config['effect'] == 'horizontal') {
			this.wrap.animate({
				scrollLeft: goLong
			});
		} else {
			this.wrap.animate({
				scrollTop: goLong
			});
		}
	},
	go: function(index){
		if (index >= 0) {
			this.index ++;
		} else {
			this.index --;
		}
		// 是否循环
		if (this.config['autoRound']){
			if (this.index < 0 || this.index >= this.length) {
				if (this.index < 0) {
					var changeIndex = this.length - 2;
					this.index = changeIndex - 1;
				} else {
					var changeIndex = 1;
					this.index = changeIndex + 1;
				}
				if (this.config['effect'] == 'horizontal') {
					this.wrap.scrollLeft(this.long * changeIndex);
				} else {
					this.wrap.scrollTop(this.long * changeIndex);
				}
			}
		} else {
			if (this.index < 0) {
				this.index = this.length - 1;
			} else if (this.index >= this.length) {
				this.index = 0;
			}
		}
		this.play();
	},
	next: function(){
		this.go(1);
	},
	prev: function(){
		this.go(-1);
	},
	goto: function(index){
		// 是否循环
		if (this.config['autoRound']){
			if (this.index == 0 || this.index == this.length - 1) {
				if (this.index == 0) {
					var changeIndex = this.length - 2;
				} else {
					var changeIndex = 1;
				}
				if (this.config['effect'] == 'horizontal') {
					this.wrap.scrollLeft(this.long * changeIndex);
				} else {
					this.wrap.scrollTop(this.long * changeIndex);
				}
			}
		}
		this.index = index;
		this.play();
	},
	creaticon: function(){
		var _this = this;
		this.iconObj = $('<ul class="kf-slide-icon"></ul>');
		if (this.config['autoRound']){
			var start = 1, end = this.length - 1;
		} else {
			var start = 0, end = this.length;
		}
		var j = 0;
		for (i=start; i<end; i++) {
			j ++;
			var newObj = $('<li data-index="' + i + '">' + j + '</li>');
			newObj.on(this.config['iconEvent'], function(){
				_this.goto($(this).data('index'));
			});
			this.iconObj.append(newObj);
		}
		this.icon = this.iconObj.find('li');
		this.icon.eq(0).addClass('current');
		this.obj.append(this.iconObj);
	}
});