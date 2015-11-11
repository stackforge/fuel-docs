var _conv_host = (("https:" == document.location.protocol) ? "https://d9jmv9u00p0mv.cloudfront.net" : "http://cdn-1.convertexperiments.com");
document.write(unescape("%3Cscript src='" + _conv_host + "/js/10012224-10012014.js' type='text/javascript'%3E%3C/script%3E"));

(function () {
	$(window).on("popstate", function (e) {
		var activeTab = location.hash ? $('[href=' + location.hash + ']') : $('[href=#home]');
		if (activeTab.length) {
			activeTab.tab('show');
		} else {
			$('.nav-tabs a:first').tab('show');
		}
	});
})();

function showHashTab(){
	if(location.hash){
		var activeTab = $('[href=' + location.hash + ']');
		if (activeTab.length) {
			activeTab.tab('show');
		}
	}
}


function prepareList(){
	$('#contents ul.simple').find('li:has(ul)').unbind('click').click(function(event) {
		if(this == event.target) {
			$(this).toggleClass('expanded');
			$(this).children('ul').toggle('medium');
		}
		return false;
	}).addClass('collapsed').removeClass('expanded').children('ul').hide();

	$('#contents ul.simple a').unbind('click').click(function() {
		window.open($(this).attr('href'),'_self');
		return false;
	});
}

$(document).ready(function () {
	var url = window.location.pathname;
	var filename = url.substring(url.lastIndexOf('/') + 1);

	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		scroll_top_duration = 700,
	//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function () {
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible');
	});

	//smooth scroll to top
	$back_to_top.on('click', function (event) {
		event.preventDefault();
		$('body,html').animate({
				scrollTop: 0,
			}, scroll_top_duration
		);
	});

	$('.headerlink').each(function () {
		$(this).empty();
	});

	$('[data-toggle="tooltip"]').tooltip();

	ZeroClipboard.config({
		forceHandCursor: false,
		swfPath: "https://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.swf"
	});
	var client = new ZeroClipboard($('.copyMe'));

	client.on("ready", function (readyEvent) {
		client.on("copy", function (event) {
			var clipboard = event.clipboardData;
			clipboard.setData("text/plain");
		});
		client.on('aftercopy', function (event) {
			$(event.target).attr('title', 'Copied!').tooltip('fixTitle').tooltip('show');
		});
	});

	$('h1, h2, h3, h4').hover(function () {
			var headerlink = $(this).children('.headerlink');
			var links = headerlink.children('a');
			$(headerlink, links).css('opacity', '1');
		},
		function () {
			var headerlink = $(this).children('.headerlink');
			var links = headerlink.children('a');
			$(headerlink, links).css('opacity', '.3');
		}
	);

	$('a[data-toggle="tab"]').on('click', function (e) {
		history.pushState({}, '', $(this).attr('href'));
	});

	$('#home a[href=#guides], #home a[href=#downloads]').on('click', function(e){
		var tab = $(this).attr('href');
		$('.nav-tabs a[href="' + tab + '"]').tab('show');
	});

	$('a.toc-backref').contents().unwrap();

	$('ul.nav.navbar-nav > li > a[href="contents.html"]').attr('href', 'index.html');

	prepareList();

});
