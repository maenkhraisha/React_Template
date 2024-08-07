const User = require("../model/User");

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
    const { user, pwd, roles } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({ message: "Username and Password are required." });
    }
    // check for duplicate
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409);
    // start creating user
    try {
        // hash password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // create new user
        const result = await User.create({
            username: user,
            password: hashedPwd,
            roles: roles,
        });

        res.status(201).json({ success: `new user ${user} created successfully!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    handleNewUser,
};
