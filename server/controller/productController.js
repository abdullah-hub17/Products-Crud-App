const Product = require("../model/schema");
const schema = require("../model/schema");

const postProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        if (!name || !price) {
            return res.status(400).json({ message: "Field is empty, try again" });
        }

        const newProduct = await new Product({ name, price })
        await newProduct.save();

        res.status(201).json({ message: "successfully product sent", success: true, product: newProduct });


    } catch (error) {
        return res.status(500).json({ message: "Field is empty, try again" });
    }

}

const getProduct = async (req, res) => {
    try {
        const getProd = await Product.find();
        if (!getProd) {
            return res.status(400).json({ mesage: "Data not found", success: false });
        }

        await res.status(200).json({ mesage: "Successfully Fetched", success: true, data: getProd });

    } catch (error) {
        return res.status(500).json({ message: "Field is empty, try again" });
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { name, price } = req.body;

    try {

        if (!name || !price) {
            return res.status(400).json({ message: "Field is empty, try again" });
        }

        const updateProd = await Product.findByIdAndUpdate(
            id,
            { name, price },
            { new: true }
        )

        if (!updateProd) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        return res.status(200).json({ message: "Product updated successfully", success: true, data: updateProd });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const delProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const delProd = await Product.findByIdAndDelete(id);

        if (!delProd) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        return res.status(200).json({ message: "Product deleted successfully", success: true, data: delProd });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


module.exports = { postProduct, getProduct, updateProduct, delProduct };