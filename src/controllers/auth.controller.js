import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginService(email);

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password or User!" });
    }
    
    const token = generateToken(user.id);

    res.send({token});
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message);
  }
};

export { login };
