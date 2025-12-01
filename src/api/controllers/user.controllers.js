import userModels from "../models/user.models.js";
import bcrypt from 'bcrypt';

export const insertUser = async(req, res) =>{
    try {
        const { name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Datos invalidos"
            })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [rows] = await userModels.insertUser(name, email, hashedPassword);

        res.status(201).json({
            message: "Usuario creado con exito",
            userId: rows.insertId
        })

    } catch (error) {
        console.log("Error interno al servidor")

        res.status(500).json({
            message: "Error interno al servidor",
            error: error.message
        })
    }
}