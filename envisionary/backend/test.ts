import { MongoClient } from "mongodb";
// Replace the uri string with your connection string.
const uri =
  "mongodb://admin:materialGworls!@it2810-66.idi.ntnu.no:27017?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('envisionary');
    const cities = database.collection('cities');
    // Query for a movie that has the title 'Back to the Future'
    const query = { City: 'aixas' };
    const city = await cities.findOne(query);
    console.log(city);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);