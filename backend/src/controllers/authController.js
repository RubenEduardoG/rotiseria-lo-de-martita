const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await user.comparePassword(password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'changeme', {
    expiresIn: '8h',
  });

  return res.json({ token, user: { id: user._id, nombre: user.nombre, email: user.email, role: user.role } });
};

module.exports = { login };
