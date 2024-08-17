
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegStar } from "react-icons/fa";

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState(''); // 'asc', 'desc', 'dateDesc'
    const [filter, setFilter] = useState(''); // To handle filter by category, brand, and price range
    const [search, setSearch] = useState(''); // Search query
    const [isDropdownOpen, setIsDropdownOpen] = useState(''); // For managing open dropdowns
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]); // Categories for dropdown
    const [brands, setBrands] = useState([]); // Brands for dropdown

    useEffect(() => {
        const fetchProductsAndCount = async () => {
            try {
                // Fetch the count
                const countResponse = await axios.get(`${import.meta.env.VITE_API_URL}/products-count`, {
                    params: {
                        search: search,
                        filter: filter
                    }
                });
                setCount(countResponse.data.count);

                // Fetch products
                const productsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
                    params: {
                        page: currentPage,
                        size: itemsPerPage,
                        sort: sortOrder,
                        filter: filter,
                        search: search
                    }
                });
                setProducts(productsResponse.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                toast.error("Error fetching products");
            }
        };

        fetchProductsAndCount();
    }, [sortOrder, filter, search, itemsPerPage, currentPage]);

    useEffect(() => {
        // Fetch categories and brands if necessary
        // Example hardcoded data for simplicity
        setCategories(['Ultrabook', 'Convertible', 'Business', 'Gaming', 'Standard', 'Professional', 'Convertible']);
        setBrands(['Lenovo', 'Apple', 'Samsung', 'Dell', 'HP', 'Asus', 'Microsoft', 'Acer', 'Razer', 'MSI']);
    }, []);

    const handleSortOptionClick = (option) => {
        setSortOrder(option);
        setIsDropdownOpen(''); // Close the dropdown
        setCurrentPage(1); // Reset to the first page on sort change
    };

    const handleFilterChange = (type, value) => {
        let filterValue;
        if (type === 'category') {
            filterValue = value;
        } else if (type === 'brand') {
            filterValue = `BrandName${value}`;
        } else if (type === 'price') {
            filterValue = `PriceRange${value}`;
        }
        setFilter(filterValue);
        setCurrentPage(1); // Reset to the first page on filter change
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to the first page on search change
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(count / itemsPerPage); // Calculate the total number of pages
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1); // Generate an array of page numbers

    return (
        <div>
            <div className="container mx-auto flex items-center justify-around mt-6 mb-4">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={search}
                    onChange={handleSearchChange}
                    className="input input-bordered w-full max-w-xs"
                />

                <div className="flex items-center gap-4">
                    <div className="relative inline-block text-left ml-4">
                        <button
                            className="btn sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900"
                            onClick={() => setIsDropdownOpen(isDropdownOpen === 'sort' ? '' : 'sort')}
                        >
                            {sortOrder === 'asc' ? 'Price: Low to High' :
                                sortOrder === 'desc' ? 'Price: High to Low' :
                                    sortOrder === 'dateDesc' ? 'Date Added: Newest First' :
                                        'Sort By'}
                            <svg className="ml-2 w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isDropdownOpen === 'sort' && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                <ul className="py-1">
                                    <li>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${sortOrder === 'asc' ? 'bg-gray-100' : ''}`}
                                            onClick={() => handleSortOptionClick('asc')}
                                        >
                                            Price: Low to High
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${sortOrder === 'desc' ? 'bg-gray-100' : ''}`}
                                            onClick={() => handleSortOptionClick('desc')}
                                        >
                                            Price: High to Low
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${sortOrder === 'dateDesc' ? 'bg-gray-100' : ''}`}
                                            onClick={() => handleSortOptionClick('dateDesc')}
                                        >
                                            Date Added: Newest First
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${sortOrder === '' ? 'bg-gray-100' : ''}`}
                                            onClick={() => handleSortOptionClick('')}
                                        >
                                            Default
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="relative inline-block text-left ml-4">
                        <button
                            className="btn sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900"
                            onClick={() => setIsDropdownOpen(isDropdownOpen === 'category' ? '' : 'category')}
                        >
                            Category
                            <svg className="ml-2 w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isDropdownOpen === 'category' && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                <ul className="py-1">
                                    {categories.map(category => (
                                        <li key={category}>
                                            <button
                                                className={`block px-4 py-2 text-sm w-full text-left ${filter === category ? 'bg-gray-100' : ''}`}
                                                onClick={() => handleFilterChange('category', category)}
                                            >
                                                {category}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="relative inline-block text-left ml-4">
                        <button
                            className="btn sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900"
                            onClick={() => setIsDropdownOpen(isDropdownOpen === 'brand' ? '' : 'brand')}
                        >
                            Brand
                            <svg className="ml-2 w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isDropdownOpen === 'brand' && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                <ul className="py-1">
                                    {brands.map(brand => (
                                        <li key={brand}>
                                            <button
                                                className={`block px-4 py-2 text-sm w-full text-left ${filter.startsWith(`BrandName${brand}`) ? 'bg-gray-100' : ''}`}
                                                onClick={() => handleFilterChange('brand', brand)}
                                            >
                                                {brand}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="relative inline-block text-left ml-4">
                        <button
                            className="btn sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900"
                            onClick={() => setIsDropdownOpen(isDropdownOpen === 'price' ? '' : 'price')}
                        >
                            Price Range
                            <svg className="ml-2 w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isDropdownOpen === 'price' && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                <ul className="py-1">
                                    <li>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${filter.startsWith('PriceRange1') ? 'bg-gray-100' : ''}`}
                                            onClick={() => handleFilterChange('price', '1')}
                                        >
                                            $0 - $1000
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${filter.startsWith('PriceRange2') ? 'bg-gray-100' : ''}`}
                                            onClick={() => handleFilterChange('price', '2')}
                                        >
                                            $1001 - $2000
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${filter.startsWith('PriceRange3') ? 'bg-gray-100' : ''}`}
                                            onClick={() => handleFilterChange('price', '3')}
                                        >
                                            $2001 - $3000
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto gap-6 sm:p-2 md:p-4 lg:p-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
                {products.map(product => (
                    <div
                        key={product.ProductId}
                        className="card bg-base-100 w-96 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img
                                src={product.ProductImage}
                                alt={product.ProductName || "Product"}
                                className="rounded-xl"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <p>Brand: {product.BrandName}</p>
                            <h2 className="card-title">{product.ProductName}</h2>
                            <p>{product.Description}</p>
                            <p className="flex items-center gap-2">Ratings: {product.Ratings}<FaRegStar /></p>
                            <p>Price: ${product.Price}</p>
                            <p>Created: {new Date(product.CreationDateTime).toLocaleDateString()}</p>
                            <div className="card-actions">
                                <button className="btn  sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4">
                {pages.map(page => (
                    <button
                        key={page}
                        className={`mx-2 px-4 py-2 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductCard;
