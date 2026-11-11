$(function () {
    const tableBody = $('#productTableBody');
    if (!tableBody.length) return;

    const STORAGE_KEY = 'electrotechProducts';

    const defaultProducts = [
        { id: 1, name: 'Smartphone X Pro', category: 'Smartphones', price: 999, stock: 14 },
        { id: 2, name: 'UltraBook Air 15', category: 'Laptops', price: 1299, stock: 6 },
        { id: 3, name: 'NoiseFree Wireless', category: 'Audio', price: 199, stock: 25 },
        { id: 4, name: 'Smart Watch Series 5', category: 'Accessories', price: 299, stock: 3 },
        { id: 5, name: '4K Ultra Vision Monitor', category: 'Accessories', price: 499, stock: 9 },
        { id: 6, name: 'RGB Mechanical Keyboard', category: 'Accessories', price: 89, stock: 0 }
    ];

    const productModal = new bootstrap.Modal('#productModal');
    const viewModal = new bootstrap.Modal('#viewModal');
    const deleteModal = new bootstrap.Modal('#deleteModal');

    const form = $('#productForm');
    const nameInput = $('#productName');
    const categoryInput = $('#productCategory');
    const priceInput = $('#productPrice');
    const stockInput = $('#productStock');

    let products = loadProducts();
    let editingId = null;
    let deletingId = null;
    let statusTimer = null;

    function loadProducts() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (Array.isArray(saved)) return saved;
        } catch (error) {
            localStorage.removeItem(STORAGE_KEY);
        }
        return defaultProducts.map(function (product) {
            return Object.assign({}, product);
        });
    }

    function saveProducts() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        } catch (error) {
            return;
        }
    }

    function formatPrice(price) {
        return '$' + Number(price).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function findProduct(id) {
        return products.find(function (product) {
            return product.id === id;
        });
    }

    function nextId() {
        return products.reduce(function (max, product) {
            return Math.max(max, product.id);
        }, 0) + 1;
    }

    function createRow(product, index) {
        const row = $('<tr>').attr('data-id', product.id);
        const stockCell = $('<td>').text(product.stock);

        if (product.stock < 5) {
            stockCell.addClass('stock-low');
        }

        const actions = $('<td>').addClass('actions-cell').append(
            $('<button>', { type: 'button', class: 'btn btn-sm btn-outline-primary view-btn', text: 'View' }),
            ' ',
            $('<button>', { type: 'button', class: 'btn btn-sm btn-outline-warning edit-btn', text: 'Edit' }),
            ' ',
            $('<button>', { type: 'button', class: 'btn btn-sm btn-outline-danger delete-btn', text: 'Delete' })
        );

        return row.append(
            $('<td>').text(index + 1),
            $('<td>').text(product.name),
            $('<td>').text(product.category),
            $('<td>').text(formatPrice(product.price)),
            stockCell,
            actions
        );
    }

    function renderTable() {
        tableBody.empty();

        if (products.length === 0) {
            tableBody.append(
                $('<tr>').append(
                    $('<td>', { colspan: 6, class: 'text-center text-muted py-4', text: 'No products yet. Click "Add Product" to create one.' })
                )
            );
        } else {
            products.forEach(function (product, index) {
                tableBody.append(createRow(product, index));
            });
        }

        $('#productCount').text(products.length);
    }

    function highlightRow(id) {
        const row = tableBody.find('tr[data-id="' + id + '"]');
        row.addClass('row-highlight').hide().fadeIn(400);
        setTimeout(function () {
            row.removeClass('row-highlight');
        }, 1500);
    }

    function showStatus(message, type) {
        clearTimeout(statusTimer);
        $('#tableStatus')
            .removeClass('d-none alert-success alert-info alert-danger')
            .addClass('alert-' + type)
            .text(message)
            .stop(true, true)
            .hide()
            .fadeIn(300);
        statusTimer = setTimeout(function () {
            $('#tableStatus').fadeOut(300);
        }, 3000);
    }

    function setValidity(input, isValid) {
        input.toggleClass('is-valid', isValid).toggleClass('is-invalid', !isValid);
        return isValid;
    }

    function validateName() {
        return setValidity(nameInput, nameInput.val().trim().length >= 2);
    }

    function validateCategory() {
        return setValidity(categoryInput, categoryInput.val() !== '');
    }

    function validatePrice() {
        const value = priceInput.val().trim();
        return setValidity(priceInput, value !== '' && Number(value) > 0);
    }

    function validateStock() {
        const value = stockInput.val().trim();
        return setValidity(stockInput, /^\d+$/.test(value));
    }

    function validateForm() {
        const results = [validateName(), validateCategory(), validatePrice(), validateStock()];
        return results.every(Boolean);
    }

    function resetForm() {
        form[0].reset();
        form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
    }

    function rowId(button) {
        return Number($(button).closest('tr').data('id'));
    }

    $('#addProductBtn').on('click', function () {
        editingId = null;
        resetForm();
        $('#productModalTitle').text('Add Product');
        $('#productSubmitBtn').text('Add');
        productModal.show();
    });

    tableBody.on('click', '.view-btn', function () {
        const product = findProduct(rowId(this));
        if (!product) return;

        const details = [
            ['ID', product.id],
            ['Product', product.name],
            ['Category', product.category],
            ['Price', formatPrice(product.price)],
            ['Stock', product.stock + ' pcs'],
            ['Status', product.stock > 0 ? 'In stock' : 'Out of stock'],
            ['Total value', formatPrice(product.price * product.stock)]
        ];

        $('#viewDetails').empty();
        details.forEach(function (item) {
            $('#viewDetails').append(
                $('<dt>').addClass('col-5').text(item[0]),
                $('<dd>').addClass('col-7').text(item[1])
            );
        });

        viewModal.show();
    });

    tableBody.on('click', '.edit-btn', function () {
        const product = findProduct(rowId(this));
        if (!product) return;

        editingId = product.id;
        resetForm();
        nameInput.val(product.name);
        categoryInput.val(product.category);
        priceInput.val(product.price);
        stockInput.val(product.stock);
        $('#productModalTitle').text('Edit Product');
        $('#productSubmitBtn').text('Save changes');
        productModal.show();
    });

    tableBody.on('click', '.delete-btn', function () {
        const product = findProduct(rowId(this));
        if (!product) return;

        deletingId = product.id;
        $('#deleteProductName').text(product.name);
        deleteModal.show();
    });

    $('#confirmDeleteBtn').on('click', function () {
        const product = findProduct(deletingId);
        if (!product) return;

        const removedId = deletingId;
        deletingId = null;
        deleteModal.hide();

        tableBody.find('tr[data-id="' + removedId + '"]').fadeOut(300, function () {
            products = products.filter(function (item) {
                return item.id !== removedId;
            });
            saveProducts();
            renderTable();
            showStatus('"' + product.name + '" was deleted.', 'danger');
        });
    });

    nameInput.on('input', validateName);
    categoryInput.on('change', validateCategory);
    priceInput.on('input', validatePrice);
    stockInput.on('input', validateStock);

    form.on('submit', function (event) {
        event.preventDefault();

        if (!validateForm()) {
            form.find('.is-invalid').first().trigger('focus');
            return;
        }

        const data = {
            name: nameInput.val().trim(),
            category: categoryInput.val(),
            price: Number(priceInput.val()),
            stock: Number(stockInput.val())
        };

        let savedId = editingId;

        if (editingId === null) {
            savedId = nextId();
            products.push(Object.assign({ id: savedId }, data));
            showStatus('"' + data.name + '" was added.', 'success');
        } else {
            Object.assign(findProduct(editingId), data);
            showStatus('"' + data.name + '" was updated.', 'info');
        }

        saveProducts();
        renderTable();
        highlightRow(savedId);
        productModal.hide();
    });

    $('#productModal').on('shown.bs.modal', function () {
        nameInput.trigger('focus');
    });

    renderTable();
});
