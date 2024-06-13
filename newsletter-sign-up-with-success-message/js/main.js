function iniitialize() {
    let newsletterSignupForm = document.getElementById("newsletter-signup-form");
    let newsletterSignupSuccess = document.getElementById("newsletter-signup-success");
    newsletterSignupSuccess.querySelector("button").addEventListener('click', () =>
    newsletterSignupSuccess.close());

    const handleSubmit = (e) => {
        e.preventDefault(e);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const emailRe = /\S+@\S+/;
        if (!data.email || !emailRe.test(data.email)) {
            document.getElementById('email-error').textContent = 'Valid email required';
            document.getElementById('email').classList.add('form-error');
        } else {
            document.getElementById('email-error').textContent = '';
            document.getElementById('email').classList.remove('form-error');
            newsletterSignupSuccess.showModal()
        }
    }

    newsletterSignupForm.addEventListener('submit', handleSubmit);
}

document.addEventListener('DOMContentLoaded', iniitialize);