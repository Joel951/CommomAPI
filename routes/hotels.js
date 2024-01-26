import express from 'express'
import { createHotel, deleteHotel, findHotel, findSingleHotel, updateHotel } from '../controllers/Hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();


// insert
router.post("/",verifyAdmin, createHotel)

//update
router.put("/:id",verifyAdmin, updateHotel)

//delete
router.delete("/:id",verifyAdmin, deleteHotel)
    
//findall
router.get("/", findHotel)

//findone
router.get("/:id", findSingleHotel)


export default router