require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const secret = process.env.SECRET


const AllUsers = async (req, res) => {
    try {
        const AllUsers = await prisma.users.findMany({
            select: {
                user_id: true,
                correo: true,
                tipo: true,
                dpi: true,
                estado: true
            },
            orderBy: {
                user_id: 'asc'
            }
        })

        res.status(200).json(AllUsers)
    } catch (error) {
        res.status(400).send("Error al obtener los usuarios")
    }
}

const ValidateToken = (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.verify(token, secret)

        if (Date.now() > payload.exp){
            return res.status(401).send("El token ha expirado")
        }

        res.status(200).send("El token es válido")
    } catch (error) {
        res.status(401).send(error.message)
    }
}

const validarUsuario = async (req, res) => {
    const correo = req.params.correo
    const contra = String(req.params.contra)

    try {
        const LoginUser = await prisma.users.findUnique({
            where: {
                correo: correo,
            }
        })   

        if (LoginUser == null){
            res.status(401).send(["El usuario no existe"])
        } else {
            if (await bcrypt.compare(contra, LoginUser.password)){
                const token = jwt.sign({
                    correo,
                    contra,
                    exp: Date.now() + 60 * 1000
                }, secret)
            
                res.send({ token: token, id: LoginUser.user_id, tipo: LoginUser.tipo, estado: LoginUser.estado})
            } else {
                res.status(500).send(["La contraseña ingresada es incorrecta"])
            }
        }
    } catch (error) {
        res.status(400).send(["Hubo un error en la verificación del usuario"])
    }
}

const UpdateUserPassword = async (req, res) => {
    const correo = req.params.correo
    const old_password = String(req.params.old_password)
    const new_password = String(req.params.new_password)

    try {
        const UserExist = await prisma.users.findUnique({
            where: {
                correo: correo
            }
        })
        
        if (UserExist == null){
            res.status(400).send(["El correo ingresado no existe"])
        } else {
            if (await bcrypt.compare(old_password, UserExist.password)){
                const hashedPassword = await bcrypt.hash(new_password, 10)
                const UpdateUserPassword = await prisma.users.update({
                    where: {
                        correo: correo,
                    },
                    data: {
                        password: hashedPassword
                    },
                })
        
                res.status(200).send(["Contraseña actualizada correctamente"])
            } else {
                res.status(400).send(["La contraseña actual ingresada es incorrecta"])
            }
        }
        
    } catch (error) {
        res.status(500).send(["Hubo un error en la comprobación de la contraseña"])
    }
}

const AddUser = async (req, res) => {
    const correo = req.params.correo
    const password = String(req.params.password)

    try {
        const UserExist = await prisma.users.findUnique({
            where: {
                correo: correo
            }
        })
        
        if (UserExist != null){
            res.status(400).send(["El correo ingresado ya existe"])
        } else {

            const hashedPassword = await bcrypt.hash(password, 10)
            const AddUser = await prisma.users.create({
                data: {
                    correo: correo,
                    password: hashedPassword,
                    tipo: 'reviewer', 
                    dpi: '', 
                    estado: 'activo'
                }
            })

            res.status(201).send(true)
        }
    } catch (error) {
        res.status(500).send(["No se pudo crear el usuario"])
    }
}

const AddDPI = async (req, res) => {
    const dpi = String(req.params.dpi)
    const correo = req.params.correo

    try {
        const AddDPI = await prisma.users.update({
            where: {
                correo: correo,
            },
            data: {
                dpi: dpi,
                tipo: 'manager'
            },
        })
        res.status(200).send(true)
    } catch (error) {
        res.status(400).send(["No se pudo agregar el DPI"])
    }
}

const getDPI = async (req, res) => {
    const { correo } = req.params

    try {
        const getDPI = await prisma.users.findUnique({
            select: {
                dpi: true
            },
            where: {
                correo: correo
            }
        })
        res.status(200).json(getDPI.dpi)
    } catch (error) {
        res.status(400).send(["No se pudo obtener el DPI"])
    }
}

const changeEstado = async (req, res) => {
    const { id, estado } = req.params

    try {
        const changeEstado = await prisma.users.update({
            where: {
                user_id: Number(id)
            },
            data: {
                estado: estado
            }
        })
    
        res.status(200).send(true)
    } catch (error) {
        res.status(400).send(["No se pudo cambiar el estado"])
    }
}

module.exports = {
    AllUsers,
    ValidateToken,
    validarUsuario,
    UpdateUserPassword,
    AddUser,
    AddDPI,
    getDPI,
    changeEstado
}