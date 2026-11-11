$(function () {
    const contact = $('#contactForm');
    if (!contact.length) return;

    const registration = $(`
        <section class="mt-5" id="registrationSection">
            <h2 class="mb-3">Create an ElectroTech Account</h2>
            <form id="registrationForm" class="contact-card p-4 rounded-3" novalidate>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label" for="registerName">Full name</label>
                        <input class="form-control" id="registerName" autocomplete="name" required>
                        <div class="invalid-feedback">Enter at least 2 characters.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label" for="registerEmail">Email</label>
                        <input class="form-control" id="registerEmail" type="email" autocomplete="email" required>
                        <div class="invalid-feedback">Enter a valid email address.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label" for="registerPassword">Password</label>
                        <input class="form-control" id="registerPassword" type="password" autocomplete="new-password" required>
                        <div class="progress mt-2">
                            <div class="progress-bar" id="passwordStrengthBar" style="width:0%"></div>
                        </div>
                        <div class="form-text" id="passwordStrengthText">Enter a password of at least 8 characters.</div>
                        <div class="invalid-feedback">Use at least 8 characters, a letter and a number.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label" for="registerConfirm">Confirm password</label>
                        <input class="form-control" id="registerConfirm" type="password" autocomplete="new-password" required>
                        <div class="invalid-feedback">Passwords must match.</div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Create account</button>
                    </div>
                </div>
                <div class="alert mt-3 mb-0 d-none" id="registrationStatus" role="status" aria-live="polite"></div>
            </form>
        </section>
    `);

    contact.closest('section').after(registration);

    const form = $('#registrationForm');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const fields = [
        '#registerName',
        '#registerEmail',
        '#registerPassword',
        '#registerConfirm'
    ];

    function passwordScore(password) {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[a-z]/i.test(password) && /\d/.test(password)) score++;
        if (/[A-Z]/.test(password) && /[^a-z\d]/i.test(password) && password.length >= 12) score++;

        return score;
    }

    function validateField(selector) {
        const input = $(selector);
        const value = input.val().trim();
        let valid = false;

        if (selector === '#registerName') {
            valid = value.length >= 2;
        }

        if (selector === '#registerEmail') {
            valid = emailPattern.test(value);
        }

        if (selector === '#registerPassword') {
            valid = value.length >= 8 &&
                /[a-z]/i.test(value) &&
                /\d/.test(value);
        }

        if (selector === '#registerConfirm') {
            valid = value.length > 0 &&
                value === $('#registerPassword').val();
        }

        input.toggleClass('is-valid', valid);
        input.toggleClass('is-invalid', !valid);

        return valid;
    }

    function updateStrength() {
        const password = $('#registerPassword').val();
        const score = passwordScore(password);

        const states = [
            { label: 'Weak', width: 25, color: 'bg-danger' },
            { label: 'Weak', width: 33, color: 'bg-danger' },
            { label: 'Medium', width: 66, color: 'bg-warning' },
            { label: 'Strong', width: 100, color: 'bg-success' }
        ];

        const state = states[score];

        $('#passwordStrengthBar')
            .removeClass('bg-danger bg-warning bg-success')
            .addClass(state.color)
            .css('width', password ? `${state.width}%` : '0%');

        $('#passwordStrengthText').text(
            password
                ? `Password strength: ${state.label}`
                : 'Enter a password of at least 8 characters.'
        );
    }

    fields.forEach(selector => {
        $(selector).on('input blur', function () {
            validateField(selector);

            if (selector === '#registerPassword') {
                updateStrength();

                if ($('#registerConfirm').val()) {
                    validateField('#registerConfirm');
                }
            }
        });
    });

    form.on('submit', function (event) {
        event.preventDefault();

        const checks = fields.map(validateField);

        const status = $('#registrationStatus')
            .removeClass('d-none alert-success alert-danger');

        if (checks.every(Boolean)) {
            status
                .addClass('alert-success')
                .text('Registration form validated successfully. No account is created because this demo has no backend.');

            form[0].reset();

            fields.forEach(selector => {
                $(selector).removeClass('is-valid is-invalid');
            });

            updateStrength();
        } else {
            status
                .addClass('alert-danger')
                .text('Please correct the highlighted fields.');

            form.find('.is-invalid').first().trigger('focus');
        }
    });
});