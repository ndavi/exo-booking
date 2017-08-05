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
