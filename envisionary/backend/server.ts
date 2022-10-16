const express = require("express");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
const { Schema } = mongoose;
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLObjectType
} = require("graphql");

let app = express();
let url = "mongodb://admin:materialGworls!@it2810-66.idi.ntnu.no:27017/admin"
//let cors = require("cors");

/* mongoose
    .connect("mongodb://admin:materialGworls!@it2810-66.idi.ntnu.no:27017", {

        auth: {
            username: "admin",
            password: "materialGworls!",
        }
                
})
.then(() => console.log("Connected to database"))
.catch(err => console.log(err));

const citySchema = new Schema({
    Country: String, 
    City: String, 
    AccentCity: String, 
    Region: String, 
    Latitude: String,
    Longitude: String
});


citySchema.query.byName = function(name) {
    return this.where({ City: new RegExp(name, "i") })
};

const City = mongoose.model('City', citySchema);    


City.find({ "City": "oslo" }, "Country Region", function(err, cities) {
    console.log(cities);
}); */





/* 
const cityModel = mongoose.model("cities", {
    Country: String, 
    City: String, 
    AccentCity: String, 
    Region: String, 
    Latitude: String,
    Longitude: String
});

 */

const cityType = new GraphQLObjectType({
    name: "City",
    fields: {
        id: {type: GraphQLID},
        Country: {type: GraphQLString}, 
        City: {type: GraphQLString}, 
        AccentCity: {type: GraphQLString}, 
        Region: {type: GraphQLString}, 
        Latitude: {type: GraphQLString},
        Longitude: {type: GraphQLString}
    }
});


//cityModel.find({City: "oslo"}).then((res) => console.log(res));



/*
const { MongoClient } = require("mongodb");
// Connection URI
const uri =
  "mongodb://admin:materialGworls!@it2810-66.idi.ntnu.no:27017?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("envisionary").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/
async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
 
    const client = new MongoClient(url);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
