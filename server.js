const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const mongoUri = "mongodb+srv://Sinisteroid:XEplQ9B3i7TX97J9@sinisteroid0.8biscsu.mongodb.net/musicPostsDB?retryWrites=true&w=majority"
const lastUri = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=simplyeffedup&limit=3&api_key=f59084f6f83edbe693185eb0ec6b2272&format=json'


/* -------------------------- Get rid of the error -------------------------- */
mongoose.set('strictQuery', false);
/* -------------------------------------------------------------------------- */
mongoose.connect(mongoUri);
app.use(bodyParser.json())

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

const postSchema = mongoose.Schema({
    id: Number,
    title: String,
    img: String,
    band: String,
    origin: String,
    album: String,
    year: Number,
    dlLink: String,
    lyrics: String

});

const Post = mongoose.model('Post', postSchema)

/* ------------------------------ End of Schema ----------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  Get Posts                                 */
/* -------------------------------------------------------------------------- */

app.get('/api/getposts', (req, res) => {
    Post.find({}, null, { sort: { _id: -1 } }, (err, doc) => {
        if (err) return console.log(err);
        res.json(doc)
    })
})

/* -------------------------------------------------------------------------- */
/*                                   lastFm                                   */
/* -------------------------------------------------------------------------- */

app.get('/api/last', async(request,response) => {
    const lastFmUri= 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=simplyeffedup&limit=10&api_key=f59084f6f83edbe693185eb0ec6b2272&format=json';
    const fetch_response = await fetch(lastFmUri);
    console.log(fetch_response)
    const json = await fetch_response.json();
    response.json(json);//hm
});

/* -------------------------------------------------------------------------- */
/*                                  Add Posts                                 */
/* -------------------------------------------------------------------------- */
app.post('/api/addpost', (req, res) => {

    const addPost = new Post({
        id: req.body.id,
        title: req.body.title,
        img: req.body.img,
        band: req.body.band,
        origin: req.body.origin,
        album: req.body.album,
        year: req.body.year,
        dlLink: req.body.dlLink,
        lyrics: req.body.lyrics
    })

    addPost.save((err, doc) => {
        if (err) return console.log(err);
        res.sendStatus(200)
    })
})
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   Last.fm                                  */
/* -------------------------------------------------------------------------- */

const lastFmUri = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=simplyeffedup&limit=10&api_key=f59084f6f83edbe693185eb0ec6b2272&format=json';

//Port

const port = process.env.POST || 3001;
app.listen(port);

//XEplQ9B3i7TX97J9