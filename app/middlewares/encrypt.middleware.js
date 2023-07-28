import bcrypt from "bcrypt";

const saltRounds = 10;

async function password(req, res, next) {
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    res.status(500).send({
      message: "Erreur lors du hachage du mot de passe.",
    });
  }
}

export default password;