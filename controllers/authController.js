const { promisify } = require('util')
const User = require('./../models/userModel')
const jwt = require('jsonwebtoken')

const signToken = (id) => {
    return jwt.sign({id:id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN})
}


exports.signup =  async (req, res) => {
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        })

        const token = jwt.sign({id:newUser._id,},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN})

        res.status(201).json({
            status: "Successfull signup",
            data: {newUser, token}
        })
    }catch(err){
        res.status(400).json({
            status: "Fail to create user",
            message: err.message
        })
    }
}


exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            throw new Error ('provide email and password')
        }
        const user = await User.findOne({email}).select('+password');
        if(!user || !(await user.correctPassword(password, user.password))){
            throw new Error('Incorect email or password')
        }
        const token = signToken(user.id);
        res.status(201).json({
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed to login',
            message: err.message
        })
    }
}


exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new Error('User was not authenticated'));
    }

    let decoded;
    try {
        decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (error) {
        return next(new Error('Invalid token'));
    }

    let currentUser;
    try {
        currentUser = await User.findById(decoded.id);
    } catch (error) {
        return next(new Error('User not found'));
    }

    if (!currentUser) {
        return next(new Error('User not found'));
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new Error('User changed password'));
    }

    req.user = currentUser;
    next();
};

