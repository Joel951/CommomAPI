import express from 'express'
import { deleteUser, findSingleUser, findUser, updateUser } from '../controllers/User.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
const router = express.Router();


// router.get('/checkauthentication',verifyToken,(req, res,next) => {
//     res.send("You are logged in")
// })

// router.get('/checkuser/:id',verifyUser,(req, res,next) => {
//     res.send("Hello user!! can privilaged")
// })

// router.get('/checkadmin/:id',verifyAdmin,(req, res,next) => {
//     res.send("Hello admin you can privilaged")
// })

// get all users
router.get("/",verifyAdmin,findUser)

//update user
router.put("/:id",verifyUser,updateUser)

//delete user
router.delete("/:id",verifyUser,deleteUser)

//find single user
router.get("/findbyname",verifyUser,findSingleUser)



export default router