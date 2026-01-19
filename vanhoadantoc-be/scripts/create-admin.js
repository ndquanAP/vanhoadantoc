const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vanhoadantoc.vn' },
    update: {},
    create: {
      email: 'admin@vanhoadantoc.vn',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  
  console.log('✅ Admin account created:');
  console.log('   Email: admin@vanhoadantoc.vn');
  console.log('   Password: admin123');
  
  await prisma.$disconnect();
}

createAdmin();
