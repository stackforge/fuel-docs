var _conv_host = (("https:" == document.location.protocol) ? "https://d9jmv9u00p0mv.cloudfront.net" : "http://cdn-1.convertexperiments.com");
document.write(unescape("%3Cscript src='" + _conv_host + "/js/10012224-10012014.js' type='text/javascript'%3E%3C/script%3E"));

$(window).hashchange(function(){ showHashTab(); });

function showHashTab(){
    console.log('showHashTab');
    if(location.hash){
        var activeTab = $('[href=' + location.hash + ']');
        if (activeTab.length) {
            activeTab.tab('show');
        } else {
            $('.nav-tabs a:first').tab('show');
        }
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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

    $('#bottom-copy').attr('data-clipboard-text', window.location.href);
    $('#bottom-facebook').on('click', function(){
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href);
    });

    $('.headerlink').each(function () {
        $(this).empty();
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('pre').each(function(){
        $('<div class="zero-clipboard"><span a data-toggle="tooltip" data-placement="top" data-original-title="Copy permalink to clipboard" class="btn-clipboard copy copyMe" data-clipboard-text="'+ $.trim($(this).text().replace(/"/g, '&quot;')) +'"><i class="fa fa-clipboard"></i></span></div>').insertBefore(this);
    });

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

    $('a[data-toggle="tab"]').on('click', function (e) {
        history.pushState({}, '', $(this).attr('href'));
    });

    $('a.toc-backref').contents().unwrap();

    $('a[href="contents.html"]').attr('href', 'index.html');

    prepareList();

    showHashTab();

    if(/search.html$/.test(window.location.pathname)) {

        var index = lunr(function () {
            this.field('title', {boost: 10});
            this.field('body');
            this.field('href');
            this.ref('id');
        });

        var store = {};

        if (getParameterByName('q')) {

            $('#search-results').append('<div class="loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');

            $.getJSON("_static/data.json", function (data) {
                $(data).each(function (i, item) {
                    index.add({
                        title: item.title,
                        body: item.body,
                        href: item.url,
                        guide: item.guide,
                        id: i
                    });
                    store[i] = {title: item.title, body: item.body, guide: item.guide, href: item.url};
                });

                var query = getParameterByName('q');
                var length = 210;
                var bodyText = '';
                var results = index.search(query);

                $('#search-progress').hide();
                $('#search-results').empty().append(
                    results.length ?
                        results.map(function (result) {
                            var el = $('<p>')
                                .append($('<a>')
                                    .attr('href', store[result.ref].href)
                                    .text(store[result.ref].title)
                            );
                            var body = store[result.ref].body.toLowerCase();
                            var bodySearch = body.search(query.toLowerCase());
                            if (bodySearch > 100) {
                                bodyText = jQuery.trim(store[result.ref].body).substring(bodySearch, bodySearch + length).split(" ").slice(0, -1).join(" ") + "...";
                            } else {
                                bodyText = jQuery.trim(store[result.ref].body).substring(0, length).split(" ").slice(0, -1).join(" ") + "...";
                            }
                            el.append($('<p>').text());
                            el.append($('<p>').html('<span class="text-muted">Guide: <em>' + store[result.ref].guide + '</em></span><br>' + bodyText));
                            return el;
                        }) : $('<p><strong>No results found</strong></p>')

                );

            });
        }
    }

});
