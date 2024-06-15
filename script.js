const productList = JSON.parse(localStorage.getItem('products')) || [];

function renderProducts(productList) {
    const productsContainer = document.getElementById('productList');
    productsContainer.innerHTML = '';
    productList.sort((a, b) => a.name.localeCompare(b.name));
    productList.forEach((product, index) => {
        const p = document.createElement('p');
        p.textContent = `${product.name} - ${product.calories} кал`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
            const productIndex = productList.findIndex(p => p.name === product.name && p.calories === product.calories);

            if (productIndex !== -1) {
                productList.splice(productIndex, 1);
                renderProducts(productList);
                calculateTotalCalories(productList);
                localStorage.setItem('products', JSON.stringify(productList));
            }
        });

        p.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.addEventListener('click', () => {
            editProduct(index);
        });

        p.appendChild(editButton);
        productsContainer.appendChild(p);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderProducts(productList);
});

function editProduct(index) {
    const product = productList[index];
    const productNameInput = document.getElementById('productName');
    const caloriesInput = document.getElementById('calories');
    productNameInput.value = product.name;
    caloriesInput.value = product.calories;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    saveButton.addEventListener('click', () => {
        product.name = productNameInput.value;
        product.calories = caloriesInput.value;
        renderProducts(productList);
        calculateTotalCalories(productList);
        localStorage.setItem('products', JSON.stringify(productList));
        productNameInput.value = '';
        caloriesInput.value = '';
        saveButton.remove();
    });

    document.getElementById('addProductButton').parentNode.insertBefore(saveButton, document.getElementById('addProductButton'));
}

function addProduct() {
    const productName = document.getElementById('productName').value;
    const calories = document.getElementById('calories').value;

    if (productName && calories) {
        const product = { name: productName, calories: calories };
        productList.push(product);
        renderProducts(productList);
        calculateTotalCalories(productList);
        document.getElementById('productName').value = '';
        document.getElementById('calories').value = '';
        localStorage.setItem('products', JSON.stringify(productList));
    } else {
        alert('Введите название и калории продукта');
    }
}

function calculateTotalCalories(productList) {
    let totalCalories = 0;
    productList.forEach(product => {
        totalCalories += parseInt(product.calories);
    });
    document.getElementById('totalCalories').textContent = totalCalories;
}

function filterProducts() {
    const filterText = document.getElementById('filterInput').value.toLowerCase();
    const filteredProducts = productList.filter(product => {
        return product.name.toLowerCase().includes(filterText) ||
            product.calories.toString().includes(filterText);
    });
    renderFilteredProducts(filteredProducts);
}

function renderFilteredProducts(filteredProducts) {
    const productsContainer = document.getElementById('productList');
    productsContainer.innerHTML = '';
    filteredProducts.forEach((product) => {
        const p = document.createElement('p');
        p.textContent = `${product.name} - ${product.calories} кал`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
            const productIndex = productList.findIndex(p => p.name === product.name && p.calories === product.calories);
            const filteredIndex = filteredProducts.indexOf(product);

            if (productIndex !== -1) {
                productList.splice(productIndex, 1);
                if (filteredIndex !== -1) {
                    filteredProducts.splice(filteredIndex, 1);
                }
                renderFilteredProducts(filteredProducts);
                calculateTotalCalories(productList);
                localStorage.setItem('products', JSON.stringify(productList));
            }
        });

        p.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.addEventListener('click', () => {
            const indexInMainList = productList.findIndex(p => p.name === product.name && p.calories === product.calories);
            editProduct(indexInMainList);
        });

        p.appendChild(editButton);
        productsContainer.appendChild(p);
    });
}

renderProducts(productList);
calculateTotalCalories(productList);