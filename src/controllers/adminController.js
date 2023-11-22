const adminController = {};
const User = require("../models/user");
adminController.index = async (req, res) =>{
    res.status(200).json({ 
        "msg":"este es mi primer controlador",
        "ok":"true"
    })
}

adminController.usersAll = async (req, res) =>{
    try {
        const users = await User.find();
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.sendStatus(204);
        }

    } catch (error) {
       res.sendStatus(409); 
    }
}













module.exports = adminController;
