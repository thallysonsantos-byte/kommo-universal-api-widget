import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos (manifest, script, ícones, etc.)
app.use(express.static(__dirname));

// Rota de verificação (opcional)
app.get("/install", (req, res) => {
  res.status(200).send("Kommo widget online!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Widget rodando na porta ${PORT}`));
