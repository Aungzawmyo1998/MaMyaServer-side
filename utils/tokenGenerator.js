const jwt = require("jsonwebtoken");
const secretKey = "mama";
const generateAccessToken = (userData) => {
    return jwt.sign(
        {id: userData.id, name:userData.user_name, email: userData.email},
        secretKey,
        {expiresIn: "5m"}
    );
}

const generateRefreshToken = (userData) => {
    return jwt.sign(
        { id: userData.id, name:userData.user_name, email: userData.email},
        secretKey,
        {expiresIn: "5h"}
    );
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}