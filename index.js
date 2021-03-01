const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");
const { json } = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const addProject = (userdata) => {
  fs.readFile("projects.json", "utf-8", function (err, data) {
    if (err) throw err;
    var jsonData = JSON.parse(data);
    jsonData.projects.push(userdata);
    jsonData.count += 1;
    fs.writeFile(
      "projects.json",
      JSON.stringify(jsonData),
      "utf-8",
      function (err) {
        if (err) throw err;
        console.log("Done!");
      }
    );
    return jsonData;
  });
};

app.get("/", (req, res) => {
  fs.readFile("projects.json", "utf-8", (err, data) => {
    if (err) throw err;
    var json = JSON.parse(data);
    res.render("index", { projects: json.projects });
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const project = {
    name: req.body.username,
    email: req.body.email,
    registrationNumber: req.body.registrationNumber,
    title: req.body.title,
    link: req.body.link,
    description: req.body.description,
  };
  addProject(project);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("App running on port:3000");
});
