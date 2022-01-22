import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());

let users = [];
let tweets = [];

server.post('/sign-up', (req, res) => {
    if (req.body.username === "" || req.body.avatar === "") {
        res.status(400).send("Todos os campos são obrigatórios!")
    } else {
        users.push(req.body);
        res.status(201).send("OK")
    }
})

server.post('/tweets', (req, res) => {
    const tweet = req.body.tweet;
    const username = req.headers.user;
    const avatar = users.find(user => user.username === username).avatar;
   
    if (tweet === "" || username === "") {
        res.status(400).send("Todos os campos são obrigatórios!")
    } else {
        if (tweets.length < 10) {
            tweets.unshift({username, avatar, tweet});
        } else {
            tweets.pop();
            tweets.unshift({username, avatar, tweet});
        }
        res.status(201).send("OK")
    }
    console.log(avatar)
})

server.get('/tweets', (req, res) => {
    res.send(tweets)
})

server.get('/tweets/:username', (req, res) => {
    const username = req.params.username;
    const userTweets = tweets.filter(tweet => tweet.username === username);
    res.send(userTweets)
})

server.listen(5000);