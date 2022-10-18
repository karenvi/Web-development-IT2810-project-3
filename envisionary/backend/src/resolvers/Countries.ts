import mongoose from "mongoose";

const uri = process.env.DB_URL


export default {
    Query: {
        async numberOfCountries() {
            try {
                //console.log(uri);
                await mongoose.connect(uri);
                mongoose.connection.db.listCollections().toArray(function(err, names){
                    console.log(names) // så vi kan se collections i databasen
                    return(names.length);
                });
                console.log("🎉 Connected to database successfully");
            } catch (err) {
                console.log(uri);
                console.log(err);
            }
        }
    }
}