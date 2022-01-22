import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());

let user = {};
let tweets = [];

server.post('/sign-up', (req, res) => {
    if (req.body.username === "" || req.body.avatar === "") {
        res.status(400).send("Todos os campos são obrigatórios!")
    } else {
        user = req.body;
        res.status(201).send("OK")
    }
})

server.post('/tweets', (req, res) => {
    const tweet = req.body.tweet;
    const username = req.headers.user;
   
    if (tweet === "" || username === "") {
        res.status(400).send("Todos os campos são obrigatórios!")
    } else {
        if (tweets.length < 10) {
            tweets.unshift({username, avatar: user.avatar, tweet});
        } else {
            tweets.pop();
            tweets.unshift({username, avatar: user.avatar, tweet});
        }
        res.status(201).send("OK")
    }
})

server.get('/tweets', (req, res) => {
    res.send(tweets)
})

server.listen(5000);