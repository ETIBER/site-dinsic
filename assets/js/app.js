// --------------------------------------------------
// APP.JS
// --------------------------------------------------

//
// Initialize Foundation
// --------------------------------------------------
import jQuery from 'jquery'
const $ = jQuery;
window.jQuery = jQuery;
window.$ = jQuery;
$(document).foundation();
import whatInput from 'what-input';
import Foundation from 'foundation-sites';

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import 'tablesaw/dist/tablesaw.jquery';
import libs from './lib/dependancies';
window.libs = libs;

libs.AOS.init();

// SVG Injector
// Elements to inject
const mySVGsToInject = document.querySelectorAll('img.inject-me');

// Options
const injectorOptions = {
  evalScripts: 'once',
  pngFallback: 'assets/png'
};

const afterAllInjectionsFinishedCallback = function (totalSVGsInjected) {
  // Callback after all SVGs are injected
  console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
};

const perInjectionCallback = function (svg) {
  // Callback after each SVG is injected
  console.log('SVG injected: ' + svg);
};

// create injector configured by options
const injector = new libs.svgInjector(injectorOptions);

// Trigger the injection
injector.inject(
  mySVGsToInject,
  afterAllInjectionsFinishedCallback,
  perInjectionCallback
);

// slick carousel
$(".content-carousel").slick({
  // normal options...
  speed: 5000,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  slidesToShow: 5,
  slidesToScroll: 1,
  infinite: true,
  swipeToSlide: true,
  centerMode: true,
  focusOnSelect: true,
  // the magic
  responsive: [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      infinite: true
    }
  }, {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      dots: true
    }
  }, {
    breakpoint: 300,
    settings: "unslick" // destroys slick
  }]
});

// tablesaw table plugin
$(function () {
//  $(document)
//    .foundation()
//    .trigger('enhance.tablesaw');
});

const TablesawConfig = {
  swipeHorizontalThreshold: 15
};

// app dashboard toggle
$('[data-app-dashboard-toggle-shrink]').on('click', function(e) {
  e.preventDefault();
  $(this).parents('.app-dashboard').toggleClass('shrink-medium').toggleClass('shrink-large');
});

//
// Custom JS
// --------------------------------------------------

//Menu
const button = $('#hamburger-button');
const activatedClass = 'is-active';
const grayClass = 'gray';
const menu = $('#responsive-menu');
const main = $('#main');

button.on('click', function() {
  if(!closeMenu()){
    button.addClass(activatedClass);
    main.addClass(grayClass);
    Foundation.Motion.animateIn(menu,"slide-in-left");
  }
});

main.on('click', function (e) {
    closeMenu();
});

$( document ).on( 'keydown', function ( e ) {
  if ( e.keyCode === 27 ) { // ESC
    closeMenu();
  }
});

function closeMenu() {
  if(button.hasClass(activatedClass)) {
    Foundation.Motion.animateOut(menu,"slide-out-left",function () {
      button.removeClass(activatedClass);
      main.removeClass(grayClass);
    });
    return true;
  }
}

if ( ! Modernizr.objectfit ) {
  $('.post__image-container').each(function () {
    const $container = $(this),
      imgUrl = $container.find('img').prop('src');
    if (imgUrl) {
      $container
        .css('backgroundImage', 'url(' + imgUrl + ')')
        .addClass('compat-object-fit');
    }
  });
}

function getFileSize(url)
{
  let fileSize = 0;
  const http = new XMLHttpRequest();
  http.open('HEAD', url, false); // false = Synchronous

  http.send(null); // it will stop here until this http request is complete

  // when we are here, we already have a response, b/c we used Synchronous XHR

  if (http.status === 200) {
    fileSize = http.getResponseHeader('content-length');
  }

  return fileSize;
}

const elements = document.querySelectorAll('[id^="communiqueSize-"]');
elements.forEach(function (element) {
  element.innerHTML += ' ' + Math.round(getFileSize(element.getAttribute('href'))/1024) + ' Ko )'
});

$('.icon-arrow-down').each(function ( index ) {
  const selector = '#mission' + (index + 2);
  $( this ).click(function () {
    Foundation.SmoothScroll.scrollToLoc(selector, {threshold: 50, offset: 0 }, null);
  })
});




