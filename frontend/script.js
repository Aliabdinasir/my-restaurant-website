document.addEventListener("DOMContentLoaded", ()=> {
    // This function will execute when all HTML code is rendered
    // When DOM (Document Object Model) is loaded
    const mobileMenu = document.getElementById("mobileMenu");
    const navLinks = document.querySelector(".nav-links");
    mobileMenu.addEventListener("click", function() {
        navLinks.classList.toggle('active');
    })

    
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    function showSlideShow() {
        slides.forEach(
            slide => slide.style.display = "none"
        );
        slideIndex++;
        if(slideIndex > slides.length){
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlideShow, 3000);
    }
    showSlideShow();
    

});