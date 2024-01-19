const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weatherModule = require('./utils/weatherModule');


const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
 res.render("index", {
  title: "Weather App",
  name: "Explore Your Climate",
 });
});

app.get("/about", (req, res) => {
 res.render("about", {
  title: "About Page",
  name: "Partly Sunny",
 });
});


app.get("/help", (req, res, next) => {

 res.render("help", {
  title: "Help",
  name: "contact123@orgs",
 }, (err, html) => {
  if (err) {
   return next(err);
  }
  res.send(html);
 });


});

app.get("/weather", (req, res) => {
 if (!req.query.zip) {
  return res.send({
   error: 'You should provide an zip!'
  })
 }
 weatherModule(req.query.zip, (err, data) => {
  if (err) {
   return res.send({
    err
   })
  }
  res.send({
   data
  });
 })

});




app.get("/help/*", (req, res) => {
 res.render("help", {
  title: "Community Help",
  name: "go to new user community room",
 });
});


// star is for any page that is not available it will show page not found.
app.get("*", (req, res) => {
 res.render("404", {
  title: "Please go to community help menu....",
  name: "page not found",
 });
});





app.listen(3000, () => {
 console.log("Server is up on port 3000.");
});










