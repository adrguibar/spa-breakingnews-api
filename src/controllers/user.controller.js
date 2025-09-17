import userService from "../services/user.service.js";

async function createUserController(req, res) {
  const body = req.body;
  try {
    const user = await userService.createUserService(body);

    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findAllUserController(req, res) {
  try {
    const users = await userService.findAllUserService();
    return res.send(users);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function findUserByIdController(req, res) {
  const { id: userId } = req.params;
  const userIdLogged = req.userId;

  try {
    const user = await userService.findUserByIdService(userId, userIdLogged);
    return res.send(user);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updateUserController(req, res) {
    const body = req.body;
    const userId = req.userId;

    try {
        const response = await userService.updateUserService( userId, body);
        return res.send(response);
    } catch (e) {
        return res.status(500).send(e.message);
    }
}
