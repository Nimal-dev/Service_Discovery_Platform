const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

router.post('/addCategory', adminController.addCategory);
router.get('/viewCategories', adminController.viewCategories);
router.delete('/deleteCategory/:categoryId', adminController.deleteCategory);
router.post('/updateCategoryById', adminController.updateCategory);
router.post('/updatecategory', adminController.editAndUpdateCategory);





router.get('/viewServiceProviders', adminController.viewServiceProviders);
router.post('/deleteProvider', adminController.deleteProvider);
router.post('/updateProviderById', adminController.updateProvider);
router.post('/editAndUpdateProvider', adminController.editAndUpdateProvider);



router.get('/viewCustomers', adminController.viewCustomers);
router.post('/deleteCustomer', adminController.deleteCustomer);
module.exports = router;