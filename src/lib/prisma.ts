import { PrismaClient } from '../../prisma/generated/client'

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
})

// Manejo de señales de cierre
process.on('beforeExit', () => {
  void prisma.$disconnect()
})

export default prisma
