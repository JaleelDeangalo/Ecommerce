const mongoose = require("mongoose");
const database = require("./keys").mongoURI;

const Connect =  async () =>  {
    try {
        await mongoose.connect(database,{useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true});
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = Connect;