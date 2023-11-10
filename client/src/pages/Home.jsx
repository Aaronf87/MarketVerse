import { useState } from "react";
import Modal from "../components/Modal";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";

import CategoryMenu from "../components/CategoryMenu";

export default function Home() { 
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

  const { loading, data } = useQuery(QUERY_CATEGORIES);
  const categoryData = data?.getCategories || [];
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="hover:bg-sky-700 p-7 " href="">
        <div>
          <div>
            <dt className="text-3xl p-3">Hero Image</dt>
            <img
              className="rounded hero-image"
              src={`https://source.unsplash.com/random/384x512?sig=${Math.floor}
              `}
              alt="photo of hero image"
            />
          </div>
        </div>
      </div>

      <CategoryMenu />

<button onClick={handleOpenModal}>Create Product</button>
<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
  <div>
    <h2>Create a Product</h2>
    <form onSubmit={handleProductSubmit}>
      {/* Category Dropdown */}
      <select
        name="category"
        value={selectedCategory} // Controlled component with value set to state
        onChange={handleCategoryChange} // Update state when the select value changes
        required
      >
        <option value="" disabled>Select a Category</option>
        {categoryData.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              required
            />
            <textarea
              name="description"
              placeholder="Product Description"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Available Quantity"
              required
            />
            <button type="submit">Submit Product</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
