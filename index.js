const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

inquirer
    .prompt([
    {
        type: "input",
        message: "What is your Github user name?",
        name: "username"
    }
    ])

    .then(function({username}){
        const queryUrl = 'https://api.github.com/users/${username}/repos;'
        
        axios
        .get(queryUrl)
        .then(function(res){
        const totalRepos = res.data.map(function(repo) {
            return repo.name;
            })
        .catch(function(err){
            console.log(err);
        })
        })
    });

// const questions = [
  
// ];

// function writeToFile(fileName, data) {
 
// }

// function init() {

// init();
// }