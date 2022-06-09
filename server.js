const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const bodyparser=require('body-parser')
const path=require('path')
//const upload = require('./server/routes/upload');
const Grid = require("gridfs-stream");
const connectDB=require('./server/database/connection');
const multer =require('multer');
const File = require('./server/model/model');
const app=express();
dotenv.config({path:'config.env'})
const PORT=process.env.PORT||8080
app.use(express.static(`${__dirname}/public`));
//log request
app.use(morgan('tiny'));
//MogoDB connection
connectDB();
//parse request
app.use(bodyparser.urlencoded({extended:true}))
//set view engine
app.set("view engine","ejs");
//app.set("views",path.resolve(__dirname,"views/ejs"))
//load assests
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

app.get('/',(req,res)=>{
  res.render('index');
})
app.get('/add-song',(req,res)=>{
  res.render('add_song');
})
app.use("/", (req, res) => {
  res.status(200).render("index");
});
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
app.post("/api/uploadFile", upload.single("myFile"), (req, res) => {
  try {
  const newFile = File.create({
    name: req.file.filename,
    //release_date:req.file.
  });
  res.status(200).json({
    status: "success",
    message: "File created successfully!!",
  });
} catch (error) {
  res.json({
    error,
  });
}
});

app.get("/api/getFiles", async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json({
      status: "success",
      files,
    });
  } catch (error) {
    res.json({
      status: "Fail",
      error,
    });
  }
});
//app.use('/', require('./server/routes/router'))
app.listen(3000,()=>{console.log('Server is running on http://localhost:${3000}')});
