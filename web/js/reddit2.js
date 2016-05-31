$(document).ready(function(){

	
	// populate the drop-down.
	$.getJSON("https://www.reddit.com/reddits.json", function(json) {	
		var options = $("#subReddit");
		options.append($("<option />").val("selected").text("Select a Sub Reddit"));
		var listing = json.data.children;
	    var counter = 0;
	    
	    for(var i=0, l=listing.length; i<l; i++) {
	    	var obj 		= listing[i].data;
	        var subreddit     = obj.display_name;
	        counter++;
	        options.append($("<option />").val(subreddit).text(subreddit));
	    }
	   /* alert("counter: " + counter); alert("sub reddit: " + sub);*/
	});
	
	$(function() {
		SyntaxHighlighter.all();
	});
	
	var html="";
	
	initSlider();
	
	function initSlider(){
		
		// Loading the reddit home page content by default.
		event.preventDefault();
	    $('#main').html('<center><img src="images/loader.gif" alt="loading..."></center>');
	    var redditurl = "https://www.reddit.com/domain/reddit.com.json";
	    
	    $.getJSON(redditurl, function(json){
		    var listing = json.data.children;
	
		    html += '<section  class="slider">';
		    html += '<div id="flexSlid" class="flexslider">';
		    html += '<ul class="slides">';
		   
		     
		    for(var i=0, l=listing.length; i<l; i++) {
		    	var obj = listing[i].data;
		    	var title     = obj.title;
		    	var redditurl = "http://www.reddit.com"+obj.permalink;
    	    	var exturl    = obj.url;
		        var thumb     = obj.thumbnail;
		        
		        if(obj.thumbnail === 'default' || obj.thumbnail === 'nsfw' || obj.thumbnail === '')
			          thumb = 'images/default-thumb.png';

		        html += '<li>';
		        html += '<img src="'+thumb+'" class="thumbimg">\n';
		        html += '<p class="flex-caption"><h6>'+title+'</h6>\n';
		        html += '<p><a href="'+exturl+'" class="blubtn" target="_blank">visit link</a> - <a href="'+redditurl+'" class="blubtn" target="_blank">view on reddit</a></p>';
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
	 }
    
    // change the drop down event.
    $("#subReddit").change(function(){
        //$(this).css("background-color", "#D6D6FF");
        var subRedVal = this.value;
        refreshView(subRedVal);
    });
    
    function refreshView(subRedVal){

    	$('.flexslider').remove();
    	
    	// https://www.reddit.com/r/funny/.json
    	event.preventDefault();
        $('#main').html('<center><img src="images/loader.gif" alt="loading..."></center>');
        var requrl = "http://www.reddit.com/r/";
	    var fullurl = requrl + subRedVal + "/.json";
	    
        $.getJSON(fullurl, function(json){
    	    var listing = json.data.children;
    	   
    	    html += '<section  class="slider">';
		    html += '<div class="flexslider">';
		    html += '<ul class="slides">';
		   
		    for(var i=0, l=listing.length; i<l; i++) {
		    	var obj = listing[i].data;
		    	var title     = obj.title;
		    	var redditurl = "http://www.reddit.com"+obj.permalink;
    	    	var exturl    = obj.url;
		        var thumb     = obj.thumbnail;
		        
		        if(obj.thumbnail === 'default' || obj.thumbnail === 'nsfw' || obj.thumbnail === '')
			          thumb = 'images/default-thumb.png';

		        html += '<li>';
		        html += '<img src="'+thumb+'" class="thumbimg">\n';
		        html += '<p class="flex-caption"><h6>'+title+'</h6>\n';
		        html += '<p><a href="'+exturl+'" class="blubtn" target="_blank">visit link</a> - <a href="'+redditurl+'" class="blubtn" target="_blank">view on reddit</a></p>';
		        html += '</li>';
		   }  // end of for loop
		    
		    html += '</ul>';
		    html += '</div>';
		    html += '</section>';
        });
        
        setTimeout(function () {
	        startSlider(html);
	    }, 1000);
    }     

});