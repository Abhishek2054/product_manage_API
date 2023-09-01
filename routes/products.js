module.exports = app => {
    const Products = require('../controllers/products.js');
    const router = require("express").Router();


    router.post('/create', Products.create);        // To add the product in the inventory
    router.get('/read', Products.findAll);          // To fetch all the products are in the inventory
    router.get('/readone/:id', Products.findOne);      // To fetch the specific product from the inventory
    router.put('/update/:id', Products.update);     // To update the quantity of specific product from the inventory
    router.delete('/deleteone/:id', Products.delete);  // To remove a perticular product from the inventory by it's ID
    router.delete('/delete', Products.deleteAll);   // To remove all the products from the inventory
    app.use('/product', router);
}