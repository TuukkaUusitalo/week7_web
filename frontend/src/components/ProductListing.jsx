import { useState, useEffect } from "react";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", price: 0 });

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
  
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

const updateProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to update product");

    const updated = await response.json();

    // korvaa tuote state:ssa
    setProducts(products.map((p) => (p._id === id ? updated : p)));
    setEditingProduct(null); // sulje editointi
  } catch (err) {
    setError(err.message);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    // Update state to remove deleted product from the list
    setProducts(products.filter((product) => product._id !== id));
  } catch (err) {
    setError(err.message);
  }
};

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <>
      {products.map((product) => (
        <div className="product-preview" key={product._id}>
          {editingProduct === product._id ? (
            <div>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
              <button onClick={() => updateProduct(product._id)}>Save</button>
              <button onClick={() => setEditingProduct(null)}>Cancel</button>
            </div>
          ) : (
            <>
              <h3>{product.title}</h3>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <p>Quantity: {product.stockQuantity}</p>
              <p>
                Supplier: {product.supplier?.name} | {product.supplier?.contactEmail} |{" "}
                {product.supplier?.contactPhone} | {product.supplier?.rating}
              </p>
              <button
                onClick={() => {
                  setEditingProduct(product._id);
                  setFormData({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                  });
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default ProductListing;
