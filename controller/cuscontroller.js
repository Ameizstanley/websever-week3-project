const mongodb = require('../model/database');

const { ObjectId } = require('mongodb');


const getAllCustomers = async (req, res) => {
    try{
        const result = await mongodb.getDatabase().db().collection('customers').find();
        const customers = await result.toArray()
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers)
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getCustomerById = async (req, res) => {
    try {
        const customerId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('customers').findOne({ _id: customerId });
        if (!result) {
            res.status(404).json({ message: 'Customer not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        }
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const createCustomer = async (req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            customerSince: req.body.customerSince,
            status: req.body.status,
            tier: req.body.tier,
            totalPurschases: req.body.totalPurchases,
            totalSpent: req.body.totalSpent
        };
        const result = await mongodb.getDatabase().db().collection('customers').insertOne(newCustomer);
        if (result.acknowledged) {
            res.status(201).json({ message: 'Customer created', customerId: result.insertId});
        }else{
            res.status(500).json({message: 'Failed to create customer'});
        }
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const updateCustomer = async (req, res) => {
    try {
        const customerId = new ObjectId(req.params.id);
        const updatedCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            customerSince: req.body.customerSince,
            status: req.body.status,
            tier: req.body.tier,
            totalPurschases: req.body.totalPurchases,
            totalSpent: req.body.totalSpent
    }
        const result = await mongodb.getDatabase().db().collection('customers').updateOne(
            { _id: customerId },
            { $set: updatedCustomer }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'Customer not found' });

        } else {
            res.status(200).json({ message: 'Customer updated' });
        }
}     catch (err) {
        res.status(500).json({ error: err.message });
     }
}


const deleteCustomer = async (req, res) => {
    try {
        const customerId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('customers').deleteOne({ _id: customerId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Customer not found' });
        } else {
            res.status(200).json({ message: 'Customer deleted' });
        }
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}


