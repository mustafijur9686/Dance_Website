const express = require("express");
const path= require("path");
const app =express();
const mongoose = require('mongoose');
const bodyparser =require('body-parser')
const port = 8000;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}


// Define mongoose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    description: String
  });
  const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))//FOR SERVING STATIC FILE
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine','pug')//SET THE TEMPLETE ENGINE AS PUG
app.set('views',path.join(__dirname,'views'))//SET THE VIEWS DIRECTORY

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
}).catch(()=>{
    res.send("Item has been not saved to the database")
});
// res.status(200).render('contact.pug');
})





// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
