module.exports = mongoose => {
    const Products = mongoose.model("Products", mongoose.Schema({
        id: {
            type: Number,
            unique: true
        },
        name: String,
        quantity: Number
    },{timestamps:true}))

    return Products;
}