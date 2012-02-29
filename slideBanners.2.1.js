(function($) {
	$.fn.slideBanners = function(userArgs) {
		if(!this.length) return false;
		
		var args = {
			slideDirection:1,
			slideHorizontal:true,
			duration:5000,
			easing:'',
			speed:800,
			loading:false,
			showButton:true,
			buttonStyle:{'height':25,fontColor:'#252525',fontSize:14,fontWeight:'normal',fontFamily:'Arial, Helvetica, sans-serif',padding:'8px 15px',borderWidth:1, borderType:'solid', borderColor:'#eee',cornerRadius:0,bottom:0,left:0,bgColor:'#fff',selectColor:'#f00',textMargin:0,marginRight:1,opacity:0.9},
			texts:false,
			maps:false
		}
		$.extend(true, args, userArgs);
		
		$('noscript', this).css('display','none');
			
		var frame = this.css({'position':'relative','overflow':'hidden'});
		var slides = frame.find('ul').addClass('slides').css({'position':'relative'}).find('li');
		var total = slides.length;
		
		if(args.loading) {
			var loader = frame.find('.loader');
			var leftPosi = (frame.width()-loader.attr('width'))/2;
			var topPosi = (frame.height()-loader.attr('height'))/2;
			loader.css({'position':'absolute','display':'block','top':topPosi+'px','left':leftPosi+'px'});
		}
		var currentIndex = 0;
		var frontSlideTimer = null;
		var timerOn = false;
		var imgcompletes = 0;
		var selectBars = new Array();
	
		//BUTTONS PREPARATION	
		var buttons = $('<ul></ul>').addClass('buttons').css({'position':'absolute','left':args.buttonStyle.left+'px','bottom':args.buttonStyle.bottom+'px','padding':0,'margin':0,'list-style':'none','color':args.buttonStyle.fontColor,'font-family':args.buttonStyle.fontFamily,'font-size':args.buttonStyle.fontSize+'px','font-weight':args.buttonStyle.fontWeight,'width':frame.width()+10+'px','opacity':args.buttonStyle.opacity});
		
		var buttonWidth = Math.ceil((frame.width()-args.buttonStyle.left*2+args.buttonStyle.marginRight)/total-args.buttonStyle.borderWidth*2-args.buttonStyle.marginRight);
		
		for(var i=0; i<total; i++) {
			var button = $('<li></li>').attr('id','b'+i).css({'position':'relative','float':'left','width':buttonWidth+'px','height':args.buttonStyle.height+'px','border':args.buttonStyle.borderWidth+'px '+args.buttonStyle.borderType+' '+args.buttonStyle.borderColor,'border-radius':args.buttonStyle.cornerRadius+'px','-moz-border-radius':args.buttonStyle.cornerRadius+'px','-webkit-border-radius':args.buttonStyle.cornerRadius+'px','-o-border-radius':args.buttonStyle.cornerRadius+'px','background-color':args.buttonStyle.bgColor,'cursor':'pointer','overflow':'hidden','margin-right':args.buttonStyle.marginRight+'px'});
			
			var deco = $('<div></div>').css({'position':'absolute','top':0,'left':-buttonWidth+'px','width':'100%','height':'100%','border-radius':args.buttonStyle.cornerRadius+'px','-moz-border-radius':args.buttonStyle.cornerRadius+'px','-webkit-border-radius':args.buttonStyle.cornerRadius+'px','-o-border-radius':args.buttonStyle.cornerRadius+'px','background-color':args.buttonStyle.selectColor});
			selectBars.push(deco);
			
			if(args.texts) {
				if(args.texts[i]) var text = args.texts[i];
				else text = '';
			} else { 
				text = '';
			}
			var textSpan = $('<span></span>').text(text).css({'position':'absolute','top':0,'left':0,'display':'block','width':'100%','text-align':'center','margin-top':args.buttonStyle.textMargin+'px'});
			button.append(deco).append(textSpan);
			
			if(!args.showButton) textSpan.css({'visibility':'hidden'});
				
			buttons.append(button);
			button.click(function(e) {
				e.preventDefault();
				var nextID = $(this).attr('id').substr(1);
				if(currentIndex != nextID) {
					frame.stopTimer();
					changeImage(nextID);
					frame.startTimer();
				}
			});
			//MOBILE VERSION
			if('ontouchstart' in document.documentElement) {
				button.bind('touchstart', function(e) {
					e.preventDefault();
					var nextID = $(this).attr('id').substr(1);
					if(currentIndex != nextID) {
						frame.stopTimer();
						frame.startTimer();
					}
				}, false);
			}
			button = null;
			deco = null;
			textSpan = null;
			text = null;
		}
		frame.append(buttons);
		selectBars[0].css('left',0);
		
		//SLIDES PREPARATION
		slides.each( function(index) {
			
			$(this).css({'position':'absolute','width':frame.width()+'px','height':frame.height()+'px','overflow':'hidden'});
			if(args.slideHorizontal) $(this).css({'top':0,'left':frame.width()*args.slideDirection*-1+'px'});
			else $(this).css({'top':frame.height()*args.slideDirection*-1+'px','left':0});
			
			var imgpath = $(this).children('a').attr('image');
			var img = $('<img>').attr('src',imgpath+'?r='+Math.random()).css({'border':'none'});
			$(this).find('a').append(img);
			
			if(args.maps) {
				if(args.maps[index]) {
					var map = $('<map></map>').attr('name','map'+index).html(args.maps[index]);
					
					//FOR IE 6 BUG
					if(!window.XMLHttpRequest) {	
						var coords = args.maps[index].match(/[0-9 ]{1,4},[0-9 ]{1,4},[0-9 ]{1,4}([0-9, ]*)?/gi);
						map.find('area').each( function(index) {		
							$(this).attr('coords',coords[index]);
						});
						coords = null;
					}
					
					img.attr('usemap','#map'+index);
					$(this).find('a').append(map);
					map = null;
				}
			}
			img.load( function() {
				imgcompletes++;
				if(imgcompletes == total) {
					if(args.loading) loader.hide();
					frame.startTimer();
				}
				imgpath = null;
				img = null;
			});
		});
		slides.eq(0).css({'top':0,'left':0});
		
		frame.hover( function(e) {
			frame.stopTimer();
		}, function(e) {
			frame.startTimer();
		});
		
		function changeImage(nextID) {
			if(args.slideHorizontal) {
				slides.eq(currentIndex).stop(true,true).animate({'left':frame.width()*args.slideDirection+'px'}, args.speed, args.easing, function() {
					$(this).css({'left':frame.width()*args.slideDirection*-1+'px'});
				});
			} else { 
				slides.eq(currentIndex).stop(true,true).animate({'top':frame.height()*args.slideDirection+'px'}, args.speed, args.easing, function() {
					$(this).css({'top':frame.height()*args.slideDirection*-1+'px'});
				});
			}
			selectBars[currentIndex].stop(true,true).animate({'left':buttonWidth+'px'}, args.speed, args.easing, function() {
				$(this).css('left',-buttonWidth+'px');	
			})
			
			if(nextID) currentIndex = nextID;
			else currentIndex++;
			currentIndex = adjust(currentIndex);
			
			if(args.slideHorizontal) {
				slides.eq(currentIndex).stop(true,true).animate({'left':0}, args.speed, args.easing);
			} else {
				slides.eq(currentIndex).stop(true,true).animate({'top':0}, args.speed, args.easing);
			}
			selectBars[currentIndex].stop(true,true).animate({'left':0}, args.speed, args.easing);
			return false;
		}
	
		function adjust(id) {
			if(id >= total) return 0;
			else if(id < 0) return total-1;
			else return id;	
		}
		
		this.stopTimer = function() {
			if(timerOn && total > 1) {
				window.clearInterval(frontSlideTimer);
				timerOn = false;
			}
			return false;
		}
		
		this.startTimer = function() {
			if(!timerOn && total > 1) {
				timerOn = true;
				frontSlideTimer = window.setInterval( function() {
					changeImage();
				}, args.duration);
			}
			return false;
		}
		
	}
})(jQuery);