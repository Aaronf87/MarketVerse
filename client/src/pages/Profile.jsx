import { useQuery, useMutation } from "@apollo/client";

import { useContext } from "react";

import { useEffect, useState } from "react";

import { QUERY_ME } from "../utils/queries";
import { UPDATE_PRODUCT } from "../utils/mutations";
import { DELETE_PRODUCT } from "../utils/mutations";

import "../styles/Profile.css"

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  const profile = data?.me || {};

  console.log(profile);

  return (
    <div className="profile-section">

      <div className="profile-card">
        <h1>Profile Info</h1>
      </div>

      {profile.products.map((product) => (
        <div className="profile-products" key={product._id}>
          <img className="product-img" src={product.image} alt="-" />
          <div className="product-info frost">

            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>{product.quantity}</p>


          </div>
        </div>
      ))}

    </div>
  );
}
