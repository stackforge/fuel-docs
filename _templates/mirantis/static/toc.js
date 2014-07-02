jQuery(window).load(function() {
  var toc_open_timer;
  var toc_close_timer;
  var open_time = 500;
  var close_time = 1000;
  
  $('.sphinxglobaltoc ul ul').hide();
  
  $('.sphinxglobaltoc li').on({
    'click': function (event) {
      var children = $(this).children('ul');
      if ((children.length > 0) && !children.first().is(":visible")) {
        event.preventDefault();
        $(this).children('ul').show();
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
