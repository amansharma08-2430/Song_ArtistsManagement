const mongoose=require('mongoose')
const { required } = require('nodemon/lib/config')
var schema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   release_date:{
   type:String,
    required:true
   },
    artist: {
    type: String,
    required: [true, "Uploaded file must have a name"]
  },
  artists:{
      type: String,
      required:true
  }

})
const File = mongoose.model("File", schema);

// Exporting the Model to use it in app.js File.
module.exports = File;