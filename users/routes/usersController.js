const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  changeUserBizStatus,
  deleteUser,
} = require("../services/usersService");
const router = express.Router();
const { handleError } = require("../../utils/errorHandler");
const auth = require("../../auth/authService");

router.get("/", auth, async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return handleError(res, 403, "Authorization Error: Must be admin");
    }
    const users = await getUsers();
    return res.send(users);
  } catch (err) {
    return handleError(res, err.status || 500, err.message);
  }
});
router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { _id, isAdmin } = req.user;
    if (_id !== id && !isAdmin) {
      handleError(
        res,
        403,
        "Authorization Error: Must be admin or the registered user"
      );
    }
    const user = await getUser(id);
    return res.send(user);
  } catch (err) {
    return handleError(res, err.status || 500, err.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).send(user);
  } catch (err) {
    handleError(res, err.status || 500, err.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body);
    return res.send(user);
  } catch (err) {
    handleError(res, err.status || 500, err.message);
  }
});
router.put("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { _id } = req.user;
    if (_id !== id) {
      handleError(
        res,
        403,
        "Authorization Error: Must be admin or the registered user"
      );
    }
    const user = await updateUser(id, req.body);
    return res.send(user);
  } catch (err) {
    handleError(res, err.status || 500, err.message);
  }
});
router.patch("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { _id, isAdmin } = req.user;
    if (_id !== id && !isAdmin) {
      handleError(
        res,
        403,
        "Authorization Error: Must be admin or the registered user"
      );
    }
    const user = await changeUserBizStatus(id);
    return res.send(user);
  } catch (err) {
    handleError(res, err.status || 500, err.message);
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { _id, isAdmin } = req.user;
    if (_id !== id && !isAdmin) {
      handleError(
        res,
        403,
        "Authorization Error: Must be admin or the registered user"
      );
    }
    const user = await deleteUser(id);
    return res.send(user);
  } catch (err) {
    handleError(res, err.status || 500, err.message);
  }
});

module.exports = router;
