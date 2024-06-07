const servicesModels = require('../Models/providerModel');
const customersModels = require('../Models/userModel');
const bookingModel = servicesModels.booking;

const servicesModel = servicesModels.service;
const customerModel = customersModels.user;

exports.viewServices = async (req, res) => {
    try {
        const services = await servicesModel.find();
        res.json(services);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.AddService = async (req, res) => {
    try {
        const serviceparam = {
            servicename: req.body.servicename,
            servicedescription: req.body.servicedescription,
            serviceprice: req.body.serviceprice,
        };
        await servicesModel.create(serviceparam);
        res.json('success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const serviceId = req.body.serviceId;
        const Service = await servicesModel.findById(serviceId);
        if (!Service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        await servicesModel.findByIdAndDelete(serviceId);
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error("Error in deleting Service:", error);
        res.status(500).json({ error: "An error occurred while deleting the Service" });
    }
};

exports.updateService = async (req, res) => {
    try {
        const serviceDetails = await servicesModel.findById(req.body.id);
        res.json({ serviceDetails });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.editAndUpdateService = async (req, res) => {
    try {
        const serviceDetails = {
            servicename: req.body.servicename,
            servicedescription: req.body.servicedescription,
            serviceprice: req.body.serviceprice,
        };
        await servicesModel.findByIdAndUpdate(req.body.id, serviceDetails);
        res.json('updated');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find().populate('serviceId').populate('customerId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bookings', error });
    }
};

exports.BookService = async (req, res) => {
    try {
        const bookingparam = {
            serviceId: req.body.serviceId,
            customerId: req.body.customerId,
        };
        await bookingModel.create(bookingparam);
        res.json('success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
