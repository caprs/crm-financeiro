import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.get("/health", (req,res) => {
    return res.json({
        status: "API funcionando"
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})

