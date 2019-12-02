const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const generateHTML = require("./generateHTML.js");
const util = require("util");

let writeFileAsync = util.promisify(fs.writeFile);

const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
  };

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your Github user name?",
      name: "username"
    },
    {
      type: "checkbox",
      message: "Which of these is your favorite color?",
      name: "color",
      choices: ["blue", "red", "pink", "green"]
    }
  ])

  .then(function(answers) {
    const queryUrl = `https://api.github.com/users/${answers.username}`;
    return axios.get(queryUrl).then(function(res) {
      console.log(
        "--------------------------------------------------------------"
      );
      console.log("GitHub API Call for", `${answers.username}`, res.data);
      console.log(
        "--------------------------------------------------------------"
      );

      const starDataUrl = `https://api.github.com/users/${answers.username}/starred`;
      axios.get(starDataUrl).then(function(stars) {
        console.log(
          "--------------------------------------------------------------"
        );
        console.log("GitHub API Call for", `${answers.username}`, stars.data);
        console.log(
          "--------------------------------------------------------------"
        );
        if (res.data.bio === null) {
          res.data.bio = `<h3 class = "userBio">${answers.username}, "does not yet have a Bio on GitHub."</h3>`;
        }
        if (res.data.blog === "") {
          res.data.blog = `<h3 class = "userBlog">${answers.username}, "does not yet have a Blog on GitHub."</h3>`;
        }
        if (res.data.location === null) {
          res.data.location = `<h3 class = "userLocation">${answers.username}, "has not yet added their location on GitHub."</h3>`;
        }

        data = {
          img: res.data.avatar_url,
          username: res.data.login,
          location: res.data.location,
          profile: res.data.url,
          blog: res.data.blog,
          bio: res.data.bio,
          repos: res.data.public_repos,
          followers: res.data.followers,
          following: res.data.following,
          stars: stars.data.length
        };

        console.log(data.username);
        console.log(data.location);
        console.log(data.repos);
        console.log(data.stars);

        let stringGitData = JSON.stringify(generateHTML);
        writeFileAsync = ("index.html", stringGitData, err => {
            if (err) {
              console.log("Writing to File: Not Successful");
              console.log(err);
            } else {
              console.log("Writing to File: Successful!");
              console.log(stringGitData);
            }
          });

          generateHTML(data);

          function generateHTML(data) {
            return `<!DOCTYPE html>
            <html lang="en">
               <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
                  <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
                  <title>Document</title>
                  <body>
                    <div class="row">
                      <div class="col">
                        <div class="card">
                          <h2>Github stars</h2>
                          <h3>${data.stars}</h3>
                        </div>
                      </div>
                    </div>
                  </body>
                    }
            </html>`
                }
        });
      });
    });
