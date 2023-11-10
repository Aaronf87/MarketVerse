import { useQuery, useMutation } from "@apollo/client";

import { useContext } from "react";

import { useEffect, useState } from "react";

import { QUERY_ME } from "../utils/queries";

import { UPDATE_PRODUCT } from "../utils/mutations";
import { DELETE_PRODUCT } from "../utils/mutations";

import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Profile.css";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const [editMode, setEditMode] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  const profile = data?.me || {};

  //   console.log(profile);

  const handleDelete = async (e) => {
    const id = e.target.getAttribute("item");

    if (!id) {
      return;
    }

    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );

    try {
      const { data } = await deleteProduct({
        variables: { id, confirm },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (productId) => {
    console.log(productId);
    setEditMode(productId);
  };

  const handleUpdate = async (productId, newName, newPrice, newDescription) => {
    try {
      await updateProduct({
        variables: {
          id: productId,
          name: newName,
          price: newPrice,
          description: newDescription,
        },
      });
      setEditMode(null); // Exit edit mode after successful update
    } catch (err) {
      console.error(err);
    }
  };

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

            {editMode === product._id ? (
              <>
                <div className="product-info frost">
                  <input type="text" defaultValue={product.name} />
                  <input type="text" defaultValue={product.price} />
                  <input type="text" defaultValue={product.description} />
                  <input type="text" defaultValue={product.quantity} />
                  <button onClick={() => handleUpdate(product._id)}>
                    Update
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="product-info frost">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                  <p className="description">{product.description}</p>
                </div>

                <div className="product-button">
                  <FiEdit
                    className="update-icon"
                    onClick={() => handleEdit(product._id)}
                  />
                  <BsTrash
                    className="delete-icon"
                    item={product._id}
                    onClick={handleDelete}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
