const { where } = require("sequelize");
const bcrypt = require("bcryptjs");

// Token Generator
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenGenerator");

// User Model
const User = require("../models").User;

const Register = async (req, res) => {
    console.log(req.body)
    const { name, email, password,phone, address } = req.body;

    console.log(email)
    try {

        let user = await User.findOne({where:{email: email}});
        // console.log("Fuck")
        if(user) {
            return res.status(400).json({ message: "User already exists"});
        }

        // user password encrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            user_name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
            address: address,
            access_token: "",
            refresh_token: ""
        });

        return res.status(201).json({message: "Create Successful ..."});
        
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;
    // console.log( "email" + email,password)
    try {
        let user = await User.findOne({where:{email: email}});
        // console.log(user);
        if (!user) {
            return res.status(400).json({ message: "User not found"});
        }

        // Compare user password
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({ message: "Incorrect Password" });
        }


        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await User.update(
            {
                access_token: accessToken,
                refresh_token: refreshToken
            },
            {
                where: { id: user.id }
            }
        );

        return res.status(200).json({ message: "Success login"});
        
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

module.exports = {
    Register,
    Login
}