const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    const { body } = req;
    // denying duplicate emails
    try{
        const queriedUser = await User.findOne({ email: body.email });
        if(queriedUser){
            return res.status(400).json({error: "Email already in use."});
        }
    } catch (error) {
        return res.status(400).json(error);
    }
    // Denying duplicate usernames
    try{
        const queriedUserName = await User.findOne({ userName: body.userName });
        if(queriedUserName){
            return res.status(400).json({error: "Username already in use."});
        }
    } catch (error) {
        return res.status(400).json(error);
    }

    const newUser = new User(body);
    
    if(!body.firstName || !body.lastName || !body.userName || !body.email || !body.password || !body.confirmPassword){
        res.status(400).json({error: "Please fill out the required information below."})
    }
        
    try{
        const newUserObj = await newUser.save();
        return res.json(newUserObj);
    } catch(error) {
        console.log("error in the mongoose save block");
        return res.status(400).json({error: "Error creating user"});
    }
    const result = await User.create(body);
    console.log("result", result);
    return res.json({msg: "you got here"});
}

const login = async(req, res) => {
    const { body } = req;
    if(!body.userName) {
        res.status(400).json({error: 'No Username Provided.'});
        return;
    }
    let userQuery;
    try{
        userQuery = await User.findOne({ userName: body.userName });
    } catch(error) {
        res.status(400).json({error: "Username not found."});
        return;
    }
    console.log('query: ', userQuery);
    if(userQuery === null) {
        res.status(400).json({error: "Username not found."});
        return;
    }

    const passwordCheck = bcrypt.compareSync(body.password, userQuery.password);
    
    if(!passwordCheck){
        res.status(400).json({error: "Invalid Password."});
        return;
    }

    const usertoken = jwt.sign(
        {_id: userQuery._id}, 
        process.env.SECRET_KEY);
    res.cookie("usertoken", usertoken, process.env.SECRET_KEY, 
    {
        httpOnly: true,
        expires: new Date(Date.now() + 9000000)
    })
    .json({msg: "Successful Login"});
}

const logout = (req, res) => {
    res.clearCookie("usertoken");
    //console.log("Logout successful");
    res.sendStatus(200);
};

const findOneUser = (req, res) => {
    User.findOne({userName: req.params.userName})
        .then((oneUser) => {
            res.json(oneUser);
            console.log(oneUser);
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log("error")
        })
};

const updateUser = (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
    .then((updatedUser) => {
        res.json(updatedUser)
    })
    .catch((err) => {
        res.status(400).json(err)
    })};

const deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then((deleteConfirmation) => {
            res.clearCookie("usertoken");
            res.json(deleteConfirmation);
        })
        .catch((err) => {
            res.json(err)
            console.log('error', err)
        })};

module.exports = {
    register,
    login,
    logout,
    findOneUser,
    deleteUser,
    updateUser
}