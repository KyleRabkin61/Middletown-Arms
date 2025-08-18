// pop up function

function popUp() {
    let popUp = prompt(
        'This website requires the user to be at least 18 years old. Do you satisfy this requirement? (Please type Yes or No in the box provided)'
    );

    while (!popUp || (popUp.toLowerCase() !== 'yes' && popUp.toLowerCase() !== 'no')) {
        popUp = prompt('The response you entered is invalid. Please type either Yes or No.');
    }

    if (popUp.toLowerCase() === 'no') {
        alert('You do not meet the age requirement to access this website.');
        location.reload();
    }
}

popUp()

// vue

const vue_app = Vue.createApp({
    data() {
        return {
            products: []
        };
    },
    created() {
        fetch('products.json')
            .then(response => response.json())
            .then(json => {
                this.products = json;
            })
            .then(() => {

                // Swiper JS
                this.$nextTick(() => {
                    new Swiper('.slider-wrapper', {
                        loop: true,
                        grabCursor: true,
                        spaceBetween: 30,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                            dynamicBullets: true
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        breakpoints: {
                            0: {
                                slidesPerView: 1
                            },
                            768: {
                                slidesPerView: 2
                            },
                            1200: {
                                slidesPerView: 3
                            },
                        }
                    });
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    }
});

vue_app.mount("#vue_app");

// header / navbar JS

let imgHeader = document.querySelector(".img-header");
let height = parseInt(getComputedStyle(imgHeader).height, 10);

let nav = document.querySelector(".navbar");
let navHeight = parseInt(getComputedStyle(nav).height, 10);

// Add scroll event listener
window.addEventListener("scroll", () => {
    if (window.scrollY > height - (height * 0.8)) {
        nav.classList.add("navbar-scrolled");
    } else {
        nav.classList.remove("navbar-scrolled");
    }
    // Update navbar height dynamically
    if (nav) {
        navHeight = parseInt(getComputedStyle(nav).height, 10);
    }
});

// Button on scroll function that does not cut off div
function scrollToSection(id) {
    const element = document.getElementById(id);
    const offset = navHeight;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
    });
}

// Navbar collapses on click
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (navbarCollapse.classList.contains("show")) {
                if (typeof bootstrap !== "undefined") {
                    new bootstrap.Collapse(navbarCollapse, {
                        toggle: true
                    });
                }
            }
        });
    });
});

// Back to top code

$('document').ready(() => {
    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 56 || document.documentElement.scrollTop > 56) {
            $('#backToTop').fadeIn(200)
        } else {
            $('#backToTop').fadeOut(200)
        }
    }
})

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// contact JS

const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value.trim() === "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});

// Reset form on page load
window.addEventListener("load", () => {
    const form = document.getElementById("contactForm");
    if (form) form.reset();
});

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Validate only visible fields (ignore hidden ones)
    for (let [name, value] of formData.entries()) {
        const field = form.querySelector(`[name="${name}"]`);
        if (field && field.type !== "hidden" && value.trim() === "") {
            alert("Please fill out all fields in order for your message to be sent.");
            return;
        }
    }

    // Submit form
    fetch(form.action, {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (response.ok) {
                alert("Message sent!");
                form.reset();
            } else {
                alert("There was a problem sending your message.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was a problem sending your message.");
        });
}

// Attach submit listener
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
});

// gsap animations
gsap.registerPlugin(ScrollTrigger);

gsap.from('.about-row', {
    y: 150,
    duration: 1.5,
    ease: 'power1.inOut',
    opacity: 0,
    scrollTrigger: ".about"
});

gsap.from(['.owner-title', '.owner-row'], {
    y: 150,
    duration: 1.5,
    ease: 'power1.inOut',
    opacity: 0,
    scrollTrigger: ".owner"
});

gsap.from('.service-title', {
    y: 150,
    duration: 1.5,
    ease: 'power1.inOut',
    opacity: 0,
    scrollTrigger: ".service"
});

gsap.from('.the-service', {
    opacity: 0,
    duration: 1.5,
    delay: 1,
    ease: 'power1.inOut',
    stagger: 0.3,
    scrollTrigger: ".service"
});

gsap.from('.service-img', {
    duration: 1.5,
    delay: 1,
    ease: 'power1.inOut',
    opacity: 0,
    scrollTrigger: ".service"
})

gsap.from(['.product-title', '.card-swiper-container'], {
    y: 150,
    opacity: 0,
    duration: 1.5,
    ease: 'power1.inOut',
    scrollTrigger: ".products"
})

gsap.from(['.contact-title', '.form'], {
    y: 150,
    opacity: 0,
    duration: 1.5,
    ease: 'power1.inOut',
    scrollTrigger: ".contact"
})

// Google Widget JS

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("grw-net-comment-more-less")) {
        // Collapse all comments first
        document.querySelectorAll('.grw-net-comment').forEach(comment => {
            comment.style.setProperty("height", "", "important");
        });

        // Find the closest comment container
        let comment = event.target.closest(".grw-net-comment");
        if (!comment) return;

        // Expand only the clicked comment
        if (event.target.textContent.toLowerCase().includes("more")) {
            comment.style.setProperty("height", "auto", "important");
        }
    }
});