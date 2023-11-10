import { useQuery, useMutation } from "@apollo/client";

import { useContext } from "react";

import { useEffect, useState } from "react";

import { QUERY_ME } from "../utils/queries";
import { UPDATE_PRODUCT } from "../utils/mutations";
import { DELETE_PRODUCT } from "../utils/mutations";

import { FaUserCircle } from "react-icons/fa";
import "../styles/Profile.css";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  const profile = data?.me || {};

  console.log(profile);

  return (
    <div className="profile-section">


      <div className="profile-container">
            <FaUserCircle className="profile-icon" />
        <h3>
          {profile.firstName} {profile.lastName}
        </h3>
      </div>


      <div className="product-container">
        {profile.products.map((product) => (
          <div className="profile-products" key={product._id}>
            <img className="product-img" src={product.image} alt="-" />
            <div className="product-info frost">
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <p>{product.description}</p>
              {/* <p>In Stock: {`${product.quantity ? `✔️` : `✖️`}`}</p> */}
            </div>


            <div className="product-button">
            <button>Update</button>
            <button>Delete</button>
            </div>



          </div>
        ))}
      </div>


    </div>
  );
}
