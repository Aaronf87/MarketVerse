import { useMutation } from "@apollo/client";
import { useState } from "react";
import Modal from "./Modal";

import { ADD_PRODUCT } from "../utils/mutations";

export default function ModalForm({ categories, QUERY_ME }) {
  const categoryData = categories;

  // <======= USE-STATE: TOGGLE MODAL STATE =======>
  const [isModalOpen, setModalOpen] = useState(false);

  // <======= USE-STATE: FORM FOR CREATE PRODUCT STATE =======>
  const [formState, setFormState] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [fileState, setFileState] = useState("");

  // <======= MUTATION SECTION: ADD PRODUCT =======>
  const [addProduct] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  // <======= HANDLE CHANGE: UPDATE FORM STATE FOR PRODUCT =======>
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // <======= HANDLER: TOGGLE MODAL (OPEN AND CLOSE) =======>
  const handleToggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // <======= HANDLER: FORM SUBMIT (TO CREATE PRODUCT) =======>
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formattedPrice = Math.round(formState.price * 100) / 100;
    const formattedQuantity = parseInt(formState.quantity);

    try {
      const { data } = await addProduct({
        variables: {
          category: formState.category,
          name: formState.name,
          description: formState.description,
          price: formattedPrice,
          quantity: formattedQuantity,
          image: fileState,
        },
      });
    } catch (err) {
      console.error(err);
    }

    setFormState({
      category: "",
      name: "",
      description: "",
      price: "",
      quantity: "",
    });

    setFileState("");

    setModalOpen(false);
  };

  //  CONVERT IMAGE TO BASE64
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  // RENDER IMAGE ON THE CANVAS
  const renderImageOnCanvas = (imageData) => {
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");

    const img = new Image();
    img.src = imageData;
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  // HANLDER: IMAGE UPLOAD TO CLOUDINARY
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const imageData = await readFileAsDataURL(file);

        renderImageOnCanvas(imageData);

        if (imageData) {
          setFileState(imageData);
        }
      } catch (err) {
        console.error("Error Processing Image:", err);
      }
    }
  };

  return (
    <>
      <button onClick={handleToggleModal}>Post Product</button>

      <Modal isModalOpen={isModalOpen} handleToggleModal={handleToggleModal}>
        <div className="modal-form-container">
          <form onSubmit={handleFormSubmit} className="modal-form">
            <div className="form-group">
              <div className="modal-top">
                <label htmlFor="category">Category</label>
                <button
                  type="button"
                  className="modal-close-button"
                  onClick={handleToggleModal}
                >
                  ×
                </button>
              </div>

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
                type="file"
                name="image"
                onChange={(e) => handleImageUpload(e)}
                required
              />
              <canvas id="myCanvas" width="50" height="50"></canvas>
            </div>

            <div className="form-actions">
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
