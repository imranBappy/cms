const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const unzipper = require("unzipper");

const connectDB = require("./config/db");
const Post = require("./model/Post");
const Setting = require("./model/Setting");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// handle zip file

const app = express();
connectDB();
app.use(express.static("module"));
app.use(jsonParser);
app.use(urlencodedParser);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// app.post("/post", async (req, res) => {
//   const newPost = new Post({
//     title: req.body.title,
//     content: req.body.content,
//   });

//   try {
//     const post = await newPost.save();
//     res.json(post);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

app.post("/post/:type", async (req, res) => {
  const { type } = req.params;

  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    type: type,
  });

  try {
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

async function postData(path, cb) {
  const blogDir = `E:\\job-work\\cms\\module\\${path}\\setting.json`;
  try {
    fs.readFile(blogDir, function (err, data) {
      const jsonData = JSON.parse(data?.toString());
      cb(jsonData);
    });
  } catch (error) {
    console.log({ error });
  }
}

app.post("/setting", async (req, res) => {
  postData("pages\\blog", async (data) => {
    try {
      const newSetting = await Setting.insertMany(data);
      res.json(newSetting);
      console.log("setting saved");
    } catch (error) {
      console.log(error);
    }
  });
});

// Create an "uploads" directory if it doesn't exist
const uploadDir = path.join(__dirname, "module");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Define a route to handle ZIP file uploads
app.post("/zip", upload.single("zip"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No ZIP file provided." });
  }

  const exeName = path.extname(req.file.originalname);
  const moduleName = path.basename(req.file.originalname).replace(exeName, "");

  // Extract the uploaded ZIP file
  const zipFilePath = path.join(uploadDir, req.file.originalname);
  const extractionPath = path.join(uploadDir);

  if (!fs.existsSync(extractionPath)) {
    fs.mkdirSync(extractionPath, { recursive: true });
  }

  // Use the unzipper library to extract the ZIP file
  fs.createReadStream(zipFilePath).pipe(
    unzipper.Extract({ path: extractionPath }).on("close", () => {
      // Delete the ZIP file from the uploads directory
      fs.unlinkSync(zipFilePath);

      // Return a success response to the client
      postData(moduleName, async (data) => {
        try {
          const newSetting = await Setting.insertMany(data);
          res.json(newSetting);
          console.log("setting saved");
        } catch (error) {
          console.log(error);
        }
      });

      res.json({
        msg: "success",
        pathName: req.file.originalname + "_extracted",
      });
    })
  );

  // postData(req.file.originalname + "_extracted", async (data) => {
  //   try {
  //     const newSetting = await Setting.insertMany(data);
  //     res.json(newSetting);
  //     console.log("setting saved");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // res.json({ msg: "success", pathName: req.file.originalname + "_extracted" });
});

app.post("/update", upload.single("zip"), (req, res) => {
  const uploadDir1 = path.join(__dirname);
  if (!fs.existsSync(uploadDir1)) {
    fs.mkdirSync(uploadDir1);
  }
  const { name } = req.body;
  const exeName = path.extname(name);

  // Extract the uploaded ZIP file
  const zipFilePath = path.join(uploadDir1, name);

  const extractionPath = path.join(uploadDir);

  if (!fs.existsSync(extractionPath)) {
    fs.mkdirSync(extractionPath, { recursive: true });
  }

  // Use the unzipper library to extract the ZIP file
  fs.createReadStream(zipFilePath).pipe(
    unzipper.Extract({ path: extractionPath }).on("close", () => {
      // Delete the ZIP file from the uploads directory
      fs.unlinkSync(zipFilePath);
      res.json({
        msg: "success",
        pathName: name + "_extracted",
      });
    })
  );
});

app.get("/setting/:type", async (req, res) => {
  const { type = "" } = req.params;

  console.log(type);
  try {
    const component = await Setting.find({ type: type });
    res.json(component);
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
