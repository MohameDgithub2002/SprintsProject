const express = require('express')
const mongoose = require('mongoose');
const Movie = require('./Movie');
const logger = require('./loggerMiddleware');

const app = express()

app.use(express.json());
app.use(logger);

// Get all movies
app.get('/movies', (req,res) =>{
   Movie.find()
   .then(
     (movies)=>{
        res.send(movies)
     }
   ).catch(
    (err)=>{
        console.error(err)
    }
   );
})

// Get a movie using its id
app.get('/movies/:id', (req,res) =>{
    const id = req.params.id;
    Movie.findById(id)
    .then(
      (movie)=>{
         res.send(movie)
      }
    ).catch(
     (err)=>{
         console.error(err)
     }
    );
 })
 
// Create new movie
app.post('/createMovie', (req,res)=>{
    const name = req.body.name;
    const genre = req.body.genre;
    const desc = req.body.desc;
    const year = req.body.year;
    const rate = req.body.rate;

    const newMovie = {name:name , genre:genre , desc:desc , year:year , rate:rate} 

    const newDoc = new Movie(newMovie);

    newDoc
    .save()
    .then(() =>{
        res.send("Document was Saved");
    })
    .catch(err => {
        console.log(err);
    });


})
// Update existing movie 
app.patch('/movies/:id', (req,res)=>{
    const id =req.params.id
    Movie.findByIdAndUpdate(id)
    .then((movie)=>{
        movie.set(req.body);
        movie.save();
        res.send(movie);
    }).catch( 
        (err)=>{
          console.error(err)
    })

})
// Delete existing movie
app.delete('/movies/:id', (req,res) =>{
    const id = req.params.id;
    Movie.findByIdAndDelete(id)
    .then(
      (movie)=>{
         res.send("DELETED")
      }
    ).catch(
     (err)=>{
         console.error(err)
     }
    );
 })

mongoose
.connect("mongodb://127.0.0.1:27017/test?")
.then(()=>{
    app.listen(3000, ()=>{
        console.log('This server is now running on port 3000...')
    });
})
.catch((err)=>{console.error(err)});

