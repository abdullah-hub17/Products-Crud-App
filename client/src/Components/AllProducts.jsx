import React, { useEffect, useState } from 'react';

const AllProducts = () => {
    const [Products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '' });

    // Fetch all products
    const fetchAllProds = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/getproduct");
            const data = await response.json();
            setProducts(data?.data || []);
        } catch (error) {
            console.error("Product not found");
        }
    };

    useEffect(() => {
        fetchAllProds();
    }, []);

    // Handle Edit
    const handleEdit = (product) => {
        setEditProduct(product._id);
        setFormData({ name: product.name, price: product.price });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/updateproduct/${editProduct}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                fetchAllProds();
                setEditProduct(null);
                setFormData({ name: '', price: '' });
            }
        } catch (error) {
            console.error("Error updating product", error);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/delproduct/${id}`, { method: 'DELETE' });
            setProducts(Products.filter((product) => product._id !== id));
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="products-container">
            <h2>All Products</h2>
            <div className="product-list">
                {Products.map((product) => (
                    <div className="product-card" key={product._id}>
                        {editProduct === product._id ? (
                            <div className="edit-form">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                />
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Product Price"
                                />
                                <button onClick={handleUpdate}>Update</button>
                            </div>
                        ) : (
                            <>
                                <p>Name: {product.name}</p>
                                <p>Price: ${product.price}</p>
                                <div className="button-group">
                                    <button onClick={() => handleEdit(product)}>Edit</button>
                                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
