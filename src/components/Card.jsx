/* eslint-disable react/prop-types */

import { FaRegStar } from "react-icons/fa";


const Card = ({ product }) => {


    // const {
    //     productId,
    //     productName,
    //     productImage,
    //     description,
    //     price,
    //     category,
    //     ratings,
    //     creationDate,
    //     brand
    // } = product


    console.log(product.map(p => {
        console.log(p);

    }));


    return (
        <div className="sm:p-2 md:p-4 lg:p-8 container mx-auto grid sm:grid-cols-1  gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
           
                {
                    product.map((p) => (
                        <div className="card bg-base-100 w-96 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                    src={p.productImage}
                                    alt="Shoes"
                                    className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <p>Brand: {p.brand}</p>
                                <h2 className="card-title">{p.productName}</h2>
                                <p>{p.description}</p>
                                <p className="flex items-center gap-2">Ratings: {p.ratings}<FaRegStar /></p>
                                <p>Price: ${p.price}</p>
                                <div className="card-actions">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
        </div>
    )
}

export default Card