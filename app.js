const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const Movie = require('./models/movie');
const Music = require('./models/music');
const Book = require('./models/book');
const Game = require('./models/game');



mongoose.connect('mongodb://localhost:27017/MMB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', async (req, res) => {
    const musics = await Music.find({});
    const movies = await Movie.find({});
    const books = await Book.find({});
    const games = await Game.find({});
    res.render('home', { musics, movies, books, games })
});

app.get('/music', async (req, res) => {
    const musics = await Music.find({});
    res.render('musics/music', { musics })
});

app.get('/music/new', async (req, res) => {
    res.render('musics/newmusic')
})

app.post('/music', async (req, res) => {
    const music = new Music(req.body.music);
    await music.save();
    res.redirect(`music/${music._id}`)
})

app.get('/music/:id', async (req, res) => {
    const music = await Music.findById(req.params.id)
    res.render('musics/musicinfo', { music })
})

app.get('/music/:id/edit', async (req, res) => {
    const music = await Music.findById(req.params.id)
    res.render('musics/editmusic', { music })
})

app.put('/music/:id', async (req, res) => {
    const { id } = req.params;
    const music = await Music.findByIdAndUpdate(id, { ...req.body.music });
    res.redirect(`${music._id}`)
    
})

app.delete('/music/:id', async (req, res) => {
    const { id } = req.params;
    await Music.findByIdAndDelete(id);
    res.redirect('music');
})

app.get('/movie', async (req, res) => {
    const movies = await Movie.find({});
    res.render('movies/movie', { movies })
});

app.get('/movie/new', async (req, res) => {
    res.render('movies/newmovie')
})

app.post('/movie', async (req, res) => {
    const movie = new Movie(req.body.movie);
    await movie.save();
    res.redirect(`movie/${movie._id}`);
})

app.get('/movie/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    res.render('movies/movieinfo', { movie })
})

app.get('/movie/:id/edit', async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    res.render('movies/editmovie', { movie })
})

app.put('/movie/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { ...req.body.movie });
    res.redirect(`${movie._id}`)
})

app.delete('/movie/:id', async (req, res) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect('/movie');
})

app.get('/book', async (req, res) => {
    const books = await Book.find({});
    res.render('books/book', { books })
});

app.get('/book/new', async (req, res) => {
    res.render('books/newbook')
})

app.post('/book', async (req, res) => {
    const book = new Book(req.body.book);
    await book.save();
    res.redirect(`book/${book._id}`)
})

app.get('/book/:id', async (req, res) => {
    const book = await Book.findById(req.params.id)
    res.render('books/bookinfo', { book })
})

app.get('/book/:id/edit', async (req, res) => {
    const book = await Book.findById(req.params.id)
    res.render('books/editbook', { book })
})

app.put('/book/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, { ...req.body.book });
    res.redirect(`${book._id}`)
})

app.delete('/book/:id', async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.redirect('/book');
})

app.get('/game', async (req, res) => {
    const games = await Game.find({});
    res.render('games/game', { games })
});

app.get('/game/new', async (req, res) => {
    res.render('games/newgame')
})

app.post('/game', async (req, res) => {
    const game = new Game(req.body.game);
    await game.save();
    res.redirect(`game/${game._id}`);
})

app.get('/game/:id', async (req, res) => {
    const game = await Game.findById(req.params.id)
    res.render('games/gameinfo', { game })
})

app.get('/game/:id/edit', async (req, res) => {
    const game = await Game.findById(req.params.id)
    res.render('games/editgame', { game })
})

app.put('/game/:id', async (req, res) => {
    const { id } = req.params;
    const game = await Game.findByIdAndUpdate(id, { ...req.body.game });
    res.redirect(`${game._id}`)
})

app.delete('/game/:id', async (req, res) => {
    const { id } = req.params;
    await Game.findByIdAndDelete(id);
    res.redirect('/game');
})


app.listen(3000, () => {
    console.log('serving on port 3000')
})



//  const movieSchema = new mongoose.Schema({
//      title: String,
//      year: Number,
//      description: String,
//      Movie_Country: String,
//      genre: String,
//      release_date: Date,
//      stars: String,
//      language: String,
//     download: String

//  });
//  const Movie = mongoose.model('Movie', movieSchema);

//  const fake = new Movie ({ 
//     title: 'ultra big',
//     year: 2021,
//     description: 'mehn movie make sense',
//     Movie_Country: 'Nigeria',
//     genre: 'action',
//     release_date: 2012,
//     stars: 'angelina, mark essien',
//     language: 'english',
//     download: 'http//sgjsjjk.shjjs'
// });