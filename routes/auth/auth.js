const userLogin = require("../../controllers/auth/login");
const { userSignUp } = require("../../controllers/auth/register");
const multer = require("multer");

const router = require("express").Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


router.post('/register-user' , upload.single("avatar"), async (req,res)=>{
    await userSignUp(req , "User" , res)
})

router.post('/login-user' , async(req,res)=>{
    await userLogin(req.body , "User" , res);
})

module.exports = router;