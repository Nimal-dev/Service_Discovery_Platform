const express = require('express');
const router = express.Router();
const providerController = require('../Controllers/providerController');


router.get('/viewServices', providerController.viewServices);
router.post('/AddService', providerController.AddService);
router.post('/deleteService', providerController.deleteService);

router.post('/updateServiceById', providerController.updateService);
router.post('/editAndUpdateService', providerController.editAndUpdateService);

router.post('/BookService', providerController.BookService);


module.exports = router;