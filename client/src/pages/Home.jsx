import { useState } from "react";
import Modal from "../components/Modal";


export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleProductSubmit = (productData) => {
    // TODO: Implement product submission logic here
    console.log(productData);
    handleCloseModal(); // Close the modal after submission
  };

  return (
    <div>
    
    <a
        className="hover:bg-sky-700 card"
        href=""
      >
        <div>
          <div>
            <dt className="text-3xl p-3">Placeholder card</dt>
            <img
              className="rounded"
              src={`https://source.unsplash.com/random/384x512?sig=${Math.floor}
              `}
              alt="photo of product"
              width="384"
              height="512"
            />
          </div>
          
        </div>
      </a>

      <button onClick={handleOpenModal}>Create Product</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
  <div>
    <h2>Create a Product</h2>
    <form onSubmit={(event) => {
      event.preventDefault();
      const productData = new FormData(event.target);
      handleProductSubmit(productData);
    }}>
      <input type="text" name="name" placeholder="Product Name" required />
      <textarea name="description" placeholder="Product Description" required />
      <input type="number" name="price" placeholder="Product Price" required />
      <input type="number" name="quantity" placeholder="Available Quantity" required />
      <button type="submit">Submit Product</button>
    </form>
  </div>
</Modal>
    </div>
  );
}


