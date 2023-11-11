import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Modal from "./Modal";

import { ADD_PRODUCT } from "../utils/mutations";

export default function ModalForm({ categories, QUERY_ME }) {
  // <======= TOGGLE CREATE MODE: USE-STATE SECTION=======>
  const [isModalOpen, setModalOpen] = useState(false);

  // <======= CREATE PRODUCT FORM: USE-STATE SECTION=======>
  const [formState, setFormState] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
  });

  // <======= MUTATION SECTION=======>
  const [addProduct] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  // <======= FORM CREATE PRODUCT: HANDLER =======>
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    
    console.log(formState);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // TODO: CREATE LOGIC
  const handleProductSubmit = (event) => {
    event.preventDefault();

    console.log("data", {
      category: formState.category,
      name: formState.name,
      description: formState.description,
      price: formState.price,
      quantity: formState.quantity,
      image: formState.image,
    });

    // handleCloseModal();
  };

  const categoryData = categories;

  return (
    <>
      <button onClick={handleOpenModal}>Create Product</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-form-container">
          <form onSubmit={handleProductSubmit} className="modal-form">
            <div className="form-group">
              <label htmlFor="category">Category</label>

              <select
                id="category"
                name="category"
                value={formState.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {categoryData.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                placeholder="Enter the product name..."
                id="name"
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                placeholder="Describe the product"
                id="description"
                name="description"
                value={formState.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                placeholder="Set the product price"
                id="price"
                type="number"
                step="any"
                name="price"
                value={formState.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                placeholder="Available quantity..."
                id="quantity"
                type="number"
                name="quantity"
                value={formState.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Image</label>
              <input
                placeholder="Image URL"
                id="image"
                type="text"
                name="image"
                value={formState.image}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="modal-close-button"
                onClick={handleCloseModal}
              >
                ×
              </button>
              <button type="submit" className="submit-button">
                Submit Product
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
