const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function informacionDefaultDB() {
    try {
        await prisma.usuarios.createMany({
            data: [
                {
                    nombre: "Emilio",
                    apellido: "Gonzalez",
                    email: "emiliogonzalez@example.com",
                    contrase_a: await bcrypt.hash("123456789", 10),
                    rol: "admin"
                }
            ],
            skipDuplicates: true
        });

        console.log("✓ Usuarios predeterminados insertados");

       
        const productosDefault = [
  {
    "nombre": "Samsung Galaxy Z Flip 7",
    "descripcion": "Teléfono plegable de bolsillo con un diseño más delgado y durable, equipado con el procesador Exynos 2500, una pantalla principal de 6.9 pulgadas y una pantalla exterior de 4.1 pulgadas",
    "precio": 15250.00,
    "stock": 12,
    "categoria": "Celulares",
    "subcategoria": "Celulares",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKdzHqIqqAXDPzLdYFXR2izihP3RFHMOuefA&s",
    "fecha_agregado": "2024-06-13T14:48:10.000Z"
  },
  {
    "nombre": "Samsung Galaxy S25 Ultra",
    "descripcion": "Teléfono con 256 GB y más de almacenamiento, y 12 GB de RAM.",
    "precio": 9750.00,
    "stock": 0,
    "categoria": "Celulares",
    "subcategoria": "Celulares",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbGy9cX3-uv_IjN8ctFbi9YpkA7V_y0J3yHQ&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "iPhone 17 Pro",
    "descripcion": "Considerado un éxito por su equilibrio y fiabilidad, está disponible con 256 GB o 512 GB de almacenamiento y 12 GB de RAM.",
    "precio": 12899.00,
    "stock": 10,
    "categoria": "Celulares",
    "subcategoria": "Celulares",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMms7lSPqoSbd6ITljPVpzl4Cz2CgtT1iabg&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Xiaomi 15 Ultra",
    "descripcion": "Se destaca como uno de los dispositivos con mejor rendimiento y especificaciones fotográficas de alta gama.",
    "precio": 8500.00,
    "stock": 0,
    "categoria": "Celulares",
    "subcategoria": "Celulares",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsC13PqAEHpjiD6qHJ5GBX8Ar0whmeK1Ue4g&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Google Pixel 9 Pro",
    "descripcion": "Conocido por su excelente cámara y otras características que lo hacen competitivo en el mercado. ",
    "precio": 7699.00,
    "stock": 14,
    "categoria": "Celulares",
    "subcategoria": "Celulares",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCu4Fh7L4tPpH6cenTIK30PxBok4v0nKlDQA&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Acer Aspire 5",
    "descripcion": "Una opción equilibrada y accesible para el uso diario, con una buena relación entre precio y rendimiento.",
    "precio": 18745.00,
    "stock": 57,
    "categoria": "Tecnologia",
    "subcategoria": "Laptops",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhMFbjyGKZrwo4-cK_DTKDr5mBQUSn_dxX6Q&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "HP Pavilion 14",
    "descripcion": "Compacta y eficiente, ideal para estudiar sobre la marcha, con un diseño moderno.",
    "precio": 19550.00,
    "stock": 42,
    "categoria": "Tecnologia",
    "subcategoria": "Laptops",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQQJWYfiqh41el_3Tf50aQr01ZD4gHwAEaZA&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Lenovo IdeaPad Flex 5",
    "descripcion": "Versátil, ya que puede usarse como laptop o tablet, gracias a su pantalla táctil convertible.",
    "precio": 15899.00,
    "stock": 0,
    "categoria": "Tecnologia",
    "subcategoria": "Laptops",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKWMwIIo3zGSvWU8n4LRSJm2wA2xvOk_cHfQ&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "ASUS VivoBook 15",
    "descripcion": "Potente para manejar programas más pesados sin dificultad, con 16 GB de RAM y un procesador Intel Core i7.",
    "precio": 19875.00,
    "stock": 27,
    "categoria": "Tecnologia",
    "subcategoria": "Laptops",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTen12jqZgc8BS9ygFU7jMYJfR2V7M7xPeO-w&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Dell Inspiron 14",
    "descripcion": "Ligera, silenciosa y confiable para el uso académico diario, con un diseño delgado y un peso reducido. ",
    "precio": 17850.00,
    "stock": 38,
    "categoria": "Tecnologia",
    "subcategoria": "Laptops",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSicbv555tSFOZFiXiQUcBSQLZMTCTISq9j1w&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Vestido negro",
    "descripcion": "Una prenda versátil que se puede usar en diferentes ocasiones, ya sea formal o informal.",
    "precio": 590.00,
    "stock": 105,
    "categoria": "Ropa",
    "subcategoria": "Ropa_Dama",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKjtEMMJy1b4nmw3uLMjvbgOo3_-04RKe75w&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Blusa blanca",
    "descripcion": "Un clásico que se adapta a cualquier estilo, desde el más casual hasta el más elegante.",
    "precio": 287.00,
    "stock": 110,
    "categoria": "Ropa",
    "subcategoria": "Ropa_Dama",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4E29P6JkzTtD8K7_rJKgD-bZ01kTH-joAhQ&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Pantalones de vestir",
    "descripcion": "Un básico del guardarropa que ofrece comodidad y formalidad, ideal para el trabajo o eventos especiales.",
    "precio": 355.00,
    "stock": 115,
    "categoria": "Ropa",
    "subcategoria": "Ropa_Dama",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5525gZE-LuSUM75shu3Er41_4q9_DCnyVKQ&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Blusa de mezclilla",
    "descripcion": "Una prenda informal pero con estilo, que se puede combinar con jeans, faldas o vestidos.",
    "precio": 299.00,
    "stock": 120,
    "categoria": "Ropa",
    "subcategoria": "Ropa_Dama",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOP5JOr2lEFbozfwCVTu7zllTu_82D5JP_Rg&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Falda midi",
    "descripcion": "Una prenda versátil que se puede usar en primavera o invierno, y se adapta a diferentes estilos.",
    "precio": 345.00,
    "stock": 125,
    "categoria": "Ropa",
    "subcategoria": "Ropa_Dama",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhuXSb6N0lu2HYmjWHFvuY6R2TkcqSWmyC7Q&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Bolso",
    "descripcion": "accesorio esencial y funcional que sirve para llevar pertenencias, pero también puede ser un elemento clave para completar un atuendo.",
    "precio": 475.00,
    "stock": 78,
    "categoria": "Accesorios",
    "subcategoria": "Accesorios",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5GJhC4MfbQA506xeAjDEeEES4t31rBkINPg&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Bufanda",
    "descripcion": "Complemento versátil que no solo ofrece abrigo en climas fríos, sino que también añade un toque de estilo a cualquier conjunto.",
    "precio": 125.00,
    "stock": 26,
    "categoria": "Accesorios",
    "subcategoria": "Accesorios",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtkbaysyyZuMTDRc6JWM3_W1luQ-VMXYoxug&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Reloj",
    "descripcion": "Combina funcionalidad para medir el tiempo con un elemento estético.",
    "precio": 590.00,
    "stock": 62,
    "categoria": "Accesorios",
    "subcategoria": "Accesorios",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7XOwJQwY-SWjwvuyuiVrq5f7EooKPQpKLg&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Aretes",
    "descripcion": "Pequeños detalles que pueden tener un gran impacto en la apariencia.",
    "precio": 180.00,
    "stock": 40,
    "categoria": "Accesorios",
    "subcategoria": "Accesorios",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNSNOao6lyHm5Ea1ziNmAcKIwx6Us1_cNWQ&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Cinturón",
    "descripcion": "Un accesorio que puede definir la cintura, realzar la silueta y añadir un toque de interés a un atuendo.",
    "precio": 95.00,
    "stock": 32,
    "categoria": "Accesorios",
    "subcategoria": "Accesorios",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyQJmyZQUe7fzKfYpFV44D1bg0Up7qjH0lyg&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Acetaminofén",
    "descripcion": "Es un analgésico (alivia el dolor) y antipirético (reduce la fiebre).",
    "precio": 12.50,
    "stock": 257,
    "categoria": "Farmacia",
    "subcategoria": "Medicamentos",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlT--HQchc__do3M889a4HA3TiBBAWp_TA6Q&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Ibuprofeno",
    "descripcion": "Pertenece a la clase de medicamentos antiinflamatorios no esteroideos (AINEs).",
    "precio": 25.00,
    "stock": 312,
    "categoria": "Farmacia",
    "subcategoria": "Medicamentos",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPBv7TegmWdOeGlti3WmB687abeAG5nILkaA&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Aspirina",
    "descripcion": "Es un analgésico, antipirético y antiinflamatorio. También es conocido por sus propiedades antiagregantes plaquetarias.",
    "precio": 7.99,
    "stock": 795,
    "categoria": "Farmacia",
    "subcategoria": "Medicamentos",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSavs4dfsIgyhVV2TNFcVrLGT5gUmjQ3Hmn-A&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Omeprazol",
    "descripcion": "Es un inhibidor de la bomba de protones (IBP) que reduce la cantidad de ácido producido en el estómago.",
    "precio": 15.75,
    "stock": 57,
    "categoria": "Farmacia",
    "subcategoria": "Medicamentos",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMGxPGQYtGKYH9bBlvII6fjbi6OJ7f9JosrQ&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Loratadina",
    "descripcion": "Es un medicamento antihistamínico de segunda generación que se usa para aliviar los síntomas de las alergias, como estornudos, secreción nasal.",
    "precio": 12.25,
    "stock": 85,
    "categoria": "Farmacia",
    "subcategoria": "Medicamentos",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpeEz-iuxCBd-MxYAr--BzqHWYUdEpv75Lw&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Vitamina D",
    "descripcion": "Esencial para la absorción de calcio, lo que ayuda a mantener los huesos fuertes. ",
    "precio": 87.90,
    "stock": 48,
    "categoria": "Farmacia",
    "subcategoria": "Suplementos_Vitaminas",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCDPDKCF_p8LRBJ3EvEnrTk0rcFUaQy5oGnA&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Vitamina B12",
    "descripcion": "Crucial para el metabolismo energético y el funcionamiento del sistema nervioso.",
    "precio": 47.85,
    "stock": 67,
    "categoria": "Farmacia",
    "subcategoria": "Suplementos_Vitaminas",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-n6XmAcoS_tRMDxi1Fmf_Ell5yWDJwrd0AQ&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Vitamina C",
    "descripcion": "Es un antioxidante que participa en la producción de colágeno y en el mantenimiento del sistema inmunológico.",
    "precio": 178.00,
    "stock": 10,
    "categoria": "Farmacia",
    "subcategoria": "Suplementos_Vitaminas",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIidTP18VB1DRa2Mlw_JSCg0gnmSGXwNPpg&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Magnesio",
    "descripcion": "Participa en más de 300 reacciones bioquímicas del cuerpo, incluyendo la función muscular y nerviosa, el control de la glucosa en sangre y la presión arterial.",
    "precio": 27.90,
    "stock": 19,
    "categoria": "Farmacia",
    "subcategoria": "Suplementos_Vitaminas",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXPJI4MrJ4OKQFRy22g0PSZaL0D-CYVqi4dw&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Hierro",
    "descripcion": "Necesario para transportar oxígeno a todas las partes del cuerpo y para la producción de glóbulos rojos sanos, previniendo así la anemia.",
    "precio": 56.94,
    "stock": 0,
    "categoria": "Farmacia",
    "subcategoria": "Suplementos_Vitaminas",
    "url_imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZyOGW1HaGCkq_atGe8q7xIOqwOupWQp5oyA&s",
    "fecha_agregado": "2025-11-12T14:48:20.000Z"
  },
  {
    "nombre": "Camiseta Deportiva Nike",
    "descripcion": "Camiseta ligera y transpirable para entrenamiento diario.",
    "precio": 259.00,
    "stock": 180,
    "categoria": "Deportes",
    "subcategoria": "Ropa_Deportiva",
    "url_imagen": "https://www.sportline.com.gt/media/catalog/product/a/r/ar5004-100-phsfh001-1000.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=224&width=234&canvas=234:224&format=jpeg&dpr=1",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Pantalón Adidas",
    "descripcion": "Pantalón elástico y cómodo ideal para correr.",
    "precio": 289.99,
    "stock": 150,
    "categoria": "Deportes",
    "subcategoria": "Ropa_Deportiva",
    "url_imagen": "https://adidasgt.vtexassets.com/arquivos/ids/192575-1800-1800?v=638736297891770000&width=1800&height=1800&aspect=true",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Sudadera Under Armour",
    "descripcion": "Sudadera térmica para climas fríos con capucha ajustable.",
    "precio": 350.00,
    "stock": 120,
    "categoria": "Deportes",
    "subcategoria": "Ropa_Deportiva",
    "url_imagen": "https://gellisport.com/cdn/shop/files/Rival-Fleece-FZ-Hoodie-Under-Armour-Dark-Maroon-Abbigliamento-Tempo-Libero-Uomo.jpg?v=1694787271",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Top Deportivo Reebok",
    "descripcion": "Top con soporte medio, ideal para entrenamiento fitness.",
    "precio": 179.00,
    "stock": 200,
    "categoria": "Deportes",
    "subcategoria": "Ropa_Deportiva",
    "url_imagen": "https://tiendapodium.com.ar/wp-content/uploads/2023/04/R-HT6100-Top-Deportivo-Reebok-Ts-Lux-Mujer-Celeste.jpg",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Shorts Puma Gym",
    "descripcion": "Shorts de alto rendimiento, diseño moderno y cómodo.",
    "precio": 199.00,
    "stock": 160,
    "categoria": "Deportes",
    "subcategoria": "Ropa_Deportiva",
    "url_imagen": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/691497/01/fnd/PNA/fmt/png/Short-tejido-PUMA-SPORT-para-hombre",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Tenis Nike Air Zoom",
    "descripcion": "Calzado ligero con amortiguación reactiva para corredores.",
    "precio": 749.00,
    "stock": 90,
    "categoria": "Deportes",
    "subcategoria": "Tenis",
    "url_imagen": "https://www.sportline.com.gt/media/catalog/product/d/h/dh4071-001-phsrh000-1000.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:&format=jpeg",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Tenis Adidas Ultraboost",
    "descripcion": "Tenis de alto rendimiento con suela de energía Boost.",
    "precio": 899.00,
    "stock": 85,
    "categoria": "Deportes",
    "subcategoria": "Tenis",
    "url_imagen": "https://inumbiasport.com/wp-content/uploads/2025/03/01-26-600x600.jpg",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Tenis Puma Running X",
    "descripcion": "Tenis deportivos de diseño moderno con soporte ergonómico.",
    "precio": 689.00,
    "stock": 100,
    "categoria": "Deportes",
    "subcategoria": "Tenis",
    "url_imagen": "https://img.pacifiko.com/PROD/resize/1/500x500/MWU1ZWI1Yj.jpg",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Tenis Reebok Classic",
    "descripcion": "Estilo clásico, suela antideslizante, confort y durabilidad.",
    "precio": 599.00,
    "stock": 110,
    "categoria": "Deportes",
    "subcategoria": "Tenis",
    "url_imagen": "https://centerdeportes.com.ar/6805-large_default/zapatillas-reebok-classic-leather-black.jpg",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Tenis Under Armour Jet",
    "descripcion": "Calzado de entrenamiento con buena tracción y soporte.",
    "precio": 779.00,
    "stock": 95,
    "categoria": "Deportes",
    "subcategoria": "Tenis",
    "url_imagen": "https://www.sportline.com.gt/media/catalog/product/3/0/3026634-002_default_1.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:&format=jpeg",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Guantes Gym Pro",
    "descripcion": "Guantes antideslizantes para pesas y máquinas.",
    "precio": 120.00,
    "stock": 0,
    "categoria": "Deportes",
    "subcategoria": "Accesorios",
    "url_imagen": "https://fitbarz.com.gt/wp-content/uploads/2025/04/portada-guantes-para-gym-con-munequera-negro.webp",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Mochila Deportiva Nike",
    "descripcion": "Mochila resistente al agua con compartimientos múltiples.",
    "precio": 249.00,
    "stock": 140,
    "categoria": "Deportes",
    "subcategoria": "Accesorios",
    "url_imagen": "https://www.sportline.com.gt/media/catalog/product/d/v/dv9436-010_phsyd001-1000.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:&format=jpeg",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Botella Reutilizable Puma",
    "descripcion": "Botella deportiva 750ml, material ecológico libre de BPA.",
    "precio": 89.00,
    "stock": 200,
    "categoria": "Deportes",
    "subcategoria": "Accesorios",
    "url_imagen": "https://m.media-amazon.com/images/I/51Di7ZYUHtL.jpg",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Cinturón Entrenamiento",
    "descripcion": "Cinturón ajustable de soporte lumbar para levantar peso.",
    "precio": 199.00,
    "stock": 130,
    "categoria": "Deportes",
    "subcategoria": "Accesorios",
    "url_imagen": "https://fitness.com.gt/wp-content/uploads/2023/01/Cinturon-con-Velcro-de-4-Pulgadas-Lycan-Negro-1.jpg",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Toalla Microfibra Gym",
    "descripcion": "Toalla absorbente de secado rápido ideal para entrenamiento.",
    "precio": 99.00,
    "stock": 190,
    "categoria": "Deportes",
    "subcategoria": "Accesorios",
    "url_imagen": "https://www.shopper.com.gt/wp-content/uploads/2022/09/2-12-2.jpg",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Tomate Rojo Fresco",
    "descripcion": "Tomates rojos naturales, seleccionados y frescos, Libra.",
    "precio": 12.00,
    "stock": 180,
    "categoria": "Alimentos",
    "subcategoria": "Vegetales",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/796544-800-450?v=638799363319170000&width=800&height=450&aspect=true",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Lechuga Romana",
    "descripcion": "Lechuga verde fresca lista para ensaladas.",
    "precio": 10.00,
    "stock": 150,
    "categoria": "Alimentos",
    "subcategoria": "Vegetales",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/472358/Lechuga-Romana-Tipo-Sucrine-Bolsa-1-31986.jpg?v=638419993471400000",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Zanahoria Orgánica",
    "descripcion": "Zanahorias dulces de cultivo orgánico.",
    "precio": 8.00,
    "stock": 200,
    "categoria": "Alimentos",
    "subcategoria": "Vegetales",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/602250-800-450?v=638615051652900000&width=800&height=450&aspect=true",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Pepino Verde",
    "descripcion": "Pepinos frescos ideales para jugos o ensaladas.",
    "precio": 7.00,
    "stock": 0,
    "categoria": "Alimentos",
    "subcategoria": "Vegetales",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/472350/Pepino-Sin-Semillas-En-Bandeja-1-31905.jpg?v=638419993436730000",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Chile Dulce",
    "descripcion": "Chiles dulces seleccionados y frescos.",
    "precio": 9.00,
    "stock": 160,
    "categoria": "Alimentos",
    "subcategoria": "Vegetales",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/482199/Chile-De-Colores-A-Granel-Libra-2-Unidades-Por-Lb-Aproximadamente-1-43943.jpg?v=638423989858270000",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Pollo Rey Entero ",
    "descripcion": "Pollo fresco sin hormonas, listo para cocinar.",
    "precio": 75.00,
    "stock": 100,
    "categoria": "Alimentos",
    "subcategoria": "Carnes",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/851059/44089_01.jpg?v=638886990550970000",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Carne de Res Molida",
    "descripcion": "Carne molida de res 100% natural.",
    "precio": 68.00,
    "stock": 12,
    "categoria": "Alimentos",
    "subcategoria": "Carnes",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/786784-800-450?v=638790354140200000&width=800&height=450&aspect=true",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Chuleta de Cerdo",
    "descripcion": "Cortes seleccionados de cerdo con bajo contenido graso.",
    "precio": 72.00,
    "stock": 140,
    "categoria": "Alimentos",
    "subcategoria": "Carnes",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/850194/43859_01.jpg?v=638883658790370000",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Filete de Pescado",
    "descripcion": "Filete fresco, ideal para cocinar a la plancha.",
    "precio": 95.00,
    "stock": 140,
    "categoria": "Alimentos",
    "subcategoria": "Carnes",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/721402/87924-01.jpg?v=638704228419970000",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Longaniza Argentina",
    "descripcion": "Longaniza casera con especias naturales.",
    "precio": 42.00,
    "stock": 150,
    "categoria": "Alimentos",
    "subcategoria": "Carnes",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/837252/28337_01.jpg?v=638864781626870000",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Pasta Spaghetti Italiana",
    "descripcion": "Pasta de trigo duro importada de Italia.",
    "precio": 22.00,
    "stock": 200,
    "categoria": "Alimentos",
    "subcategoria": "Pastas",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/400223/Pasta-larga-Ina-Espagueti-200gr-1-14461.jpg?v=638309182236400000",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Fideos Cortos Don Vittorio",
    "descripcion": "Fideos clásicos para sopas o guisos.",
    "precio": 18.00,
    "stock": 90,
    "categoria": "Alimentos",
    "subcategoria": "Pastas",
    "url_imagen": "https://amarket.com.bo/cdn/shop/files/4380914_1024x1024.jpg?v=1712345994",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Lasaña Precocida Barilla",
    "descripcion": "Láminas de pasta lista para hornear.",
    "precio": 35.00,
    "stock": 170,
    "categoria": "Alimentos",
    "subcategoria": "Pastas",
    "url_imagen": "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00807680957567L.jpg",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Macarrones Clásicos",
    "descripcion": "Pasta corta ideal para salsas y ensaladas.",
    "precio": 20.00,
    "stock": 160,
    "categoria": "Alimentos",
    "subcategoria": "Pastas",
    "url_imagen": "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00807680957121L.jpg",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Tallarines Integrales",
    "descripcion": "Pasta integral saludable con alto contenido de fibra.",
    "precio": 26.00,
    "stock": 180,
    "categoria": "Alimentos",
    "subcategoria": "Pastas",
    "url_imagen": "https://walmartcr.vtexassets.com/arquivos/ids/503374/Pasta-Divella-Spaghetti-Integral-500Gr-1-30208.jpg?v=638415037477170000",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Cereal Corn Flakes",
    "descripcion": "Cereal clásico de maíz tostado.",
    "precio": 29.00,
    "stock": 190,
    "categoria": "Alimentos",
    "subcategoria": "Cereales",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/808654-800-450?v=638823267384770000&width=800&height=450&aspect=true",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Avena Quaker",
    "descripcion": "Avena natural en hojuelas, fuente de energía.",
    "precio": 25.00,
    "stock": 0,
    "categoria": "Alimentos",
    "subcategoria": "Cereales",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/800133/16820_01.jpg?v=638809752512300000",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Granola con Frutas",
    "descripcion": "Mezcla saludable de avena, miel y frutas deshidratadas.",
    "precio": 39.00,
    "stock": 14,
    "categoria": "Alimentos",
    "subcategoria": "Cereales",
    "url_imagen": "https://walmarthn.vtexassets.com/arquivos/ids/252505/Granola-ABC-Frutas-Tropicales-400gr-1-23610.jpg?v=637988098685200000",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Cereal de Chocolate Nesquik",
    "descripcion": "Cereal crujiente sabor chocolate.",
    "precio": 32.00,
    "stock": 150,
    "categoria": "Alimentos",
    "subcategoria": "Cereales",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/659773/36334_02.jpg?v=638663447628770000",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  },
  {
    "nombre": "Avena Instantánea con Canela",
    "descripcion": "Avena saborizada lista para preparar.",
    "precio": 27.00,
    "stock": 200,
    "categoria": "Alimentos",
    "subcategoria": "Cereales",
    "url_imagen": "https://walmartgt.vtexassets.com/arquivos/ids/898985-800-450?v=638968749030000000&width=800&height=450&aspect=true",
    "fecha_agregado": "2025-11-12T02:18:23.000Z"
  }
        ];

        
        await prisma.productos.createMany({
            data: productosDefault,
            skipDuplicates: true
        });

    } catch (error) {
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}
if (require.main === module) {
    informacionDefaultDB()
        .then(() => {
            console.log("✓ Proceso completado exitosamente");
            process.exit(0);
        })
        .catch((error) => {
            console.error("❌ Error en el proceso:", error);
            process.exit(1);
        });
}

