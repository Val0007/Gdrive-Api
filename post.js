const axios = require("axios")
const fs = require("fs")


const refreshToken = "1//04aFOGxfAxMZtCgYIARAAGAQSNwF-L9IrWPZ2zuOpJafvhk-6_yEBWhZdTrcNuXg9OEK0Z26oCKPRm9cptmd2ReW4vszdWQioxvQ"
const accessToken = "ya29.a0AX9GBdXUI4dEJJgUZhpFXww2UD3kkBp4uOgSQ1x6XbDsKEfK6vUV0eNUbCQtGGnldw1qv2m66hSFUHSFO1ADEzVuPJdqg8LgS7afrtWLEDJApti5WPNTddgMo4Mft3HrxYLU2jqdt5XYPs9v1izm_q8OFjjAaCgYKAXASARASFQHUCsbCW8pXU0rHKoZnyfs89DYvRw0163"
const time = 3600
const apiKey = "AIzaSyAQnyqE_nMwLN0QXJnnHPVVk7-7hREp4rg"
const file_name = "Stack.jpg"






//const loc = "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&upload_id=ADPycdshk-Nb7X196fDScowFp4hJ76fKikZuvURVrFgyR_2FnEmmDw5ovfDVuoYkBLN9LFj6YzviOB3bTLjCZyN68AubGw"

function upload(loc){
    const filesize = getFilesizeInBytes("ram.pptx")
//    const headers = {"Content-Range": `bytes 0-  ${filesize - 1} / ${filesize}`}
   const headers = {"Content-Range": `bytes 0-*/*`}
    const fContent = fs.readFile("ram.pptx",(err,data)=>{
        axios({
            method: 'PUT',
            url: loc, 
            headers,
            data:data
          })
          .then(function (response) {
            console.log(response.data)
          })
          .catch(function (error) {
          
            console.log("Error", error.response.data);
          
          });
    })

}

getLocation()

function getLocation(){
    const headers = {
        "Authorization":`Bearer ${accessToken}`,
        "Content-type":"application/json"
    }
    
    const params = {
        "name":"ram2.pptx",
        "mimeType":"application/vnd.google-apps.presentation",
        "parents":["1CZgodBln1LB61PuO3CG0hu9LB5NBoHtO"]
    }
    


axios({
    method: 'POST',
    url: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', 
    data: params,
    headers,
  })
  .then(function (response) {
    console.log(response.headers.location)
    upload(response.headers.location)
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


//ref
//https://stackoverflow.com/questions/60528771/uploading-file-to-google-drive-using-resumable-api
//create func to retreive access token before running
//https://stackoverflow.com/questions/19766912/how-do-i-authorise-an-app-web-or-installed-without-user-intervention/19766913#19766913
//https://developers.google.com/oauthplayground/?code=4/0AWgavdccfNVHKnG4rPiJTN4MfLW0dUXGAOCjbUfmdybIsAny_pwx1jEzBvRLwCZq1fDWOQ&scope=https://www.googleapis.com/auth/drive

//chunks
//https://stackoverflow.com/questions/65570556/download-and-upload-file-in-memory-to-google-drive