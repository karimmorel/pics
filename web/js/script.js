$(document).ready(function(){
	console.log('yo');
});


// Gestion des divs .plus sur les images pour plus d'infos

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
	if($(this).find('.plus').css('border-radius') == '50px')
	{
		var pos = findPos(this);
		var x = e.pageX-pos.x-25;
		var y = e.pageY-pos.y-25;
		$(this).find('.plus').css({'left':x,'top':y});
	}
});

$(".shadow-div").mouseleave(function(e){
	if($(this).find('.plus').css('border-radius') == '50px')
		$(this).find('.plus').animate({'opacity':'0'},1);
});
$(".shadow-div").mouseenter(function(e){
	if($(this).find('.plus').css('border-radius') == '50px')
		$(this).find('.plus').animate({'opacity':'1'},1);
});

$('.plus').click(function(e){
	$(this).css({'transition':'inherit'});
	if($(this).css('border-radius') == '50px')
	{
		$(this).animate({'width':'100%','height':'100%','left':'0px','top':'0px','border-radius':'0'},200);
		$(this).css({'transition':'all .6s','background':'rgba(21,22,23,.4)'});
		$(this).find('.plus-span-container span').toggleClass('rotated');
		$(this).find('.text-container').show();
		$(this).find('.text-container h1').delay( 800 ).animate({'opacity':1},400);
		$(this).find('.text-container .sep').delay( 1100 ).animate({'opacity':1},300);
		$(this).find('.text-container p').delay( 1400 ).animate({'opacity':1},400);
		$(this).find('.text-container blockquote').delay( 1700 ).animate({'opacity':1},400);
	}
	else
	{
		var pos = findPos(this);
		var x = e.pageX-pos.x-25;
		var y = e.pageY-pos.y-25;
		$(this).animate({'width':'50px','height':'50px','left':x,'top':y,'border-radius':'50px'},200);
		$(this).css({'transition':'all .1s','background':'rgba(21,22,23,.9)'});
		$(this).find('.plus-span-container span').removeClass('rotated');
		$(this).find('.text-container').hide();
		$(this).find('.text-container h1').css({'opacity':0});
		$(this).find('.text-container .sep').css({'opacity':0});
		$(this).find('.text-container p').css({'opacity':0});
		$(this).find('.text-container blockquote').css({'opacity':0});
	}
});

// Fin div .plus