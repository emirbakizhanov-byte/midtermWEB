const USER_KEY = 'electrotechUser';
const NAME_PATTERN = /^[A-Za-zА-Яа-яЁё\s'-]{2,30}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

function getUser() {
    const saved = localStorage.getItem(USER_KEY);
    if (!saved) return null;

    try {
        return JSON.parse(saved);
    } catch (error) {
        localStorage.removeItem(USER_KEY);
        return null;
    }
}

function updateAuthUI() {
    const user = getUser();

    document.querySelectorAll('.auth-guest').forEach(function (element) {
        element.classList.toggle('d-none', user !== null);
    });
    document.querySelectorAll('.auth-user').forEach(function (element) {
        element.classList.toggle('d-none', user === null);
    });
    document.querySelectorAll('[data-user-name]').forEach(function (element) {
        element.textContent = user ? user.name : '';
    });
}

function validateField(input) {
    const value = input.value.trim();
    let isValid = false;

    if (input.id === 'signinName') {
        isValid = NAME_PATTERN.test(value);
    } else if (input.id === 'signinEmail') {
        isValid = EMAIL_PATTERN.test(value);
    } else if (input.id === 'signinPassword') {
        isValid = input.value.length >= MIN_PASSWORD_LENGTH;
    }

    input.classList.toggle('is-invalid', !isValid);
    input.classList.toggle('is-valid', isValid);
    return isValid;
}

function signIn(name, email) {
    const user = { name: name, email: email, signedInAt: new Date().toISOString() };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    updateAuthUI();
}

function signOut() {
    localStorage.removeItem(USER_KEY);
    updateAuthUI();
}

document.addEventListener('DOMContentLoaded', function () {
    updateAuthUI();

    const form = document.getElementById('signinForm');
    const inputs = form.querySelectorAll('input');

    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            if (input.classList.contains('is-invalid')) {
                validateField(input);
            }
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let formIsValid = true;
        inputs.forEach(function (input) {
            if (!validateField(input)) formIsValid = false;
        });

        if (!formIsValid) {
            form.querySelector('.is-invalid').focus();
            return;
        }

        const name = document.getElementById('signinName').value.trim();
        const email = document.getElementById('signinEmail').value.trim();
        signIn(name, email);

        bootstrap.Modal.getOrCreateInstance(document.getElementById('signinModal')).hide();
        form.reset();
        inputs.forEach(function (input) {
            input.classList.remove('is-valid', 'is-invalid');
        });
    });

    document.getElementById('signOutBtn').addEventListener('click', signOut);
});
