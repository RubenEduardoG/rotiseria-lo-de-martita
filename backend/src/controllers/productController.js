const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const products = await Product.find({ disponible: true }).sort({ categoria: 1, nombre: 1 });
  res.json(products);
};

const updatePrice = async (req, res) => {
  const { id } = req.params;
  const { precio } = req.body;
  if (precio == null || isNaN(Number(precio))) return res.status(400).json({ error: 'Precio inválido' });

  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

  product.precio = Number(precio);
  await product.save();
  res.json(product);
};

module.exports = { getProducts, updatePrice };
