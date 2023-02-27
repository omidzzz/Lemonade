const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


app.use(Cors());

const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize');

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority
`


/* -------------------------- Get rid of the error -------------------------- */
mongoose.set('strictQuery', false);
/* -------------------------------------------------------------------------- */
mongoose.connect(mongoUri);
//Parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
//Sanitize
app.use(xss());
app.use(mongoSanitize());

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

app.get('/api/getposts',(req,res)=>{
    Post.find({},null, {sort: {_id: -1}},(err,doc)=>{
        if(err) return console.log(err);
        res.json(doc)
    })
})

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

app.get('/api/last', async(request,response) => {
    const lastFmUri= 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=simplyeffedup&limit=10&api_key=f59084f6f83edbe693185eb0ec6b2272';
    const fetch_response = await fetch(lastFmUri);
    const json = await fetch_response.json();
    response.json(json);
});

//Port

app.use(express.static('client/build'));
if(process.env.NODE_ENV === 'production'){
    const path = require('path');

    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'./client','build','index.html'))
    })
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

const port = process.env.POST || 3001;
app.listen(port);

//XEplQ9B3i7TX97J9