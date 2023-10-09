import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const port = 5000 || process.env.PORT;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
const prisma = new PrismaClient();

async function main() {
    app.get("/", (req, res) => {
        res.send("....");
    })

    app.get("/todo", async (req, res) => {
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

    app.get("/success", async (req, res) => {
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

    app.post("/todo", async (req, res) => {
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

    app.delete("/todo", async (req, res) => {
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

    app.post("/success",async (req,res)=>{
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

    app.delete("/success", async (req, res) => {
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
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    })

app.listen(port, () => {
    console.log("server is running on port", port);
})