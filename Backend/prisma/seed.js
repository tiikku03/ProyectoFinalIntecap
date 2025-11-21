const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed de la base de datos...');

  // Crear usuario admin
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.usuarios.upsert({
    where: { email: 'admin@tienda.com' },
    update: {},
    create: {
      nombre: 'Admin',
      apellido: 'Sistema',
      email: 'admin@tienda.com',
      contrase_a: hashedPassword,
      rol: 'admin',
    },
  });

  console.log('Usuario admin creado:', admin.email);

  // Crear productos de ejemplo
  const productos = [
    {
      nombre: 'Camiseta Básica',
      descripcion: 'Camiseta 100% algodón',
      precio: 15.99,
      stock: 50,
      categoria: 'Ropa',
      subcategoria: 'Camisetas',
      url_imagen: 'https://via.placeholder.com/300x400?text=Camiseta',
    },
    {
      nombre: 'Pantalón Jean',
      descripcion: 'Pantalón jean clásico',
      precio: 39.99,
      stock: 30,
      categoria: 'Ropa',
      subcategoria: 'Pantalones',
      url_imagen: 'https://via.placeholder.com/300x400?text=Pantalon',
    },
    {
      nombre: 'Zapatillas Deportivas',
      descripcion: 'Zapatillas para correr',
      precio: 79.99,
      stock: 20,
      categoria: 'Calzado',
      subcategoria: 'Deportivo',
      url_imagen: 'https://via.placeholder.com/300x400?text=Zapatillas',
    },
  ];

  for (const producto of productos) {
    await prisma.productos.upsert({
      where: { id_producto: productos.indexOf(producto) + 1 },
      update: {},
      create: producto,
    });
  }

  console.log('Productos creados:', productos.length);
  console.log('Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
