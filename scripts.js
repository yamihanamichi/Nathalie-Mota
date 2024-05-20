// load more // 

jQuery(document).ready(function($) {
    var page = 2; // Commence à la page 2 car la première est déjà affichée
    var ajaxurl = "wp-admin/admin-ajax.php";
    var loading = false;

    $('#load-more-btn').click(function() {
        if (!loading) {
            loading = true;
            var data = {
                'action': 'load_more_photos',
                'page': page
            };

            $.post(ajaxurl, data, function(response) {
                $('#photo-grid').append(response);
                page++;
                loading = false;
                const imageContainers = document.querySelectorAll(".image-container");

                imageContainers.forEach(function(container) {
                    const lightbox = container.querySelector(".lightbox");
                    const btnDetails = container.querySelector(".btn-details");
                    const photoLink = container.querySelector(".photo-link");
                    const title = container.querySelector("h3");

                    container.addEventListener("mouseenter", function() {
                        lightbox.classList.add("active");
                        btnDetails.style.display = "block";
                        photoLink.style.display = "block";
                        title.style.display = "block";
                    });

                    container.addEventListener("mouseleave", function() {
                        lightbox.classList.remove("active");
                        btnDetails.style.display = "none";
                        photoLink.style.display = "none";
                        title.style.display = "none";
                    });
                    
                });
                setlightbox();
            });
        }
    });
});





jQuery(document).ready(function($) {
    // Lorsqu'une catégorie est sélectionnée
    $('.menu-bar .menu-item select').change(function() {
        // Récupérer la valeur sélectionnée dans le sélecteur de catégories
        var categorie = $(this).val();

        // Effectuer une requête AJAX pour charger les photos correspondantes à la catégorie sélectionnée
        $.ajax({
            url: "wp-admin/admin-ajax.php",
            type: 'POST',
            data: {
                action: 'filter_photos', // Action pour filtrer les photos
                categorie: categorie // Catégorie sélectionnée
            },
            success: function(response) {
                // Afficher les photos chargées
                $('.photo-grid').html(response);
                const imageContainers = document.querySelectorAll(".image-container");

                imageContainers.forEach(function(container) {
                    const lightbox = container.querySelector(".lightbox");
                    const btnDetails = container.querySelector(".btn-details");
                    const photoLink = container.querySelector(".photo-link");
                    const title = container.querySelector("h3");
            
                    container.addEventListener("mouseenter", function() {
                        lightbox.classList.add("active");
                        btnDetails.style.display = "block";
                        photoLink.style.display = "block";
                        title.style.display = "block";
                    });
            
                    container.addEventListener("mouseleave", function() {
                        lightbox.classList.remove("active");
                        btnDetails.style.display = "none";
                        photoLink.style.display = "none";
                        title.style.display = "none";
                    });
                    
                });
                setlightbox();
            }
        });
    });
});


// Variables globales pour suivre l'index de la photo actuellement affichée
let currentIndex = 0;

// LIGHTBOX //

document.addEventListener("DOMContentLoaded", function() {
    const imageContainers = document.querySelectorAll(".image-container");

    imageContainers.forEach(function(container) {
        const lightbox = container.querySelector(".lightbox");
        const btnDetails = container.querySelector(".btn-details");
        const photoLink = container.querySelector(".photo-link");
        const title = container.querySelector("h3");

        container.addEventListener("mouseenter", function() {
            lightbox.classList.add("active");
            btnDetails.style.display = "block";
            photoLink.style.display = "block";
            title.style.display = "block";
        });

        container.addEventListener("mouseleave", function() {
            lightbox.classList.remove("active");
            btnDetails.style.display = "none";
            photoLink.style.display = "none";
            title.style.display = "none";
        });
        
    });
    setlightbox();
});

// FLECHE POUR LE BOUTON AFFICHER EN PLEIN ECRAN // 

jQuery(document).ready(function($) {

setlightbox();
    });
    function setlightbox(){

    
    var lightbox = $("<div>").addClass("custom-lightbox").css({
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "background-color": "rgba(0, 0, 0, 0.8)",
        "z-index": "9998",
        "overflow-y": "auto",
        "display": "none",
        "justify-content": "center",
        "align-items": "center"
    });

    var contentContainer = $("<div>").addClass("lightbox-content");
    lightbox.append(contentContainer);

    var prevButton = $("<button>").addClass('prev-button').text("Précédent").css({
        "position": "fixed",
        "top": "50%",
        "left": "20px",
        "z-index": "9999"
    }).click(function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightboxContent(currentIndex);
        }
    });

    var nextButton = $("<button>").addClass('next-button').text("Suivant").css({
        "position": "fixed",
        "top": "50%",
        "right": "20px",
        "z-index": "9999"
    }).click(function() {
        if (currentIndex < $(".col").length - 1) {
            currentIndex++;
            updateLightboxContent(currentIndex);
        }
    });

    var closeButton = $("<button>").text("Fermer").css({
        "position": "fixed",
        "top": "20px",
        "right": "20px",
        "z-index": "9999"
    }).click(function() {
        lightbox.hide();
    });

    lightbox.append(prevButton).append(nextButton).append(closeButton);
    $("body").append(lightbox);

    $(".photo-link").click(function(e) {
        e.preventDefault(); 

        currentIndex = $(this).closest('.col').index();
        var lightboxContent = $(this).prevAll('.lightbox').html();

        contentContainer.html(lightboxContent);
        lightbox.show();
    });

    function updateLightboxContent(index) {
        var newLightboxContent = $(".image-container").eq(index).find(".lightbox").html();
        contentContainer.html(newLightboxContent);
    }
}

const contactPopup= document.querySelector('#contact-popup');
// contact //
const Contact_bouton=  document.querySelector('.open-popup-link');
Contact_bouton.addEventListener('click', function() {
console.log ("test")
           
            contactPopup.style.display = 'block';
       

        
    
});
const closeContactButton= document.querySelector('#close-contact');
closeContactButton.addEventListener('click', function() {
    contactPopup.style.display = 'none';
});

// 2eme bouton contact dans single photo//
document.getElementById('bouton-contact-contenu').addEventListener('click', function() {
    // Ouvrir la pop-up de contact
    document.getElementById('contact-popup').style.display = 'block';
});







