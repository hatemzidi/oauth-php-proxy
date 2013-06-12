jQuery(document).ready(function ($) {

    $('#tweet-list').hide();	
    var user = 'tom_z'; // Set your twitter id
	var count = '10'; // How many feeds do you want. Recommended Max 10 Twitter Api

	jQuery.getJSON('../twitter-proxy.php?user=' +  user + '&count=' + count , function(tweetdata) {
				var twtlst = $("#tweet-list");
				$.each(tweetdata, function(i,tweet) {
					twtlst.append("<li>&ldquo;" + urlToLink(tweet.text) + "&rdquo;<br/>&ndash; " + makeUrl(tweet.id_str,realTime(tweet.created_at)) + "</li>");
				});
			});
	
	setTimeout(function(){
		$('.tweets p').hide();
		$('#tweet-list').show();
		$('#tweet-list').cycle({
		//	fx:'scrollDown',
			speed:500,
			timeout:3500,
			pause:1
		//	cleartypeNoBg:true
		})
	},5000);

});

//TODO make this user independent
function makeUrl(id, txt)
{
	return '<a href="http://twitter.com/tom_z/status/' + id + '" target="_blank">' + txt + '</a>';
}


function urlToLink(txt)
{
	str = ' '+txt;
	str = str.replace(/((ftp|https?):\/\/([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?)/gm,'<a href="$1" target="_blank">$1</a>');
	str = str.replace(/([^\w])\@([\w\-]+)/gm,'$1@<a href="http://twitter.com/$2" target="_blank">$2</a>');
	str = str.replace(/([^\w])\#([\w\-]+)/gm,'$1<a href="http://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
	return str.replace(/^\s+|\s+$/g, "");
}

function realTime(pastTime)
{	
	var origStamp = Date.parse(pastTime);
	if (navigator.userAgent.match(/MSIE\s([^;]*)/)) {
        origStamp = Date.parse(pastTime.replace(/( \+)/, ' UTC$1'))
    }

	var curDate = new Date();
	var currentStamp = curDate.getTime();
	
	var difference = parseInt((currentStamp - origStamp)/1000);

	if(difference < 0) return false;

   	if (difference <= 1) {return "just now";}
    if (difference < 20) {return difference + " seconds ago";}
    if (difference < 40) {return "half a minute ago";}
    if (difference < 60) {return "less than a minute ago";}
    if (difference <= 90) {return "one minute ago";}
    if (difference <= 3540) {return Math.round(difference / 60) + " minutes ago";}
    if (difference <= 5400) {return "1 hour ago";}
    if (difference <= 86400) {return Math.round(difference / 3600) + " hours ago";}
    if (difference <= 129600) {return "1 day ago";}
    if (difference < 604800) {return Math.round(difference / 86400) + " days ago";}
    if (difference <= 907200) {return "1 week ago";}
    if (difference <= 2419200) {return Math.round(difference / 604800) + " weeks ago";}

	//no calc :/
	var dateArr = pastTime.split(' ');
	return dateArr[4].replace(/\:\d+$/,'')+' '+dateArr[2]+' '+dateArr[1]+(dateArr[3]!=curDate.getFullYear()?' '+dateArr[3]:'');
}
