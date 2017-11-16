'use strict';

var artistDetails, // Which div has been clicked
    form,
    allowTouch = true;

function autoFillForm(artist) {
  form = document.getElementsByClassName('form');
  form[0].classList.remove('hidden');
  scrollTo(document.getElementById('contact').offsetTop, 200);
  document.getElementById('form-artist').innerHTML = artist;
}

function gotoArtists() {
  scrollTo(document.getElementById('artists-start').offsetTop, 200);
}

document.addEventListener('DOMContentLoaded', function() {
  var aLiens        = document.querySelectorAll('a[href*="#"]');
  var artists       = document.getElementsByClassName('artist');
  var touchEvent    = !!('ontouchstart') in window ? 'touchend' : 'click';

  var delayedExec   = function(after, fn) {
      var timer;
      return function() {
          timer && clearTimeout(timer);
          timer = setTimeout(fn, after);
      };
  };

  var scrollStopper = delayedExec(500, function() {
    document.removeEventListener('touchend', preventScroll);
    setTimeout(function () {
      allowTouch = true;
    }, 50)
  });

  function preventScroll (event) {
      event.preventDefault();
  }

  document.addEventListener('touchmove', function(e) {
    allowTouch = false;
    this.addEventListener('touchend', preventScroll);
    scrollStopper();
  })

  for(var i = 0, len = aLiens.length; i < len; i++) {
    aLiens[i].onclick = function () {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = this.getAttribute("href").slice(1);
        if (target.length) {
            scrollTo(document.getElementById(target).offsetTop, 200);
            return false;
        }
      }
    };
  }

  for (var i = 0; i < artists.length ; i++) {
    artists[i].addEventListener(touchEvent, artistTapEvent);
  }
});


function artistTapEvent(e) {
//    console.log(e);
   if (!allowTouch || 'BOOK' == e.explicitOriginalTarget.data) {
       return;
   }

  if (this.classList.contains('clickd')) {
    closeArtistPanel(this);
    artistDetails = undefined; 
  } else {
    if (!!artistDetails) {
      closeArtistPanel(artistDetails)
    }
    artistDetails = this;
    openArtistPanel(this);
  }
  scrollTo(this.offsetTop, 800); // @TODO : substract header height
};

function openArtistPanel (artist) {
  var innerWidth = window.innerWidth;
  artist.classList.add('clickd');
  artist.getElementsByClassName('desktop-excerpt')['0'].style.setProperty('display', 'none');
  artist.getElementsByClassName('expand-info')['0'].style.setProperty('display', 'block');
  artist.getElementsByClassName('expand-info')['1'].style.setProperty('display', 'block');

    if (innerWidth < 576) {
      return;
    } else if (innerWidth < 960) {
        artist.style.setProperty('grid-column', '1 / 3');
    } else if (innerWidth < 1200) {
        artist.style.setProperty('grid-column', '1 / 4');
    } else {
        artist.style.setProperty('grid-column', '1 / 5');
    }
    artist.style.setProperty('flex-direction', 'unset');
    artist.style.setProperty('grid-row', '1 / 2');
    artistPanelHorizontal(artist);
}

function closeArtistPanel (artist) {
  artist.style.removeProperty('grid-column');
  artist.style.removeProperty('grid-row');
  artist.style.setProperty('flex-direction', 'column');
  var nodes = artist.childNodes;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].nodeName.toLowerCase() == 'div') {
      nodes[i].classList.remove('col-md-6');
      nodes[i].classList.remove('col-sm-6');
      if (i == 1) {
          nodes[i].style.setProperty('padding', 0);
      }
    }
    artist.classList.remove('clickd');
    artist.getElementsByClassName('expand-info')['0'].style.setProperty('display', 'none');
    artist.getElementsByClassName('expand-info')['1'].style.setProperty('display', 'none');
    artist.getElementsByClassName('desktop-excerpt')['0'].style.setProperty('display', 'block');
  }
}

function artistPanelHorizontal (artist) {
    var pic = artist.getElementsByTagName('div')[0];
    var content = artist.getElementsByTagName('div')[1];
    pic.classList.add('col-md-6');
    pic.classList.add('col-sm-6');
    pic.style.setProperty('padding', 0);
    content.classList.add('col-md-6');
    content.classList.add('col-sm-6');
}

// Smooth scroll is handled with the following 4 methods
function scrollTo (element, duration) {
  var e = document.documentElement;
  if(e.scrollTop===0){
    var t = e.scrollTop;
    ++e.scrollTop;
    e = t+1===e.scrollTop--?e:document.body;
  }
  scrollToC(e, e.scrollTop, element, duration);
}

function scrollToC (element, from, to, duration) {
  if (duration < 0) return;
  if (typeof from === "object")from=from.offsetTop;
  if (typeof to === "object")to=to.offsetTop;
  scrollToX(element, from, to, 0, 1/duration, 20, easeOutCuaic);
}

function scrollToX (element, x1, x2, t, v, step, operacion) {
  if (t < 0 || t > 1 || v <= 0) {
      return;
  }
  element.scrollTop = x1 - (x1-x2)*operacion(t);
  t += v * step;
  setTimeout(function() {
    scrollToX(element, x1, x2, t, v, step, operacion);
  }, step);
}

function easeOutCuaic(t){
  t--;
  return t*t*t+1;
}
