const express = require('express');
const router = express.Router();
router.get('/',(req,res)=>{
    res.send("Hii");
    console.log(req.body);
})
module.exports = router;