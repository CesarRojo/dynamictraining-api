const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
    return await prisma.user.findMany();
}

const createUser = async (email, password, plant) => {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            plant,
        },
    });
    
    // Exclude password from the returned user object
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}


module.exports = {
    getAllUsers,
    createUser,
}