$(function () {
    const faqContainer = $('#faqAccordion');
    if (!faqContainer.length) return;

    $('.faq-question').on('click', function () {
        const $question =$(this);
        const $item =$question.closest('.faq-item');
        const $answer =$item.find('.faq-answer');
        const $icon =$question.find('.faq-icon');
        const isOpen = $item.hasClass('active');

        $('.faq-item.active').not($item).each(function () {
            $(this).removeClass('active');$(this).find('.faq-question').attr('aria-expanded', 'false');
            $(this).find('.faq-answer').stop(true, true).slideUp(250);$(this).find('.faq-icon').text('+');
        });

        $item.toggleClass('active', !isOpen);$question.attr('aria-expanded', String(!isOpen));
        $answer.stop(true, true).slideToggle(250);$icon.text(isOpen ? '+' : '−');
    });
});