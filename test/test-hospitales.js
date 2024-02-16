const { expect } = require("chai");
// const pool = require("../db");
// const { AllHospitales } = require("../src/hospitales/queries");
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

describe("Test de extracción de datos", () => {
  it("Obtener el nombre del hospital Hospital Alpha", async () => {
    // const hospitales = await pool.query(AllHospitales);
    const hospital = await prisma.hospitales.findUnique({
      where: {
        nombre: "Hospital Alpha"
      }
    })
    expect(hospital.nombre).to.equal("Hospital Alpha");
  });

  it("Obtener la dirección del hospital Alpha", async () => {
    // const hospitales = await pool.query(AllHospitales);
    const hospital = await prisma.hospitales.findUnique({
      where: {
        nombre: "Hospital Alpha"
      }
    })
    expect(hospital.direccion).to.equal("123 Main Street");
  });

  it("Obtener la zona  del hospital Alpha", async () => {
    // const hospitales = await pool.query(AllHospitales);
    const hospital = await prisma.hospitales.findUnique({
      where: {
        nombre: "Hospital Alpha"
      }
    })
    expect(hospital.zona).to.equal(1);
  });

  it("Obtener el estado del hospital Alpha", async () => {
    // const hospitales = await pool.query(AllHospitales);
    const hospital = await prisma.hospitales.findUnique({
      where: {
        nombre: "Hospital Alpha"
      }
    })
    expect(hospital.estado).to.equal("aprobado");
  });
});