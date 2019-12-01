const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const generateHTML = require("./generateHTML");

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
        console.log(answers)
        const queryUrl = `https://api.github.com/users/${answers.username}`        
        axios
        .get(queryUrl)
        .then(function(res){
            console.log("--------------------------------------------------------------");
            console.log("GitHub API Call for", `${answers.username}`,res.data)
            console.log("--------------------------------------------------------------");
            });
        const starDataUrl = `https://api.github.com/users/${answers.username}/starred`
        axios
        .get(starDataUrl)
        .then(function(stars){
            console.log("--------------------------------------------------------------");
            console.log("GitHub API Call for", `${answers.username}`,stars.data)
            console.log("--------------------------------------------------------------");
        })

        if (res.data.bio === null){
            res.data.bio = `<h3 class = "userBio">${answers.username}, "does not yet have a Bio on GitHub."</h3>`
        }
        if (res.data.blog === ""){
            res.data.blog = `<h3 class = "userBlog">${answers.username}, "does not yet have a Blog on GitHub."</h3>`
        }
        if (res.data.location === null){
            res.data.location = `<h3 class = "userLocation">${answers.username}, "has not yet added their location on GitHub."</h3>`
        }
        });

        data = {
            img: res.data.avatar_url,
            username = `${answers.username}`,
            location = res.data.location,
            profile = res.data.url,
            blog = res.data.blog,
            bio = res.data.bio,
            repos = res.data.public_repos,
            followers = res.data.followers,
            following = res.data.following,
            stars = stars.data.length,
        };
    //         // return generateHTML({stars, color,totalRepos, ...res.data})
    //     // .catch(function(err){
    //     //     console.log(err);
    //     // })
    //     })
    //     .catch(function(err){
    //         console.log(err)
    //     })
    //     console.log(`${totalRepos.length}`);
    // });
