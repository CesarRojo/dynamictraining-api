const prisma = require("../prisma/prismaClient")
const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")

// const JWT_SECRET = process.env.JWT_SECRET;

const loginUser = async (email, password) => {
  // Search user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(500).json({ error: 'User not found' });
  }

  // Validate password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(500).json({ error: 'Incorrect user or password' });
  }

  // Return token and user info
  return {
    user: {
      id: user.id,
      email: user.email,
      plant: user.plant,
    },
  };
}

module.exports = {
  loginUser,
}