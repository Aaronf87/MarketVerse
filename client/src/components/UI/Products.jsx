import Auth from "../../utils/auth";
import { FaCartPlus } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS } from "../../utils/queries";
import CategoryMenu from "../CategoryMenu";
export default function ProductList({ product }) {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const productData = data?.getProducts || [];

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(productData);

  return (
    <div className="grid grid-cols-6">
      <div className="category-container col-span-1">
        <CategoryMenu />
      </div>

      <div className="product-container col-span-5">
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
                {" "}
                <FaCartPlus />{" "}
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
