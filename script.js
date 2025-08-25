// Show preloader for 2 seconds
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("preloader").style.display = "none";

        // Show splash screen for 2s
        let splash = document.getElementById("splash-screen");
        splash.classList.add("active");
        
        setTimeout(() => {
            splash.classList.remove("active");
        }, 2000);

    }, 2000);
});
// Typing effect
const typingText = document.querySelector(".typing-text");
const words = ["Web Developer", "UI/UX Designer", "Ethical Hacker"];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = "";
let isDeleting = false;

function type() {
    currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, letterIndex--);
    } else {
        typingText.textContent = currentWord.substring(0, letterIndex++);
    }

    if (!isDeleting && letterIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1000); // pause before deleting
        return;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, isDeleting ? 80 : 120);
}

document.addEventListener("DOMContentLoaded", type);
// Dark/Light Mode Toggle
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    // Change icon
    if (document.body.classList.contains("light-theme")) {
        themeToggle.textContent = "🌞"; // Sun icon
    } else {
        themeToggle.textContent = "🌙"; // Moon icon
    }
});
// Removed CSS code from JavaScript file. Ensure to include the CSS file in your HTML.
// Accent color picker
const accentPicker = document.getElementById("accent-picker");

accentPicker.addEventListener("input", (e) => {
    document.documentElement.style.setProperty('--accent-color', e.target.value);
});
// Counter Animation
const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {
    counter.innerText = "0";
    const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;
        const increment = target / 100; // speed factor
        if (current < target) {
            counter.innerText = `${Math.ceil(current + increment)}`;
            setTimeout(updateCounter, 30);
        } else {
            counter.innerText = target;
        }
    };
    updateCounter();
};

let counterTriggered = false;
window.addEventListener("scroll", () => {
    const countersSection = document.querySelector(".counters");
    const sectionTop = countersSection.offsetTop - window.innerHeight + 100;
    if (!counterTriggered && window.scrollY > sectionTop) {
        counters.forEach(runCounter);
        counterTriggered = true;
    }
});
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();  // Prevent default page reload

    fetch("https://formsubmit.co/ajax/YOUR_EMAIL", {  // AJAX POST to FormSubmit
        method: "POST",
        body: new FormData(this)
    })
    .then(response => response.json())  // Parse JSON response
    .then(data => {
        document.getElementById("formStatus").textContent = "✅ Message sent!";  // Show success message
        this.reset();  // Clear form fields
    })
    .catch(error => {
        document.getElementById("formStatus").textContent = "❌ Something went wrong.";  // Show error message
    });
});
// Get modal elements
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');

// Function to open modal with project details
function openModal(title, imageSrc, description) {
  modalTitle.textContent = title;
  modalImage.src = imageSrc;
  modalDescription.textContent = description;
  modal.style.display = 'flex';
}

// Close modal when clicking close button or outside modal content
modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Attach click events to each project card
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('.project-info h3').textContent;
    const imageSrc = card.querySelector('img').src;
    const description = card.querySelector('.project-info p').textContent;
    openModal(title, imageSrc, description);
  });
});
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    fetch("https://formsubmit.co/ajax/YOUR_EMAIL", {
      method: "POST",
      body: new FormData(this)
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById("formStatus").textContent = "✅ Message sent!";
      this.reset();
    })
    .catch(error => {
      document.getElementById("formStatus").textContent = "❌ Something went wrong.";
    });
  });
  document.getElementById("newsletterForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    fetch("https://formsubmit.co/ajax/YOUR_EMAIL", {
      method: "POST",
      body: new FormData(this)
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById("newsletterStatus").textContent = "✅ Subscription successful!";
      this.reset();
    })
    .catch(error => {
      document.getElementById("newsletterStatus").textContent = "❌ Subscription failed.";
    });
  });
  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = this.name.value;
    const email = this.email.value;
    const message = this.message.value;
  
    // Save to localStorage
    let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    messages.push({name, email, message, date: new Date().toLocaleString()});
    localStorage.setItem("contactMessages", JSON.stringify(messages));
  
    alert("✅ Message saved to dashboard!");
    this.reset();
    renderMessages(); // update dashboard list
  });
  document.getElementById("newsletterForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const email = this.email.value;
  
    let subscribers = JSON.parse(localStorage.getItem("newsletterSubscribers")) || [];
    subscribers.push({email, date: new Date().toLocaleString()});
    localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers));
  
    alert("✅ Subscriber saved to dashboard!");
    this.reset();
    renderSubscribers(); // update dashboard list
  });
  function renderMessages() {
    const list = document.getElementById("messagesList");
    const messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    list.innerHTML = "";
    messages.forEach(msg => {
      const li = document.createElement("li");
      li.textContent = `[${msg.date}] ${msg.name} (${msg.email}): ${msg.message}`;
      list.appendChild(li);
    });
  }
  
  function renderSubscribers() {
    const list = document.getElementById("subscribersList");
    const subscribers = JSON.parse(localStorage.getItem("newsletterSubscribers")) || [];
    list.innerHTML = "";
    subscribers.forEach(sub => {
      const li = document.createElement("li");
      li.textContent = `[${sub.date}] ${sub.email}`;
      list.appendChild(li);
    });
  }
  
  
  