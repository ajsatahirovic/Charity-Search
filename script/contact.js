document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Uzimanje vrednosti iz formi
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Resetovanje prethodnih grešaka i uspeha
        document.getElementById('fullNameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('messageError').textContent = '';
        document.getElementById('formSuccess').textContent = '';

        let isValid = true;

        // Provera da li su svi unosi prisutni
        if (!fullName) {
            document.getElementById('fullNameError').textContent = 'Full name is required.';
            isValid = false;
        }

        if (!email) {
            document.getElementById('emailError').textContent = 'Email is required.';
            isValid = false;
        } else {
            // Provera da li je email validan
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                isValid = false;
            }
        }

        if (!message) {
            document.getElementById('messageError').textContent = 'Message is required.';
            isValid = false;
        }

        // Ako su svi podaci validni, prikazivanje poruke o uspehu
        if (isValid) {
            document.getElementById('formSuccess').textContent = 'Message sent successfully!';
            form.reset(); // Opcionalno, resetovanje forme nakon uspeha
        }
    });
});
