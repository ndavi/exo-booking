document.addEventListener('DOMContentLoaded', function() {
  var aLiens        = document.querySelectorAll('a[href*="#"]');
  var artists       = document.getElementsByClassName('artist');
  var artistDetails; // Which div has been clicked

  for(var i=0, len = aLiens.length; i<len; i++) {
    aLiens[i].onclick = function () {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = this.getAttribute("href").slice(1);
        if (target.length) {
          scrollTo(document.getElementById(target).offsetTop, 1000);
          return false;
        }
      }
    };
  }

  for (var artist of artists) { // @TODO IPHONE TAP EVENT + Smooth scroll
    artist.addEventListener('touchstart', artistTapEvent);
    artist.addEventListener('click', artistTapEvent);
  }
});

function artistTapEvent(e) {
  if (this.classList.contains('col-md-3')) {
    if (!!artistDetails) {
      closeArtistPanel(artistDetails)
    }
    artistDetails = this;
    openArtistPanel(this);
  } else {
    closeArtistPanel(this);
    artistDetails = undefined;
  }
};

function openArtistPanel (artist) {
  artist.classList.remove('col-md-3');
  artist.classList.remove('col-xs-6');
  artist.classList.add('col-md-6');
  artist.classList.add('col-xs-12');
}

function closeArtistPanel (artist) {
  artist.classList.remove('col-md-6');
  artist.classList.remove('col-xs-12');
  artist.classList.add('col-md-3');
  artist.classList.add('col-xs-6');
}

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
  if(typeof from === "object")from=from.offsetTop;
  if(typeof to === "object")to=to.offsetTop;
  scrollToX(element, from, to, 0, 1/duration, 20, easeOutCuaic);
}

function scrollToX (element, x1, x2, t, v, step, operacion) {
  if (t < 0 || t > 1 || v <= 0) return;
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
