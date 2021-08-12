import { Request,Response } from 'express';
import Router from 'express';
const router=Router();

const multer  = require('multer')
const mimeTypes=require('mime-types')

const storage = multer.diskStorage({
  destination:`./public/`,
  filename:function(req:Request,file:any,cb:any){
    cb('',Date.now()+'.'+mimeTypes.extension(file.mimetype));
  }
})

const upload = multer({ storage: storage })



router.post('/',upload.single('files'),(req:any,res:any)=>{

  console.log('foto: ',req.file)
  const path=`http://localhost:3001/${req.file.filename}`
  res.json(path);

})



export default router;