
const puppeteer = require("puppeteer");
const fs = require("fs");
const { error } = require("console");


//puppeteer will open browser(launch) and then open new page that will go to url setted up
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto('https://www.orcawise.com/blogs/blog-what-is-nlp');


    //function evaluate will be executed on the brownser created by puppeteer
    //it will go throw the webesite and get what it is scrapping
        const listImages = await page.evaluate(() => {

        //get all the images in the website

        const listNode = document.querySelectorAll("img")

        //transform nodelist to array

        const arrayImages = [...listNode]

        //transform array to json format

        const listImages = arrayImages.map( img => ({src: img.src}))

        return listImages;

    });

        //writing data in xml file
        fs.writeFileSync("listUrlXML.xml", JSON.stringify(listImages, null, 2), err => {
            if(err) throw new Error("something went wrong")
            console.log("success")
        })

  
    await browser.close();
  })();