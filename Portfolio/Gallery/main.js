const backToTop = document.querySelector('#backTop');
const navList = document.querySelector('nav ul');
const mobButton = document.querySelector('.mobileMenu');

backToTop.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

// skill bars
document.querySelectorAll(".animated-progress span").forEach((el) => {
    let progress = el.getAttribute("data-progress");

    /* setTimeout(() => { */
    el.style.width = progress + "%";
    /*   }, 1); */

    el.textContent = progress + "%";
});

// mobile menu
const toggleMenu = () => {
    navList.classList.toggle('responsive');
}

const x = document.querySelector('.menu');

document.onclick = function (e) {
    if (!x.contains(e.target)) {
        navList.classList.remove('responsive');
    }
}
mobButton.addEventListener('click', toggleMenu);


// on scroll behaviour navigation color change
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 744 || document.documentElement.scrollTop > 744) {
        document.querySelector('.name-nav').style.backdropFilter = "blur(3px)";
        document.querySelector('.name-nav').style.backgroundColor = "#00243d";

    } else {
        document.querySelector('.name-nav').style.backgroundColor = "transparent";

    }
}
// to open links in new tab
window.open($(this).attr("href"), '_blank', 'modal=yes');

// clear input when send
const btn = document.querySelector('#sendBtn');
function clearInput() {
    document.querySelector('#yourname').value = ''
    document.querySelector('#email').value = ''
    document.querySelector('#message').value = ''
}