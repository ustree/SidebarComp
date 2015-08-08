define(['zepto'],function($){	
	
	function Base(){
		//系统的基本配置
		this.cfg = {
			log : true //是否开启日志功能
		};
		//系统的path
		this.path = null;
		//初始化系统的path
		var $path =  $('#path');
		if($path!=null)	this.path = $('#path').val();
	}
	
	/**
	 * 获取系统配置是否要打日志
	 * @returns
	 */
	Base.prototype.isLog = function(){
		return this.cfg.log;
	};
	
	/**
	 * 插入静态HTML，并打印js文件名
	 * @param $v
	 * @param html
	 * @param file
	 */
	Base.prototype.html = function($v,html,file){
		$v.html(html);
		$v.prepend("<!-- >>>>>>>>>>>>>>>>>>>>>>> "+file+" >>>>>>>>>>>>>>>>>>>>>>> --");
		$v.append("<!-- <<<<<<<<<<<<<<<<<<<<<<< "+file+" <<<<<<<<<<<<<<<<<<<<<<< -->");
	};
	
	Base.prototype.loadCss = function(cssFile, callback){
		var self = this;
		var href = self.path+'/resources/css/'+cssFile;
		//判断是否已经存在此CSS文件
		var has = false;
		$('link').each(function(index,item){
			if($(item).attr("href") === href){
				has = true;
				return;
			}
		});
		if(!has){
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = href;
			document.head.appendChild(link);
			link.onload = callback;
		}
	};//End loadCss
	
	/**
	 * 打日志
	 * @param msg
	 */
	Base.prototype.log = function(msg){
		var self = this;
		self.cfg.log && console.log(msg);
	};
	
	/**
	 * 打印ajax注解
	 * @param $v
	 * @param file
	 * @param fun
	 * @param url
	 */
	Base.prototype.printComment = function($v,file,fun,url){
		if(null==$v) return;//如果$v为null，return。
		
		var comment = "<!-- " +
			"file:"+file+ " / " +
			"fun:"+fun+ " / " +
			"url:"+url+ 
			" -->";
		
		//避免重复打印注释
		var firstNode = document.getElementById($v.attr("id")).firstChild;
		if(null===firstNode || firstNode.nodeName!=="#comment"){
			$v.prepend(comment);
		}else{
			var oldComment = "<!--"+firstNode.nodeValue+"-->";
			if(oldComment!==comment){
				$v.prepend(comment);
			}
		}
	};//End printComment
	
	Base.prototype.ajax = function(args){
		var self = this;
		var _args = $({
			$v		: null,
			file: null,
			fun	: null,
			type	: 'post',
			url		: null,
			data	: {},
			success	: null
		}).extend({},args);
		
		$.ajax({
			type	:_args.type,
			url		:_args.url,
			data	:_args.data,
			success	:function(res){
				_args.success(res);
				//打印注释
				self.printComment(_args.$v, _args.file, _args.fun, _args.url);
			}
		});
		
	};//End ajax
	
	return new Base();
	
});