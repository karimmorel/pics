
// Nav

$('#nav-button').click(function(e){
	if($('nav').css('display') == "none")
	{
		$('#content').toggleClass('blur');
		$('nav').show();
		$('#calque-nav').attr({'fill':'#fff', transition: ".6s"});
		$('#rect-one').attr({x:'120',y:'-49.25',width:'611.3',height:'98.5',transform:'matrix(0.70710678, 0.70710678, -0.70710678, 0.70710678, 0, 0)'});
		$('#rect-two').attr({x:'0',y:'256',width:'611.3',height:'98.5',transform:'matrix(0.7071 -0.7071 0.7071 0.7071 -126.6155 305.3232)'});
		$('nav .nav-container').delay(300).animate({'width':'100%'},600);
		$('nav .nav-container h2').delay(600).animate({'opacity':'1'},500);
		$('nav .nav-container blockquote').delay(800).animate({'opacity':'1'},500);
		$('nav .nav-container .social').delay(1000).animate({'opacity':'1'},500);
		$('nav .nav-container .website').delay(1400).animate({'opacity':'1'},500);
		$('nav').animate({'opacity':'1'},0);
	}
	else
	{
		$('#content').removeClass('blur');
		$('#calque-nav').attr({'fill':'#333'});
		$('#rect-one').attr({x:'0',y:'404.5',width:'611',height:'98.5', transform:'matrix(1.00000000, 0.00000000, 0.00000000, 1.00000000, 0, 0)'});
		$('#rect-two').attr({x:'0',y:'109',width:'611',height:'98.5',transform:'matrix(1.00000000, 0.00000000, 0.00000000, 1.00000000, 0, 0)'});
		$('nav').animate({'opacity':'0'},500);
		$('nav .nav-container').animate({'width':'0'},500);
		$('nav .nav-container h2').css({'opacity':'0'});
		$('nav .nav-container blockquote').css({'opacity':'0'});
		$('nav .nav-container .social').css({'opacity':'0'});
		$('nav .nav-container .website').css({'opacity':'0'});
		$('nav').delay(200).hide(0);
	}
})


//Nav Button animation

$('#nav-button').mouseenter(function(){
	if($('#calque-nav').attr('fill')=="#fff")
	{
		//less
		$('#rect-one').attr({x:'0',y:'256.2',width:'611.3',height:'98.5',transform:'matrix(1.00000000, 0.00000000, 0.00000000, 1.00000000, 0, 0)'});
		$('#rect-two').attr({x:'-0.4',y:'256.2',width:'611.3',height:'98.5',transform:'matrix(1.00000000, 0.00000000, 0.00000000, 1.00000000, 0, 0)'});
	}
	else
	{
		//plus
		$('#rect-one').attr({x:'0',y:'-354.5',width:'611',height:'98.5',transform:'matrix(0.00000000, 1.00000000, -1.00000000, 0.00000000, 0, 0)'});
		$('#rect-two').attr({x:'-0.4',y:'256.2',width:'611.3',height:'98.5',transform:'matrix(1.00000000, 0.00000000, 0.00000000, 1.00000000, 0, 0)'});
	}
});

$('#nav-button').mouseleave(function(){
	if($('#calque-nav').attr('fill')=="#fff")
	{
		//exit
		$('#rect-one').attr({x:'120',y:'-49.25',width:'611.3',height:'98.5',transform:'matrix(0.70710678, 0.70710678, -0.70710678, 0.70710678, 0, 0)'});
		$('#rect-two').attr({x:'0',y:'256',width:'611.3',height:'98.5',transform:'matrix(0.7071 -0.7071 0.7071 0.7071 -126.6155 305.3232)'});
	}
	else
	{
		//egal
		$('#rect-one').attr({x:'0',y:'404.5',width:'611',height:'98.5', transform:'matrix(1.00000000, 0.00000000, 0.00000000, 1.00000000, 0, 0)'});
		$('#rect-two').attr({x:'0',y:'109',width:'611',height:'98.5',transform:'matrix(1.00000000, 0.00000000, 0.00000000, 1.00000000, 0, 0)'});
	}
	
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

function findPlusStatus(obj) {
	if(obj.css('content') == "\"0\"")
		return 0;
	else
		return 1;
}

$("#content").on("mousemove",".shadow-div",function(e){
	var findPlus = $(this).find('.plus');
	var plusStatus = findPlusStatus(findPlus);
	if(plusStatus == 0)
	{
		var pos = findPos(this);
		var x = e.pageX-pos.x-25;
		var y = e.pageY-pos.y-25;
		$(this).find('.plus').css({'left':x,'top':y});
	}
});

$("#content").on("mouseleave",".shadow-div",function(e){
	var findPlus = $(this).find('.plus');
	var plusStatus = findPlusStatus(findPlus);
	if(plusStatus == 0)
	{
		$(this).find('.plus').animate({'opacity':'0'},1);
	}
});
$("#content").on("mouseenter",".shadow-div",function(e){
	var findPlus = $(this).find('.plus');
	var plusStatus = findPlusStatus(findPlus);
	if(plusStatus == 0)
	{
		$(this).find('.plus').animate({'opacity':'1'},1);
	}
});

$('#content').on("click",".plus",function(e){
	$(this).css({'transition':'inherit'});
	$(this).find('*').clearQueue();
	$(this).find('*').dequeue();
	$(this).find('*').stop();
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




// Function Load pics when scroll down

$('.loader').click(function(){
	var thisclass = $(this).attr("class");
	var picsCount = $('.container').length;
	var followingPicsRoute = $('.container').data('followingpics');
	if(thisclass == "loader")
	loadOlderPics(picsCount, followingPicsRoute);
});



function loadOlderPics(number, picsroute)
{
	if(number > 0)
	{
		$('.loader').addClass('loading lds-ripple');
		$('.loader').html('<div></div><div></div>');
		$('.loader').removeClass('loader');
		$.ajax({
			url : picsroute+number,
			type : 'GET',
			dataType : 'json',
			success : function(code_html, statut){
				var loop = 0;
				$.each(code_html,function(){
					loop++;
					$('#content').append('<div class="container">'+
						'<div class="shadow-div">'+
						'<div class="plus">'+
						'<div class="plus-span-container">'+
						'<span>'+
						'+'+
						'</span>'+
						'</div>'+
						'<div class="text-container">'+
						'<h1>'+$(this)[0].name+'</h1>'+
						'<div class="sep"></div>'+
						'<p>'+$(this)[0].description+'</p>'+
						'<blockquote>'+$(this)[0].region+' - '+$(this)[0].picdate.slice(0,4)+'</blockquote>'+
						'<span class="signature">'+$(this)[0].theme+'_</span>'+
						'</div>'+
						'</div>'+
						'<img src="/pics/web/uploads/pics_repository/'+$(this)[0].type+'"/>'+
						'</div>'+
						'</div>');
				});
				$('.loading').addClass('loader');
				$('.loading').html('+');
				$('.loading').removeClass('loading lds-ripple');
				if(loop < 6)
				{
					$('.loader').remove();
				}
			},

			error : function(resultat, statut, erreur){
           alert('Erreur de chargement.'); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !

       },

   });
	}
}