const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const AllServicios = async (req, res) => {
    try {
        const AllServicios = await prisma.servicios.findMany({
            orderBy: {
                servicio_id: 'asc'
            }
        })
        res.status(200).json(AllServicios)
    } catch (error) {
        res.status(400).send(["Error al obtener los servicios"])
    }
}

const HospitalServices = async (req, res) => {
    const { id } = req.params

    try {
        const HospitalServices = await prisma.servicios.findMany({
            select: {
                examenes: {
                    select: {
                        nombre: true
                    }
                },
                precio: true
            },
            where: {
                hospital_id: Number(id)
            },
            orderBy: {
                examen_id: 'asc'
            }
        })   
        res.status(200).send(HospitalServices)
    } catch (error) {
        res.status(400).send(["Error al obtener los servicios"])
    }
}

const AddServicio = async (req, res) => {
    const { examen, hospital, precio } = req.params

    try {
        const hospitalOb = await prisma.hospitales.findUnique({
            where: {
                nombre: hospital
            }
        })

        const examenOb = await prisma.examenes.findUnique({
            where: {
                nombre: examen
            }
        })

        const AddServicio = await prisma.servicios.create({
            data: {
                examen_id: Number(examenOb.examen_id),
                hospital_id: Number(hospitalOb.hospital_id),
                precio: String(precio)
            }
        })

        res.status(200).send()
    } catch (error) {
        res.status(400).send([error.message])
    }
}

module.exports = {
    AllServicios,
    HospitalServices,
    AddServicio,
}