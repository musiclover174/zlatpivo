"use strict";(function(){window.animation={};window.animation.fadeIn=function(elem,ms,cb){var d=arguments.length>3&&arguments[3]!==undefined?arguments[3]:"block";if(!elem)return;elem.style.opacity=0;elem.style.display=d;if(ms){var opacity=0;var timer=setInterval(function(){opacity+=50/ms;if(opacity>=1){clearInterval(timer);opacity=1;if(cb)cb()}elem.style.opacity=opacity},50)}else{elem.style.opacity=1;if(cb)cb()}};window.animation.fadeOut=function(elem,ms,cb){if(!elem)return;elem.style.opacity=1;if(ms){var opacity=1;var timer=setInterval(function(){opacity-=50/ms;if(opacity<=0){clearInterval(timer);opacity=0;elem.style.display="none";if(cb)cb()}elem.style.opacity=opacity},50)}else{elem.style.opacity=0;elem.style.display="none";if(cb)cb()}};window.animation.scrollTo=function(to,duration){if(duration<=0)return;var element=document.documentElement,difference=to-element.scrollTop,perTick=difference/duration*10;setTimeout(function(){element.scrollTop=element.scrollTop+perTick;window.animation.scrollTo(to,duration-10)},10)};window.animation.visChecker=function(el){var rect=el.getBoundingClientRect();return(//rect.top >= 0 &&
//rect.left >= 0 &&
rect.bottom-el.offsetHeight*.35<=(window.innerHeight||document.documentElement.clientHeight)&&rect.right<=(window.innerWidth||document.documentElement.clientWidth))};window.site={};window.site.form={init:function init(){var _th=this,inputs=document.querySelectorAll(".common__input, .common__textarea"),forms=document.querySelectorAll("form"),digitsInput=document.querySelectorAll(".js-digits");$(".js-phone").mask("+7(999) 999-9999");if($(".js-select")){$(".js-select").SumoSelect({placeholder:"\u0412\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",captionFormatAllSelected:"\u0412\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",captionFormat:"\u0412\u044B\u0431\u0440\u0430\u043D\u043E \u043F\u0443\u043D\u043A\u0442\u043E\u0432: {0}",csvDispCount:1})}function emptyCheck(event){event.target.value.trim()===""?event.target.classList.remove("notempty"):event.target.classList.add("notempty")}var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=inputs[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var item=_step.value;item.addEventListener("keyup",emptyCheck);item.addEventListener("blur",emptyCheck)}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{var _loop=function _loop(){var form=_step2.value;form.addEventListener("submit",function(e){console.log("submit");return!_th.checkForm(form)&&e.preventDefault()})};for(var _iterator2=forms[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){_loop()}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=digitsInput[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var digitInput=_step3.value;digitInput.addEventListener("keydown",function(e){var validArr=[46,8,9,27,13,110,190];if(validArr.indexOf(e.keyCode)!==-1||e.keyCode==65&&(e.ctrlKey===true||e.metaKey===true)||e.keyCode==67&&(e.ctrlKey===true||e.metaKey===true)||e.keyCode==88&&(e.ctrlKey===true||e.metaKey===true)||e.keyCode>=35&&e.keyCode<=39){return}if((e.shiftKey||e.keyCode<48||e.keyCode>57)&&(e.keyCode<96||e.keyCode>105)){e.preventDefault()}})}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return()}}finally{if(_didIteratorError3){throw _iteratorError3}}}return this},checkForm:function checkForm(form){var checkResult=true;var warningElems=form.querySelectorAll(".warning");if(warningElems.length){var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=warningElems[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var warningElem=_step4.value;warningElem.classList.remove("warning")}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return()}}finally{if(_didIteratorError4){throw _iteratorError4}}}}var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=form.querySelectorAll("input, textarea, select")[Symbol.iterator](),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var elem=_step5.value;if(elem.getAttribute("data-req")){switch(elem.getAttribute("data-type")){case"tel":var re=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;if(!re.test(elem.value)){elem.classList.add("warning");checkResult=false}break;case"email":var re=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;if(!re.test(elem.value)){elem.classList.add("warning");checkResult=false}break;case"file":if(elem.value.trim()===""){elem.parentNode.classList.add("warning");checkResult=false}break;default:if(elem.value.trim()===""){elem.classList.add("warning");checkResult=false}break;}}}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return()}}finally{if(_didIteratorError5){throw _iteratorError5}}}var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=form.querySelectorAll("input[name^=agreement]")[Symbol.iterator](),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var item=_step6.value;if(!item.checked){item.classList.add("warning");checkResult=false}}}catch(err){_didIteratorError6=true;_iteratorError6=err}finally{try{if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return()}}finally{if(_didIteratorError6){throw _iteratorError6}}}return checkResult}}.init();window.site.obj={resizeWatcher:function resizeWatcher(){var tableSel=document.querySelectorAll("table"),scrollArray=[];if(tableSel.length){tableSel.forEach(function(item,i){var orgHtml=item.outerHTML,def="default";if(item.getAttribute("class"))def="";item.outerHTML="<div class='table-scroller"+i+" "+def+"'>"+orgHtml+"</div>";var ps=new PerfectScrollbar(".table-scroller"+i,{wheelPropagation:true});scrollArray.push(ps)});window.addEventListener("resize",function(){if(scrollArray.length)scrollArray.forEach(function(item,i){item.update()})})}},asyncScroll:function asyncScroll(){var featElems=document.querySelectorAll(".js-async-scroll");featElems.forEach(function(item){return item.setAttribute("data-top",parseInt(getComputedStyle(item)["top"]))});window.addEventListener("scroll",function(){featElems.forEach(function(item){var rect=item.getBoundingClientRect(),diff=rect.bottom-item.offsetHeight-(window.innerHeight||document.documentElement.clientHeight),dataKoef=item.getAttribute("data-koef"),dataTop=item.getAttribute("data-top");if(diff<=0&&rect.top+item.offsetHeight>=0){item.style.top=dataTop-diff*dataKoef+"px"}})})},products:function products(){var tabs=document.querySelectorAll(".js-products-tab");function productInit(productCar){new Swiper(productCar,{speed:700,spaceBetween:0,slidesPerView:3,allowTouchMove:false,navigation:{nextEl:productCar.querySelector(".swiper-button-next"),prevEl:productCar.querySelector(".swiper-button-prev")},breakpoints:{1000:{loop:true,slidesPerView:"auto",loopedSlides:2,allowTouchMove:true}}})}if(tabs.length){(function(){var curVal=void 0,newVal=void 0;var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{var _loop2=function _loop2(){var tab=_step7.value;tab.addEventListener("click",function(){if(tab.classList.contains("active"))return;curVal=document.querySelector(".js-products-tab.active").getAttribute("data-tab");newVal=tab.getAttribute("data-tab");var curElem=document.querySelector(".js-products-block[data-tab=\""+curVal+"\"]"),newElem=document.querySelector(".js-products-block[data-tab=\""+newVal+"\"]"),newElemCar=document.querySelector(".js-products-block[data-tab=\""+newVal+"\"] .js-products");window.animation.fadeOut(curElem,400,function(){curElem.classList.remove("active");window.animation.fadeIn(newElem,400,function(){newElem.classList.add("active")});if(!newElemCar.classList.contains("swiper-container-horizontal"))productInit(newElemCar)});document.querySelector(".js-products-tab.active").classList.remove("active");tab.classList.add("active")})};for(var _iterator7=tabs[Symbol.iterator](),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){_loop2()}}catch(err){_didIteratorError7=true;_iteratorError7=err}finally{try{if(!_iteratorNormalCompletion7&&_iterator7.return){_iterator7.return()}}finally{if(_didIteratorError7){throw _iteratorError7}}}})()}var _iteratorNormalCompletion8=true;var _didIteratorError8=false;var _iteratorError8=undefined;try{for(var _iterator8=document.querySelectorAll(".js-products")[Symbol.iterator](),_step8;!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){var productCar=_step8.value;if(productCar.offsetParent!==null)productInit(productCar)}}catch(err){_didIteratorError8=true;_iteratorError8=err}finally{try{if(!_iteratorNormalCompletion8&&_iterator8.return){_iterator8.return()}}finally{if(_didIteratorError8){throw _iteratorError8}}}},news:function news(){var newsOverEl=document.querySelector(".js-news");window.addEventListener("scroll",function(){if(window.scrollY>0){newsOverEl.classList.remove("news")}else{newsOverEl.classList.add("news")}})},about:function about(){var aboutCar=new Swiper(".js-about-car",{speed:700,loop:true,spaceBetween:20,slidesPerView:1,autoHeight:true,parallax:true,navigation:{nextEl:".js-about-car ~ .swiper-buttons .swiper-button-next",prevEl:".js-about-car ~ .swiper-buttons .swiper-button-prev"}});var awardsCar=new Swiper(".js-emp-car",{speed:700,loop:true,spaceBetween:30,slidesPerView:2,navigation:{nextEl:".js-emp-car ~ .swiper-buttons .swiper-button-next",prevEl:".js-emp-car ~ .swiper-buttons .swiper-button-prev"},breakpoints:{1130:{slidesPerView:1,autoHeight:true}}})},awards:function awards(){var awardsCar=new Swiper(".js-awards",{speed:700,spaceBetween:0,slidesPerView:3,allowTouchMove:false,breakpoints:{1000:{loop:true,slidesPerView:"auto",loopedSlides:2,allowTouchMove:true}}})},reviewsShave:function reviewsShave(){var _iteratorNormalCompletion9=true;var _didIteratorError9=false;var _iteratorError9=undefined;try{for(var _iterator9=document.querySelectorAll(".js-question-text:not([data-text])")[Symbol.iterator](),_step9;!(_iteratorNormalCompletion9=(_step9=_iterator9.next()).done);_iteratorNormalCompletion9=true){var text=_step9.value;text.setAttribute("data-text",text.textContent);shave(text,54)}}catch(err){_didIteratorError9=true;_iteratorError9=err}finally{try{if(!_iteratorNormalCompletion9&&_iterator9.return){_iterator9.return()}}finally{if(_didIteratorError9){throw _iteratorError9}}}},reviewsShaver:function reviewsShaver(target){var textEl=target.previousElementSibling;var hasShave=textEl.querySelector(".js-shave");if(hasShave!==null){textEl.textContent=textEl.getAttribute("data-text");target.textContent="\u0421\u043A\u0440\u044B\u0442\u044C";return}shave(textEl,54);target.textContent="\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E";return},reviewsEventsBindings:function reviewsEventsBindings(){var that=this;document.addEventListener("click",function(e){for(var target=e.target;target&&target!==this;target=target.parentNode){if(target.matches(".js-question-shaver")){that.reviewsShaver(target);e.preventDefault();break}}},false);var raiteEl=document.querySelectorAll(".js-raiting");var raiteInpEl=document.querySelector(".js-raiting-inp");if(raiteEl){raiteEl.forEach(function(item){item.addEventListener("click",function(){raiteInpEl.value=item.getAttribute("data-val");$(this).nextAll(".js-raiting").removeClass("choosed");$(this).prevAll(".js-raiting").addClass("choosed");$(this).addClass("choosed")})})}},init:function init(){var burgerEl=document.querySelector(".js-burger"),html=document.querySelector("html"),headerEl=document.querySelector(".header"),toTop=document.querySelector(".js-totop"),toNext=document.querySelector(".js-tonext"),elemsToCheck=[".news__elem-imgover",".js-scroll-imgover",".about__steps-elem"];burgerEl.addEventListener("click",function(e){html.classList.toggle("burgeropen");if(burgerEl.classList.contains("open")){burgerEl.classList.add("remove");setTimeout(function(){burgerEl.classList.remove("open","remove")},1000)}else{burgerEl.classList.add("open")}e.preventDefault()});if(document.querySelector(".js-async-scroll"))this.asyncScroll();if(document.querySelectorAll(".js-products").length)this.products();if(document.querySelector(".js-awards"))this.awards();if(document.querySelector(".js-news"))this.news();if(document.querySelector(".js-about-car"))this.about();if(document.querySelector(".js-reviews")){this.reviewsShave();this.reviewsEventsBindings()}objectFitImages("img.fit");window.addEventListener("scroll",function(){var _iteratorNormalCompletion10=true;var _didIteratorError10=false;var _iteratorError10=undefined;try{for(var _iterator10=elemsToCheck[Symbol.iterator](),_step10;!(_iteratorNormalCompletion10=(_step10=_iterator10.next()).done);_iteratorNormalCompletion10=true){var item=_step10.value;var _iteratorNormalCompletion11=true;var _didIteratorError11=false;var _iteratorError11=undefined;try{for(var _iterator11=document.querySelectorAll(item)[Symbol.iterator](),_step11;!(_iteratorNormalCompletion11=(_step11=_iterator11.next()).done);_iteratorNormalCompletion11=true){var elem=_step11.value;if(window.animation.visChecker(elem)){elem.classList.add("visible")}}}catch(err){_didIteratorError11=true;_iteratorError11=err}finally{try{if(!_iteratorNormalCompletion11&&_iterator11.return){_iterator11.return()}}finally{if(_didIteratorError11){throw _iteratorError11}}}}}catch(err){_didIteratorError10=true;_iteratorError10=err}finally{try{if(!_iteratorNormalCompletion10&&_iterator10.return){_iterator10.return()}}finally{if(_didIteratorError10){throw _iteratorError10}}}if(toTop){if(window.scrollY>=350){toTop.classList.add("visible")}else{toTop.classList.remove("visible")}}});if(toTop){toTop.addEventListener("click",function(){window.animation.scrollTo(0,1000)})}if(toNext){toNext.addEventListener("click",function(){window.animation.scrollTo(document.querySelector(".banner").nextElementSibling.offsetTop,600)})}$("[data-fancybox]").fancybox({i18n:{en:{CLOSE:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"}}});this.resizeWatcher();var eventResize=void 0;try{eventResize=new Event("resize")}catch(e){eventResize=document.createEvent("Event");var doesnt_bubble=false,isnt_cancelable=false;eventResize.initEvent("resize",doesnt_bubble,isnt_cancelable)}window.dispatchEvent(eventResize);var eventScroll=void 0;try{eventScroll=new Event("scroll")}catch(e){eventScroll=document.createEvent("Event");var _doesnt_bubble=false,_isnt_cancelable=false;eventScroll.initEvent("scroll",_doesnt_bubble,_isnt_cancelable)}window.dispatchEvent(eventScroll);return this}};Pace.on("hide",function(){setTimeout(function(){window.site.obj.init()},200)})})();