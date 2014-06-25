jQuery(window).load(function() {
  var toc_open_timer;
  var toc_close_timer;
  var open_time = 500;
  var close_time = 1000;

  $('.sphinxglobaltoc ul ul').hide();

  $('.sphinxglobaltoc li').on({
    'mouseover': function () {
      var that = this;
      toc_open_timer = setTimeout(function () {
        $(that).children('ul').show();
      },
      open_time);
    },
    'mouseout' : function () {
      if (typeof toc_open_timer != undefined) {
        clearTimeout(toc_open_timer);
      }
    }
  });

  $('.sphinxglobaltoc').on({
    'mouseout' :function() {
      var that = this;
      toc_close_timer = setTimeout(function() {
        $('.sphinxglobaltoc ul ul').hide();
      },
      close_time);
    },
    'mouseover' : function() {
      if (typeof toc_close_timer != undefined) {
        clearTimeout(toc_close_timer);
      }
    }
  });

});
