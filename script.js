document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-mode');
    const body = document.body;
    const title = document.querySelector("h1");
    const todayDate = document.createElement("p");
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    // Personalized Time-Based Greeting with Typing Effect
    const hours = new Date().getHours();
    let greeting = "Hello!";
    if (hours < 12) greeting = "Good Morning! ☀️";
    else if (hours < 18) greeting = "Good Afternoon! 🌤️";
    else greeting = "Good Evening! 🌙";

    function typeEffect(element, text, speed) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        element.textContent = "";
        typing();
    }
    typeEffect(title, greeting, 100);

    // Display today's date under greeting
    todayDate.textContent = new Date().toLocaleDateString();
    todayDate.classList.add("date-style");
    title.insertAdjacentElement("afterend", todayDate);

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        toggleButton.textContent = '☀️';
        updateParticles(true);
    } else {
        updateParticles(false);
    }

    // Dark/Light Mode Toggle with Smooth Particle Change
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            toggleButton.textContent = '☀️';
            updateParticles(true);
        } else {
            localStorage.setItem('theme', 'dark');
            toggleButton.textContent = '🌙';
            updateParticles(false);
        }
    });

    // Keyboard Shortcuts (D for Dark Mode, L for Light Mode)
    document.addEventListener("keydown", (event) => {
        if (event.key.toLowerCase() === "d") {
            body.classList.remove('light-mode');
            toggleButton.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
            updateParticles(false);
        }
        if (event.key.toLowerCase() === "l") {
            body.classList.add('light-mode');
            toggleButton.textContent = '☀️';
            localStorage.setItem('theme', 'light');
            updateParticles(true);
        }
    });

    // Initialize Particles.js with Dynamic Colors
    function updateParticles(isLightMode) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": isLightMode ? ["#555", "#888"] : ["#ffffff", "#aaaaaa"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 2, "random": true },
                "move": { "enable": true, "speed": 2, "direction": "none" }
            }
        });
    }

    // Button Ripple Effect
    document.querySelectorAll(".btn").forEach((button) => {
        button.addEventListener("click", function (e) {
            let ripple = document.createElement("span");
            ripple.classList.add("ripple");
            let rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Mouse Trail Animation
    document.addEventListener("mousemove", (event) => {
        let trail = document.createElement("div");
        trail.className = "mouse-trail";
        trail.style.left = `${event.clientX}px`;
        trail.style.top = `${event.clientY}px`;
        document.body.appendChild(trail);

        setTimeout(() => { trail.remove(); }, 500);
    });

    // Scroll Animation: Fade-in Effect for Sections
    const hiddenElements = document.querySelectorAll(".hidden");
    function revealOnScroll() {
        hiddenElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add("show");
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run initially

    // Contact Form Submission (Simulated)
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Simulating sending email
        formStatus.textContent = "Sending...";
        setTimeout(() => {
            formStatus.textContent = `✅ Thanks, ${name}! Your message has been sent.`;
            contactForm.reset();
        }, 2000);
    });

    // Fun Easter Egg: Click the title to reveal a secret
    title.addEventListener("click", () => {
        alert("🚀 Keep pushing forward, Tabitha! The best is yet to come! 💡");
    });
});
