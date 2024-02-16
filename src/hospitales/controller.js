const { PrismaClient } = require('@prisma/client')
const { cloudinary } = require('../../utils/cloudinary')
const prisma = new PrismaClient()

const AllHospitales = async (req, res) => {
  try {
    const AllHospitales = await prisma.hospitales.findMany({
      where: {
        estado: 'aprobado'
      },
      orderBy: {
        hospital_id: 'asc'
      }
    })
    res.status(200).json(AllHospitales)
  } catch (error) {
    res.status(400).send(["No se pudo obtener los hospitales"])
  }
}

const AllHospitalesEstados = async (req, res) => {
  try {
    const AllHospitalesEstados = await prisma.hospitales.findMany({
      orderBy: {
        hospital_id: 'asc'
      }
    })
    res.status(200).json(AllHospitalesEstados)
  } catch (error) {
    res.status(400).send(["No se pudo obtener los estados de los hospitales"])
  }
};

const AllHospitalsByManager = async (req, res) => {
  const correo = req.params.correo;

  try {
    const manager = await prisma.users.findUnique({
      where: {
        correo: correo
      }
    })

    const AllHospitalsByManager = await prisma.hospitales.findMany({
      where: {
        user_id: manager.user_id
      },
      orderBy: {
        hospital_id: 'asc'
      }
    })
    res.status(200).json(AllHospitalsByManager)
  } catch (error) {
    res.status(400).send([error.message])
  }
};


const UpdateHospitalEstado = async (req, res) => {
  const { hospitalId, newEstado } = req.params

  try {
    const UpdateHospitalEstado = await prisma.hospitales.update({
      where: {
        hospital_id: Number(hospitalId)
      },
      data: {
        estado: newEstado
      }
    })
    res.status(200).send(true)
  } catch (error) {
    res.status(400).send(false)
  }
};

const InsertHospital = async (req, res) => {
  const { name, direc, descrip, zona, correo } = req.params
  const fileStr = req.body.data;

  try {

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'hospital_img',
    });

    const user = await prisma.users.findUnique({
      where: {
        correo: correo
      }
    })

    const InsertHospital = await prisma.hospitales.create({
      data: {
        nombre: name,
        direccion: direc,
        descripcion: descrip,
        zona: Number(zona),
        estado: 'espera',
        user_id: user.user_id,
        image_url: uploadResponse.secure_url
      }
    })
    res.status(200).send(true)
  } catch (error) {
    res.status(400).send([error.message])
  }
}

const UpdateHospitalInfo = async (req, res) => {
  const { id, name, direction, description, zone } = req.params

  try {
    const UpdateHospitalInfo = await prisma.hospitales.update({
      where: {
        hospital_id: Number(id)
      },
      data: {
        nombre: name,
        direccion: direction,
        descripcion: description,
        zona: Number(zone),
        estado: 'espera'
      }
    })
    res.status(200).send(true)
  } catch (error) {
    res.status(400).send(false)
  }
}

module.exports = {
    AllHospitales,
    AllHospitalsByManager,
    AllHospitalesEstados,
    UpdateHospitalEstado,
    InsertHospital,
    UpdateHospitalInfo,
}