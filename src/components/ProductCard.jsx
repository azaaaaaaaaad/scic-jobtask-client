import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegStar } from "react-icons/fa";
// import Card from "./Card";

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [asc, setAsc] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?sort=${asc ? 'asc' : 'dsc'}&search=${search}`);
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
                toast.error(err)
            }
        };
        getData();
    }, [asc, search]);

    const handleSearch = e => {
        e.preventDefault()
        const searctText = e.target.search.value
        console.log(searctText);
        setSearch(searctText)

    }


    return (
        <div>
            <div className="flex items-center justify-around text-center mt-6">
                <form onSubmit={handleSearch}>
                    <input className="border" type="text" name="search" />
                    <input className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900 " type="submit" value="Search" />
                </form>
                <button
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900 "
                    onClick={() => setAsc(!asc)}>
                    {asc ? `Price: High to Low` : `Price: Low to High`}
                </button>
            </div>
            <div className='container mx-auto gap-6 sm:p-2 md:p-4 lg:p-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products.map((product) => (
                        <div className="card bg-base-100 w-96 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                    src={product?.ProductImage}
                                    alt="Shoes"
                                    className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <p>Brand: {product?.BrandName}</p>
                                <h2 className="card-title">{product?.ProductName}</h2>
                                <p>{product?.Description}</p>
                                <p className="flex items-center gap-2">Ratings: {product?.Ratings}<FaRegStar /></p>
                                <p>Price: ${product?.Price}</p>
                                <div className="card-actions">
                                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white bg-gradient-to-r from-blue-600 to-violet-900 ">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProductCard;
