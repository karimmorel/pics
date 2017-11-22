$(document).ready(function(){
	console.log('yo');
});



// Nav

$('#nav-button').click(function(){
	if($('nav').css('display') == "none")
		$('nav').show();
	else
		$('nav').hide();
})


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

function findPlusStatus(obj) {
	if(obj.css('content') == "\"0\"")
		return 0;
	else
		return 1;
}

$(".shadow-div").mousemove(function(e){
	var findPlus = $(this).find('.plus');
	var plusStatus = findPlusStatus(findPlus);
	if(plusStatus == 0)
	{
		console.log('oui');
		var pos = findPos(this);
		var x = e.pageX-pos.x-25;
		var y = e.pageY-pos.y-25;
		$(this).find('.plus').css({'left':x,'top':y});
	}
});

$(".shadow-div").mouseleave(function(e){
	var findPlus = $(this).find('.plus');
	var plusStatus = findPlusStatus(findPlus);
	if(plusStatus == 0)
	{
		$(this).find('.plus').animate({'opacity':'0'},1);
	}
});
$(".shadow-div").mouseenter(function(e){
	var findPlus = $(this).find('.plus');
	var plusStatus = findPlusStatus(findPlus);
	if(plusStatus == 0)
	{
		$(this).find('.plus').animate({'opacity':'1'},1);
	}
});

$('.plus').click(function(e){
	$(this).css({'transition':'inherit'});
	var findPlus = $(this);
	var plusStatus = findPlusStatus(findPlus);
	if(plusStatus == 0)
	{
		findPlus.css({'content':'"1"'});
		$(this).animate({'width':'100%','height':'100%','left':'0px','top':'0px','border-radius':'0'},200);
		$(this).css({'transition':'all .6s','background':'rgba(21,22,23,.5)'});
		$(this).find('.plus-span-container span').toggleClass('rotated');
		$(this).find('.text-container').show();
		$(this).find('.text-container h1').delay( 800 ).animate({'opacity':1},600);
		$(this).find('.text-container .sep').delay( 1200 ).animate({'opacity':1,'width':'100px'},300);
		$(this).find('.text-container p').delay( 1500 ).animate({'opacity':1},600);
		$(this).find('.text-container blockquote').delay( 1800 ).animate({'opacity':1},600);
		$(this).find('.text-container .signature').delay( 2400 ).animate({'opacity':1},500);
	}
	else
	{
		findPlus.css({'content':'"0"'});
		var pos = findPos(this);
		var x = e.pageX-pos.x-25;
		var y = e.pageY-pos.y-25;
		$(this).animate({'width':'50px','height':'50px','left':x,'top':y,'border-radius':'50px'},200);
		$(this).css({'transition':'inherit','background':'rgba(21,22,23,.9)'});
		$(this).find('.plus-span-container span').removeClass('rotated');
		$(this).find('.text-container').hide();
		$(this).find('.text-container h1').css({'opacity':0});
		$(this).find('.text-container .sep').css({'opacity':.1,'width':'0px'});
		$(this).find('.text-container p').css({'opacity':0});
		$(this).find('.text-container blockquote').css({'opacity':0});
		$(this).find('.text-container .signature').css({'opacity':0});
	}
});

// Fin div .plus