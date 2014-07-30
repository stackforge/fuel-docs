function close_toc() {
  $('.sphinxglobaltoc').removeClass('sphinxglobaltoc-auto');
};

function get_current_page(url) {
  return (url.split("/").slice(-1)[0].split("#")[1]);
};

$(function() {
  var toc_close_timer,
      close_time = 1000,
      current_page = get_current_page($(location).attr('href'));

  $('.sphinxglobaltoc ul ul').hide();
  if ($('a[href*="' + current_page + '"]')) {
    $('a[href*="' + current_page + '"]').parents('ul').show();
  }

  $('.sphinxglobaltoc').mouseover(function() {
    if (!$(this).hasClass('sphinxglobaltoc-auto')) {
      $(this).addClass('sphinxglobaltoc-auto');
    }
    if (typeof toc_close_timer != undefined) {
      clearTimeout(toc_close_timer);
    }
  });

  $('.sphinxglobaltoc').mouseout(function() {
    toc_close_timer = setTimeout(function() {
      close_toc();
    }, close_time);
  });

  $('.sphinxglobaltoc li > a').on('click touchstart', function(event){
   var children = $(this).parent().children('ul');
    if (children.length > 0) {
      event.preventDefault();
      if (!children.first().is(":visible")) {children.show();} 
      else {children.hide();}
    }
  });

  $('body').on('click touchstart', function(event) {
    if(!$(event.target).parents('.sphinxglobaltoc').length) {
      close_toc();
    }
  });

});
