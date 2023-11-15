import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { QUERY_ALL_PRODUCTS, QUERY_PRODUCTS } from "../utils/queries";
import Auth from "../utils/auth";

import CategoryMenu from "./CategoryMenu";
import { FaCartPlus } from "react-icons/fa";

export default function ProductList() {
  const [category, setCategory] = useState(null);

  const query = category ? QUERY_PRODUCTS : QUERY_ALL_PRODUCTS;

  const { loading, data } = useQuery(query, {
    variables: { category: category },
  });

  const productData = data?.getProducts || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="category-container tablet:w-auto">
        <CategoryMenu setCategory={setCategory} category={category} />
      </div>

      <div className="  grid gap-4 tablet:grid-cols-6 large-mobile:grid-cols-1 home-container product-container prod-home-format tablet:col-span-5">
        {productData.map((product) => (
          <div className="profile-products" key={product._id}>
            <img className="product-img" src={product.image.url} alt="-" />
            <div className="product-info frost">
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <p className="description">{product.description}</p>
            </div>
            {Auth.loggedIn() ? (
              <div className="product-button">
                <FaCartPlus className="cart-btn" />
              </div>
            ) : (
              <> </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
