const express = require('express');
const router = express.Router();

const subcontroller = require('../controller/subcontroller');

const routerValidation = require('../utilities/index');
const { isAuthenticated } = require('../utilities/authenticate');

router.get('/',
    async (req, res) => {
        try{
            await subcontroller.getAllSubscribers(req, res);
        }catch(err){
            res.status(500).json({ error: err.message });
        }
    });


router.get('/:id',
    routerValidation.validateIdRules(),
    routerValidation.checkId,
    async (req, res) => {
        try{
            await subcontroller.getSubscriberById(req, res);
        }catch(err){
            res.status(500).json({ error: err.message });
        }
        
    });
    


router.post('/',
    isAuthenticated,
    routerValidation.createSubscriberRules(),
    routerValidation.checkCreateSubscriber,
    async (req, res) => {
        try{
            await subcontroller.createSubscriber(req, res);
        }catch(err){
            res.status(500).json({ error: err.message });
        }
    });


router.put('/:id',
    isAuthenticated,
    routerValidation.updateSubscriberRules(),
    routerValidation.checkUpdateSubscriber,
    async (req, res) => {
        try{
            await subcontroller.updateSubscriber(req, res);
        }catch(err){
            res.status(500).json({ error: err.message });
        }
    });



router.delete('/:id',
    isAuthenticated,
    routerValidation.validateIdRules(),
    routerValidation.checkId,
    async (req, res) => {
        try{
            await subcontroller.deleteSubscriber(req, res);
        }catch(err){
            res.status(500).json({ error: err.message });
        }
    }
);


module.exports = router;