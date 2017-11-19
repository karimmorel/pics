$(document).ready(function(){
	$('#menu-button').click(function(){
		if($('nav').css('left') != 0)
		$('nav').css({'left':0});
		$('#filter').css({'background':'rgba(0,0,0,.6)'});
	});
	$('nav, #filter').click(function(){
		$('nav').css({'left':'-180px'});
		$('#filter').css({'background':'rgba(0,0,0,0)'});
	});
});