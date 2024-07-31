"use client";

import { useEffect, useState } from "react";
import api from "../../utils/woocommerce";
import Image from "next/image";
import Link from "next/link";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products/?per_page=20");
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        setError(error);
        console.error("API Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 border">
      <h1 className="pb-2">Products</h1>

      <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-between">
        {products.map((product) =>
          product.images != "" && product.images[0]?.src != "" ? (
            <li key={product.id} className="border border-gray-200  rounded-lg">
              <div className="relative">
                <Image
                  src={product.images[0]?.src}
                  height={200}
                  width={200}
                  alt="test"
                  className="w-full h-auto"
                />

                <div className="flex items-center absolute bottom-2 right-2">
                    {quantity > 1 ? 
                    <>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-full" onClick={decrement}>-</button>
                    <span className="mx-3">{quantity}</span>
                    <button className="px-3 py-1 bg-green-500 text-white rounded-full" onClick={increment}>+</button>
                    </>
                    : 
                    <button className="px-3 py-1 bg-green-500 text-white rounded-full" onClick={increment}>+</button>
                    }
                </div>
              </div>
              <div className="p-2">
                <Link href="#">{product.name}</Link>
                <div dangerouslySetInnerHTML={{ __html: product.price_html }} />

                
              </div>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
};

export default Products;
