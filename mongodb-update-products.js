/* ============================================================================
   SCRIPT PARA ACTUALIZAR DESCRIPCIONES DE PRODUCTOS EN MONGODB
   ============================================================================
   
   INSTRUCCIONES DE USO:
   1. Abre MongoDB Atlas o tu cliente MongoDB
   2. Ve a tu base de datos "rotiseria-db" y colección "products"
   3. Copia y pega TODAS las sentencias updateOne() en la consola/script editor
   4. Ejecuta para actualizar todos los productos con las descripciones
   
   ============================================================================ */

// ========== 🍕 PIZZAS ==========
db.products.updateOne(
  { nombre: "Muzzarella" },
  { $set: { descripcion: "Masa, salsa de tomate, abundante muzzarella y aceitunas." } }
);

db.products.updateOne(
  { nombre: "Doble Muzza" },
  { $set: { descripcion: "El doble de muzzarella, salsa de tomate y aceitunas." } }
);

db.products.updateOne(
  { nombre: "Anchoa Salsa" },
  { $set: { descripcion: "Masa, salsa de tomate bien condimentada, anchoas en filete y aceitunas negras (sin muzzarella)." } }
);

db.products.updateOne(
  { nombre: "Anchoa Muzza" },
  { $set: { descripcion: "Masa, salsa, muzzarella, filetes de anchoas y aceitunas." } }
);

db.products.updateOne(
  { nombre: "Jamón" },
  { $set: { descripcion: "Masa, salsa, muzzarella, fetas de jamón cocido y aceitunas." } }
);

db.products.updateOne(
  { nombre: "Jamón y Tomate" },
  { $set: { descripcion: "Masa, salsa, muzzarella, jamón cocido, rodajas de tomate fresco y provenzal." } }
);

db.products.updateOne(
  { nombre: "Jamón y Morrón" },
  { $set: { descripcion: "Masa, salsa, muzzarella, jamón cocido, tiras de morrón en conserva y aceitunas." } }
);

db.products.updateOne(
  { nombre: "Jamón y Huevo" },
  { $set: { descripcion: "Masa, salsa, muzzarella, jamón cocido, huevo duro picado o rallado." } }
);

db.products.updateOne(
  { nombre: "Jamón y Roquefort" },
  { $set: { descripcion: "Masa, salsa, muzzarella, jamón cocido y dados de queso azul (roquefort)." } }
);

db.products.updateOne(
  { nombre: "Napolitana" },
  { $set: { descripcion: "Masa, salsa, muzzarella, rodajas de tomate fresco, ajo, provenzal y aceitunas." } }
);

db.products.updateOne(
  { nombre: "Napo con Jamón" },
  { $set: { descripcion: "Masa, salsa, muzzarella, jamón cocido abajo, rodajas de tomate fresco arriba y provenzal." } }
);

db.products.updateOne(
  { nombre: "Primavera" },
  { $set: { descripcion: "Masa, salsa, muzzarella, jamón cocido, morrones, huevo duro picado y aceitunas." } }
);

db.products.updateOne(
  { nombre: "Muzza y Huevo" },
  { $set: { descripcion: "Masa, salsa, muzzarella y una lluvia de huevo duro rallado." } }
);

db.products.updateOne(
  { nombre: "Calabresa" },
  { $set: { descripcion: "Masa, salsa, muzzarella, rodajas de longaniza calabresa (salame) y un toque de orégano." } }
);

db.products.updateOne(
  { nombre: "Fugazzetta" },
  { $set: { descripcion: "Base de masa, muzzarella y una capa generosa de cebolla en pluma cocida al horno con aceite de oliva y orégano (puede llevar jamón adentro)." } }
);

db.products.updateOne(
  { nombre: "4 Quesos" },
  { $set: { descripcion: "Masa, salsa, muzzarella, roquefort, provolone y queso tybo o parmesano." } }
);

db.products.updateOne(
  { nombre: "Champiñon" },
  { $set: { descripcion: "Masa, salsa, muzzarella, champiñones fileteados salteados y perejil." } }
);

db.products.updateOne(
  { nombre: "Roquefort" },
  { $set: { descripcion: "Masa, salsa, muzzarella y una capa de queso roquefort fundido." } }
);

db.products.updateOne(
  { nombre: "Provenzal" },
  { $set: { descripcion: "Masa, salsa, muzzarella y una lluvia fuerte de ajo y perejil picado en aceite." } }
);

db.products.updateOne(
  { nombre: "Crudo Rúcula" },
  { $set: { descripcion: "Masa, salsa, muzzarella, fetas de jamón crudo, hojas de rúcula fresca y lluvia de queso parmesano." } }
);

db.products.updateOne(
  { nombre: "Cochina" },
  { $set: { descripcion: "Masa, salsa, muzzarella, carne picada sazonada, cebolla frita y a veces huevo frito arriba." } }
);

db.products.updateOne(
  { nombre: "Ch. Bac. Hue." },
  { $set: { descripcion: "Masa, salsa, muzzarella, queso cheddar fundido, panceta (bacon) crocante y huevo frito o revuelto." } }
);

db.products.updateOne(
  { nombre: "Provolone" },
  { $set: { descripcion: "Masa, salsa, muzzarella, rodajas o rallado de queso provolone fuerte y orégano." } }
);

db.products.updateOne(
  { nombre: "Faina" },
  { $set: { descripcion: "Masa fina a base de harina de garbanzos, agua y aceite (ideal para clavar arriba de la muzza)." } }
);

// ========== 🍔 BURGERS ==========
db.products.updateOne(
  { nombre: "Cheese" },
  { $set: { descripcion: "Medallón de carne y doble o triple queso cheddar fundido." } }
);

db.products.updateOne(
  { nombre: "Clásica" },
  { $set: { descripcion: "Medallón de carne, queso, lechuga capuchina fina y rodajas de tomate." } }
);

db.products.updateOne(
  { nombre: "Americana" },
  { $set: { descripcion: "Medallón de carne, queso cheddar, panceta crocante y salsa barbacoa (BBQ)." } }
);

db.products.updateOne(
  { nombre: "Crazy" },
  { $set: { descripcion: "Medallón de carne, muzzarella, cebolla caramelizada, huevo frito y aderezo especial." } }
);

db.products.updateOne(
  { nombre: "Tumbadora" },
  { $set: { descripcion: "Doble medallón de carne, doble cheddar, doble panceta, huevo frito, aros de cebolla y aderezo." } }
);

db.products.updateOne(
  { nombre: "Pechuga Tasty" },
  { $set: { descripcion: "Medallón de pechuga de pollo rebozada (crispy), lechuga, queso y salsa tasty." } }
);

db.products.updateOne(
  { nombre: "Menú Infantil" },
  { $set: { descripcion: "Medallón de carne simple, queso cheddar y porción chica de papas fritas." } }
);

// ========== 🥩 MILANESAS ==========
db.products.updateOne(
  { nombre: "Sola" },
  { $set: { descripcion: "Milanesa común frita o al horno (bien dorada, con limón al costado)." } }
);

db.products.updateOne(
  { nombre: "Con Queso" },
  { $set: { descripcion: "Milanesa con una capa de muzzarella o queso derretido encima." } }
);

db.products.updateOne(
  { nombre: "Jamón y Queso" },
  { $set: { descripcion: "Milanesa con muzzarella derretida y fetas de jamón cocido encima." } }
);

db.products.updateOne(
  { nombre: "Napolitana" },
  { $set: { descripcion: "Milanesa con salsa de tomate, muzzarella derretida y orégano." } }
);

db.products.updateOne(
  { nombre: "Napo con Jamón" },
  { $set: { descripcion: "Milanesa con salsa de tomate, fetas de jamón, muzzarella y rodajas de tomate con provenzal." } }
);

db.products.updateOne(
  { nombre: "A Caballo" },
  { $set: { descripcion: "Milanesa sola (o con queso) coronada con dos huevos fritos arriba." } }
);

db.products.updateOne(
  { nombre: "Cheddar y Bacon" },
  { $set: { descripcion: "Milanesa cubierta de queso cheddar fundido y una lluvia de panceta crocante picada." } }
);

db.products.updateOne(
  { nombre: "Fugazzetta" },
  { $set: { descripcion: "Milanesa cubierta de muzzarella y un montón de cebolla saltada al horno con orégano." } }
);

db.products.updateOne(
  { nombre: "Lechuga y Tomate" },
  { $set: { descripcion: "En formato sándwich o plato con colchón de lechuga capuchina y tomate redondo." } }
);

db.products.updateOne(
  { nombre: "Jamón, Queso y Huevo" },
  { $set: { descripcion: "Milanesa con jamón, muzzarella y huevo frito o huevo duro picado." } }
);

db.products.updateOne(
  { nombre: "Completo" },
  { $set: { descripcion: "Milanesa en pan de sándwich con jamón, queso, huevo frito, lechuga y tomate." } }
);

db.products.updateOne(
  { nombre: "Che. Bac. Hue." },
  { $set: { descripcion: "Milanesa al plato o sándwich con cheddar fundido, bacon crocante y huevo frito." } }
);

// ========== 🍝 PASTAS ==========
db.products.updateOne(
  { nombre: "Ravioles de Pollo y Verdura" },
  { $set: { descripcion: "Masa de pasta rellena con estofado de pollo y acelga/espinaca." } }
);

db.products.updateOne(
  { nombre: "Ravioles de Ricota" },
  { $set: { descripcion: "Masa de pasta rellena con ricota con nuez." } }
);

db.products.updateOne(
  { nombre: "Tallarines" },
  { $set: { descripcion: "Cintas de pasta de huevo caseras." } }
);

db.products.updateOne(
  { nombre: "Sorrentinos de Jamón y Queso" },
  { $set: { descripcion: "Pasta rellena redonda y grande, rellena de jamón picado y muzzarella/ricota." } }
);

// ========== 🥟 EMPANADAS ==========
// Las empanadas tienen variantes de sabores, así que actualizamos la descripción general
db.products.updateOne(
  { nombre: "Empanadas" },
  { $set: { descripcion: "Masa de hojaldre o criolla con repulgue clásico. Sabores: Carne, Pollo, Jamón y Queso, Roquefort, Humita, Verdura y más." } }
);

// ========== 🍟 GUARNICIONES ==========
db.products.updateOne(
  { nombre: "Papas Fritas 700g" },
  { $set: { descripcion: "Bastones de papa fritos, dorados y crocantes (vienen en bandeja grande)." } }
);

db.products.updateOne(
  { nombre: "Puré" },
  { $set: { descripcion: "Puré de papas casero con leche, manteca y un toque de nuez moscada." } }
);

db.products.updateOne(
  { nombre: "Ensalada Mixta" },
  { $set: { descripcion: "Lechuga, tomate redondo y cebolla blanca en juliana." } }
);

db.products.updateOne(
  { nombre: "Ensalada Zanahoria, Tomate y Huevo" },
  { $set: { descripcion: "Zanahoria rallada, tomate en cubos y huevo duro picado." } }
);

db.products.updateOne(
  { nombre: "Tortilla de Papas" },
  { $set: { descripcion: "Papas en cubos, cebolla frita y ligue de huevo. Variantes: Española con chorizo o Rellena con jamón y queso." } }
);

/* ============================================================================
   FIN DEL SCRIPT
   ============================================================================
   
   ALTERNATIVA JSON PARA IMPORTAR:
   Si prefieres usar una herramienta gráfica, puedes crear/importar este JSON
   como datos individuales para cada producto.
   
   Ejemplo de estructura individual:
   {
     "nombre": "Muzzarella",
     "descripcion": "Masa, salsa de tomate, abundante muzzarella y aceitunas."
   }
   
   ============================================================================ */
