// establish connection to database
const db = require('./db')

// import all Models from relevant files
const User = require('./User')

// establish relationships between models


module.exports = { 
    db, 
    User
}