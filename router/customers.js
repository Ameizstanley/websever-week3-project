const express = require('express');

const router = express.Router();

const cuscontroller = require('../controller/cuscontroller')
const cusValidation = require('../utilities/cusValidate')

const { isAuthenticated } = require('../utilities/authenticate');


router.get('/',
    async (req, res) => {
        try{
            await cuscontroller.getAllCustomers(req, res);
        }catch(err){
            res.status(500).json({ error: err.message });
        }
    }
);

router.get('/:id',
    cusValidation.customerIdRules(),
    cusValidation.checkCustomerId,
    async (req, res) => {
        try{
            await cuscontroller.getCustomerById(req, res)
        }catch(err){
            res.status(500).json({ error: err.message });
        }
    });

router.post('/',
    isAuthenticated,
    cusValidation.createCustomerRules(),
    cusValidation.checkCreateCustomer,
    async (req, res) => {
        try{
            await cuscontroller.createCustomer(req, res);
        }catch(err){
            res.status(500).json({ error: err.message });
        }
    });

router.put('/:id',
    isAuthenticated,
    cusValidation.updateCustomerRules(),
    cusValidation.checkUpdateCustomer,
    async (req, res) => {
        try{
            await cuscontroller.updateCustomer(req, res);
        }catch(err){
            res.status(500).json({ error: err.message });
        }
    });

router.delete('/:id',
    isAuthenticated,
    cusValidation.customerIdRules(),
    cusValidation.checkCustomerId,
    async (req, res) => {
        try{
            await cuscontroller.deleteCustomer(req, res);
        }catch(err){
            res.status(500).json({ error: err.message });
        }
    });

module.exports = router;