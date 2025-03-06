import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields" });
    }

    const user = await userService.createService(req.body);

    if (!user) {
      return res.status(400).send({ message: "Error creating user" });
    }

    res.status(200).send({
      user: {
        id: user._id,
        name,
        username,
        email,
        avatar,
        background,
      },
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "No users found" });
    }

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      return res
        .status(400)
        .send({ message: "Please provide at least one field for update" });
    }

    const { id, user } = req;

    await userService.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );

    res.send({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, findById, update };
