const User = require("../model/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
    const users = await User.find();

    if (!users) return res.status(204).json({ message: "No users found" });
    res.json(users);
};

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ message: "User ID required" });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ message: `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
};

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ message: "User ID required" });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ message: `User ID ${req.params.id} not found` });
    }

    res.json(user);
};

const updateUser = async (req, res) => {
    const { id, username } = req.body;

    const newInfo = req.body;

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    User.updateOne({ _id: id }, newInfo)
        .exec()
        .then((result) => {
            res.status(200).json({ message: "User updated" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

const changePassword = async (req, res) => {
    console.log("chnage password");

    const { id, pwd } = req.body;

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.updateOne({
            _id: id,
            password: hashedPwd,
        });

        res.status(201).json({ success: `Password updated!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser,
    changePassword,
};
