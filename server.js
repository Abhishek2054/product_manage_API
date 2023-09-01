const db = require("./models/index.js");
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to the DB...!");
}).catch(error =>{
    console.log("Error while connecting to the DB.");
    process.exit
});

app.get('/', (req, res) => {
    res.send('This is a product Inventory API project for admin to maintain products....!')
})

require('./routes/products.js')(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})