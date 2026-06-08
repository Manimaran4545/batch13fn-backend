const express = require("express");
const router = express.Router();
const User = require("../Schema/User");
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const auth = require("../auth/middleware");


router.post("/register", async (req, res) => {
    try {
        const { name, age, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            age,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Register user

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get all users

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            message: "Users fetched successfully",
            users
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Delete user by id

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// // update user by id 

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;

// router.post("/register", async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//        res.send(user);
//     } catch (error) {
//         res.status(500).send('Error registering user');
//     }
// });

// module.exports = router;



// //post request

// router.post("/register", async (req, res) => {
//     try {
//         const { name, age, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({name, age, email, password: hashedPassword});
//         await user.save();
//         res.status(201).send({message: "User registered successfully", user});
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send({message: "Error registering user",error:error.message});
//     }       
// });

// router.get("/users", auth, async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).send({message: 'Users retrieved successfully', users});
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send({message: 'Error fetching users',error: error.message});
//     }
// });

// module.exports = router;



// // update user by id 

// router.put('/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body);
//         res.status(200).send({message: 'User updated successfully', user});
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send({message: 'Error updating user', error: error.message});
//     }
// });
// module.exports = router;


// // deleteby id
// router.delete('/:id', async (req, res) => {
//     try {
//         const status = await User.findByIdAndDelete(req.params.id);
//         res.status(200).send({message: 'User deleted successfully', status});
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send({message: 'Error deleting user', error: error.message});
//     }
// });
// module.exports = router;


// // login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
      
        
//         const user = await User.findOne({email, password});
//           const user = await User.findOne({email});
//         if (!user) {
//             return res.status(404).send({message: 'User not found'});
//         }
//         if (user && bcrypt.compareSync(password, user.password)) {
//             const token = user.generateAuthToken();
//             res.status(200).send({message: 'User logged in successfully', token, user});
//         } else {
//             res.status(401).send({message: 'Invalid credentials'});
//         }
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send({message: 'Error logging in user', error: error.message});
//     }   
// });
// module.exports = router;


// // update user by id

// router.put('/:id', async (req, res) => {
//     try {
//         const hashedPassword = bcrypt.hashSync(req.body.password, 10);
//         const user = await User.findByIdAndUpdate(req.params.id, {...req.body, password: hashedPassword});
//         res.status(200).send({message: 'User updated successfully', user});
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send({message: 'Error updating user', error: error.message});
//     }   
// });
// module.exports = router;