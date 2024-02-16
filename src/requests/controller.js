const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const AllRequests = async (req, res) => {
    try {
        const AllRequests = await prisma.requests.findMany({
            orderBy: {
                request_id: 'asc'
            }
        })
        res.status(200).json(AllRequests)   
    } catch (error) {
        res.status(500).send(["Error al obtener las solicitudes"])
    }
}

module.exports = {
    AllRequests,
}