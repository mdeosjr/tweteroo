import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());

let user = {};
let tweets = [];

server.post('/sign-up', (req, res) => {
    user = req.body;
    res.send("OK")
})

server.post('/tweets', (req, res) => {
    if (tweets.length < 10) {
        tweets.unshift({...req.body, avatar: user.avatar});
    } else {
        tweets.pop();
        tweets.unshift({...req.body, avatar: user.avatar});
    }
    res.send("OK")
})

server.get('/tweets', (req, res) => {
    res.send(tweets)
})

server.listen(5000);