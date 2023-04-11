const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const { write } = require("fs");
const download = require("image-downloader")


async function start() {

    const brower = await puppeteer.launch()
    const page = await brower.newPage()
    await page.goto("https://www.orcawise.com/blogs/unit-testing-in-react-jest")
   // await page.screenshot({path: "test2.png"})
    
   const urlName = await page.evaluate(() => {
   return Array.from(document.querySelectorAll("img")).map(x => x.getAttribute("src"))
   })

   await fs.writeFile("linksImages.xml", urlName.join("\r\n"))


   //--------------function to get images from webpage ------------ 
    const imgs = await page.$$eval("img", (imgs) => {
        return imgs.map(x => x.src)
    })

    //img split pop is using to remove the url unecessery in the img

    for (const img of imgs) {
        const imgspage = await page.goto(img)
        await fs.writeFile(img.split("/").pop(), await imgspage.buffer())

        const opt = {
            url: page,
            dest: "./imgsDown"
        };

        download.image(opt);

    }

     

   
   
   
   await brower.close()

}

start()