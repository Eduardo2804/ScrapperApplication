
//importing the library
const puppeteer = require("puppeteer");
const fs = require("fs");


(async () => {

    try{

    const brower = await puppeteer.launch();
    const page = await brower.newPage();

    //defining the url to go to
    await page.goto("https://www.bunsen.ie/");
    

    const imgList = await page.evaluate(() => {

        const nodeList = document.querySelectorAll("img");

        const imgArray = [...nodeList]

        const imgList = imgArray.map( ({src}) => ({src}))

        return imgList;

     });

     //import imgList to jason

     fs.writeFile("listUrl.json", JSON.stringify(imgList, null, 2), err => {
        if(err) throw new Error("something wrong");
        console.log("sucessfull");
     })

     

           
   
   await brower.close();
} catch(error){
    console.log("error");
}
})();

