import multer from "multer";

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/")        
    },
    filename : (req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`,)
    }
})


// Initialise the Upload
const upload = multer({
  storage: storage,
}).fields([
  { name: "frontimage", maxCount: 1 },
  { name: "audiofile", maxCount: 1 },
]);

export default upload