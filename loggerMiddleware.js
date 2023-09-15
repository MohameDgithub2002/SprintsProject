const fs = require('fs'); 

const logger = (req, res, next) => { 
    const log = `${req.method} - ${req.url} - ${res.statusCode} \n`;
    console.log(log);
    fs.appendFile("log.txt", log, (err) => {
        if(err){
            console.log(err);
        }
    });
    next(); 
}; 
module.exports = logger;
