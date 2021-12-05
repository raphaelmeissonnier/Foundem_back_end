const express = require('express')
const users = express.Router()
const cors = reuire('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User')
utilisateur.user(cors())

process.env.SECRET_KEY = 'secret'
utilisateur.post('/register', (req,res) => {

    
    const userData = {
        pseudo: req.body.pseudo,
        Motdepasse: Motdepasse,
        created: today
    }

    User.findOne({
        where: {
            pseudo: req.body.pseudo
        }
    })

    // CRYPTAGE DE MDP

    .then(user => {
        if(!user){
            bcrypt.hash(req.body.Motdepasse, 10, (err,hash) => {

                userData.Motdepasse = hash
                User.create(userData)
                .then(user => {
                    res.json({ status: user.email + 'Inscris !'})
                })
                .catch(err => {
                    res.send('error: ' + err)

                })
            })

        }else {

            res.json({ error: 'Lutilisateur existe déjà'})
            }
        })

        .catch(err => {

            res.send('error: ' + err)
        })

    })

utilisateur.get('/login', (req, res) => {

    User.findOne({
        where: {
            pseudo: req.body.pseudo
        }
    })

    .then(user=> {

        if(user){

            if(bcrypt.compareSync(req.body.Motdepasse, user.Motdepasse)){
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                  })
                  res.send(token)
                }
              } else {
                res.status(400).json({ error: 'User does not exist' })
              }
            })
            .catch(err => {
              res.status(400).json({ error: err })
            })
        })
        
        users.get('/profile', (req, res) => {
          var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
        
          User.findOne({
            where: {
              id: decoded.id
            }
          })
            .then(user => {
              if (user) {
                res.json(user)
              } else {
                res.send('User does not exist')
              }
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
        
    module.exports = utilisateur