document.addEventListener('DOMContentLoaded', function() {
  var aLiens = document.querySelectorAll('a[href*="#"]');
  var artists = document.getElementsByClassName('artist');
  var trigger = document.getElementById('js-toggle-sidebar'); // or whatever triggers the toggle

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

  for (var artist of artists) {
    artist.addEventListener('click', function(e) {
      if (this.classList.contains('col-md-3')) {
        this.classList.remove('col-md-3');
        this.classList.remove('col-xs-6');
        this.classList.add('col-md-6');
        this.classList.add('col-xs-12');
      } else {
        this.classList.remove('col-md-6');
        this.classList.remove('col-xs-12');
        this.classList.add('col-md-3');
        this.classList.add('col-xs-6');
      }
    });
  }

});

function scrollTo(element, duration) {
  var e = document.documentElement;
  if(e.scrollTop===0){
    var t = e.scrollTop;
    ++e.scrollTop;
    e = t+1===e.scrollTop--?e:document.body;
  }
  scrollToC(e, e.scrollTop, element, duration);
}

function scrollToC(element, from, to, duration) {
  if (duration < 0) return;
  if(typeof from === "object")from=from.offsetTop;
  if(typeof to === "object")to=to.offsetTop;
  scrollToX(element, from, to, 0, 1/duration, 20, easeOutCuaic);
}

function scrollToX(element, x1, x2, t, v, step, operacion) {
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
