$(document).ready(function(){
	console.log('yo');
});

function findPos(el) {
	var x = y = 0;
	if(el.offsetParent) {
		x = el.offsetLeft;
		y = el.offsetTop;
		while(el = el.offsetParent) {
			x += el.offsetLeft;
			y += el.offsetTop;
		}
	}
	return {'x':x, 'y':y};
}

$(".shadow-div").mousemove(function(e){
	console.log(e.pageX+'.  .'+e.pageY);
	if($(this).find('.plus').css('opacity') == 1)
	{
		var pos = findPos(this);
		var x = e.pageX-pos.x-25;
		var y = e.pageY-pos.y-25;
		$(this).find('.plus').css({'left':x,'top':y});
	}
});

$(".shadow-div").mouseleave(function(e){
	if($(this).find('.plus').css('opacity') == 1)
		$(this).find('.plus').css({'top':'-60px','right':'20px'});
});

$('.plus').click(function(e){
	if($(this).css('opacity') == 1)
	$(this).css({'width':'100%','height':'100%','left':'0px','top':'0px','border-radius':'0','opacity':'.6'});
	else
	{
		var pos = findPos(this);
		var x = e.pageX-pos.x-25;
		var y = e.pageY-pos.y-25;
		$(this).css({'width':'50px','height':'50px','left':x,'top':y,'border-radius':'50px','opacity':'1'});
	}
});