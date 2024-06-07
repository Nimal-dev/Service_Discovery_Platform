const categoryModels =require('../Models/serviceCategoryModel')
const providerModels =require('../Models/providerModel')
const customersModels =require('../Models/userModel')
const authmodels = require('../Models/authModel');

const authModel = authmodels.auth;
const providerModel = providerModels.provider;
const customerModel= customersModels.user;
const categoryModel = categoryModels.category;


exports.addCategory = async (req, res) => {
    try {
        const categoryparam = {
            categoryname: req.body.categoryname
        };
        await categoryModel.create(categoryparam);
        res.json('success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({}, 'categoryname');
        res.json(categories);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        await categoryModel.findByIdAndDelete(categoryId);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const categoryDetails = await categoryModel.findById(req.body.id);
        res.json({ categoryDetails });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.editAndUpdateCategory = async (req, res) => {
    try {
        const categoryDetails = {
            categoryname: req.body.categoryname
        };
        await categoryModel.findByIdAndUpdate(req.body.id, categoryDetails);
        res.json('updated');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// -------------------Service Providers-----------------------------------//
exports.viewServiceProviders = async (req, res) => {
    try {
        const providers = await providerModel.find({}, req.body.id);
        res.json(providers);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteProvider = async (req, res) => {
    try {
        const providerId = req.body.providerId;
        const provider = await providerModel.findById(providerId);
        if (!provider) {
            return res.status(404).json({ error: 'Provider not found' });
        }
        // Delete associated auth details
        await authModel.findByIdAndDelete(provider.authid);
        // Delete the customer
        await providerModel.findByIdAndDelete(providerId);
        res.json({ message: 'Provider and associated auth details deleted successfully' });
    } catch (error) {
        console.error("Error in deleting provider:", error);
        res.status(500).json({ error: "An error occurred while deleting the provider" });
    }
};


exports.updateProvider = async (req, res) => {
    try {
        const providerDetails = await providerModel.findById(req.body.id).populate('authid');
        res.json({ providerDetails, authDetails: providerDetails.authid });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.editAndUpdateProvider = async (req, res) => {
    try {
        const providerDetails = {
            providername: req.body.providername
        };
        await providerModel.findByIdAndUpdate(req.body.id, providerDetails);
        res.json('updated');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// ------------------------------Customers-------------------------------------//
exports.viewCustomers = async (req, res) => {
    try {
        const customers = await customerModel.find().populate('authid');
        res.json(customers);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const customerId = req.body.customersId;
        const customer = await customerModel.findById(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        // Delete associated auth details
        await authModel.findByIdAndDelete(customer.authid);
        // Delete the customer
        await customerModel.findByIdAndDelete(customerId);
        res.json({ message: 'Customer and associated auth details deleted successfully' });
    } catch (error) {
        console.error("Error in deleting customer:", error);
        res.status(500).json({ error: "An error occurred while deleting the customer" });
    }
};