/* Toggle Icon Navbar */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

/* Scroll Sections Active Link */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /* Sticky Navbar */
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* Remove toggle icon and navbar when click navbar link (scroll) */
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

/* Scroll Reveal */
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.timeline-item', { interval: 200 });
ScrollReveal().reveal('.skill-category', { interval: 200 });

/* Typed JS */
const typed = new Typed('.multiple-text', {
    strings: ['Manual Tester', 'Automation Engineer', 'Bug Hunter', 'Performance Analyst'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* Custom Cursor */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

/* Contact Form Handling */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        formData.append('access_key', '42501d7b-f4e3-425b-b6f9-a9d2ed7d0d31');
        const submitBtn = this.querySelector('input[type="submit"]');
        const originalBtnValue = submitBtn.value;

        submitBtn.value = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'wait';

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Success feedback using SweetAlert2
                    Swal.fire({
                        title: 'Success!',
                        text: 'Message Sent Successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                        confirmButtonColor: '#0ea5e9', // Matches brand color
                        background: '#1a2236',
                        color: '#e2e8f0'
                    });
                    contactForm.reset();
                } else {
                    // Error feedback
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong: ' + data.message,
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                        confirmButtonColor: '#ff5f56',
                        background: '#1a2236',
                        color: '#e2e8f0'
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Oops!',
                    text: 'An error occurred. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Close',
                    background: '#1a2236',
                    color: '#e2e8f0'
                });
            })
            .finally(() => {
                submitBtn.value = originalBtnValue;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            });
    });
}