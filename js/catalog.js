$(function () {
    let currentCategory = 'all';
    let galleryImages = [];
    let currentIndex = 0;

    function filterProducts() {
        const query = $('#searchInput').val().toLowerCase().trim();

        $('.product-item').each(function () {
            const $item = $(this);
            const category = $item.data('category');
            const title = $item.find('.card-title').text().toLowerCase();
            const specs = $item.find('ul').text().toLowerCase();

            const matchesCategory = (currentCategory === 'all' || category === currentCategory);
            const matchesSearch = title.includes(query) || specs.includes(query);

            if (matchesCategory && matchesSearch) {
                $item.stop(true, true).fadeIn(300);
            } else {
                $item.stop(true, true).fadeOut(300);
            }
        });
    }

    $('#searchInput').on('input keyup', function () {
        filterProducts();
    });

    $('.filter-btn').on('click', function () {
        $('.filter-btn').removeClass('active btn-primary').addClass('btn-outline-primary');
        $(this).removeClass('btn-outline-primary').addClass('active btn-primary');
        currentCategory = $(this).data('filter');
        filterProducts();
    });

    function updateGalleryList() {
        galleryImages = [];
        $('.product-item:visible').each(function () {
            const $img = $(this).find('.card-img-top');
            const $title = $(this).find('.card-title');
            galleryImages.push({
                src: $img.attr('src'),
                alt: $img.attr('alt') || $title.text(),
                title: $title.text()
            });
        });
    }

    function showLightboxImage(index) {
        if (galleryImages.length === 0) return;
        currentIndex = (index + galleryImages.length) % galleryImages.length;
        const item = galleryImages[currentIndex];

        $('#lightboxImg').animate({ opacity: 0 }, 150, function () {
            $(this).attr('src', item.src).attr('alt', item.alt).animate({ opacity: 1 }, 150);
        });
        $('#lightboxCaption').text(item.title + ' (' + (currentIndex + 1) + ' / ' + galleryImages.length + ')');
    }

    $(document).on('click', '.card-img-top', function () {
        updateGalleryList();
        const clickedSrc = $(this).attr('src');
        currentIndex = galleryImages.findIndex(img => img.src === clickedSrc);
        if (currentIndex === -1) currentIndex = 0;

        showLightboxImage(currentIndex);
        $('#lightboxModal').stop(true, true).fadeIn(300);
    });

    $('#lightboxClose, #lightboxOverlay').on('click', function () {
        $('#lightboxModal').stop(true, true).fadeOut(300);
    });

    $('#lightboxNext').on('click', function (e) {
        e.stopPropagation();
        showLightboxImage(currentIndex + 1);
    });

    $('#lightboxPrev').on('click', function (e) {
        e.stopPropagation();
        showLightboxImage(currentIndex - 1);
    });

    $(document).on('keydown', function (e) {
        if ($('#lightboxModal').is(':visible')) {
            if (e.key === 'Escape') $('#lightboxModal').stop(true, true).fadeOut(300);
            if (e.key === 'ArrowRight') showLightboxImage(currentIndex + 1);
            if (e.key === 'ArrowLeft') showLightboxImage(currentIndex - 1);
        }
    });
});