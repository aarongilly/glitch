const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
console.log("eh?");
console.log("myApp logs too");

/** # SCHEMAS and MODELS #
/*  ====================== */

var Schema = mongoose.Schema;

var urlSchema = new Schema({
  url: { type: String, required: true },
  num: { type: Number }
});

const Url = mongoose.model("Url", urlSchema);

var createAndSaveUrl = function(done) {
  var mySite = new Url({
    url: "http://www.aarongilly.com/creations",
    num: 2
  });
  mySite.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
  //done(null /*, data*/);
  return "ran function";
};

var testCrossFileFun = function(){
  return "value from myApp"
}

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.UrlModel = Url;
exports.createAndSaveUrl = createAndSaveUrl;
exports.testCrossFileFun = testCrossFileFun; 
