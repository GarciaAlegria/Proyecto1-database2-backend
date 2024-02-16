const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const AllExamenes = async (req, res) => {
    try {
        const examenes = await prisma.examenes.findMany({
            orderBy: {
                examen_id: 'asc'
            }
        })
        res.status(200).json(examenes)   
    } catch (error) {
        res.status(500).send(["Error al obtener los examenes"])
    }
}

const AllExamenesNames = async (req, res) => {
    try {
        const examenes = await prisma.examenes.findMany({
            select: {
                nombre: true
            },
            orderBy: {
                examen_id: 'asc'
            }
        })
        res.status(200).json(examenes)
    } catch (error) {
        res.status(500).send(["Error al obtener los examenes"])
    }
}

module.exports = {
    AllExamenes,
    AllExamenesNames,
}