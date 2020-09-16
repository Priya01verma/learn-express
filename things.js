const express = require('express');
const router = express.Router();
router.get('/', (req, res)=>{
    res.send("GET routes on things.");
});
router.post('/', (req, res)=>{
    res.send('POST route on things.');
});

// export this router to use in our index.js;
module.exports = router;