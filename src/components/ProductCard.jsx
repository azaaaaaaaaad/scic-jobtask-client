
// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { FaRegStar } from "react-icons/fa";

// const ProductCard = () => {
//     const [products, setProducts] = useState([]);
//     const [asc, setAsc] = useState(true);
//     const [search, setSearch] = useState('');
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?sort=${asc ? 'asc' : 'dsc'}&search=${search}`);
//                 setProducts(data);
//             } catch (err) {
//                 console.error("Error fetching products:", err);
//                 toast.error("Error fetching products");
//             }
//         };
//         getData();
//     }, [asc, search]);

//     const handleSearch = e => {
//         e.preventDefault();
//         const searchText = e.target.search.value;
//         console.log(searchText);
//         setSearch(searchText);
//     };

//     const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

//     const handleSortOptionClick = (sortOrder) => {
//         setAsc(sortOrder === 'asc');
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
//                         onClick={toggleDropdown}
//                     >
//                         {asc ? `Price: Low to High` : `Price: High to Low`}
//                         <svg className="ml-2 w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                             <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
//                         </svg>
//                     </button>
//                     {isDropdownOpen && (
//                         <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
//                             <ul className="py-1">
//                                 <li>
//                                     <button
//                                         className={`block px-4 py-2 text-sm w-full text-left ${asc ? 'bg-gray-100' : ''}`}
//                                         onClick={() => handleSortOptionClick('asc')}
//                                     >
//                                         Price: Low to High
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         className={`block px-4 py-2 text-sm w-full text-left ${!asc ? 'bg-gray-100' : ''}`}
//                                         onClick={() => handleSortOptionClick('dsc')}
//                                     >
//                                         Price: High to Low
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className='container mx-auto gap-6 sm:p-2 md:p-4 lg:p-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
//                 {products.map((product) => (
//                     <div key={product.id} className="card bg-base-100 w-96 shadow-xl">
//                         <figure className="px-10 pt-10">
//                             <img
//                                 src={product?.ProductImage}
//                                 alt={product?.ProductName || "Product"}
//                                 className="rounded-xl"
//                             />
//                         </figure>
//                         <div className="card-body items-center text-center">
//                             <p>Brand: {product?.BrandName}</p>
//                             <h2 className="card-title">{product?.ProductName}</h2>
//                             <p>{product?.Description}</p>
//                             <p className="flex items-center gap-2">Ratings: {product?.Ratings}<FaRegStar /></p>
//                             <p>Price: ${product?.Price}</p>
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
import { FaRegStar } from "react-icons/fa";

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'asc', 'desc', 'dateAsc', 'dateDesc'
    const [search, setSearch] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
                    params: {
                        sort: sortOrder,
                        search: search
                    }
                });
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
                toast.error("Error fetching products");
            }
        };
        getData();
    }, [sortOrder, search]);

    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearch(searchText);
    };

    const handleSortOptionClick = (option) => {
        setSortOrder(option);
        setIsDropdownOpen(false);
    };

    return (
        <div>
            <div className="flex items-center justify-around text-center mt-6">
                <form onSubmit={handleSearch}>
                    <input
                        className="mr-2 border border-black rounded-xl lg:p-4"
                        type="text"
                        name="search"
                    />
                    <input
                        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900"
                        type="submit"
                        value="Search"
                    />
                </form>
                <div className="relative inline-block text-left">
                    <button
                        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900"
                        onClick={() => setIsDropdownOpen(prev => !prev)}
                    >
                        {sortOrder === 'default' ? 'Sort as you wish' :
                            sortOrder === 'asc' ? 'Price: Low to High' :
                                sortOrder === 'desc' ? 'Price: High to Low' :
                                    sortOrder === 'dateAsc' ? 'Date: Oldest to Newest' :
                                        'Date: Newest to Oldest'}
                        <svg className="ml-2 w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {/* Dropdown menu */}
                    <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 transition-opacity duration-300 ${isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
                                    className={`block px-4 py-2 text-sm w-full text-left ${sortOrder === 'dateAsc' ? 'bg-gray-100' : ''}`}
                                    onClick={() => handleSortOptionClick('dateAsc')}
                                >
                                    Date: Oldest to Newest
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`block px-4 py-2 text-sm w-full text-left ${sortOrder === 'dateDesc' ? 'bg-gray-100' : ''}`}
                                    onClick={() => handleSortOptionClick('dateDesc')}
                                >
                                    Date: Newest to Oldest
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`block px-4 py-2 text-sm w-full text-left ${sortOrder === 'default' ? 'bg-gray-100' : ''}`}
                                    onClick={() => handleSortOptionClick('default')}
                                >
                                    Default
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='container mx-auto gap-6 sm:p-2 md:p-4 lg:p-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {products.map((product) => (
                    <div key={product.ProductId} className="card bg-base-100 w-96 shadow-xl">
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
                                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCard;

