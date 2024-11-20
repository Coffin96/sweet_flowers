class ProductFilterSort {
    constructor(products) {
        this.products = products;
        this.filteredProducts = [...products];
        this.initFilterComponents();
    }

    initFilterComponents() {
        const filterContainer = document.createElement('div');
        filterContainer.classList.add('product-filters');
        filterContainer.innerHTML = `
            <div class="filter-section">
                <h4>Категорії</h4>
                <select id="category-filter" multiple>
                    <option value="classic">Класичні</option>
                    <option value="premium">Преміум</option>
                    <option value="custom">Індивідуальні</option>
                </select>
            </div>

            <div class="sort-section">
                <h4>Сортування</h4>
                <select id="sort-select">
                    <option value="price-asc">Ціна: від дешевих</option>
                    <option value="price-desc">Ціна: від дорогих</option>
                    <option value="rating">За рейтингом</option>
                </select>
            </div>
        `;

        document.querySelector('.product-catalog').prepend(filterContainer);
        this.attachFilterListeners();
    }

    attachFilterListeners() {
        const categoryFilter = document.getElementById('category-filter');
        const sortSelect = document.getElementById('sort-select');

        categoryFilter.addEventListener('change', () => this.applyFilters());
        sortSelect.addEventListener('change', () => this.applyFilters());
    }

    applyFilters() {
        const selectedCategories = Array.from(
            document.getElementById('category-filter').selectedOptions
        ).map(option => option.value);

        const sortMethod = document.getElementById('sort-select').value;

        this.filteredProducts = this.products.filter(product => 
            selectedCategories.length === 0 || 
            selectedCategories.includes(product.category)
        );

        switch(sortMethod) {
            case 'price-asc':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
        }

        this.renderFilteredProducts();
    }

    renderFilteredProducts() {
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = '';
        
        this.filteredProducts.forEach(product => {
            const productCard = this.createProductCard(product);
            productGrid.appendChild(productCard);
        });
    }
}