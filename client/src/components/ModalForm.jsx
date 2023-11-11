import Modal from "./Modal";
import { useState } from "react";

export default function ModalForm({ categories }) {

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(''); // Add this state to track selected category
  
    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  
    const handleCategoryChange = (event) => { // Handler for category change
      setSelectedCategory(event.target.value);
    };
  
    const handleProductSubmit = (event) => {
      event.preventDefault();
      const productData = new FormData(event.target);
      // TODO: Implement product submission logic here
      console.log(productData);
      handleCloseModal(); // Close the modal after submission
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
                value={selectedCategory}
                onChange={handleCategoryChange}
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
                id="name"
                type="text"
                name="name"
                placeholder="Enter the product name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe the product"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                name="price"
                placeholder="Set the product price"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                placeholder="Available quantity"
                required
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
