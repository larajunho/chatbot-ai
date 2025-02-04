const http = require("http");
const { WebSocketServer } = require("ws");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/chat") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const { message } = JSON.parse(body);
      console.log("Requisição recebida:", message);

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent([message]);
        const response = await result.response;
        const text = response.text();

        console.log("Resposta do Gemini:", text);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ reply: text }));
      } catch (error) {
        console.error("Erro na API Gemini:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Erro ao processar a mensagem" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Rota não encontrada" }));
  }
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Usuário conectado");

  ws.on("message", async (message) => {
    const data = JSON.parse(message);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent([data.message]);
      const response = await result.response;
      const text = response.text();

      ws.send(JSON.stringify({ reply: text }));
    } catch (error) {
      console.error("Erro na API Gemini:", error);
      ws.send(JSON.stringify({ error: "Erro ao processar a mensagem" }));
    }
  });

  ws.on("close", () => {
    console.log("Usuário desconectado");
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Porta do servidor: ${PORT}`);
});
