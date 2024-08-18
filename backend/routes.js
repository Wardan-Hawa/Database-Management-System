var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');

// User and Files routers
router.use("/users", require("./User/userRouter/index"));
router.use("/files", require("./Files/FilesRouter/index"));


// Route for accessing individual files
router.get('/file/:fileName', (req, res) => {
 
    const filePath = path.join(__dirname, 'uploads', req.params.fileName);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
    } else {
    return res.status(404).send('File not found');
    }
    });
    


 router.use("/research-groups", require("./ResearchGroups/rsRoutes"));
 router.use("/research-group", require("./RGFiles/RGFilesRouter"));
    module.exports = router;
    
    