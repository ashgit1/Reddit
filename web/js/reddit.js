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
	
	// Loading the reddit home page content by default.
	event.preventDefault();
    $('#leftDiv').html('<center><img src="images/loader.gif" alt="loading..."></center>');
    var redditurl = "https://www.reddit.com/domain/reddit.com.json";
    
    $.getJSON(redditurl, function(json){
	    var listing = json.data.children;
	    var html="";
	    for(var i=0, l=listing.length; i<l; i++) {
	    	var obj = listing[i].data;
	    	var title     = obj.title;
	    	var redditurl = "http://www.reddit.com"+obj.permalink;
	    	var exturl    = obj.url;
	        var thumb     = obj.thumbnail;
	        
	        if(obj.thumbnail === 'default' || obj.thumbnail === 'nsfw' || obj.thumbnail === '')
		          thumb = 'images/default-thumb.png';
	        
	        html += '<img src="'+thumb+'" class="thumbimg">\n';
	        html += '<div class="linkdetails"><h6>'+title+'</h6>\n';
	        html += '<p><a href="'+exturl+'" class="blubtn" target="_blank">visit link</a> - <a href="'+redditurl+'" class="blubtn" target="_blank">view on reddit</a></p>';
	        html += '</div></li>\n';
	   }  // end of for loop
	    
	    htmlOutput(html);
	});	// end getJSON()
   
    function htmlOutput(html) {
		 $('#leftDiv').html(html);
		 //console.log(html);
	 }
    
    // change the drop down event.
    $("#subReddit").change(function(){
        //$(this).css("background-color", "#D6D6FF");
        var subRedVal = this.value;
        refreshView(subRedVal);
    });
    
    function refreshView(subRedVal){
    	// https://www.reddit.com/r/funny/.json
    	event.preventDefault();
        $('#leftDiv').html('<center><img src="images/loader.gif" alt="loading..."></center>');
        var requrl = "http://www.reddit.com/r/";
	    var fullurl = requrl + subRedVal + "/.json";
	    
        $.getJSON(fullurl, function(json){
    	    var listing = json.data.children;
    	    var html="";
    	    for(var i=0, l=listing.length; i<l; i++) {
    	    	var obj = listing[i].data;
    	    	var title     = obj.title;
    	    	var redditurl = "http://www.reddit.com"+obj.permalink;
    	    	var exturl    = obj.url;
    	        var thumb     = obj.thumbnail;
    	        
    	        if(obj.thumbnail === 'default' || obj.thumbnail === 'nsfw' || obj.thumbnail === '')
    		          thumb = 'images/default-thumb.png';
    	        
    	        html += '<img src="'+thumb+'" class="thumbimg">\n';
    	        html += '<div class="linkdetails"><h6>'+title+'</h6>\n';
    	        html += '<p><a href="'+exturl+'" class="blubtn" target="_blank">visit link</a> - <a href="'+redditurl+'" class="blubtn" target="_blank">view on reddit</a></p>';
    	        html += '</div></li>\n';
    	   }  // end of for loop
    	    
    	    htmlOutput(html);
        });
    }     

});