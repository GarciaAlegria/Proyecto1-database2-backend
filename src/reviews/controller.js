const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const AllReviews = async (req, res) => {
    try {
        const AllReviews = await prisma.reviews.findMany({
            orderBy: {
                review_id: 'asc'
            }
        })
        res.status(200).json(AllReviews)
    } catch (error) {
        res.status(400).send(["Error al obtener los reviews"])
    }
}

const HospitalReviews = async (req, res) => {
    const { id } = req.params

    try {
        const HospitalReviews = await prisma.reviews.findMany({
            select: {
                users: {
                    select: {
                        correo: true
                    }
                },
                rating: true,
                comentario: true,
            },
            where: {
                hospital_id: Number(id)
            },
            orderBy: {
                review_id: 'desc'
            }
        })
        res.status(200).json(HospitalReviews)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const AddUserReview = async (req, res) => {
    const rating = parseFloat(req.params.rating).toFixed(1)
    const comentario = req.params.comentario
    const correo = req.params.correo
    const hospital_id = parseInt(req.params.id)

    try {
        // const hospital = await prisma.hospitals.findUnique({
        //     where: {
        //         nombre: hospital
        //     }
        // })

        const user = await prisma.users.findUnique({
            where: {
                correo: correo
            }
        })

        const AddUserReview = await prisma.reviews.create({
            data: {
                rating: rating,
                comentario: comentario,
                user_id: user.user_id,
                hospital_id: hospital_id
            }
        })
        res.status(200).json()
    } catch (error) {
        res.status(400).send(["Hubo un error al momento de agregar el review"])
    }
}

module.exports = {
    AllReviews,
    HospitalReviews,
    AddUserReview,
}