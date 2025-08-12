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
        
        // Swiper js
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

// contact js

const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
})

window.onload = function () {
    document.getElementsByClassName('input-container').textContent = ''
};

function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("contactForm");
    const formData = new FormData(form);

    for (let [name, value] of formData.entries()) {
        if (value.trim() === "") {
            alert("Please fill out all fields in order for your message to be sent.");
            return;
        }
    }

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