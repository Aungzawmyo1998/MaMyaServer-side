const bcrypt = require("bcryptjs");

const Admin = require("../models").Admin;

// token generator 
const {generateAccessToken, generateRefreshToken} = require("../utils/tokenGenerator");
const { where } = require("sequelize");


const Register = async (req, res) => {
    const { name, email, password, phone, address, role } = req.body;

    try {
        const admin = await Admin.findOne({where: {email: email}});
        // Check user is already exit 
        console.log(admin)
        if( admin ) {
            return res.status(403).json({ message: "Email is already existing"});
        }
        // create encrypt password 
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword)
        // create admin account 
        await Admin.create(
            {
                name: name,
                email: email,
                password: hashedPassword,
                phone: phone,
                address: address,
                role: role,
                access_token: "",
                refresh_token: ""
            }
        );
        return res.status(201).json({ message: "Create Successful "});
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ where: {email: email}});
        if (!admin) {
            return res.status(401).json({ message: "username not found"});
        }
        // check password if valid password
        const matchPwd = await bcrypt.compare(password, admin.password );
        if(!matchPwd) {
            return res.status(401).json({message: "Incorrect password"});
        }
        // create token 
        const accessToken = generateAccessToken(admin);
        const refreshToken = generateRefreshToken(admin);
        
        await Admin.update(
            {
                access_token: accessToken,
                refresh_token: refreshToken
            },
            {
                where: { id: admin.id}
            }
        );
        return res.status(200).json({message: "Login Successful " });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}

module.exports = {
    Register,
    Login
}