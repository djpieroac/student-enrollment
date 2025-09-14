import { PrismaClient } from '../prisma/generated/client'
import { hashPassword } from '../src/lib/password'

const prisma = new PrismaClient()

async function main() {
  // Limpiar la base de datos primero
  await prisma.user.deleteMany({})

  // Crear usuarios de prueba
  const users = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await hashPassword('securePassword123'),
      role: 'USER',
      validateEmail: true,
      deleted: false,
    },
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await hashPassword('securePassword123'),
      role: 'ADMIN',
      validateEmail: true,
      deleted: false,
    },
    {
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      password: await hashPassword('securePassword123'),
      role: 'USER',
      validateEmail: false,
      deleted: false,
    },
  ]

  for (const user of users) {
    await prisma.user.create({
      data: user,
    })
  }

  console.log('Datos de prueba creados exitosamente')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
