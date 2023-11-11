import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import ModalForm from "../components/ModalForm";

import { QUERY_ME, QUERY_CATEGORIES } from "../utils/queries";
import { UPDATE_PRODUCT, DELETE_PRODUCT } from "../utils/mutations";

import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // <======= TOGGLE UPDATE PRODUCT USE-STATE SECTION=======>
  const [editMode, setEditMode] = useState(false);

  // <======= FORM UPDATE PRODUCT USE-STATE SECTION=======>
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  // <======= UPDATE PRODUCT USE-EFFECT SECTION=======>
  useEffect(() => {
    if (selectedProduct) {
      setUpdatedName(selectedProduct.name);
      setUpdatedPrice(selectedProduct.price);
      setUpdatedDescription(selectedProduct.description);
    }
  }, [selectedProduct]);

  // <======= QUERY SECTION=======>
  const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
  const { loading: categoryLoading, data: categoryData } =
    useQuery(QUERY_CATEGORIES);

  // <======= MUTATION SECTION=======>
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  // <======= OBTAIN DATA SECTION =======>
  if (meLoading || categoryLoading) {
    return <div>Loading...</div>;
  }

  const categories = categoryData?.getCategories || [];
  const profile = meData?.me || {};

  // <======= HANDLE DELETE AND UPDATE SECTION =======>
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
    setEditMode(productId);
    setSelectedProduct(productId);
  };

  const handleUpdate = async (productId) => {
    console.log({
      id: productId,
      name: updatedName,
      price: updatedPrice,
      description: updatedDescription,
    });

    try {
      await updateProduct({
        variables: {
          id: productId,
          name: updatedName,
          price: updatedPrice,
          description: updatedDescription,
        },
      });
      setEditMode(false);
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
        <ModalForm categories={categories} />
      </div>

      <div className="product-container">
        {profile.products.map((product) => (
          <div className="profile-products" key={product._id}>
            <img className="product-img" src={product.image} alt="-" />

            {editMode === product._id ? (
              <>
                <div className="product-info frost update-product">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    defaultValue={product.name}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                  <label htmlFor="price">Price:</label>
                  <input
                    type="text"
                    defaultValue={product.price}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                  />
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    defaultValue={product.description}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                  <button
                    className="bg-[#f6931c]"
                    onClick={() => handleUpdate(product._id)}
                  >
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
