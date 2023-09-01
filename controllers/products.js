const db = require('../models');
const ProductInventory = db.prodInventory;

/* create and save new product Inventory to database */

exports.create = async (req, res) => {

    try {

        const data = await ProductInventory.find({ id: req.body.id });

        if (data.length > 0) { res.status(509).send("Change your Id") }
        else {


            if (!req.body.name) {
                res.status(400).send({ message: "Content can not be empty!" });
                return;
            }

            /* create new product Inventory */

            const newprodInventory = new ProductInventory({
                id: req.body.id,
                name: req.body.name,
                quantity: req.body.quantity
            })

            /* create new product Inventory */

            /* save created product Inventory to databse */

            newprodInventory.save(newprodInventory).then(data => {
                res.send(data);
                console.log("New Product Inventory:", data);
            }).catch(error => {
                res.status(500).send({
                    message: error.message || "Error occured while creating new product check details properly!!!!....."
                })
            });
        }
    } catch (error) {
        res.status(504).send("The entered Id is already in the inventory")
    }

}

/* retrive all created product Inventories from */

exports.findAll = async (req, res) => {
    const name = req.body.name;

    try {
        var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

        const products = await ProductInventory.find(condition);
        if (!products) res.status(404).send("There is No Data!")

        res.status(200).send(products)

    } catch (error) {
        res.status(500).send({ error: "Internal sever error!" })
    }

}

/* retrive all created product Inventories from */

/* find single product Inventory from database with id in request */

exports.findOne = async (req, res) => {
    const getId = req.params.id;
    console.log(getId)
    try {
        const product = await ProductInventory.find({ id: getId });

        if (!product) res.status(404).send("couldn't able to find Match!")

        res.status(200).send(product);

    } catch (error) {
        console.log({ error: "Something went wrong" })
    }

}


/* update single product inventory from databse with id  */
exports.update = (req, res) => {
    try {

        if (!req.body) {
            return res.status(400).send("Quantity should not be empty to update the qnatity of the product.");
        }

        const getId = req.params.id;
        console.log(getId);

        ProductInventory.findOneAndUpdate({ id: getId }, { quantity: req.body.quantity })
            .then(data => {
                if (!data) {
                    res.status(400).send(`Unable to find products with id ${getId}`)
                } else {
                    res.send({ message: `product inventory was successfully updated!!!..` })
                }
            }).catch(error => {
                res.status(500).send({error})
            })
    } catch (error) {
        res.status(500).send("Internal server error.")
    }
}


/* delete product inventory with id in request */

exports.delete = async (req, res) => {
    try {

        const prodId = req.params.id;
        const isDeleted = await ProductInventory.findOneAndRemove({ id: prodId })
            .then(data => {
                console.log(data)
                if (!data) {
                    res.status(400).send("Unable to remove product!")
                } else {
                    res.status(200).send("Product has been deleted successfully!")
                }
            }).catch(error => {
                res.status(500).send('Internal server error!')
            })

    } catch (error) {
        res.status(500).send('Internal server error!')
    }
}


/* remove all product inventory from database */

exports.deleteAll = (req, res) => {
    ProductInventory.deleteMany({}).then(data => {
        res.send({
            message: `${data.deletedCount} product inventory details were deleted successfully!`
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message || "some error occured all product inventory from database"
        })
    })
}