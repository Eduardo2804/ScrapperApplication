//npm install cherio dependecy
//npm install request dependecy

const cherio = require("cherio");
const request = require("request");
const fs = require("fs");

//create a writestream and saving urls in txt file
//flag a is used to append new links to the file
var writeStream = fs.createWriteStream("linksImages.xml", {flags: 'a'},"UTF-8")

var x = "https://www.orcawise.com/blogs/vscode-gitlab-personal-access-token/"


request(x, (err, resp, html)=>{

    if(!err && resp.statusCode == 200){
        console.log("connection success");
    

        //defining cherio and $ object
        const $ = cherio.load(html);

        //grabing the images
        $("img").each((index, image) => {

            var img = $(image).attr("src");
            var baseUrl = x;
            var links = baseUrl + img;
        
            
           //salving the images in txt file
           writeStream.write(links);
           writeStream.write("\n");


        });

    } else {
        console.log("conncection failed");

    }

});
