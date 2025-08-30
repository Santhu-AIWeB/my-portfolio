document.addEventListener('DOMContentLoaded', () => {
    // JavaScript for the mobile sidebar menu functionality.
    const menuIcon = document.getElementById('menu-icon');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarLinks = document.querySelectorAll('#mobile-sidebar a');

    function toggleMenu() {
        mobileSidebar.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    menuIcon.addEventListener('click', toggleMenu);

    // Close sidebar when a link is clicked
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileSidebar.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Close sidebar when clicking outside of it
    document.body.addEventListener('click', (event) => {
        if (mobileSidebar.classList.contains('active') && !mobileSidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            mobileSidebar.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // JavaScript for the animated text effect.
    const animatedTextElement = document.getElementById('animatedText');
    const phrases = ["Full Stack Developer", "AI Engineer", "UI/UX Designer"];
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        const displayPhrase = isDeleting ? currentPhrase.substring(0, letterIndex - 1) : currentPhrase.substring(0, letterIndex + 1);

        animatedTextElement.textContent = displayPhrase;

        if (!isDeleting && letterIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        letterIndex = isDeleting ? letterIndex - 1 : letterIndex + 1;

        const typingSpeed = isDeleting ? 75 : 150;
        setTimeout(type, typingSpeed);
    }

    type();


    // =======================================================
    // UPDATED CODE FOR HANDLING THE CONTACT FORM SUBMISSION
    // =======================================================
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const buttonText = document.getElementById('button-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const formStatus = document.getElementById('form-status');

    if (form && submitBtn && buttonText && loadingSpinner && formStatus) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent the default form submission (page reload)

            // Show loading state
            buttonText.classList.add('hidden');
            loadingSpinner.classList.remove('hidden');
            submitBtn.disabled = true;
            formStatus.textContent = ''; // Clear previous status messages

            const formData = new FormData(form);
            try {
                // Submit the form data using Fetch API
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Your message has been sent successfully!';
                    formStatus.classList.remove('text-red-400');
                    formStatus.classList.add('text-green-400');
                    form.reset(); // Clear the form fields
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        formStatus.textContent = 'Something went wrong. Please check your inputs.';
                    } else {
                        formStatus.textContent = 'An unknown error occurred. Please try again later.';
                    }
                    formStatus.classList.remove('text-green-400');
                    formStatus.classList.add('text-red-400');
                }
            } catch (error) {
                console.error('Submission error:', error);
                formStatus.textContent = 'Network error. Please try again.';
                formStatus.classList.remove('text-green-400');
                formStatus.classList.add('text-red-400');
            } finally {
                // Hide loading state
                buttonText.classList.remove('hidden');
                loadingSpinner.classList.add('hidden');
                submitBtn.disabled = false;
            }
        });
    }
});