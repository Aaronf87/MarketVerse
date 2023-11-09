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
      <h1>Home Page here!</h1>
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


