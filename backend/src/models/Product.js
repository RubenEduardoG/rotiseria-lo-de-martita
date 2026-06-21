const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    disponible: { type: Boolean, default: true },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    categoria: { type: String, required: true, index: true },
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number },
    precioBase: { type: Number },
    variantes: { type: [OptionSchema], default: undefined },
    complementos: { type: [OptionSchema], default: undefined },
    etiquetas: { type: [String], default: [] },
    disponible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
