const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const generateHTML = require("./generateHTML.js");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

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

    .then(function(answers){

        const queryUrl = `https://api.github.com/users/${answers.username}`
        return axios        
        .get(queryUrl)
        .then(function(res){
            console.log("--------------------------------------------------------------");
            console.log("GitHub API Call for", `${answers.username}`,res.data)
            console.log("--------------------------------------------------------------");
    
            const starDataUrl = `https://api.github.com/users/${answers.username}/starred`
            axios
            .get(starDataUrl)
            .then(function(stars){
                console.log("--------------------------------------------------------------");
                console.log("GitHub API Call for", `${answers.username}`,stars.data)
                console.log("--------------------------------------------------------------");
            if (res.data.bio === null){
                res.data.bio = `<h3 class = "userBio">${answers.username}, "does not yet have a Bio on GitHub."</h3>`
            }
            if (res.data.blog === ""){
                res.data.blog = `<h3 class = "userBlog">${answers.username}, "does not yet have a Blog on GitHub."</h3>`
            }
            if (res.data.location === null){
                res.data.location = `<h3 class = "userLocation">${answers.username}, "has not yet added their location on GitHub."</h3>`
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
                stars: stars.data.length,
            };

            console.log(data.username);
            console.log(data.location);
            console.log(data.repos);
            console.log(data.stars);

        const writeFileAsync = (function(generateHTML){
            const stringGitData = JSON.stringify(generateHTML);
            fs.writeFile("index.html", stringGitData, (err) => {
                if(err){
                    console.log("Writing to File: Not Successful");
                    console.log(err);
                }
                else{
                    console.log("Writing to File: Successful!")
                    console.log(stringGitData);
                }
            });
        });
        // generateHTML(data);
        // writeFileAsync(generateHTML(data));
        })
    })
});
    //         // return generateHTML({stars, color,totalRepos, ...res.data})
    //     // .catch(function(err){
    //     //     console.log(err);
    //     // })

