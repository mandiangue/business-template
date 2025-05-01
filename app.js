const nombres = document.querySelectorAll('.nombre')
const articles = document.querySelectorAll('article')
const slideLeft = document.querySelector('.fa-chevron-left')
const slideRight = document.querySelector('.fa-chevron-right')
const fotoShape = document.querySelector('.foto-shape')
const imgAbout = document.querySelector('.img-about')
const textAbout = document.querySelector('.text-about')
const sections = document.querySelectorAll('.section')
const navLinks = document.querySelectorAll('.nav-link')
const nameTop = document.querySelector('.name-top')
const navUl = document.querySelector('.nav ul')
const iconMenu = document.querySelector('a.icon')
const formInputs = document.querySelectorAll('.form-control');
const submitForm = document.querySelector('.submit-form')
const msgContact = document.querySelector('.msg-contact')
const btnHeroeText = document.querySelector('.heroe-text')
const overlayContent= document.querySelector('.overlay-content')



//Ouverture popup quand on clique
btnHeroeText.addEventListener('click', ()=> {
    const rect = btnHeroeText.getBoundingClientRect();
    overlayContent.style.left = rect.left + "px";
    overlayContent.style.display = 'block';
});
document.addEventListener('click', (e) =>{
    if (!overlayContent.contains(e.target) && e.target !== btnHeroeText) {
        overlayContent.style.display = 'none';
    }
});
//SUBMIT FORM
submitForm.addEventListener('click', (e) => {
    e.preventDefault();
    const allFilled = Array.from(formInputs).every(input => input.value.trim() !== "");

    if (!allFilled) {
        afficherMessage(msgContact, "Tous les champs sont requis", 'msg-error');
    } else {
        afficherMessage(msgContact, "Message envoyé avec succès", 'msg-success');
        document.activeElement.blur();
        document.getElementById("formulaire").reset();
    }
});

/**
 * Affiche un message avec une classe donnée et le faire disparaître après 2 secondes
 * @param {HTMLElement} element - L'élément dans lequel afficher le message
 * @param {string} message - Le contenu du message à afficher
 * @param {string} className - La classe CSS à appliquer (ex: 'msg-error' ou 'msg-success')
 */
function afficherMessage(element, message, className) {
    element.textContent = message;
    element.classList.add(className);
    element.style.display = "flex";

    setTimeout(() => {
        element.style.display = "none";
        element.classList.remove(className);
    }, 2000);
}

//Mobile menu hamburger
iconMenu.addEventListener('click', (e) => {
    e.preventDefault()
    if (navUl.style.display === "block") {
        navUl.style.display = "none"
    }
    else {
        navUl.classList.remove('none')
        navUl.style.display = "block"
        navUl.classList.add('transition-menu-right-left')
    }


})

//Active menu link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

    });
});

//scrolling with menu
const articleObserver = new IntersectionObserver((entries, articleObserver) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            articles.forEach(article => {
                article.classList.add('animation')
                history.replaceState(null, null, '/');
                articleObserver.unobserve(entry.target)
            })
        } else {
            return
        }
    })
})
nombres.forEach(nombre => {
    articleObserver.observe(nombre)
})
//Image about observer
const imgAboutObserver = new IntersectionObserver((entries, imgAboutObserver) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            imgAbout.classList.add('animation')
            imgAboutObserver.unobserve(entry.target)

        } else {
            return
        }
    })
})
imgAboutObserver.observe(imgAbout)

//Text about intersectionObserver
const textAboutObserver = new IntersectionObserver((entries, textAboutObserver) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            textAbout.classList.add('animation')
            textAboutObserver.unobserve(entry.target)
        } else {
            return
        }
    })
})
textAboutObserver.observe(textAbout)

//images intersectionObserver
document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll("img.lazy-image");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.onload = () => img.classList.add("loaded");
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

//Slide images
let slideIndex = 1;
const showImages = (slide) => {
    let i;
    let slideImg = [...document.querySelectorAll(".slide")];

    if (slide > slideImg.length) {
        slideIndex = 1
    }
    if (slide < 1) {
        slideIndex = slideImg.length
    }
    for (i = 0; i < slideImg.length; i++) {
        slideImg[i].style.display = "none";
    }
    slideImg[slideIndex - 1].style.display = "block";
    slideImg[slideIndex - 1].classList.add('fade');
}

showImages(slideIndex);

const showSlide = (s) => {
    showImages(slideIndex += s)
}

slideLeft.addEventListener('click', () => {
    console.log('hello');
    showSlide(-1)
})
slideRight.addEventListener('click', () => {
    showSlide(+1)
})