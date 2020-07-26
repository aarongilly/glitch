'use strict';

var express = require('express');
var mongoose = require('mongoose');
var dns = require('dns');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//not sure much about cors yet, this was here so I'm leaving it
app.use(cors());

// this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({extended: false}));

/** # SCHEMAS and MODELS #
 *  ======================
 */
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  url: { type: String, required: true },
  num: { type: Number }
});

const Url = mongoose.model("Url",urlSchema);

/** # MONGOOSE FUNCTIONS #
 *  ======================
 */

 var createAndSaveUrl = function(urlIn, done){
   getDocumentCount((d)=>{
     const index = d+1;
     var mySite = new Url({
       url: urlIn,
       num: index
     })
     mySite.save(function(err,data){
      if(err) return console.error(err);
      console.log("Passing in this data...");
      console.log(data);
      let responseObject = {
        original_url: urlIn,
        short_url: data.num
      }
      done(null,responseObject);
    })
   })
 }

 var getDocumentCount = function(done){
   return Url.countDocuments({}, function(err,count){
    done(count);
   });
 }

 var findSiteAtIndex = function(numIn, done){
   Url.findOne({num: numIn},(err, data) => {
    if (err) return console.log(err); 
    console.log(data);
    var sanitizedUrl = data.url;
    if(sanitizedUrl.substring(0,4)!="http"){
      sanitizedUrl = "http://" + sanitizedUrl;
    }
     done(sanitizedUrl);
   })
 }

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});
  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//----- me testing crap -------
//var createAndSaveUrl = require('./myApp.js').createAndSaveUrl;
// the process.env.TEST_VAR DOES properly log. Not sure wtf is going on.
app.get("/api/customTest", function(req, res){
  let resp = createAndSaveUrl();
  res.json({message: resp})
});

app.get("/api/count", function(req, res){
  getDocumentCount((d)=> {
    res.json({dbCount: d})
  });
})

app.get("/api/redirect", function (req, res){
  console.log({"key":"vaaaaalue","key2":"valuuuuue"});
  res.redirect("http://www.aarongilly.com");
})

//----- the actual project -----

app.post("/api/shorturl/new",  function(req, res){
  let receivedUrl = req.body.url;
  dns.lookup(receivedUrl,(err, address, family) => {
    if(err !== null){
      res.json({"error":"invalid URL"})
    }else{
      console.log("err " + err);
      console.log("address " + address);
      createAndSaveUrl(receivedUrl,(e,d) => {
        res.json(d);
      })
    }
  })
})

app.get("/api/shorturl/:num",(req, res)=>{
  findSiteAtIndex(req.params.num,(d)=>{
    res.redirect(d);
  })
})

app.listen(port, function () {
  console.log('Node.js listening ...');
});