import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err);

      // Extract the original extension (e.g., '.jpg')
      const extension = path.extname(file.originalname);

      // Append the extension to the end of your generated name
      cb(null, file.fieldname + "-" + raw.toString("hex") + extension);
    });
  },
});

export const upload = multer({
  storage,
});
