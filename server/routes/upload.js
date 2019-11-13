const express = require('express');
const router = express.Router();
const os = require('os')
const fs = require('fs-extra')
const multer  = require('multer')
const path = require('path')

const crypto = require('crypto');

const uploadPath = './../uploads/'
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        // randomBytes function will generate a random name
        let customFileName = crypto.randomBytes(18).toString('hex')
        // get file extension from original file name
        let fileExtension = path.extname(file.originalname).split('.')[1];
        cb(null, customFileName + '.' + fileExtension)
    }
})
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, callback) => {
        
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            // https://www.npmjs.com/package/multer#error-handling
            return callback(new Error('Only images are allowed!'))
        }
        callback(null, true)
    },
    limits: { fileSize: 4*1024*1024 } // in bytes
 })




router.post('/', upload.single('file'), (req,res,next) => {
    fs.ensureDirSync(uploadPath)
    
    console.log('POST from upload')
    console.log(req.file)
    
    res.set('Content-Type', 'text/plain')
    
    const { spawn } = require('child_process');
    // const pyProg = spawn('python', ['./../processing/flip.py', req.file.path]);
    const ls = spawn('python', ['./../processing/main.py', '-i='+req.file.path]);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        if(data.toString().indexOf('_out') > 0) {
            const outputPathPre = data.toString().trim();
            const outputPath = outputPathPre.substring(outputPathPre.indexOf(".."))
            console.log('Output path: "'+outputPath+'"')
            fs.readFile(outputPath, (err, fileData) => {
                res.end( Buffer.from(fileData).toString('base64') )
            });
        }
      });
      
      ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      
      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });

    // pyProg.stdout.on('data', function(python_output) {

    //     //
    //     const outputPath = python_output.toString().trim();
        

    // });


});

router.get('/', (req,res,next) => {
    res.set('Content-Type', 'text/plain')
    res.writeHead(200);
    res.end();
})




module.exports = router;

/**
 

let runPy = new Promise(function(success, nosuccess) {

    const { spawn } = require('child_process');
    const pyprog = spawn('python', ['./../pypy.py']);

    pyprog.stdout.on('data', function(data) {

        success(data);
    });

    pyprog.stderr.on('data', (data) => {

        nosuccess(data);
    });
});

app.get('/', (req, res) => {

    res.write('welcome\n');

    runPy.then(function(fromRunpy) {
        console.log(fromRunpy.toString());
        res.end(fromRunpy);
    });
})



 */
