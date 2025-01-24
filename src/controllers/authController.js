const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../config/auth'); // Import des configurations centralisées

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Utilisation de la configuration pour le nombre de salt rounds
        const hashedPassword = await bcrypt.hash(password, authConfig.bcryptSaltRounds);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).send("User registered");
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send("Vos identifiants ne sont pas valide");

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send("Vos identifiants ne sont pas valide");

        // Utilisation des configurations pour le secret et l'expiration du token
        const token = jwt.sign({ _id: user._id }, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiration });
        res.header('Authorization', `Bearer ${token}`).send({ token });
    } catch (err) {
        res.status(500).send(err);
    }
};
