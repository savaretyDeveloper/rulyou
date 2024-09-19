const express = require('express');
const router = express.Router();
const User = require('../models/user');
const sequelize = require("../config/database");

router.post('/create', async (
    req,
    res,
) => {
    try {
        const {full_name, role_id, efficiency} = req.body;
        const user = await User.create({full_name, role_id, efficiency});
        res.json({success: true, result: {id: user.id}});
    } catch (error) {
        res.json({success: true, result: {error}});
    }
});

router.get('/get/:id?', async (
    req,
    res,
) => {
    try {
        const {id} = req.params;
        const {role} = req.query

        let users;

        if (!id) {
            users = await sequelize.query(`
                SELECT users.id, full_name, efficiency, roles.name as role
                FROM users
                         LEFT JOIN roles ON roles.id = users.role_id
                    ${role ? 'WHERE roles.name = :role' : ''}`, {
                replacements: {role: role?.toLowerCase().trim()},
                model: User
            });

            return res.json({success: true, result: {users}});
        }

        users = await sequelize.query(`
            SELECT users.id, full_name, efficiency, roles.name as role
            FROM users
                     LEFT JOIN roles ON roles.id = users.role_id
            WHERE users.id = ${id}`, {
            model: User
        });

        if (!users) {
            const error = new Error("User not found")
            error.code = "404"
            throw error
        }

        res.json({success: true, result: {users}});
    } catch (error) {
        res.json({success: true, result: {error}});
    }
});

router.patch('/update/:id', async (
    req,
    res,
) => {
    try {
        const {id} = req.params;
        const {full_name, role, efficiency} = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            const error = new Error("User not found")
            error.code = "404"
            throw error
        }

        await user.update({full_name, role, efficiency});
        res.json({success: true, result: user});
    } catch (error) {
        res.json({success: true, result: {error}});
    }
});

router.delete('/delete/:id?', async (
    req,
    res,
) => {
    try {
        const {id} = req.params;

        if (id) {
            const user = await User.findByPk(id);

            if (!user) {
                const error = new Error("User not found")
                error.code = "404"
                throw error
            }

            await user.destroy();

            res.json({success: true, result: user});
        } else {
            await User.destroy({where: {}});
            res.json({success: true});
        }
    } catch (error) {
        res.json({success: true, result: {error}});
    }
});

module.exports = router;
