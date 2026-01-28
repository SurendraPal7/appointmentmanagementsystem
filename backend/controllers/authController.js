const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
        role: role || 'patient',
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Social Login (Google/Facebook)
// @route   POST /api/users/social-login
// @access  Public
const socialLogin = async (req, res) => {
    const { email, name, photo, provider } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            // User exists, return token
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image, // Assuming user model has image or avatar
                token: generateToken(user._id),
            });
        } else {
            // Create user
            // Password is required in our model, so generate a random one for social users
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            user = await User.create({
                name,
                email,
                password: randomPassword,
                role: 'patient',
                phone: '0000000000', // Placeholder as it might be required
                image: photo // Saved from social login
            });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error during Social Login' });
    }
};

module.exports = { authUser, registerUser, socialLogin };
