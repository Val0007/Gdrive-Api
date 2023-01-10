const db = require("./db")
const express = require("express");
const app = express();
const port = 3000;
const multer = require('multer');
const post = require("./post");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const upload = multer();

https://drive.google.com/file/d/1DKh9EREV_ywKqAmHt9QrCHx6F2jLWFjR/

//http://localhost:3000/getMaterials?dept=INT&sem=3&courseid=IT18301
app.get("/getMaterials", async (req, res) => {
  let dept = req.query.dept
  let sem  = req.query.sem
  let courseid = req.query.courseid
  let query = `Select * from pdfTable where dept = '${dept}' and semester = ${sem} and courseid = '${courseid}'`
       try{
        let r = await db.getFilesFromDept(query)
        console.log("RESULTS ARE ",r)
        res.json(r);
    }
    catch(e){
        console.log(e)
        res.send("eRROR")
    }
});

app.post('/postMaterials', upload.any(), async (req, res) => {
    try {
      const { body, files } = req; //body has params,files has single or multiple files parsed by multer
    //   for (let f = 0; f < files.length; f += 1) {
    //     await uploadFile(files[f]);
    //   }
       console.log(files)
      await post(files[0].originalname,files[0].mimetype,files[0])
      console.log(body);
      res.status(200).send('Form Submitted');
    } catch (f) {
      res.send(f.message);
    }
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});