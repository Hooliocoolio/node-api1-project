/*  Imports express library  */
const express = require('express');
/*  Creates a new express server  */
const server = express();
/*  The port the server will use. standard is usually 8080  */
const port = 8080;
/*  the server url  */
const url = "http://localhost:8080";
/*  imports the database  */
const db = require('./api/dbase');
/*  imports shortid and creates it  */
// const shortid = require('shortid');
 
let newId = 3;

/*  middleware that helps parse JSON requests bodies  */
server.use(express.json())

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
/*  GET connects to the server and responds with message  */
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
server.get('/', (req, res) => {
    res.json({Message:'Welcome to my API'})
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
/*  GET connects to the server returns all users */
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
server.get('/api/users', (req, res) => {
    const users = db.getUsers()
        if (!users){
            res.status(500).json({ 
                errorMessage: "The users information could not be retrieved." 
            }) 
            } else {
                res.json(users)
        }
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
/*  GET gets user by params and matches it up with url  */
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
server.get('/api/users/:id', (req, res) => {
    /*  matches params to the url param  */
    const id = req.params.id
    /*  gets specific user by their ID in database  */
    const user = db.getUserById(id)

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
/*  POST request is sent to database then returns the new user data  */
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
server.post('/api/users', (req, res) => {
    const newUser = db.createUser({
        id: newId++,
        name: req.body.name,
        bio: req.body.bio,
    })
        if(!req.body.name || !req.body.bio) {
            res.status(400).send({ errorMessage: "Please provide name and bio for the user." })
            } else {
                res.status(201).json('User has been created')
            }
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
/*  DELETEs a user  */
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
server.delete('/api/user/:id', (req, res) => {
    const user = db.getUserById(req.params.id)
    /*  make sure user exists  */
    if (user) {
        db.deleteUser(req.params.id),
        res.status(404).json({ message: "The user with the specified ID does not exist." }) 
    } else {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
/* PUT - update a user with a put request  */
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    /*  gets specific user by their ID in database  */
    const user = db.getUserById(id)
    const updatedUser = db.updateUser(id, {
        name: req.body.name,
        bio: req.body.bio,
    })
    if(!user){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if(!req.body.name || !req.body.bio) {
        res.status(400).send({ errorMessage: "Please provide name and bio for the user." })
        } else {
            res.status(201).json('User has been updated') 
        }
   
    
    res.status(200)
})

// server.get('/api/users/:id', (req, res) => {
//     /*  matches params to the url param  */
//     const id = req.params.id
//     /*  gets specific user by their ID in database  */
//     const user = db.getUserById(id)

//     if (user) {
//         res.status(200).json(user)
//     } else {
//         res.status(404).json({ message: "The user with the specified ID does not exist." })
//     }
// })

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
/*  this is the server listener...listening for rquests  */
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
server.listen(port, ()=> {
    console.log(`My API is listening at ${url} on port ${port}`)
})
