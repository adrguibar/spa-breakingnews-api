import authService from "./auth.service";
import bcrypt from "bcryptjs";
import userRepositories from "../repositories/user.repositories.js";

async function createUserService(body) {
  const { name, username, email, password, avatar, background } = body;

  if (!username || !name || !email || !password || !avatar || !background) {
    throw new Error("Please provide all required fields");
  }

  const foundUser = await userRepositories.findByEmailUserRepository(email);

  if (foundUser) {
    throw new Error("User already exists");
  }

  const user = await userRespositories.createUserRepository(body);

  if (!user) {
    throw new Error("Error creating user");
  }

  const token = authService.generateToken(user.id);

  return {
    user: {
      id: user.id,
      name,
      username,
      email,
      avatar,
      background,
    },
    token,
  };
}

async function findAllUserService() {
  const users = await userRepositories.findAllUserRepository();

  if (users.length === 0) throw new Error("There are no users");

  return users;
}

async function findUserByIdService(userIdParam, userIdLogged) {
  let idParam;
  if (!userIdParam) {
    idParam = userIdLogged;
  } else {
    idParam = userIdParam;
  }

  if (!idParam) throw new Error("User ID is required");

  const user = await userRepositories.findByIdUserRepository(idParam);

  if (!user) throw new Error("User not found");

  return user;
}


async function updateUserService(userId, body) {
  const { name, username, email, password, avatar, background } = body;

  if (!name && !username && !email && !password && !avatar && !background) {
    throw new Error("Please provide at least one field to update");
  }

  const user = await userRepositories.findByIdUserRepository(userId);

  if (user._id != userId)
    throw new Error("You can only update your own profile");

  if (password) password = await bcrypt(hash(password, 10));

  await userRepositories.updateUserRepository(userId, body);
}

export default {
  createUserService,
  findAllService: findAllUserService,
  findUserByIdService,
  updateUserService,
};
