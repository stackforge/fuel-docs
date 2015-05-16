var _conv_host = (("https:" == document.location.protocol) ? "https://d9jmv9u00p0mv.cloudfront.net" : "http://cdn-1.convertexperiments.com");
document.write(unescape("%3Cscript src='" + _conv_host + "/js/10012224-10012014.js' type='text/javascript'%3E%3C/script%3E"));

function generateLinks(url, title) {
	var currentLocation = window.location;
	var linkUrl = currentLocation.protocol + '//' + currentLocation.host + currentLocation.pathname + url;
	var facebook = generateFacebook(linkUrl);
	var googlePlus = generateGooglePlus(linkUrl);
	var linkedIn = generateLinkedIn(linkUrl, title);
	var twitter = generateTwitter(linkUrl, title);
	var copyMe = generateCopyButton(linkUrl);
	return '<span class="share headerlink">' + copyMe + facebook + googlePlus + linkedIn + twitter + '</span>';
}

function generateFacebook(url) {
	return '<a class="facebook" data-toggle="tooltip" data-placement="bottom" title="Share on Facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + url + '"><i class="fa fa-facebook-square"></i></a>';
}

function generateGooglePlus(url) {
	return '<a class="googlePlus" data-toggle="tooltip" data-placement="bottom" title="Share on Google Plus" href="https://plus.google.com/share?url=' + url + '"><i class="fa fa-google-plus-square"></i></a>';
}

function generateLinkedIn(url, title) {
	var params = {
		mini: 'true',
		url: url,
		title: title,
		summary: title,
		source: ''
	};

	var queryString = $.param(params);
	return '<a class="linkedIn" data-toggle="tooltip" data-placement="bottom" title="Share on LinkedIn" href="https://www.linkedin.com/shareArticle?' + queryString + '"><i class="fa fa-linkedin-square"></i></a>';
}

function generateTwitter(url, title) {
	return '<a class="twitter" data-toggle="tooltip" data-placement="bottom" title="Share on Twitter" href="https://twitter.com/home?status=' + encodeURIComponent(title) + ' ' + encodeURIComponent(url) + '"><i class="fa fa-twitter-square"></i></a>';
}

function generateCopyButton(url) {
	return '<a data-toggle="tooltip" data-placement="bottom"class="copyMe" data-clipboard-text="' + url + '" data-original-title="Copy permalink to clipboard"><i class="fa fa-clipboard"></i></a>';
}


$(document).ready(function () {
	var url = window.location.pathname;
	var filename = url.substring(url.lastIndexOf('/') + 1);

	if (filename == 'index.html' || filename == '') {
		$('ul.nav.navbar-nav li.dropdown').not('.globaltoc-container').hide();
	}

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
		$(this).replaceWith(generateLinks($(this).attr('href'), $(this).parent().children('.toc-backref').text()));
	});
	
	$('[data-toggle="tooltip"]').tooltip();

	ZeroClipboard.config({
		forceHandCursor: false,
		swfPath: "http://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.swf"
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
			$(headerlink, links).css('visibility', 'visible');
		},
		function () {
			var headerlink = $(this).children('.headerlink');
			var links = headerlink.children('a');
			$(headerlink, links).css('visibility', 'hidden');
		}
	);

});