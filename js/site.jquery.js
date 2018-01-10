var sendingForm = false;

$( document ).ready(function() {
    alertify.defaults.maintainFocus = false
    $('#contactform').on('submit', function(e){
        e.preventDefault();
        if(grecaptcha.getResponse() === "") {
            alertify.error("Veuillez vérifier que vous n'êtes pas un robot");
        } else {
            if(!sendingForm) {
                sendingForm = true;
                var notification = alertify.warning("Envoie du formulaire...");
                $.ajax({
                    url: "https://formspree.io/contact@exo-booking.com",
                    method: "POST",
                    data: $('#contactform').serialize(),
                    dataType: "json",
                    success: function (xml, textStatus, xhr) {
                        if (xhr.status === 200) {
                            alertify
                                .alert("Demande de booking envoyée", "Lorem ipsum dolor sit amet," +
                                    " consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
                                    " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
                                    " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor");
                            notification.dismiss();
                            sendingForm = false;
                        }
                        else {
                            alertify.error('Une erreur est survenue lors de l\'envoi du formulaire');
                        }
                    }
                });
            }
        }
    });
});