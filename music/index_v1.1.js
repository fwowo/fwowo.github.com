kf['audio'] = function(){
	// 公用常量
	this.player = document.getElementById('kj-audio');
	this.rand = Math.random();
	this.topicData = {}; // 歌单数据
	this.songData = {}; // 歌曲数据
	
	// 定义公用变量
	this.mySong = this.getCookie(); // 我的歌单
	this.tpSong = []; // 指定专题歌单
	this.playType = 'mySong'; // 指定播放器歌单类型
	this.playIndex = 0; // 播放序号
	this.playId = ''; // 播放的歌曲ID
	
	this.init();
};
kf.augment(kf['audio'], {
	init: function(){
		var _this = this;
		// audio支持情况
		this.isAudio();
		if (this.audioState) {
			// 火狐audio高度是57
			var audioHeight = $('#kj-audio').height();
			if (audioHeight > 30) {
				$('.u-player .bar').height(audioHeight);
				$('.u-player .bar').css('line-height', audioHeight + 'px');
				$('.u-playertemp').height($('.u-player').height() + 1);
				$('.u-player .btn').css('margin-top', Math.ceil((audioHeight - 30) / 2) + 'px');
			}
			// 调整音量
			this.player.volume = 0.8;
			// 监控播放器
			this.player.addEventListener('ended', function(){
				_this.autoPlay();
			}, false);
		} else {
			$('.u-player .player').html(this.audioErrMsg);
			$('.u-player .title').addClass('fn-hide');
			$('.u-player .btn').addClass('fn-hide');
		}
		// 获取模板
		var topicModelObj = $('#kj-topic-model');
		this.topicModel = $.trim(topicModelObj.val());
		topicModelObj.remove();
		var songModelObj = $('#kj-song-model');
		this.songModel = $.trim(songModelObj.val());
		songModelObj.remove();
		var mysongModelObj = $('#kj-mysong-model');
		this.mysongModel = $.trim(mysongModelObj.val());
		mysongModelObj.remove();
		// 创建主题列表
		this.createTopic();
		// 绑定歌单按钮
		$('.kj-song .back a').click(function(){
			_this.changePage('topic');
		});
		$('.kj-mysong-btn').click(function(){
			$('.u-player .btn').removeClass('fn-hide');
			$(this).addClass('fn-hide');
			_this.changePage('mysong');
		});
		$('.kj-topic-btn').click(function(){
			$('.u-player .btn').removeClass('fn-hide');
			$(this).addClass('fn-hide');
			_this.changePage('topic');
		});
	},
	isAudio: function(){
		var state = !!(this.player.canPlayType);
		var msg = '';
		if (state) {
			if (this.player.canPlayType('audio/mpeg') == '') {
				state = false;
				var ua = navigator.userAgent.toLowerCase();
				if (ua.indexOf('chrome') > -1) {
					msg = '此浏览器版本不支持播放audio/mpeg音频类型文件，请升级或更换浏览器版本';
				} else {
					msg = '此浏览器不支持播放audio/mpeg音频类型文件，推荐使用Chrome浏览器';
				}
			}
		} else {
			msg = '此浏览器不支持HTML5的audio标签，推荐使用Chrome浏览器';
		}
		this.audioState = state;
		this.audioErrMsg = msg;
	},
	// 切换版面
	changePage: function(pagename, sign){
		if (pagename == 'song') {
			$('.kj-topic').addClass('fn-hide');
			$('.kj-mysong').addClass('fn-hide');
			$('.kj-song').removeClass('fn-hide');
			this.createSong(sign);
		} else if (pagename == 'mysong') {
			$('.kj-topic').addClass('fn-hide');
			$('.kj-song').addClass('fn-hide');
			$('.kj-mysong').removeClass('fn-hide');
			this.createMySong();
		} else {
			$('.kj-song').addClass('fn-hide');
			$('.kj-mysong').addClass('fn-hide');
			$('.kj-topic').removeClass('fn-hide');
		}
	},
	// 公用分页
	createPage: function(obj, totalpage, fn) {
		obj.html('');
		for (i=1; i<=totalpage; i++) {
			var newPage = $('<a href="javascript:void(0)" data-page="' + i + '">' + i +'</a>');
			obj.append(newPage);
			newPage.click(function(){
				var page = $(this).data('page');
				obj.find('a').removeClass('current');
				$(this).addClass('current');
				fn(page);
			});
		}
		obj.find('a:eq(0)').click();
	},
	// 创建歌单图列	
	createTopic: function(){
		var _this = this;
		var ajaxUrl = 'json/list.txt?r=' + this.rand;
		$.getJSON(ajaxUrl, function(response){
			var data = response.data;
			var dataLen = data.length;
			var topicObj = $('.kj-topic ul');
			$.each(data, function(){
				var sign = this['sign'];
				_this.topicData[sign] = this;
				var content = _this.topicModel;
				$.each(this, function(key, val){
					var newReg = new RegExp('{\\$' + key + '}', 'g');
					content = content.replace(newReg, val);
				});
				var newObj = $(content);
				newObj.addClass('fn-hide');
				topicObj.append(newObj);
				newObj.click(function(){
					_this.changePage('song', sign);
				});
			});
			var pagesize = 15;
			var totalPage = Math.ceil(dataLen / pagesize);
			_this.createPage($('.kj-topic-page'), totalPage, _this.showTopicPage);
			// 播放我的歌单
			if (_this.mySong.length > 0) {
				_this.playType = 'mySong';
				_this.play(0);
			}
			// 展现我的歌单按钮
			$('.kj-mysong-btn').removeClass('fn-hide');
		});
	},
	// 分页回调	
	showTopicPage: function(page){
		var pagesize = 15;
		var topicLiObj = $('.kj-topic li');
		var start = (page - 1) * pagesize;
		var end = page * pagesize;
		topicLiObj.addClass('fn-hide');
		for (i=start; i<end; i++) {
			topicLiObj.eq(i).removeClass('fn-hide');
		}
	},
	// 创建歌单
	createSong: function(sign){
		var _this = this;
		// 设置歌单信息
		$('.kj-song .list ul').html('');
		$('.kj-song .topic .pic').html('<img src="' + this.topicData[sign]['img'] + '"></img>');
		$('.kj-song .topic .author').html(this.topicData[sign]['author']);
		$('.kj-song .topic .title').html(this.topicData[sign]['title']);
		$('.kj-song .topic .content').html(this.topicData[sign]['content']);
		// 获取歌单数据
		this.getSongData(sign, function(){
			// 显示歌单歌曲列表
			_this.showSong(sign);
		});
	},
	// 获取歌单数据
	getSongData: function(sign, callback){
		if (!this.topicData[sign]['song']) {
			var _this = this;
			var ajaxUrl = 'json/' + sign + '.txt?r=' + this.rand;
			$.getJSON(ajaxUrl, function(response){
				var data = response.data;
				_this.topicData[sign]['song'] = data;
				$.each(data, function(){
					_this.songData[this.id] = this;
				});
				callback();
			});
		} else {
			callback();
		}
	},
	// 展示歌单歌曲列表
	showSong: function(sign){
		var _this = this;
		var data = this.topicData[sign]['song'];
		var dataLen = data.length;
		var songObj = $('.kj-song .list ul');
		var num = 0;
		var tempSong = [];
		$.each(data, function(index){
			tempSong.push(this['id']);
			num ++;
			var numtext = num;
			if (num < 10) numtext = '0' + num;
			var content = _this.songModel;
			content = content.replace('{$index}', numtext);
			$.each(this, function(key, val){
				var newReg = new RegExp('{\\$' + key + '}', 'g');
				content = content.replace(newReg, val);
			});
			var newObj = $(content);
			if (_this.playType == 'tpSong' && _this.playId == this['id']) {
				newObj.addClass('current');
			}
			newObj.addClass('fn-hide');
			songObj.append(newObj);
			newObj.find('.play').click(function(){
				_this.playType = 'tpSong';
				_this.tpSong = tempSong;
				_this.play(index);
				return false;
			});
			newObj.find('span').click(function(){
				newObj.find('.play').click();
			});
			newObj.find('.add').click(function(){
				var liObj = $(this).parent();
				var id = liObj.data('id');
				_this.addSong(id);
				liObj.find('.tip').css({'top': 0, 'opacity': 0, 'display': 'block'});
				liObj.find('.tip').animate({
					opacity: 0.8,
					top: -25
				}, 'fast', function() {
					setTimeout(function(){
						liObj.find('.tip').fadeOut('fast');
					}, 1000);
				});
				return false;
			});
		});
		var pagesize = 15;
		var totalPage = Math.ceil(dataLen / pagesize);
		this.createPage($('.kj-song-page'), totalPage, this.showSongPage);
	},
	// 歌单歌曲列表分页
	showSongPage: function(page){
		var pagesize = 15;
		var songLiObj = $('.kj-song .list li');
		var start = (page - 1) * pagesize;
		var end = page * pagesize;
		songLiObj.addClass('fn-hide');
		for (i=start; i<end; i++) {
			songLiObj.eq(i).removeClass('fn-hide');
		}
	},
	// 创建我的歌单
	createMySong: function(){
		$('.kj-mysong .list ul').html('');
		this.rankMySong(0);
	},
	// 排序显示我的歌单
	rankMySong: function(index){
		var _this = this;
		var id = this.mySong[index];
		if (id == '') {
			id = '_';
			this.mySong[index] = '_';
		}
		if (id && id != '_') {
			var vData = this.songData[id];
			if (vData) {
				this.showMySong(index);
			} else {
				var sign = id.split('_')[0];
				if (this.topicData[sign]) {
					this.getSongData(sign, function(){
						if (_this.songData[id]) {
							_this.showMySong(index);
						} else {
							_this.mySong[index] = '_';
							_this.rankMySong(index + 1);
						}
					});
				} else {
					this.mySong[index] = '_';
					this.rankMySong(index + 1);
				}
			}
		} else {
			this.rankMySong(index + 1);
		}
	},
	// 显示我的歌单内容
	showMySong: function(index){
		var _this = this;
		var id = this.mySong[index];
		var vData = this.songData[id];
		var num = index + 1;
		var numtext = num;
		if (num < 10) numtext = '0' + num;
		var songObj = $('.kj-mysong .list ul');
		var content = this.mysongModel;
		content = content.replace('{$index}', numtext);
		$.each(vData, function(key, val){
			var newReg = new RegExp('{\\$' + key + '}', 'g');
			content = content.replace(newReg, val);
		});
		var newObj = $(content);
		if (_this.playType == 'mySong' && _this.playId == id) {
			newObj.addClass('current');
		}
		songObj.append(newObj);
		newObj.find('.play').click(function(){
			_this.playType = 'mySong';
			_this.play(index);
			return false;
		});
		newObj.find('span').click(function(){
			newObj.find('.play').click();
		});
		newObj.find('.del').click(function(){
			var liObj = $(this).parent();
			var id = liObj.data('id');
			_this.delSong(id);
			newObj.fadeOut('fast', function(){
				_this.createMySong();
			});
			return false;
		});
		if (index + 1 < this.mySong.length) {
			this.rankMySong(index + 1);
		} else {
			this.setCookie();
		}
	},
	// 播放器播放操作
	play: function(index){
		// 判断列表是否有可用数据
		var playSong = this[this.playType];
		if (index == 0) {
			var zero = true;
			$.each(playSong, function(){
				if (this != '_') zero = false;
			});
		}
		if (!zero) {
			var _this = this;
			this.playIndex = index;
			if (playSong[index] && playSong[index] != '_') {
				var id = playSong[index];
				if (id == '') {
					this[this.playType][index] = '_';
					this.autoPlay();
				} else {
					if (this.songData[id]) {
						this.setPlay(id);
					} else {
						var sign = id.split('_')[0];
						if (this.topicData[sign]) {
							this.getSongData(sign, function(){
								if (_this.songData[id]) {
									_this.setPlay(id);
								} else {
									_this[_this.playType][index] = '_';
									_this.autoPlay();
								}
							});
						} else {
							this[this.playType][index] = '_';
							this.autoPlay();
						}
					}
				}
			} else {
				this.autoPlay();
			}
		}
	},
	// 设置播放器启动播放
	setPlay: function(id){
		this.playId = id;
		var playSongData = this.songData[id];
		var mp3 = playSongData['mp3'];
		this.player.src = this.realMp3(mp3);
		this.player.play();
		$('.u-player .title').html('正在播放：' + playSongData['author'] + ' - ' + playSongData['title']);
		$('.u-song .list li').removeClass('current');
		if (this.playType == 'tpSong') {
			if($('.kj-songid-' + id)) $('.kj-songid-' + id).addClass('current');
		} else {
			if($('.kj-mysongid-' + id)) $('.kj-mysongid-' + id).addClass('current');
		}
	},
	// 获取mp3真实地址
	realMp3: function(mp3) {
		if (mp3.indexOf('http://') < 0) {
			var temp = mp3.split(':');
			if (temp[0] == '9ku') {
				var file = Math.floor((temp[1] / 1000) + 1);
				mp3 = 'http://mp3.9ku.com/file2/' + file + '/' + temp[1] + '.mp3';
			}
		}
		return mp3;
	},
	// 自动切换播放
	autoPlay: function(){
		var songLen = this[this.playType].length;
		if (songLen > 0) {
			var index = this.playIndex;
			index ++;
			if (index >= songLen) index = 0;
			this.play(index);
		}
	},
	// 添加歌曲
	addSong: function(id){
		if ($.inArray(id, this.mySong) < 0) {
			this.mySong.push(id);
			this.setCookie();
		}
	},
	// 删除歌曲
	delSong: function(id){
		var index = $.inArray(id, this.mySong);
		if (index >= 0) {
			this.mySong[index] = '_';
			this.setCookie();
			// 重新设置播放序号
			if (this.playType == 'mySong' && index <= this.playIndex) {
				this.playIndex --;
			}
		}
	},
	// 保存我的歌单
	setCookie: function(){
		if (this.mySong.length > 0) {
			// 去除删除或无效的id
			var mySongText = this.mySong.join(',');
			mySongText = mySongText.replace('_,', '');
			mySongText = mySongText.replace(',_', '');
			this.mySong = mySongText.split(',');
			// 保存最新100条数据
			var maxLen = 100;
			var songLen = this.mySong.length;
			if (songLen > maxLen) {
				var newMySong = [];
				for (i = songLen - maxLen; i< songLen; i++) {
					newMySong.push(this.mySong[i]);
				}
				this.mySong = newMySong;
				mySongText = newMySong.join(',');
			}
			// 写入cookie
			var Days = 100; // 100天过期
			var expDays = new Date();
			expDays.setTime(expDays.getTime() + Days*24*60*60*1000);
			document.cookie = 'mysong='+ escape(mySongText) + ";expires=" + expDays.toGMTString();
		}
	},
	// 获取我的歌单
	getCookie: function(){
		var mySongText = '';
		var arr = document.cookie.match(new RegExp("(^| )mysong=([^;]*)(;|$)"));
		if (arr != null) {
			mySongText = unescape(arr[2]);
		}
		if (mySongText == '') {
			return [];
		} else {
			return mySongText.split(',');
		}
	}
});
var myAudio = new kf.audio();