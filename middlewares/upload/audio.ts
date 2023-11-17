import multer from "multer";

const storage = multer.memoryStorage();

const uploadAudio = multer({
  storage,
}).single("audio");

export default uploadAudio;
