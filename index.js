const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
const fs = require('fs');

app.get("/", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render("index", { files: files });
    })
});
app.get("/files/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8",function(err ,filedata){
    res.render("show",{filedata:filedata,filename:req.params.filename});
    })
});
app.get("/edit/:filename", (req, res) => {
        res.render("edit",{filename:req.params.filename});
});

app.post("/edit",(req,res)=>{
    fs.rename(`./files/${req.body.Previous}`,`./files/${req.body.Newname}`,(err)=>{
      res.redirect("/");
      console.log(req.body);
    });
});

app.get("/delete/:filename",(req,res)=>{
    fs.unlink(`./files/${req.params.filename}`,(err)=>{
        res.redirect("/");
    });
});


app.post("/create", function (req, res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
    res.redirect("/");
    })
    console.log(req.body);

});


app.listen(3000, () => {
    console.log("App is listening");
})