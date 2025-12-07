const express = require('express');
const app = express();
const port = process.env.PORT || 3010;
let cors = require('cors');
let {MongoClient, ObjectId} = require("mongodb");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(function (req, res, next){
  let today = new Date().toISOString();
  console.log(`[${today}]: ${req.method} ${req.url}`);
  next();
})

client = new MongoClient("mongodb+srv://zozochan:Nkechi@cluster0.ipofseh.mongodb.net/")
client.connect();
let db = client.db("after_school_classes");

app.get("/lessons", async function(req, res){
  let collection  = db.collection("lessons");
  collection.find({}).toArray().then(results => {
    res.json(results);
  });
})

async function updateOrderSpaces(orderList){
  try {
    const collection = db.collection("lessons");

    for (const order of orderList) {
        const {topic, quantity} = order;
        const courseData = await collection.findOne({topic: topic});

      if(!courseData){
        console.error(`Course not found: ${topic}`);
      } else {
        if (courseData.space < quantity) {
          console.warn(`Not enough space for ${topic}. Available: ${courseData.space}, Requested: ${quantity}`);
        } else {
          const result = await collection.updateOne(
            {topic: topic}, 
            {$inc: { space: -quantity }}
          );

          if (result.modifiedCount > 0) {
            console.log(`Updated ${topic}: Available spaces decremented by ${quantity}`);
          } else {
            console.warn(`No spaces updated for ${topic}`);
          }
        }
      }
    }

} catch (error) {
    console.error(`Error updating order spaces: ${error.message}`);
  }
}

app.post("/checkout", async function(req, res){
