import jwt from 'jsonwebtoken';

export const createAccessToken = userId =>{
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '1d'
    })
}