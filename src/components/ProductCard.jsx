import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Card from "./Card";

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
                toast.error(err)
            }
        };
        getData();
    }, []);

    // console.log(products);

    return (
        <div>
            <div className=''>
                {
                    products.map((product) => (
                        <Card key={product.productId} product={product.products} />
                        // <div key={product.productId} className="card bg-base-100 w-96 shadow-xl">
                        //     <figure className="px-10 pt-10">
                        //         <img
                        //             src={product.productImage}
                        //             alt="Shoes"
                        //             className="rounded-xl" />
                        //     </figure>
                        //     <div className="card-body items-center text-center">
                        //         <h2 className="card-title">{product.productName}</h2>
                        //         <p>{product.description}</p>
                        //         <div className="card-actions">
                        //             <button className="btn btn-primary">Buy Now</button>
                        //         </div>
                        //     </div>
                        // </div>
                    ))}
            </div>
        </div>
    );
};

export default ProductCard;
