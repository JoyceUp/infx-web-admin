/**
 *created by yuyz  date:2017-01-03
 */
let express = require("express");
let router = express.Router();
let customers = require('../../app/controller/dev/customers.js');

router.post('/customers/listpage',customers.customersList);
router.post('/customers/detail',customers.getCustomerById);
router.post('/customers/update',customers.updateCustomer);
router.post('/customers/delete',customers.deleteCustomer);

router.post('/account/listpage',customers.customerAccountList);
module.exports = router;