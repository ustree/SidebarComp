require.config({
	//默认目录
    baseUrl: 'scripts/comps',
    //这里设置的路径是相对与baseUrl
	paths : {
		base  : '../libs/base',
		zepto : '../libs/zepto'
	},
	shim : {
		zepto : {exports:'$'}
	}
});

require(['zepto','sidebar'],function($,siba){
	var sidebar = new siba.Sidebar();
	sidebar.render({
		$anchor: $('#app'),
	});
});