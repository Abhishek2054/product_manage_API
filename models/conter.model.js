module.exports = mongoose => {

    const CounterSchema = mongoose.model("counterSchema", mongoose.Schema({
        id: String,
        seq: Number
    },{timestamps:true}))

    return CounterSchema

}