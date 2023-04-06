const cherio = require("cherio");
const request = require("request");
const fs = require("fs");

var writeStream = fs.createWriteStream("imagesLinks.txt", "utf-8");


request("https://www.irishtimes.com/", (err, resp, html)=>{

    if(!err && resp.statusCode == 200){
        console.log("connection success");
    } else {
        console.log("failed");
    }
});