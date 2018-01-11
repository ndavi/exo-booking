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
                                .alert("Success",
                                    "Thank you, a member of Exo will answer you as soon as possible !");
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