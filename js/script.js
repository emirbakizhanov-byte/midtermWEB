$(function () {
    const button = $('<button>', {
        type: 'button',
        id: 'backToTop',
        class: 'btn btn-primary position-fixed bottom-0 end-0 m-4 shadow d-none',
        text: '↑',
        'aria-label': 'Back to top'
    }).css('z-index', 1050);

    $('body').append(button);

    function updateButton() {
        button.toggleClass('d-none', $(window).scrollTop() < 300);
    }

    $(window).on('scroll', updateButton);

    button.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 350);
    });

    updateButton();

    if (window.bootstrap && bootstrap.Tooltip) {
        $('[data-bs-toggle="tooltip"]').each(function () {
            new bootstrap.Tooltip(this);
        });
    }
});