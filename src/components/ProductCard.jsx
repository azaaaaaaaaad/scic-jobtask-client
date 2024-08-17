
// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { FaRegStar } from "react-icons/fa";

// const ProductCard = () => {
//     const [products, setProducts] = useState([]);
//     const [sortOrder, setSortOrder] = useState('default'); // 'default', 'asc', 'desc', 'dateAsc', 'dateDesc'
//     const [search, setSearch] = useState('');
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
//                     params: {
//                         sort: sortOrder,
//                         search: search
//                     }
//                 });
//                 setProducts(data);
//             } catch (err) {
//                 console.error("Error fetching products:", err);
//                 toast.error("Error fetching products");
//             }
//         };
//         getData();
//     }, [sortOrder, search]);

//     const handleSearch = e => {
//         e.preventDefault();
//         const searchText = e.target.search.value;
//         setSearch(searchText);
//     };

//     const handleSortOptionClick = (option) => {
//         setSortOrder(option);
//         setIsDropdownOpen(false);
//     };

//     return (
//         <div>
//             <div className="flex items-center justify-around text-center mt-6">
//                 <form onSubmit={handleSearch}>
//                     <input
//                         className="mr-2 border border-black rounded-xl lg:p-4"
//                         type="text"
//                         name="search"
//                     />
//                     <input
//                         className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900"
//                         type="submit"
//                         value="Search"
//                     />
//                 </form>
//                 <div className="relative inline-block text-left">
//                     <button
//                         className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900"
//                         onClick={() => setIsDropdownOpen(prev => !prev)}
//                     >
//                         {sortOrder === 'default' ? 'Sort as you wish' :
//                             sortOrder === 'asc' ? 'Price: Low to High' :
//                                 sortOrder === 'desc' ? 'Price: High to Low' :
//                                     sortOrder === 'dateAsc' ? 'Date: Oldest to Newest' :
//                                         'Date: Newest to Oldest'}
//                         <svg className="ml-2 w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                             <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
//                         </svg>
//                     </button>
//                     {/* Dropdown menu */}
//                     <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 transition-opacity duration-300 ${isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//                         <ul className="py-1">
//                             <li>
//                                 <button
//                                     className={`block px-4 py-2 text-sm w-full text-left ${sortOrder === 'asc' ? 'bg-gray-100' : ''}`}
//                                     onClick={() => handleSortOptionClick('asc')}
//                                 >
//                                     Price: Low to High
//                                 </button>
//                             </li>
//                             <li>
//                                 <button
//                                     className={`block px-4 py-2 text-sm w-full text-left ${sortOrder === 'desc' ? 'bg-gray-100' : ''}`}
//                                     onClick={() => handleSortOptionClick('desc')}
//                                 >
//                                     Price: High to Low
//                                 </button>
//                             </li>
//                             <li>
//                                 <button
//                                     className={`block px-4 py-2 text-sm w-full text-left ${sortOrder === 'dateAsc' ? 'bg-gray-100' : ''}`}
//                                     onClick={() => handleSortOptionClick('dateAsc')}
//                                 >
//                                     Date: Oldest to Newest
//                                 </button>
//                             </li>
//                             <li>
//                                 <button
//                                     className={`block px-4 py-2 text-sm w-full text-left ${sortOrder === 'dateDesc' ? 'bg-gray-100' : ''}`}
//                                     onClick={() => handleSortOptionClick('dateDesc')}
//                                 >
//                                     Date: Newest to Oldest
//                                 </button>
//                             </li>
//                             <li>
//                                 <button
//                                     className={`block px-4 py-2 text-sm w-full text-left ${sortOrder === 'default' ? 'bg-gray-100' : ''}`}
//                                     onClick={() => handleSortOptionClick('default')}
//                                 >
//                                     Default
//                                 </button>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             <div className=' container mx-auto gap-6 sm:p-2 md:p-4 lg:p-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
//                 {products.map((product) => (
//                     <div 
//                     key={product.ProductId} 
//                     className="card bg-base-100 w-96 shadow-xl ">
//                         <figure className="px-10 pt-10">
//                             <img
//                                 src={product.ProductImage}
//                                 alt={product.ProductName || "Product"}
//                                 className="rounded-xl"
//                             />
//                         </figure>
//                         <div className="card-body items-center text-center">
//                             <p>Brand: {product.BrandName}</p>
//                             <h2 className="card-title">{product.ProductName}</h2>
//                             <p>{product.Description}</p>
//                             <p className="flex items-center gap-2">Ratings: {product.Ratings}<FaRegStar /></p>
//                             <p>Price: ${product.Price}</p>
//                             <p>Created: {new Date(product.CreationDateTime).toLocaleDateString()}</p>
//                             <div className="card-actions">
//                                 <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900">Buy Now</button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProductCard;

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [asc, setAsc] = useState(true);
    const [search, setSearch] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Set loading to true when starting to fetch data
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
                    params: {
                        search,
                        sort: asc ? 'asc' : 'desc',
                        brand,
                        category,
                        minPrice,
                        maxPrice
                    }
                });
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
                toast.error(err.message);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchProducts();
    }, [asc, search, brand, category, minPrice, maxPrice]);

    const handleSearch = e => {
        e.preventDefault();
        setSearch(e.target.search.value);
    };

    return (
        <div>
            <div className="flex flex-col items-center mt-6">
                <form onSubmit={handleSearch} className="flex gap-4 mb-4">
                    <input
                        className="border border-black rounded-xl p-2"
                        type="text"
                        name="search"
                        placeholder="Search"
                    />
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>

                <div className="flex gap-4 mb-4">
                    <select
                        className="border border-black rounded-xl p-2"
                        onChange={(e) => setBrand(e.target.value)}
                        value={brand}
                    >
                        <option value="">Select Brand</option>
                        <option value="Apple">Apple</option>
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        {/* Add more brands as needed */}
                    </select>

                    <select
                        className="border border-black rounded-xl p-2"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        <option value="">Select Category</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Professional">Professional</option>
                        <option value="Business">Business</option>
                        <option value="Ultrabook">Ultrabook</option>
                        {/* Add more categories as needed */}
                    </select>

                    <input
                        className="border border-black rounded-xl p-2"
                        type="number"
                        placeholder="Min Price"
                        onChange={(e) => setMinPrice(e.target.value)}
                        value={minPrice}
                    />
                    <input
                        className="border border-black rounded-xl p-2"
                        type="number"
                        placeholder="Max Price"
                        onChange={(e) => setMaxPrice(e.target.value)}
                        value={maxPrice}
                    />
                </div>

                <div className="flex gap-4 mb-4">
                    <button
                        className={`btn ${asc ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setAsc(!asc)}
                    >
                        {asc ? 'Sort: Low to High' : 'Sort: High to Low'}
                    </button>
                </div>

                {/* Loader component */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div className='container mx-auto gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {products.map(product => (
                            <div key={product.ProductId} className="card bg-base-100 w-96 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src={product.ProductImage}
                                        alt={product.ProductName}
                                        className="rounded-xl"
                                    />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <p>Brand: {product.BrandName}</p>
                                    <h2 className="card-title">{product.ProductName}</h2>
                                    <p>{product.Description}</p>
                                    <p className="flex items-center gap-2">Ratings: {product.Ratings}</p>
                                    <p>Price: ${product.Price}</p>
                                    <div className="card-actions">
                                        <button className="btn btn-primary">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;


