define(['zepto','base'], function($,base){
	function Sidebar(){
		this.cfg = {
			$anchor:null,
			sideL : true,
			sideR : true,
			btnL  : true,
			btnR  : true
		};

		this.file = "sidebar.js";
		this.$body = null;
		this.$sideL = null;
		this.$sideR = null;
		this.$btnL = null;
		this.$btnR = null;
		this.$cover = null;
		this.state = 0;//0:两侧Sidebar都关闭；1:左侧Sidebar打开；2:右侧Sidebar打开
	}

	Sidebar.prototype.htmls = {
		body : "<div class='app_body'>Body</div>",
		side : "<div class='app_side'>Sidebar</div>",
		btn	 : "<a href='#' class='sideBtn oi' data-glyph='menu' aria‐hidden=true></a>",
		cover: "<div class='body_cover'></div>"
	};

	Sidebar.prototype.render = function(args){
		console.log('sidebar render')
		var th = this;
		var cfg = $.extend(th.cfg,args);

		th.$body = $(th.htmls.body);
		base.html(cfg.$anchor, th.$body, th.file);

		if(true===cfg.sideL){
			th.$sideL = $(th.htmls.side).addClass('side_L');
			cfg.$anchor.append(th.$sideL);
			if(true===cfg.btnL){
				th.$btnL = $(th.htmls.btn).addClass('sidebtn_L').attr('id','sidebtn_L');	
				th.$body.append(th.$btnL);
			}
		}

		if(true===cfg.sideR){
			th.$sideR = $(th.htmls.side).addClass('side_R');
			cfg.$anchor.append(th.$sideR);
			if(true===cfg.btnR){
				th.$btnR = $(th.htmls.btn).addClass('sidebtn_R').attr('id','sidebtn_R');
				th.$body.append( th.$btnR );
			}
		}

		cfg.$anchor.find('.sideBtn').click(function(e){
			e.stopPropagation();
			e.preventDefault();

			switch($(this).attr('id')){
				case 'sidebtn_L':
					th.openLSide();
				break;
				case 'sidebtn_R':
					th.openRSide();
				break;
			}
		});
	};//End render

	Sidebar.prototype.openLSide = function(){
		console.log('openLSide');
		var th = this;
		th.$sideL.addClass('side_L_open');
		th.$body.addClass('slideToRight');
		th.appendCover();
		th.state = 1;
	};

	Sidebar.prototype.openRSide = function(){
		console.log('openRSide');
		var th = this;
		th.$sideR.addClass('side_R_open');
		th.$body.addClass('slideToLeft');
		th.appendCover();
		th.state = 2;
	};

	Sidebar.prototype.appendCover = function(){
		console.log('appendCover');
		var th = this;
		th.$cover = $(th.htmls.cover);
		th.$body.append(th.$cover);
		th.$cover.click(th.removeCover.bind(th));
	};

	Sidebar.prototype.removeCover = function(e){
		console.log('removeCover');
		e.stopPropagation();
		e.preventDefault();
		var th = this;
		th.$cover.remove();
		switch(th.state){
			case 1:
				th.$body.removeClass('slideToRight');
				th.$sideL.removeClass('side_L_open');
			break;
			case 2:
				th.$body.removeClass('slideToLeft');
				th.$sideR.removeClass('side_R_open');
			break;
		}
		th.state = 0;
	};

	return {Sidebar:Sidebar};
})