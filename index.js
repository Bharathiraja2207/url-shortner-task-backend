
import express from "express"; // "type": "module"
import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
import signinRouter from './router/login.router.js';
import forgetRouter from './router/forgetpassword.router.js';
import shortid from "shortid";
// import { auth } from "./middleware/auth.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config()
const app = express();
const PORT = process.env.PORT;
// const mongo_url = 'mongodb://127.0.0.1';
const mongo_url =(process.env.mongo_url)
export const client = new MongoClient(mongo_url);
await client.connect();
  console.log('mongo is connected!!');

 app.use(cors ())
  app.use(express.json())
  app.use(bodyParser.json());
  
app.get("/", function (request, response) {
  response.send("🙋‍♂️,hello..worlds 🌏 🎊✨🤩");
});


app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;
if(url){
  

  // Generate short ID
  const shortId = shortid.generate();
  // Save URL to database
  const newUrl = await client
  .db("urlshortner")
  .collection("urlshortner")
   .insertOne({
    originalUrl: url,
    shortUrl: `http://localhost:2001/${shortId}`,
  });
  // Return shortened URL
  res.json({
      originalUrl: url,
      shortUrl: `http://localhost:2001/${shortId}`,
    });
  }else{res.status(400).json({ message: 'url not defind' })}
});

app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;

  // Find URL in database
  const url = await client
  .db("urlshortner")
  .collection("urlshortner")
  .findOne({ shortUrl: `http://localhost:2001/${shortId}` });

  if (!url) {
    return res.status(404).send('URL not found');
  }

  // Redirect to original URL
  res.redirect(url.originalUrl);
});


app.use("/users",signinRouter);
app.use("/",forgetRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));