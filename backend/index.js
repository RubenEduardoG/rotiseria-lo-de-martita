const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, name: 'rotiseria-lo-de-martita backend' }));

// Endpoint para recibir pedidos (demo)
app.post('/api/orders', (req, res) => {
  const order = req.body;
  console.log('Nuevo pedido recibido:', order);
  // Aquí se podría guardar en DB o enviar notificación; demo responde OK
  res.status(201).json({ ok: true, received: order });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend escuchando en puerto ${PORT}`));
