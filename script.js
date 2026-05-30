// Loading screen
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const motivationalTip = document.getElementById('motivational-tip');
const spinningCat = document.getElementById('spinning-cat');

const tips = [
    "Every expert was once a beginner!",
    "Code it. Break it. Fix it. Repeat.",
    "The best time to start was yesterday. The next best time is now.",
    "Bugs are just features in disguise.",
    "Keep going, you're doing great!"
];

let clickCount = 0;
let progress = 0;

motivationalTip.textContent = tips[0];

const interval = setInterval(() => {
    progress += 1;
    progressBar.style.width = progress + '%';

    if (progress % 20 === 0) {
        motivationalTip.textContent = tips[progress / 20];
    }

    if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
            loadingScreen.style.opacity = 0;
            loadingScreen.style.transition = 'opacity 0.5s ease';
            setTimeout(() => loadingScreen.style.display = 'none', 500);
        }, 500);
    }
}, 70);

document.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 5) {
        spinningCat.style.display = 'block';
    }
});
//cursor and fade-in animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

const elements = document.querySelectorAll('.fade-in');
elements.forEach((el) => observer.observe(el));

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Lightbox functionality
const images = document.querySelectorAll('.gallery-img');
const imageSources = Array.from(images).map(img => img.src);
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const close = document.querySelector('.close');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let currentIndex = 0;

images[0].addEventListener('click', () => {
    lightbox.classList.add('active');
    lightboxImg.src = imageSources[currentIndex];
});

close.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

next.addEventListener('click', () => {
    lightboxImg.style.opacity = 0; // Start fade-out
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length; // Move to next image
        lightboxImg.src = imageSources[currentIndex]; // Update image source
        lightboxImg.style.opacity = 1; // Fade back in
    }, 300); // Duration of fade-out
});

prev.addEventListener('click', () => {
    lightboxImg.style.opacity = 0; // Start fade-out
    setTimeout(() => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = imageSources[currentIndex];
        lightboxImg.style.opacity = 1; // Fade back in
    }, 300); // Duration of fade-out
});

