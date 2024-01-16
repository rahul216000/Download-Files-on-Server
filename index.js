var path = require('path');
const fs = require('fs');
const Downloader = require("nodejs-file-downloader");

var dir = 'data'

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

let arr = [
    "A-animated.mp4",
   
]


async function DownloadAudios(FileName, DirToSave) {
    try {
        const downloader = new Downloader({
            url: `https://guitar-app-data.s3.amazonaws.com/${FileName}`,
            directory: DirToSave,
            fileName: FileName,
            cloneFiles: false,
            maxAttempts: 3,
        });

        try {
            await downloader.download();
        } catch (error) {
            //If all attempts fail, the last error is thrown.
            console.log("Final fail", error);
            console.log(FileName);
        }

    } catch (error) {
        console.log(`Err of do`);
        console.log(error);
    }

    console.log(`${FileName}`);

}

async function downloads(){

    for (let i = 0; i < arr.length; i++) {
        let DirToSave = path.join(`${__dirname}/data`);
        await DownloadAudios(arr[i], DirToSave)
    }
}

downloads()

