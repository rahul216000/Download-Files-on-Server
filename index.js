var path = require('path');
const fs = require('fs');
const Downloader = require("nodejs-file-downloader");

var dir = 'data'

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

let arr = [
    "A-animated.mp4",
    "A-arpeggiated-down.wav",
    "A-arpeggiated-up.wav",
    "A-bass.wav",
    "A-default-down.wav",
    "A-default-up.wav",
    "A-handmade.mp4",
    "A-hard-down.wav",
    "A-hard-up.wav",
    "A-muted-full.wav",
    "A-muted-half.wav",
    "A-short-bass.wav",
    "A-short-default-down.wav",
    "A-short-default-up.wav",
    "A-short-hard-down.wav",
    "A-short-hard-up.wav",
    "A-short-soft-down.wav",
    "A-short-soft-up.wav",
    "A-soft-down.wav",
    "A-soft-up.wav",
    "A.png",
    "A7-animated.mp4",
    "A7-arpeggiated-down.wav",
    "A7-arpeggiated-up.wav",
    "A7-default-down.wav",
    "A7-default-up.wav",
    "A7-handmade.mp4",
    "A7-hard-down.wav",
    "A7-hard-up.wav",
    "A7-muted-full.wav",
    "A7-muted-half.wav",
    "A7-short-default-down.wav",
    "A7-short-default-up.wav",
    "A7-short-hard-down.wav",
   
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

