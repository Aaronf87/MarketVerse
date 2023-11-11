import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import Auth from "../utils/auth";

import CategoryMenu from "./CategoryMenu";
import { FaCartPlus } from "react-icons/fa";

export default function ProductList() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const productData = data?.getProducts || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container grid gap-4 grid-cols-6">
      <div className="category-container col-span-1">
        <h3>Product Categories</h3>
        <CategoryMenu />
      </div>

      <div className="b9 product-container col-span-5">
        {productData.map((product) => (
          <div className="profile-products" key={product._id}>
            <img className="product-img" src={product.image} alt="-" />
            <div className="product-info frost">
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <p className="description">{product.description}</p>
            </div>
            {Auth.loggedIn() ? (
              <div className="product-button">
                <FaCartPlus />
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