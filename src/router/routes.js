import Express from "express";
import { handleFileUpload } from "../controller/uploadController.js";
import { multerUtil } from "../utils/multerUtil.js";

const NAMESPACE = "SERVER";

const router = Express.Router();

router.use((req, res, next) => {
  console.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );
  res.on("finish", () => {
    console.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });
  next();
});

const {upload} = multerUtil();

router.post('/upload', upload.single('file'), handleFileUpload);

router.use((req, res, next) => {
    const error = new Error("Not Found");
    res.status(404).json({
      message: error.message,
    });
  });


export default router;