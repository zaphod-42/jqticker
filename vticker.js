(function($){
  function vTicker(opts, el){
	    $.extend(this, opts);
	    this.list = el;
	    $(el).hover(this.hoverIn, this.hoverOut);
	}
	
	vTicker.prototype.start = function(){
	    var ticker = this;
	    var delay = typeof ticker.delay == "function" ? ticker.delay(ticker.list) : ticker.delay;
	    
	    ticker.delay_timer = setTimeout(function(){
	        if(ticker.effect){
	           ticker.effect($("li:first", ticker.list), ticker);
	        }else{
	            ticker.transition();
	        }
	    }, delay);
	    ticker.started = true;
	}
	
	vTicker.prototype.stop = function(){
        clearTimeout(this.delay_timer);
        ticker.started = false;
    }
    
	$.fn.vticker = function(opts){
	    var defaults = {
	        //the delay in milliseconds between transitions
	       delay: function(list){
	           var delay = $("li:first", list).text().length * 40;
	           if(delay < 3000){
	               delay = 3000;
	           }
	           return delay;
	       },
	       
	       //the time in milliseconds of the transition between slides
	       speed: 400,
	       
	       //easing type
	       easing: 'swing',
	       
	       //effect for removing top element before transition, this should be a function or reference that accepts
	       //2 arguments, item, and ticker. After the effect is complete, it should call ticker.transition()
	       effect: function(item, ticker){
	           $(item).animate({opacity:0},function(){
	               ticker.transition(ticker);
	           });
	       },
	       
	       transition: function(ticker){
	           var ticker = this;
                $("li:first", ticker.list).slideUp(ticker.speed, function(){
                    $("li:first", ticker.list).appendTo(ticker.list).slideDown(0).css({opacity:1});
                    ticker.start();
                });
	       },
	       
	       //A callback function to be called when the user hovers over the container
	       hoverIn: function(){
	           $(this).data("ticker").stop();
	       },
	       
	       //A callback function to be called when the user leaves the container
	       hoverOut: function(){
	           $(this).data("ticker").start();
	       }
	    }
	    var ticker = new vTicker($.extend(defaults, opts), this);
	    ticker.start();
	    $(this).data("ticker", ticker);
	    return $(this);
	}
})(jQuery);

/*
$(document).ready(function(){
      $('ul.ticker-item').vticker({effect:false}); 
});
*/
