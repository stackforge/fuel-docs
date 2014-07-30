function close_toc() {
  $('.sphinxglobaltoc').removeClass('addshadow');
  $('.sphinxglobaltoc ul ul').hide();
};

function focus_toc() {
  $('.sphinxglobaltoc').addClass('addshadow');
}

function toc_is_focused() {
  return $('.sphinxglobaltoc').hasClass('addshadow')
}

jQuery(window).load(function() {
  var toc_open_timer;
  var toc_close_timer;
  var open_time = 500;
  var close_time = 1000;

  $('.sphinxglobaltoc ul ul').hide();

  $('.sphinxglobaltoc li').on({
    'click tap' : function (event) {
      var children = $(this).children('ul');
      if ((children.length > 0) && !children.first().is(":visible")) {
        event.preventDefault();
        children.show();
      }
    }
  });

  $('.sphinxglobaltoc').on({
    'mouseout' : function() {
      toc_close_timer = setTimeout(function() {
        close_toc();
      },
      close_time);
    },
    'mouseover' : function() {
      focus_toc();
      if (typeof toc_close_timer != undefined) {
        clearTimeout(toc_close_timer);
      }
    },
    'click tap' : function(event) {
      if (event.target != this) return;
      if (toc_is_focused()) {
        close_toc();
      } else {
        focus_toc();
      }
    }
  });

  $('.body').on({
    'click tap' : function() {
      close_toc();
    }
  });

});
