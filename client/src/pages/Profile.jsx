import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import ModalForm from "../components/ModalForm";

import { QUERY_ME, QUERY_CATEGORIES } from "../utils/queries";
import { UPDATE_PRODUCT, DELETE_PRODUCT } from "../utils/mutations";

import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  // <======= TOGGLE EDIT MODE: USE-STATE SECTION=======>
  const [editMode, setEditMode] = useState(false);

  // <======= UPDATE PRODUCT FORM: USE-STATE SECTION=======>
  const [formState, setFormState] = useState({
    updateName: "",
    updatePrice: "",
    updateDescription: "",
  });

  // <======= QUERY SECTION=======>
  const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
  const { loading: categoryLoading, data: categoryData } =
    useQuery(QUERY_CATEGORIES);

  // <======= MUTATION SECTION=======>
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  // <======= DATA SECTION =======>
  if (meLoading || categoryLoading) {
    return <div>Loading...</div>;
  }

  const categories = categoryData?.getCategories || [];
  const profile = meData?.me || {};

  // <======= DELETE PRODUCT HANDLER: SECTION =======>
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
    } catch (err) {
      console.error(err);
    }
  };

  // <======= PRODUCT FORM HANDLE CHANGE: SECTION =======>
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // <======= EDIT BUTTON CLICK HANDLER: SECTION =======>
  const handleEdit = (productId) => {
    setEditMode(productId);

    const selectedProduct = profile.products.find(
      (product) => product._id === productId
    );

    setFormState({
      updateName: selectedProduct.name,
      updatePrice: parseInt(selectedProduct.price),
      updateDescription: selectedProduct.description,
    });
  };

  // <======= UPDATE PRODUCT HANDLER: SECTION =======>
  const handleUpdate = async (productId) => {
    const formattedPrice = Math.round(formState.updatePrice * 100) / 100;

    try {
      await updateProduct({
        variables: {
          id: productId,
          name: formState.updateName,
          price: formattedPrice,
          description: formState.updateDescription,
        },
      });
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(profile);

  return (
    <div className="profile-section grid tablet:grid-cols-5 large-mobile:grid-cols-1">
      <div className="profile-top">
        <div className="profile-container tablet:col-span-1">
          <FaUserCircle className="profile-icon" />
          <h3>
             <span>Welcome</span> <br></br> {profile.firstName} {profile.lastName}
          </h3>
        </div>
        <ModalForm categories={categories} QUERY_ME={QUERY_ME} />
      </div>

      <div className="product-container tablet:col-span-4">
        {profile.products.map((product) => (
          <div className="profile-products" key={product._id}>
            <img className="product-img" src={product.image} alt="-" />

            {editMode === product._id ? (
              <>
                <div className="product-info frost update-product">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="updateName"
                    value={formState.updateName}
                    onChange={handleChange}
                  />
                  <label htmlFor="price">Price:</label>
                  <input
                    type="text"
                    name="updatePrice"
                    step="any"
                    value={formState.updatePrice}
                    onChange={handleChange}
                  />
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    name="updateDescription"
                    value={formState.updateDescription}
                    onChange={handleChange}
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
