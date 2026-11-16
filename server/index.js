const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { randomUUID } = require("crypto");

const app = express();
app.use(cors());

// Ensure the local uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve the uploaded files statically so React can display them
app.use("/uploads", express.static(uploadDir));

const imageExtensions = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userUploadDir = path.join(uploadDir, req.uploadUserId);
    fs.mkdir(userUploadDir, { recursive: true }, (error) => cb(error, userUploadDir));
  },
  filename: (req, file, cb) => cb(null, `${randomUUID()}${imageExtensions[file.mimetype]}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!imageExtensions[file.mimetype]) {
      return cb(new Error("Only JPEG, PNG, WebP, and GIF cover images are allowed."));
    }
    cb(null, true);
  },
});

// Upload endpoint
app.post("/upload", (req, res, next) => {
  const uid = req.query.uid;
  if (typeof uid !== "string" || !/^[a-zA-Z0-9_-]{1,128}$/.test(uid)) {
    return res.status(400).json({ error: "A valid user ID is required." });
  }
  req.uploadUserId = uid;
  next();
}, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const fileUrl = `/uploads/${req.uploadUserId}/${req.file.filename}`;
  res.json({ fileUrl, fileName: req.file.filename });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  const status = error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
  res.status(status).json({ error: error.message });
});

app.listen(5000, () => console.log("Upload server running on port 5000"));
