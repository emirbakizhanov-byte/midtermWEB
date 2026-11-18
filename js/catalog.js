$(function () {
    let currentCategory = 'all';
    let galleryImages = [];
    let currentIndex = 0;

    const $apiContainer = $('#apiProductList');
    const $errorAlert = $('#apiStatusMessage');
    const $reloadBtn = $('#reloadApiBtn');

    async function fetchExternalProducts() {
        if ($errorAlert.length) $errorAlert.hide().text('');
        if ($apiContainer.length) {
            $apiContainer.html(`
                <div class="col-12 text-center py-4">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="text-muted mt-2">Loading products...</p>
                </div>
            `);
        }

        try {
            // Request only the electronics category
            const response = await fetch('https://fakestoreapi.com/products/category/electronics?limit=3');

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();

            if (!data || data.length === 0) {
                throw new Error('No products found');
            }

            renderApiProducts(data);

        } catch (error) {
            if ($apiContainer.length) $apiContainer.html('');
            if ($errorAlert.length) {
                $errorAlert.text(`Could not load products from the API: ${error.message}`).fadeIn();
            }
        }
    }

    function renderApiProducts(products) {
        if (!$apiContainer.length) return;
        $apiContainer.html('');

        products.forEach(product => {
            const cardHtml = `
                <article class="col-md-4 product-item" data-category="api-item">
                    <div class="card h-100 shadow-sm border-info">
                        <img src="${product.image}" class="card-img-top p-3" alt="${product.title}" style="height: 200px; object-fit: contain;" loading="lazy">
                        <div class="card-body d-flex flex-column">
                            <span class="badge bg-info text-dark mb-2 align-self-start">API Data</span>
                            <h3 class="card-title h6">${product.title}</h3>
                            <p class="text-primary fw-bold mt-auto">$${product.price.toFixed(2)}</p>
                            <p class="small text-muted mb-3">${product.description.substring(0, 80)}...</p>
                            <button class="btn btn-outline-success w-100 mt-auto">Add to Cart</button>
                        </div>
                    </div>
                </article>
            `;
            $apiContainer.append(cardHtml);
        });
    }

    if ($reloadBtn.length) {
        $reloadBtn.on('click', function () {
            fetchExternalProducts();
        });
    }

    fetchExternalProducts();

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