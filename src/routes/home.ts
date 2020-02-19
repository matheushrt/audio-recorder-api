import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const audioFilesPath = path.resolve(__dirname, '../../audios');
const storage = multer.diskStorage({
  destination: audioFilesPath,
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}.mp3`);
  }
});
const upload = multer({ storage });

const getFileNames = (): string[] => fs.readdirSync(audioFilesPath);
const getFilePath = (fileName: string): string =>
  path.join(audioFilesPath, fileName);

/* GET home page. */
router.get('/file/:fileName', (req, res) => {
  const { fileName } = req.params;
  const filePath = getFilePath(fileName);
  res.status(200).sendFile(filePath, console.error);
});

router.get('/file_names', (req, res) => {
  res.status(200).json(getFileNames());
});

//  POST
router.post('/', upload.single('audio'), (req, res) => {
  res.status(201).send('Audio file successfully saved!');
});

export default router;
