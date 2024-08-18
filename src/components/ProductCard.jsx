






import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegStar } from 'react-icons/fa';

const ProductCard = () => {
    const [card, setCard] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/allProducts?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}`);
            setCard(data);
        }
        getData();
    }, [currentPage, filter, itemsPerPage, sort, search]);

    useEffect(() => {
        const getCount = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/productCount?filter=${filter}&search=${search}`);
            setCount(data.count);
        }
        getCount();
    }, [filter, search]);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1);

    const handlePaginationButton = value => {
        setCurrentPage(value);
    }

    const handleSearch = e => {
        e.preventDefault();
        setSearch(searchText);
        setSearchText('');
    }

    return (
        <div>
            <div className="font-[sans-serif] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
                <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
                    <div>
                        <select
                            onChange={e => {
                                const selectedBrand = e.target.value;
                                setFilter(`BrandName${selectedBrand}`);
                            }}
                            value={filter.startsWith('BrandName') ? filter.replace('BrandName', '') : ''}
                            name='brandName'
                            id='brandName'
                            className='border p-4 rounded-lg'
                        >
                            <option value=''>Filter by Brand Name</option>
                            <option value='Lenovo'>Lenovo</option>
                            <option value='Apple'>Apple</option>
                            <option value='Samsung'>Samsung</option>
                            <option value='Dell'>Dell</option>
                            <option value='HP'>HP</option>
                            <option value='Asus'>Asus</option>
                            <option value='Microsoft'>Microsoft</option>
                            <option value='Acer'>Acer</option>
                            <option value='Razer'>Razer</option>
                            <option value='MSI'>MSI</option>
                        </select>
                    </div>
                    <div>
                        <select
                            onChange={e => {
                                const selectedCategory = e.target.value;
                                setFilter(selectedCategory);
                            }}
                            value={filter.startsWith('BrandName') ? '' : filter}
                            name='category'
                            id='category'
                            className='border p-4 rounded-lg'
                        >
                            <option value=''>Filter by Category Name</option>
                            <option value='Ultrabook'>Ultrabook</option>
                            <option value='Convertible'>Convertible</option>
                            <option value='Business'>Business</option>
                            <option value='Gaming'>Gaming</option>
                            <option value='Standard'>Standard</option>
                            <option value='Professional'>Professional</option>
                            <option value='Convertible'>Convertible</option>
                        </select>
                    </div>
                    <div>
                        <select
                            onChange={e => {
                                const selectedPriceRange = e.target.value;
                                setFilter(`PriceRange${selectedPriceRange}`);
                            }}
                            value={filter.startsWith('PriceRange') ? filter : ''}
                            name='priceRange'
                            id='priceRange'
                            className='border p-4 rounded-lg'
                        >
                            <option value=''>Filter by Price Range</option>
                            <option value='1'>0 - 1000</option>
                            <option value='2'>1001 - 2000</option>
                            <option value='3'>2001 - 3000</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-5 mt-5'>
                    <form onSubmit={handleSearch}>
                        <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                            <input
                                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                                type='text'
                                onChange={e => setSearchText(e.target.value)}
                                value={searchText}
                                name='search'
                                placeholder='Enter Product Name'
                                aria-label='Enter Product Name'
                            />
                            <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-5 mt-5'>
                    <div>
                        <select
                            onChange={e => {
                                setSort(e.target.value);
                                setCurrentPage(1);
                            }}
                            value={sort}
                            name='sort'
                            id='sort'
                            className='border p-4 rounded-md'
                        >
                            <option value=''>Sort By Price Range</option>
                            <option value='dsc'>Price: High to Low</option>
                            <option value='asc'>Price: Low to High</option>
                        </select>
                    </div>
                    <div>
                        <select
                            onChange={e => {
                                setSort(e.target.value);
                                setCurrentPage(1);
                            }}
                            value={sort}
                            name='sort'
                            id='sort'
                            className='border p-4 rounded-md'
                        >
                            <option value=''>Sort By Date</option>
                            <option value='dsc'>Newest first</option>
                        </select>
                    </div>
                </div>
                <div className="container mx-auto gap-6 sm:p-2 md:p-4 lg:p-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
                    {card.map(aCard => (
                        <div
                            key={aCard.ProductId}
                            className="card bg-base-100 w-96 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                    src={aCard.ProductImage}
                                    alt={aCard.ProductName || "Product"}
                                    className="rounded-xl"
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <p>Brand: {aCard.BrandName}</p>
                                <h2 className="card-title">{aCard.ProductName}</h2>
                                <p>{aCard.Description}</p>
                                <p className="flex items-center gap-2">Ratings: {aCard.Ratings}<FaRegStar /></p>
                                <p>Price: ${aCard.Price}</p>
                                <p>Created: {new Date(aCard.CreationDateTime).toLocaleDateString()}</p>
                                <div className="card-actions">
                                    <button className="btn  sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center mt-12 mb-3'>
                {/* Previous Button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePaginationButton(currentPage - 1)}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-gradient-to-r from-blue-600 to-violet-900 hover:text-white'
                >
                    <div className='flex items-center -mx-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16l-4-4m0 0l4-4m-4 4h18'
                            />
                        </svg>
                        <span className='mx-1'>previous</span>
                    </div>
                </button>
                {/* Numbers */}
                {pages.map(btnNum => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? 'bg-gradient-to-r from-blue-600 to-violet-900 text-white' : ''} px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-gradient-to-r from-blue-600 to-violet-900 hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}
                {/* Next Button */}
                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-gradient-to-r from-blue-600 to-violet-900 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
                >
                    <div className='flex items-center -mx-1'>
                        <span className='mx-1'>Next</span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}

    export default ProductCard
