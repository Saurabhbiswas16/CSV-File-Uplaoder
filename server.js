import csvtojson from 'csvtojson';
import express from 'express';
var app = express();
import multer from 'multer';
import Cors from 'cors';

import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;

app.use(express.json());
app.use(Cors());

const port= process.env.PORT || 8001;
const connection=`mongodb+srv://admin:wld564R4n3cbmWdC@cluster0.xmguo.mongodb.net/EmailSystem?retryWrites=true&w=majority`;
var dbo;
const upload = multer();

app.post("/csv/add", upload.single("file"),  (req, res) => {
    var file = req.file;
    MongoClient.connect(connection,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
    } ,(err, db)=> {
        if (err) {
            res.send(err)
        }
        dbo = db.db("csvs");
        try {
            csvtojson()
            .fromStream(file.stream)
            .then((json) => {

                //const data= JSON.stringify(json);
                console.log(json)
                dbo.collection("csv").insertOne({ csvobject: json }, function (error, response) {
                    if (error)
                    {
                        res.send(error)
                    }
                    else{
                        console.log(res);
                       res.send(json)
                    }
                    db.close();
                });
            })
        } catch (error) {
            
        }
        

    });
})

app.listen(port,()=>{
    console.log(`Port ${port}`);
})