import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(__dirname));

// Rota de teste (usada pelo campo install_url no Kommo)
app.get("/install", (req, res) => {
  res.status(200).send("✅ Kommo widget online!");
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Widget rodando na porta ${PORT}`));
