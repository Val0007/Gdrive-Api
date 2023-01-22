const axios = require("axios")
const fs = require("fs")


const refreshToken = ""
const accessToken = ""
const time = 3600
const apiKey = ""
const file_name = "Stack.jpg"


// {
//   access_token: 'ya29.a0AX9GBdWo_w9geZ0gXxyaGVmuqHkgCKsdRgnaAOVgsgMO9PfqRhMo70gVEZ2Cc1fCYHfV8gpBBuuOG-h5a4Ajcf0HsO13_rbDBwRkQ04dTUyGwj6fRk7PxDf1Nij10YtKkSKMQUT7xXWhEcyVJCuypgfnIxBozAYUaCgYKAWISAQASFQHUCsbCA7W1rlou-hagHDDqHeyVuA0167',
//   expires_in: 3599,
//   scope: 'https://www.googleapis.com/auth/drive',
//   token_type: 'Bearer'
// }


//const loc = "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&upload_id=ADPycdshk-Nb7X196fDScowFp4hJ76fKikZuvURVrFgyR_2FnEmmDw5ovfDVuoYkBLN9LFj6YzviOB3bTLjCZyN68AubGw"

async function upload(loc,file){
    // const filesize = getFilesizeInBytes("ram.pptx")
    const filesize = file.size
//    const headers = {"Content-Range": `bytes 0-  ${filesize - 1} / ${filesize}`}
   const headers = {"Content-Range": `bytes 0-*/*`}
    await axios({
            method: 'PUT',
            url: loc, 
            headers,
            data:file.buffer
          })
          .then(function (response) {
            console.log(response.data)
          })
          .catch(function (error) {
            console.log("Error", error.response.data);
          });
}

async function getLocation(filename,type,file){
    const headers = {
        "Authorization":`Bearer ${accessToken}`,
        "Content-type":"application/json"
    }
    const params = {
        "name":filename,
        "mimeType":type,
        "parents":["1CZgodBln1LB61PuO3CG0hu9LB5NBoHtO"]
    }
    await axios({
    method: 'POST',
    url: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', 
    data: params,
    headers,
    })
    .then(async function (response) {
    console.log(response.headers.location)
    await upload(response.headers.location,file)
    })
    .catch(function (error) {
    console.log("Error", error.response.data);
  
    });
}

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}


module.exports = getLocation

//ref
//https://stackoverflow.com/questions/60528771/uploading-file-to-google-drive-using-resumable-api
//create func to retreive access token before running
//https://stackoverflow.com/questions/19766912/how-do-i-authorise-an-app-web-or-installed-without-user-intervention/19766913#19766913
//https://developers.google.com/oauthplayground/?code=4/0AWgavdccfNVHKnG4rPiJTN4MfLW0dUXGAOCjbUfmdybIsAny_pwx1jEzBvRLwCZq1fDWOQ&scope=https://www.googleapis.com/auth/drive

//chunks
//https://stackoverflow.com/questions/65570556/download-and-upload-file-in-memory-to-google-drive
