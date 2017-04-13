
$(document).ready(function(){	

	var slideLength,
	timeOn = 15000;
	timeUp = timeOn-400;
	timeBar = (timeOn-500)/1000;
	slideLength = $('.slide-items .item').length-1;
	widthWrapper = $('.wrapper').width();
	objSlide = {};
	devicesWidth = $(document).width();

	for( let k = 0; k <= slideLength; k++ ){
		$('.indicators-wrapper').append("<li data-to="+k+"></li>");
	}

	var GroupClassName_first_0 = ["add-zoomUnitFromZero","add-moveFromTop","add-moveFromRightToLeft","add-moveFromRightToLeftDelay100","add-moveFromRightToLeftDelay200","add-moveFromRightToLeftDelay300","add-moveFromRightToLeftDelay400"],
	 	GroupClassName_last_0 = ["add-fade","add-leaveToRight","add-leaveToRight","add-leaveToRight","add-leaveToRight","add-leaveToRight","add-leaveToRight"],

		GroupClassName_first_1 = ["add-moveFromTop","add-moveFromTop","add-moveFromLeftToRight","add-moveFromRightToLeft"],
		GroupClassName_last_1 = ["add-leaveToLeft","add-leaveToRight","add-leaveToLeft","add-leaveToRight"],

		GroupClassName_first_2 = ["add-moveFromTop","add-moveFromBottom"],
		GroupClassName_last_2 = ["add-leaveToRight","add-leaveToBottom"];

		GroupClassName_first_3 = ["add-moveFromTop","add-moveFromLeftToRight","add-moveFromRightToLeft"],
		GroupClassName_last_3 = ["add-leaveToRight","add-leaveToLeft","add-leaveToRight"];

		GroupClassName_first_4 = ["add-moveFromLeftToRight","add-moveFromBottom","add-moveFromLeftToRight","add-moveFromBottom"],
		GroupClassName_last_4 = ["add-leaveToLeft","add-leaveToBottom","add-leaveToLeft","add-leaveToBottom"];

	var addAnimationClassName = function(nb,status,classname){
		if( status === "first" ){
			objSlide["firstEffect_"+nb] = classname;
		}
		else if( status === "last" ){
			objSlide["lastEffect_"+nb] = classname;
		}
		else{return false}
	};
	
	addAnimationClassName(0,"first",GroupClassName_first_0);
	addAnimationClassName(0,"last",GroupClassName_last_0);

	addAnimationClassName(1,"first",GroupClassName_first_1);
	addAnimationClassName(1,"last",GroupClassName_last_1);

	addAnimationClassName(2,"first",GroupClassName_first_2);
	addAnimationClassName(2,"last",GroupClassName_last_2);

	addAnimationClassName(3,"first",GroupClassName_first_3);
	addAnimationClassName(3,"last",GroupClassName_last_3);

	addAnimationClassName(4,"first",GroupClassName_first_4);
	addAnimationClassName(4,"last",GroupClassName_last_4);

	console.log(objSlide);
	var clearAllSetTimeoutFunc = function(){ // clear all setTimeout functions
		clearInterval(mainRunning);		
		let clearAllSetTimeout = setTimeout(";");
		for (let j = 0 ; j < clearAllSetTimeout ; j++) {
		    clearTimeout(j); 
		}
	};

	var unitsCountingAndRemovingOrAdding = function(type,slideItemLocation){ //counting how many units in a slideitem and then adding or removing all units's classnames .
		let units = $('.item').eq(slideItemLocation).find('.slide-content .unit').length-1;
		if( type === "addFront" ){
			for( let af = 0; af <= units; af++ ){
				$('.item').eq(slideItemLocation).find('.unit_'+slideItemLocation+'-'+af+'').addClass(objSlide["firstEffect_"+slideItemLocation][af]);
			}
		}
		else if( type === "removeAll" ){
			for( let ra = 0; ra <= units; ra++ ){
				$('.item').eq(slideItemLocation).find('.unit_'+slideItemLocation+'-'+ra+'').attr("class","unit unit_"+slideItemLocation+"-"+ra+"");
			}
		}
		else if( type === "removeAllCondition" ){
			let previousIndex = slideItemLocation-1;
			let unitsThisCase = $('.item').eq(previousIndex).find('.slide-content .unit').length-1;
			for( let rac = 0; rac <= unitsThisCase; rac++ ){
				$('.item').eq(previousIndex).find('.unit_'+previousIndex+'-'+rac+'').attr("class","unit unit_"+previousIndex+"-"+rac+"");
			}
		}
		else if( type === "addBackCondition" ){
			let previousIndex = slideItemLocation-1;
			let unitsThisCase = $('.item').eq(previousIndex).find('.slide-content .unit').length-1;
			for( let abc = 0; abc <= unitsThisCase; abc++ ){				
				$('.item').eq(previousIndex).find('.unit_'+previousIndex+'-'+abc+'').addClass(objSlide["lastEffect_"+previousIndex][abc]);
			}
		}
		else if( type === "addBack" ){
			for( let ab = 0; ab <= units; ab++ ){				
				$('.item').eq(slideItemLocation).find('.unit_'+slideItemLocation+'-'+ab+'').addClass(objSlide["lastEffect_"+slideItemLocation][ab]);
			}
		}
		else{}		
	};

	var main = function(index,widthWrapperAr,timeOnAr,timeUpAr){
		let previousIndexAfterTouch = index-1;
		if( previousIndexAfterTouch < 0 ){
			previousIndexAfterTouch = slideLength;
		}
		$('.indicators-wrapper li').removeClass('active').attr('style','');
		$('.indicators-wrapper li').eq(index).css({"pointer-events":"none"}).addClass('active');
		unitsCountingAndRemovingOrAdding("removeAll",previousIndexAfterTouch); 
		$('.item').removeClass('active');
		$('.running-bar').attr('style','');
		let barSetTimeout = setTimeout(function(){
			$('.running-bar').css({'transition-duration': timeBar+'s','width': widthWrapper});
		}, 100);
		$('.item').eq(index).addClass('active');
		$('.item').eq(index).find('.item-bg').addClass('add-zoomUnit');
		unitsCountingAndRemovingOrAdding("addFront",index);
		let ddddd = setTimeout(function(){
			unitsCountingAndRemovingOrAdding("removeAll",index); 
		}, 500);
		let AddClassWhenTimeUp = setTimeout(function(){
			unitsCountingAndRemovingOrAdding("addBackCondition",index);
		}, timeUpAr);
		index++;
		mainRunning = setInterval(function(){
			$('.running-bar').attr('style','');
			let barSetTimeout = setTimeout(function(){
					$('.running-bar').css({'transition-duration': timeBar+'s','width': widthWrapperAr});
				}, 100);
			unitsCountingAndRemovingOrAdding("removeAllCondition",index);
			if ( index >  slideLength){
				index = 0;
			}
			$('.indicators-wrapper li').removeClass('active').attr('style','');
			$('.indicators-wrapper li').eq(index).css({"pointer-events":"none"}).addClass('active');
			$('.item').attr('class','item');
			$('.item').find('.item-bg').attr('class','item-bg');
			$('.item').eq(index).addClass('active');
			$('.item').eq(index).find('.item-bg').addClass('add-zoomUnit');
			unitsCountingAndRemovingOrAdding("addFront",index);
			let AddClassWhenTimeUp = setTimeout(function(){
				unitsCountingAndRemovingOrAdding("addBackCondition",index);
			}, timeUpAr);
			index++
		}, timeOnAr);
	};

	main(0,widthWrapper,timeOn,timeUp);

	var getWidthAndRunSlide = function(index){ // get the slide's width and run the main function
		let getWidthRoofAgain = setTimeout(function(){
			widthWrapper = $('.wrapper').width();
		}, 200);
		let ContinueRunSlideAfterResize = setTimeout(function(){
			main(index,widthWrapper,timeOn,timeUp);
		}, 400);
	};	
	
	$([window, document]).on('focus', function() { // run slide when u came back
		if ( !!navigator.userAgent.match(/Trident.*rv\:11\./) ){
			//console.log("ie");
		}
		else if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ){
			// Do something in Firefox
		}
		else{
			for (let i = 0; i <= slideLength; i++){
				if( $('.slide-items .item').eq(i).hasClass('active') === true ){
					var nextIndex = i+1;
					var indexCurrent = i;
					break;
				}
			}
			if( nextIndex > slideLength ){
				nextIndex = 0;
			}
			unitsCountingAndRemovingOrAdding("addBack",indexCurrent);
			let runSlideOnFocus = setTimeout(function(){
				unitsCountingAndRemovingOrAdding("removeAll",indexCurrent);
			}, 500);
			getWidthAndRunSlide(nextIndex);
		}				
	}); 

	$([window, document]).on('blur', function() { // stop slide animation when is on other tab or anything else
		if ( !!navigator.userAgent.match(/Trident.*rv\:11\./) ){
			//console.log("ie");
		}
		else if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ){
			// Do something in Firefox
		}
	    else{
	    	clearAllSetTimeoutFunc();
	    }
	}); 

	var canHover = function(){ // can hover on slide
		$('.slide').on('mouseover', function(){
			//console.log('in');
			clearAllSetTimeoutFunc();
			BarCurrentWidth = $('.running-bar').width();
			let widthNeeds = widthWrapper - BarCurrentWidth;
			timeNeeds = (widthNeeds*timeBar)/widthWrapper;
			$('.running-bar').css({'width': BarCurrentWidth+'px'});
		});
		$('.slide').on('mouseout', function(){
			//console.log('out');
			for (let i = 0; i <= slideLength; i++){
				if( $('.slide-items .item').eq(i).hasClass('active') === true ){
					var nextIndex = i+1;
					var indexCurrent = i;
					break;
				}
			}		
			let hoverSlide = setTimeout(function(){		
				$('.running-bar').css({'transition-duration': timeNeeds+'s','width': widthWrapper});			
			}, 100);
			if( nextIndex > slideLength ){
				nextIndex = 0;
			}
			let AddClassWhenTimeUp = setTimeout(function(){
				unitsCountingAndRemovingOrAdding("addBack",indexCurrent);
			}, (timeNeeds*1000)+100);	
			let finishCurrentItem = setTimeout(function(){
				main(nextIndex,widthWrapper,timeOn,timeUp);
			}, (timeNeeds*1000)+500);
		});
	};	
	var pickNextSlideItem = function(){ // run next slide-item
		clearAllSetTimeoutFunc();
		$('.running-bar').attr('style','');
		for (let i = 0; i <= slideLength; i++){
			if( $('.slide-items .item').eq(i).hasClass('active') === true ){
				var indexCurrentOnSwipering = i;
				break;
			}
		}
		unitsCountingAndRemovingOrAdding("addBack",indexCurrentOnSwipering);
		let removeAllClass = setTimeout(function(){
			unitsCountingAndRemovingOrAdding("removeAll",indexCurrentOnSwipering); 
		}, 500);
		var previousIndexOnSwipering = indexCurrentOnSwipering+1;
		if( previousIndexOnSwipering > slideLength ){
			previousIndexOnSwipering = 0;
		}
		getWidthAndRunSlide(previousIndexOnSwipering);
	};
	var pickPrevSlideItem = function(){ // run prev slide-item
		clearAllSetTimeoutFunc();
		$('.running-bar').attr('style','');
		for (let i = 0; i <= slideLength; i++){
			if( $('.slide-items .item').eq(i).hasClass('active') === true ){
		 		var indexCurrentOnSwipering = i;
				break;
			}
		}
		unitsCountingAndRemovingOrAdding("addBack",indexCurrentOnSwipering);
		let removeAllClass = setTimeout(function(){
			unitsCountingAndRemovingOrAdding("removeAll",indexCurrentOnSwipering); 
		}, 500);
		var previousIndexOnSwipering = indexCurrentOnSwipering-1;
			if( previousIndexOnSwipering < 0 ){
				previousIndexOnSwipering = slideLength;
			};
		getWidthAndRunSlide(previousIndexOnSwipering);		
	};
	var checkDevices = function(){ // check the size to do swipe and stop hover
		devicesWidth = $(document).width();
		if( devicesWidth < 991 ){
			$('.slide').off('mouseover');
			$('.slide').off('mouseout');
			$(".slide").on("swiperight",function(){
			 	//console.log("You swiped right!");
			 	pickPrevSlideItem();			 
			});		
			$(".slide").on("swipeleft",function(){
			    //console.log("You swiped left!");
			    pickNextSlideItem();			 
			});				
		}
		else if( devicesWidth > 992 ){
			canHover();
			$(".slide").off("swiperight");			
			$(".slide").off("swipeleft");	
		}
	};
	checkDevices();

	$(window).resize(function() { //stop and run slide again after made a resizing
		clearAllSetTimeoutFunc();
		checkDevices();
		$('.running-bar').attr('style','');
		for (let i = 0; i <= slideLength; i++){
			if( $('.slide-items .item').eq(i).hasClass('active') === true ){
				var indexCurrentAfterResize = i;
				break;
			}
		}
		unitsCountingAndRemovingOrAdding("removeAll",indexCurrentAfterResize); 
		getWidthAndRunSlide(indexCurrentAfterResize);		
	});	

	$('.indicators-wrapper li').on('click', function(){ // choose a slide-item u want to show base on indicators
		clearAllSetTimeoutFunc();
		for( let i = 0; i <= slideLength; i++ ){
			if( $('.indicators-wrapper li').eq(i).hasClass('active') == true ){
				var indicatorCurrent = i;
				break;
			}
		}
		var indicator = $(this).attr('data-to');
		$('.indicators-wrapper li').removeClass('active').attr('style','');
		$(this).css({"pointer-events":"none"}).addClass('active');
		unitsCountingAndRemovingOrAdding("addBack",indicatorCurrent);
		let removeAllClass = setTimeout(function(){
				unitsCountingAndRemovingOrAdding("removeAll",indicatorCurrent); 
		}, 500);
		getWidthAndRunSlide(indicator);
	});

	$('.slide-control').on('click', function(){ // control prev or next
		var slideControlType = $(this).attr('data-type');
		if( slideControlType === "prev" ){
			pickPrevSlideItem();
		}
		else if( slideControlType === "next" ){
			pickNextSlideItem();
		} 
		else{ return false }
	});

	
});

