const User = require('../../models/user.js');

module.exports = {
  register: (req, res) => {
    let { username, password } = req.body;

    const newUser = new User(username, password);

    let safeUser = {...newUser};
    delete safeUser.password;

    res.status(200).send(safeUser);
},
login: (req, res) => {
    let { username, password } = req.body;

    let targetUser = User.all.find(user => user.username === username);

    if (targetUser && targetUser.authenticate(password)) {
        let safeUser = {...targetUser}
        delete safeUser.password
        res.status(200).send(safeUser);
    } else {
        res.status(404).send("User not found.")
    }
},
}