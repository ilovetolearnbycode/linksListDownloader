const express = require('express');
const app = express();
const download = require('download');
const fs = require('fs');
const PORT = 8080;
const cors = require('cors');
app.listen(process.env.PORT||PORT,()=>console.log('Running on Port:'+PORT));

app.use(express.static('public'));
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('this is fine!');
});

// handling the post request
app.use(cors);
app.post('/sendDataToDownload',(req,res)=>{
    let data = req.body;
    let urlsList = getURLlist(data);
    let subjectName = data.subjectNameValue;
    let directory_path = "../"+ subjectName + '/';
    fs.mkdirSync(directory_path);
    // console.log(directory_path);
    urlsList.forEach(link=>{
        download(link,directory_path)
        .then(()=>{
            console.log('done!');
        })
        .catch(err=>{
            console.log(err);
        });
    });
    res.sendStatus(res.statusCode);
})

function getURLlist(data){
    let baseURL = data.baseURL;
    let count = parseInt(data.countValue);
    let addonStringValue = data.addonString;
    let addonStr = "";
    let urls = [];
    for(let i = 0;i<count;i++){
        if(addonStringValue === undefined){
            addonStr = "";
        }else{
            addonStr = addonStringValue;
        }
        urls[i] = baseURL + addonStr + (i+1) + ".pdf";
    }
    return urls;
}
