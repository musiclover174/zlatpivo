(function () {

  window.animation = {}

  window.animation.fadeIn = (elem, ms, cb, d = 'block') => {
    if (!elem)
      return;

    elem.style.opacity = 0;
    elem.style.display = d;

    if (ms) {
      var opacity = 0;
      var timer = setInterval(function () {
        opacity += 50 / ms;
        if (opacity >= 1) {
          clearInterval(timer);
          opacity = 1;
          if (cb) cb()
        }
        elem.style.opacity = opacity;
      }, 50);
    } else {
      elem.style.opacity = 1;
      if (cb) cb()
    }
  }

  window.animation.fadeOut = (elem, ms, cb) => {
    if (!elem)
      return;

    elem.style.opacity = 1;

    if (ms) {
      var opacity = 1;
      var timer = setInterval(function () {
        opacity -= 50 / ms;
        if (opacity <= 0) {
          clearInterval(timer);
          opacity = 0;
          elem.style.display = "none";
          if (cb) cb()
        }
        elem.style.opacity = opacity;
      }, 50);
    } else {
      elem.style.opacity = 0;
      elem.style.display = "none";
      if (cb) cb()
    }
  }

  window.animation.scrollTo = (to, duration) => {
    if (duration <= 0) return;
    const element = document.documentElement,
      difference = to - element.scrollTop,
      perTick = difference / duration * 10;

    setTimeout(function () {
      element.scrollTop = element.scrollTop + perTick;
      window.animation.scrollTo(to, duration - 10);
    }, 10);
  }

  window.animation.visChecker = (el) => {
    let rect = el.getBoundingClientRect()
    return (
      //rect.top >= 0 &&
      //rect.left >= 0 &&
      rect.bottom - el.offsetHeight * .35 <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  window.site = {}

  window.site.form = ({

    init: function () {

      const _th = this,
        inputs = document.querySelectorAll('.common__input, .common__textarea'),
        forms = document.querySelectorAll('form'),
        digitsInput = document.querySelectorAll('.js-digits'),
        select = document.querySelectorAll('.js-select');

      $('.js-phone').mask('+7(999) 999-9999')

      if (select) {
        for (var i = 0; i < select.length ;i++) {
          var _t = select[i],
            optPlhdr = _t.dataset.plhdr ? _t.dataset.plhdr : 'Выберите',
            optAllSel = _t.dataset.textallsel ? _t.dataset.textallsel : 'Все выбраны';
          $(_t).SumoSelect({
            placeholder: optPlhdr,
            captionFormatAllSelected: optAllSel,
            captionFormat: 'Выбрано пунктов: {0}',
            csvDispCount: 1,
          });
        }
      }

      function emptyCheck(event) {
        event.target.value.trim() === '' ?
          event.target.classList.remove('notempty') :
          event.target.classList.add('notempty')
      }

      for (let item of inputs) {
        item.addEventListener('keyup', emptyCheck)
        item.addEventListener('blur', emptyCheck)
      }

      for (let form of forms) {
        form.addEventListener('submit', (e) => {
          console.log('submit');
          return !_th.checkForm(form) && e.preventDefault()
        })
      }

      for (let digitInput of digitsInput) {
        digitInput.addEventListener('keydown', (e) => {
          let validArr = [46, 8, 9, 27, 13, 110, 190]
          if (validArr.indexOf(e.keyCode) !== -1 ||
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
          }
          if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault()
          }
        });
      }

      return this
    },

    checkForm: function (form) {
      let checkResult = true;
      const warningElems = form.querySelectorAll('.warning');

      if (warningElems.length) {
        for (let warningElem of warningElems) {
          warningElem.classList.remove('warning')
        }
      }

      for (let elem of form.querySelectorAll('input, textarea, select')) {
        if (elem.getAttribute('data-req')) {
          switch (elem.getAttribute('data-type')) {
            case 'tel':
              var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
              if (!re.test(elem.value)) {
                elem.classList.add('warning')
                checkResult = false
              }
              break;
            case 'email':
              var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              if (!re.test(elem.value)) {
                elem.classList.add('warning')
                checkResult = false
              }
              break;
            case 'file':
              if (elem.value.trim() === '') {
                elem.parentNode.classList.add('warning')
                checkResult = false
              }
              break;
            default:
              if (elem.value.trim() === '') {
                elem.classList.add('warning')
                checkResult = false
              }
              break;
          }
        }
      }

      for (let item of form.querySelectorAll('input[name^=agreement]')) {
        if (!item.checked) {
          item.classList.add('warning')
          checkResult = false
        }
      }
      return checkResult
    }

  }).init()

  window.site.obj = ({

    vertScroll: (selector) => {
      const ps = new PerfectScrollbar(selector, {
        wheelPropagation: true,
        maxScrollbarLength: 20
      });
    },

    resizeWatcher: () => {
      const tableSel = document.querySelectorAll('table'),
        scrollArray = [];
      if (tableSel.length) {
        tableSel.forEach((item, i) => {
          let orgHtml = item.outerHTML,
            def = 'default';

          if (item.getAttribute('class')) def = '';

          item.outerHTML = `<div class='table-scroller${i} ${def}'>${orgHtml}</div>`;
          let ps = new PerfectScrollbar(`.table-scroller${i}`, {
            wheelPropagation: true
          });
          scrollArray.push(ps);
        });
        window.addEventListener('resize', () => {
          if (scrollArray.length)
            scrollArray.forEach((item, i) => {
              item.update()
            });
        });
      }

    },

    asyncScroll: () => {
      const featElems = document.querySelectorAll('.js-async-scroll')

      featElems.forEach(item => item.setAttribute('data-top', parseInt(getComputedStyle(item)['top'])))

      window.addEventListener('scroll', () => {
        featElems.forEach(item => {
          const rect = item.getBoundingClientRect(),
            diff = rect.bottom - item.offsetHeight - (window.innerHeight || document.documentElement.clientHeight),
            dataKoef = item.getAttribute('data-koef'),
            dataTop = item.getAttribute('data-top')

          if (diff <= 0 && (rect.top + item.offsetHeight >= 0)) {
            item.style.top = dataTop - diff * dataKoef + 'px'
          }
        })
      })
    },

    store: () => {
      let btnMorePhoto = document.querySelectorAll('.js-more-photo');
      for(let i = 0; i < btnMorePhoto.length ;i++){
        btnMorePhoto[i].addEventListener('click', function(event) {
          var _t = this,
            hiddenPhoto = _t.previousElementSibling;
          if (_t.classList.contains('active')) {
            _t.classList.remove('active');
            _t.innerHTML = 'Показать еще фото';
            window.animation.fadeOut(hiddenPhoto, 400);
          } else {
            _t.classList.add('active');
            _t.innerHTML = 'Свернуть';
            window.animation.fadeIn(hiddenPhoto, 400);
          }
          event.preventDefault();
        });
      }
    },

    products: () => {
      let tabs = document.querySelectorAll('.js-products-tab')

      function productInit(productCar) {
        new Swiper(productCar, {
          speed: 700,
          spaceBetween: 0,
          slidesPerView: 3,
          allowTouchMove: false,
          navigation: {
            nextEl: productCar.querySelector('.swiper-button-next'),
            prevEl: productCar.querySelector('.swiper-button-prev'),
          },
          breakpoints: {
            1000: {
              loop: true,
              slidesPerView: 'auto',
              loopedSlides: 2,
              allowTouchMove: true
            }
          }
        })
      }

      if (tabs.length) {
        let curVal, newVal
        for (let tab of tabs) {
          tab.addEventListener('click', () => {
            if (tab.classList.contains('active'))
              return

            curVal = document.querySelector('.js-products-tab.active').getAttribute('data-tab')
            newVal = tab.getAttribute('data-tab')

            let curElem = document.querySelector(`.js-products-block[data-tab="${curVal}"]`),
              newElem = document.querySelector(`.js-products-block[data-tab="${newVal}"]`),
              newElemCar = document.querySelector(`.js-products-block[data-tab="${newVal}"] .js-products`)

            window.animation.fadeOut(curElem, 400, () => {
              curElem.classList.remove('active')
              window.animation.fadeIn(newElem, 400, () => {
                newElem.classList.add('active')
              })
              if (!newElemCar.classList.contains('swiper-container-horizontal'))
                productInit(newElemCar)
            })

            document.querySelector('.js-products-tab.active').classList.remove('active')
            tab.classList.add('active')
          })
        }
      }

      for (let productCar of document.querySelectorAll('.js-products')) {
        if (productCar.offsetParent !== null)
          productInit(productCar)
      }
    },

    news: () => {
      const newsOverEl = document.querySelector('.js-news');

      window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
          newsOverEl.classList.remove('news');
        } else {
          newsOverEl.classList.add('news');
        }
      });
    },

    about: () => {
      const aboutCar = new Swiper('.js-about-car', {
        speed: 700,
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        autoHeight: true,
        parallax: true,
        navigation: {
          nextEl: '.js-about-car ~ .swiper-buttons .swiper-button-next',
          prevEl: '.js-about-car ~ .swiper-buttons .swiper-button-prev',
        },
      })

      const awardsCar = new Swiper('.js-emp-car', {
        speed: 700,
        loop: true,
        spaceBetween: 30,
        slidesPerView: 2,
        navigation: {
          nextEl: '.js-emp-car ~ .swiper-buttons .swiper-button-next',
          prevEl: '.js-emp-car ~ .swiper-buttons .swiper-button-prev',
        },
        breakpoints: {
          1130: {
            slidesPerView: 1,
            autoHeight: true,
          }
        }
      })
    },

    awards: () => {
      const awardsCar = new Swiper('.js-awards', {
        speed: 700,
        spaceBetween: 0,
        slidesPerView: 3,
        allowTouchMove: false,
        breakpoints: {
          1000: {
            loop: true,
            slidesPerView: 'auto',
            loopedSlides: 2,
            allowTouchMove: true
          }
        }
      })
    },

    reviewsShave: () => {
      for (let text of document.querySelectorAll('.js-question-text:not([data-text])')) {
        text.setAttribute('data-text', text.textContent);
        shave(text, 54);
      }
    },

    reviewsShaver: (target) => {
      const textEl = target.previousElementSibling;
      const hasShave = textEl.querySelector('.js-shave');
      if (hasShave !== null) {
        textEl.textContent = textEl.getAttribute('data-text');
        target.textContent = 'Скрыть';
        return;
      }
      shave(textEl, 54);
      target.textContent = 'Показать полностью';
      return;
    },

    reviewsEventsBindings: function () {
      const that = this;

      document.addEventListener('click', function (e) {
        for (let target = e.target; target && target !== this; target = target.parentNode) {
          if (target.matches('.js-question-shaver')) {
            that.reviewsShaver(target);
            e.preventDefault();
            break;
          }
        }
      }, false);

      const raiteEl = document.querySelectorAll('.js-raiting');
      const raiteInpEl = document.querySelector('.js-raiting-inp');
      if (raiteEl) {
        raiteEl.forEach(function (item) {
          item.addEventListener('click', function () {
            raiteInpEl.value = item.getAttribute('data-val');
            $(this).nextAll('.js-raiting').removeClass('choosed');
            $(this).prevAll('.js-raiting').addClass('choosed');
            $(this).addClass('choosed');
          });
        });
      }
    },

    map: () => {
      let $map = document.querySelector('.js-map'),
        coords = document.querySelector(".contacts__filial").dataset.coords.split(",");

      ymaps.ready(function () {
        let myMap = new ymaps.Map('yaMap', {
          center: [coords[0], coords[1]],
          zoom: $map.dataset.zoom || 14,
          controls: []
        });
        myMap.controls.add('zoomControl', {
          size: 'small'
        });
        myMap.behaviors.disable('scrollZoom');

        document.querySelectorAll('.contacts__filial').forEach(function (i, item) {
          try {
            var data = i.dataset.coords.split(",");
            var coords = [data[0], data[1]];
            var filialPositionBtn = document.querySelectorAll('.js-filial-position');
            var myPlacemark = new ymaps.Placemark(coords, {}, {
              iconLayout: 'default#image',
              iconImageHref: 'img/pin.png',
              iconImageSize: [24, 36]
            });

            myMap.geoObjects.add(myPlacemark);

            for (var i = 0; i < filialPositionBtn.length; i++) {
              filialPositionBtn[i].addEventListener('click', function (event) {
                let coordsItemBtn = this.parentNode.dataset.coords.split(",");
                myMap
                  .setCenter([coordsItemBtn[0], coordsItemBtn[1]], data.zoom || 14, {
                    checkZoomRange: true,
                    duration: 500,
                    timingFunction: 'ease-in-out'
                  })
                  .catch(function (err) {
                    console.log(err);
                  });
                event.preventDefault();
              });
            }

          } catch (e) {
            // падаем но не сдаемся
            console.error(e);
          }
        });
      });

      return;
    },

    init: function () {

      const burgerEl = document.querySelector('.js-burger'),
        html = document.querySelector('html'),
        headerEl = document.querySelector('.header'),
        toTop = document.querySelector('.js-totop'),
        toNext = document.querySelector('.js-tonext'),
        elemsToCheck = ['.news__elem-imgover', '.js-scroll-imgover', '.about__steps-elem'];



      burgerEl.addEventListener('click', (e) => {
        html.classList.toggle('burgeropen')
        if (burgerEl.classList.contains('open')) {
          burgerEl.classList.add('remove')
          setTimeout(() => {
            burgerEl.classList.remove('open', 'remove')
          }, 1000)
        } else {
          burgerEl.classList.add('open')
        }
        e.preventDefault()
      })

      if (document.querySelector('.js-async-scroll')) this.asyncScroll()
      if (document.querySelectorAll('.js-products').length) this.products()
      if (document.querySelector('.js-awards')) this.awards()
      if (document.querySelector('.js-news')) this.news()
      if (document.querySelector('.js-about-car')) this.about()
      if (document.querySelector('.js-reviews')) {
        this.reviewsShave();
        this.reviewsEventsBindings();
      }
      if (document.querySelector('.js-map')) this.map()
      if (document.querySelector('.js-vert-scrollbar')) this.vertScroll('.js-vert-scrollbar')
      if (document.querySelectorAll('.js-more-photo')) this.store()

      objectFitImages('img.fit');

      function animateHeight(item, height, currentHeight, timeout) {
        if (height < currentHeight) {
          item.setAttribute('y', currentHeight--);
          setTimeout(() => {
            animateHeight(item, height, currentHeight, timeout)
          }, timeout);
        }
      }

      document.querySelectorAll('.pet__item').forEach((item) => {
        item.addEventListener('mouseover', ()=> {
          let height = item.dataset.height;
          let currentHeight = item.querySelector('.pet__item-rect').attributes.y.value;
          animateHeight(item.querySelector('.pet__item-rect'), +height, +currentHeight, 10);
        });
      });

      window.addEventListener('scroll', () => {
        for (let item of elemsToCheck) {
          for (let elem of document.querySelectorAll(item)) {
            if (window.animation.visChecker(elem)) {
              elem.classList.add('visible')
            }
          }
        }

        if (toTop) {
          if (window.scrollY >= 350) {
            toTop.classList.add('visible')
          } else {
            toTop.classList.remove('visible')
          }
        }
      })

      if (toTop) {
        toTop.addEventListener('click', () => {
          window.animation.scrollTo(0, 1000)
        })
      }

      if (toNext) {
        toNext.addEventListener('click', () => {
          window.animation.scrollTo(document.querySelector('.banner').nextElementSibling.offsetTop, 600);
        })
      }

      $('[data-fancybox]').fancybox({
        touch: false,
        i18n: {
          en: {
            CLOSE: "Закрыть"
          }
        }
      });

      this.resizeWatcher()

      let eventResize
      try {
        eventResize = new Event('resize')
      } catch (e) {
        eventResize = document.createEvent('Event')
        let doesnt_bubble = false,
          isnt_cancelable = false
        eventResize.initEvent('resize', doesnt_bubble, isnt_cancelable);
      }
      window.dispatchEvent(eventResize)

      let eventScroll
      try {
        eventScroll = new Event('scroll')
      } catch (e) {
        eventScroll = document.createEvent('Event');
        let doesnt_bubble = false,
          isnt_cancelable = false
        eventScroll.initEvent('scroll', doesnt_bubble, isnt_cancelable);
      }
      window.dispatchEvent(eventScroll)

      return this
    }
  });

  if (document.querySelector('html').classList.contains('touchevents')) {
    window.site.obj.init();
    document.querySelector('body').classList.add('pace-done')
    Pace.stop();
  } else {
    Pace.on('hide', () => {
      setTimeout(() => {
        window.site.obj.init()
      }, 200)
    })
  }

})();
