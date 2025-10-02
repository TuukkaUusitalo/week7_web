import { useState } from "react";

const AddProductPage = () => {


  const [productTitle, setProductTitle] = useState('');
  const [productCategory, setProductCategory] = useState('Electronics');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState(3);
  
  const submitForm = async (e) => {
    e.preventDefault();
    const addProduct = { 
      title: productTitle, 
      category: productCategory,
      description: productDescription,
      price: Number(productPrice),
      stockQuantity: Number(stockQuantity),
      supplier: {
        name,
        contactEmail: email,
        contactPhone: phone,
        rating: Number(rating),
      },
    };
    

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addProduct),
      });
  
      if (response.ok) {
        console.log("Product added successfully!");
      } else {
        alert("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
    }

  };

  return (
    <div className="create">
      <h2>Add a New Product</h2>
      <form onSubmit={submitForm}>
        <label>Product title:</label>
        <input
          type="text"
          required
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
        />
        <label>Product category:</label>
        <select
          type="text"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        >
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>

        <label>Product Description:</label>
        <textarea
          type="text"
          required
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        ></textarea>
        <label>Product Price:</label>
        <input
          type="number"
          required
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <label>Stock Quantity:</label>
        <input
          type="number"
          required
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />
        <div>
          <div>
            <label>Supplier:</label>
            <label>Supplier Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Supplier Email</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Supplier Phone</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Supllier rating</label>
            <select 
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option type="number">1</option>
              <option type="number">2</option>
              <option type="number">3</option>
              <option type="number">4</option>
              <option type="number">5</option>
            </select>
          </div>
        </div>
        <button onClick={submitForm}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
