const mongoose = require("mongoose");

const providerSchema = mongoose.Schema({
    providername: { type: String, required: true },
    contact: { type: Number, required: true },
    servicetype: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    authid: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
});

const provider = mongoose.model("provider", providerSchema);

const serviceSchema = mongoose.Schema({
    servicename: { type: String, required: true },
    servicedescription: { type: String, required: true },
    serviceprice: { type: Number, required: true },
    servicerequestdate: { type: Date, default: Date.now() },
});

const service = mongoose.model("service", serviceSchema);


const bookingSchema = mongoose.Schema({
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "service", required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    bookingDate: { type: Date, default: Date.now },
});

const booking = mongoose.model("booking", bookingSchema);

module.exports = { provider, service, booking };
