$(document).ready(function(){

	$(function() {
		SyntaxHighlighter.all();
	});
	
	var html="";
	
	function initSlider(){
		
		// Loading the reddit home page content by default.
		event.preventDefault();
	    $('#main').html('<center><img src="images/loader.gif" alt="loading..."></center>');
	    var redditurl = "https://www.reddit.com/domain/reddit.com.json";
	    
	    $.getJSON(redditurl, function(json){
		    var listing = json.data.children;
	
		    html += '<section class="slider">';
		    html += '<div class="flexslider">';
		    html += '<ul class="slides">';
		   
		     
		    for(var i=0, l=listing.length; i<l; i++) {
		    	var obj = listing[i].data;
		    	var title     = obj.title;
		        var thumb     = obj.thumbnail;
		        
		        if(obj.thumbnail === 'default' || obj.thumbnail === 'nsfw' || obj.thumbnail === '')
			          thumb = 'images/default-thumb.png';

		        html += '<li>';
		        html += '<img src="'+thumb+'" class="thumbimg">\n';
		        html += '<p class="flex-caption"><h6>'+title+'</h6>\n';
		        html += '</li>';
		   }  // end of for loop
		    
		    html += '</ul>';
		    html += '</div>';
		    html += '</section>';
		    
		   // htmlOutput(html);
		});	// end getJSON()
	    
		setTimeout(function () {
	        startSlider(html);
	    }, 1000);
	}
	
	function startSlider(html){
		
		htmlOutput(html);
		
		$('.flexslider').flexslider({
			animation : "slide",
			start : function(slider) {
				$('body').removeClass('loading');
			},
			after : function(slider) {
				//alert('Slide changed');
			}
		});
		
	}
   
    function htmlOutput(html) {
		 $('#main').html(html);
		 //console.log(html);
	 }
    
    initSlider();
    
});