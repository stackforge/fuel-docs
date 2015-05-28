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

function populateGuides(guides) {

	$(guides).find('.section').each(function (i) {
		var index = i + 1;
		var el = $(this).find('.reference');
		var href = $(el).attr('href');
		var heading = $(el).text();
		var content = $(this).find('p').html();
		$('#guides').append('<div class="col-sm-3"><a href="' + href + '"><div class="panel panel-default"><div class="panel-body"><h4>' + heading + '</h4><p>' + content + '</p></div></div></a></div>');
	});

	var columns = $('#guides .col-sm-3');
	for (var i = 0; i < columns.length; i += 4) {
		columns.slice(i, i + 4).wrapAll("<div class='row'></div>");
	}

}

function populatePdfs(pdfs) {

	$(pdfs).each(function () {
		var href = $(this).attr('href');
		var link = $(this).text();
		$('#pdfs').append('<div class="col-lg-6"><a class="btn btn-default red btn-block" href="' + href + '"><i class="fa fa-file-pdf-o"></i> ' + link + '</a></div>');
	});

	var columns = $('#pdfs .col-lg-6');
	for (var i = 0; i < columns.length; i += 2) {
		columns.slice(i, i + 2).wrapAll("<div class='row'></div>");
	}
}

function populateDownload(download) {
	var el = $(download).find('h1 > .reference');
	var href = $(el).attr('href');
	var link = $(el).text();
	var content = $(download).clone().find('h1').remove().end().find('.note').addClass('alert alert-info').end().html();
	$('#download_content').append('<a href="' + href + '" class="btn btn-danger btn-lg btn-block" id="download_openstack">' + link + '</a>' + content);
}

function populateReleases(releases){

	$(releases).each(function(){
console.log(this);
		var href = $(this).attr('href');
		var link = $(this).text();
		$('#prior_releases_content').append('<div class="col-sm-3"><a class="btn btn-default red btn-block" href="' + href + '">' + link + '</a></div>');
		
	});

	var columns = $('#prior_releases_content .col-sm-3');
	for (var i = 0; i < columns.length; i += 4) {
		columns.slice(i, i + 4).wrapAll("<div class='row'></div>");
	}
}

function populateContent(callback){
	$.get("index_content.html", function (data) {
		var homeTitle = $(data).find('.home-title').html();
		var home = $(data).find('.what-is-mirantis-openstack').html();
		var guides = $(data).find('#guides');
		populateGuides(guides);
		var pdfs = $(data).find('#pdf .reference');
		populatePdfs(pdfs);
		var download = $(data).find('#download-now');
		populateDownload(download);
		var releases = $(data).find('#prior-releases p .reference');
		populateReleases(releases);
		$('#home').html(home);
		$('#main').html(homeTitle);
	});

	$.get("eula.html", function (data) {
		var fuel_license = $(data).find('#fuel-license').html();
		$('#fuel-license').html($(fuel_license).find('pre'));
	});

	$.get("third-party-licenses.html", function (data) {
		var third_party = $(data).find(".section > .section");
		$(third_party).each(function (i, v) {
			var el = $(v).find('.reference');
			var href = $(el).attr('href');
			var heading = $(el).text();
			$('#third-party-licenses').append('<a class="btn btn-default red btn-block" href="' + href + '"><i class="fa fa-file-pdf-o"></i> ' + heading + '</a>');
		});
	});

	callback();
}

$(document).ready(function () {
	var url = window.location.pathname;
	var filename = url.substring(url.lastIndexOf('/') + 1);

	if (filename == 'index.html' || filename == '') {
		$('ul.nav.navbar-nav li.dropdown').not('.globaltoc-container').hide();

		populateContent(showHashTab);

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
});