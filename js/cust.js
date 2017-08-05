jQuery(function($) {
    if($(window).width()>769){
        $('.navbar .dropdown').hover(function() {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(50).slideDown();

        }, function() {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(50).slideUp();

        });

        $('.navbar .dropdown > a').click(function(){
            location.href = this.href;
        });

    }
});

var videstart = function() {
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            $('#video').YTPlayer({
                fitToBackground: true,
                videoId: 'sULHzl_mgrI',
                pauseOnScroll: false,
                playerVars: {
                    modestbranding: 0,
                    autohide: 1,
                    autoplay: 1,
                    controls: 0,
                    showinfo: 0,
                    wmode: 'transparent',
                    branding: 0,
                    rel: 0,
                    origin: window.location.origin,
                    disablekb: 1,
                    fs: 0,
                    enablejsapi: 1,
                },
                callback: function() {
                    videoCallbackEvents();
                }
            });

            var videoCallbackEvents = function() {
                var player = $('#video').data('ytPlayer').player;

                player.addEventListener('onStateChange', function(event) {
                    console.log("Player State Change", event);

                    // OnStateChange Data
                    if (event.data === 1) {
                        $('.video-loader').hide();
                        console.log('video plays');
                    } else if (event.data === 0) {
                        console.log('video ended');
                    } else if (event.data === 2) {
                        console.log('paused');
                    }
                });
            };
        };
        videstart();