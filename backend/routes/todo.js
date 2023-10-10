const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", (req, res) => {
    res.send("....");
})

router.get("/todo", async (req, res) => {
    try {
        const todo = await prisma.todo.findMany();

        console.log(todo);
        res.json({
            todo
        })
    }
    catch (e) {
        res.json({
            msg: false
        })
    }
})

router.get("/success", async (req, res) => {
    try {
        const todo = await prisma.completedTodo.findMany();

        console.log(todo);
        res.json({
            todo
        })
    }
    catch (e) {
        res.json({
            msg: false
        })
    }
});

router.post("/todo", async (req, res) => {
    if (req.body.text) {
        let { text } = req.body
        try {
            const todo = await prisma.todo.create({
                data: {
                    text
                }
            })

            console.log(todo);
            res.json({
                todo
            });
        }
        catch (e) {
            res.json({
                msg: false
            })
        }

    }
    else {
        res.json({
            msg: false
        })
    }
})

router.delete("/todo", async (req, res) => {
    if (req.body.id) {
        let { id } = req.body
        id = parseInt(id);
        try {
            const todo = await prisma.todo.delete({
                where: {
                    id: id
                }
            })

            console.log(todo);
            res.json({
                msg : true
            })
        }
        catch (e) {
            console.log(e);
            res.json({
                msg: false
            })
        }

    }
    else {
        res.json({
            msg: false
        })
    }
})

router.post("/success",async (req,res)=>{
    if (req.body.text) {
        let { text } = req.body
        try {
            const todo = await prisma.completedTodo.create({
                data: {
                    text
                }
            })

            console.log(todo);
            res.json({
                todo
            });
        }
        catch (e) {
            res.json({
                msg: false
            })
        }

    }
    else {
        res.json({
            msg: false
        })
    }
})

router.delete("/success", async (req, res) => {
    if (req.body.id) {
        let { id } = req.body
        id = parseInt(id);
        console.log(id);
        try {
            const todo = await prisma.completedTodo.delete({
                where: {
                    id: id
                }
            })

            console.log(todo);
            res.json({
                msg :true
            })
        }
        catch (e) {
            res.json({
                msg: false
            })
            console.log(e);
        }

    }
    else {
        res.json({
            msg: false
        })
    }
})

module.exports = router;