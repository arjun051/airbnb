const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');

require('dotenv').config()
const app = express()
 



app.use(express.json())
app.use(cors({
    credentials: true,
    // origin : 'http://localhost:5173/register',
    // this thing is also giving me a cors error
}));

const jwtSecret = 'qwertyuop'
const bcryptSalt = bcrypt.genSaltSync(10)
console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL)


app.get('/test', (req,res) => {
    res.json('arjun this server is working fine');
});
// UnvifmoMaYsqLwyd->database password

app.post('/register',async (req,res) => {
    const {name,email,password} = req.body
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt)
        })
        res.json(userDoc)
    }
    catch(e){
        res.status(422).json(e)
    }
})

app.post('/login',async(req,res) => {
    const{email,password} = req.body
    const userDoc = await User.findOne({email})
    if(userDoc){
        const passok = bcrypt.compareSync(password,userDoc.password)
        if(passok){
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token)=>{
                if(err) throw err
                res.cookie('token',token).json('pass ok')
            })
        }
        else{res.status(422).json('pass wrong')}

    }else{
        res.json('not found')
    }
})

app.listen(4000);