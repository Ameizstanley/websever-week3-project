const mongodb = require('../model/database')

const { ObjectId } = require('mongodb')


const getAllSubscribers = async (req, res) => {
    //#swagger.tags=['hello world]
    try{
        const result = await mongodb.getDatabase().db().collection('subscribers').find();
        const subscribers = await result.toArray()
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(subscribers)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const getSubscriberById = async (req, res) => {

    //#swagger.tags=['hello world]
    try {
        const subscriberId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('subscribers').findOne({ _id: subscriberId });
        if (!result) {
            res.status(404).json({ message: 'Subscriber not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        }
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const createSubscriber = async (req, res) => {
    //#swagger.tags=['hello world]
    try {
        const newSubscriber = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      subscriptionDate: req.body.subscriptionDate,
      status: req.body.status,
      plan: req.body.plan,
      country: req.body.country,
      preferences: {
        newsletter: req.body.preferences.newsletter,
        notifications: req.body.preferences.notifications,
        marketing: req.body.preferences.marketing 
    }
}
        const result = await mongodb.getDatabase().db().collection('subscribers').insertOne(newSubscriber);
        if (result.acknowledged) {
            res.status(201).json({ message: 'Subscriber created', subscriberId: result.insertId});
        }else{
            res.status(500).json({message: 'Failed to create subscriber'});
        }
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

module.exports = {
    getAllSubscribers,
    getSubscriberById,
    createSubscriber,
}