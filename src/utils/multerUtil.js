import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";


const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export const multerUtil = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
        }
      });
      
    const upload = multer({ storage: storage });
    
    return {upload};
}