const User = require("../model/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
    const users = await User.find();

    if (!users) return res.status(204).json({ message: "No users found!" });

    res.json({ users });
};

const updateUser = async (req, res) => {
    const { id, pwd, roles, user } = req?.body;

    if (!id) return res.status(400).json({ message: "ID parameter is required" });

    if (user) return res.status(400).json({ message: "Username cannot change." });

    const foundUser = await User.findById(id).exec();

    if (!foundUser) {
        return res.status(204).json({ message: `No user matches ID ${id}` });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);

    if (pwd) foundUser.password = hashedPwd;
    if (roles) foundUser.roles = roles;

    const result = await foundUser.save();
    res.json(result);
};

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ message: "User ID is required." });

    const user = await User.findById(req.body.id).exec();

    if (!user) {
        return res.status(204).json({ message: `No employee ID matches ID ${req.body.id}.` });
    }

    const result = employee.deleteOne({ _id: req.body.id });
    res.json(result);
};

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ message: "User ID is required." });

    const user = await User.findById(req.params.id).exec();

    if (!user) {
        return res.status(204).json({ message: `No user ID matches ID ${req.params.id}.` });
    }

    res.json(user);
};

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    getUser,
};
