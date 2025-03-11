import React, { useState } from 'react';

const AddProducts = () => {
    const [FormData, setformData] = useState({
        name: "",
        price: ""
    });

    const handleChange = (e) => {
        setformData({ ...FormData, [e.target.name]: e.target.value });
    };

    const addProd = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/postproduct", {
                method: 'POST',
                body: JSON.stringify({
                    name: FormData.name,
                    price: FormData.price
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            const data = await response.json();
            console.log(data);
            setformData({ name: "", price: "" });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <form className="product-form">
                <h2>Add Product</h2>

                <label>Product Name</label>
                <input
                    type="text"
                    placeholder="Enter product name"
                    name="name"
                    value={FormData.name}
                    onChange={handleChange}
                />

                <label>Price</label>
                <input
                    type="text"
                    placeholder="Enter price"
                    name="price"
                    value={FormData.price}
                    onChange={handleChange}
                />

                <button type="submit" onClick={addProd}>Submit</button>
            </form>
        </div>
    );
};

export default AddProducts;
