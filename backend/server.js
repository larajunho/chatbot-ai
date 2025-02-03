require("dotenv").config();
const http = require("http");
const { WebSocketServer } = require("ws");
const { parse } = require("querystring");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/chat") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const { message } = JSON.parse(body);
      try {
        const openaiResponse = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-4",
              messages: [{ role: "user", content: message }],
            }),
          }
        );

        const data = await openaiResponse.json();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ reply: data.choices[0].message.content }));
      } catch (error) {
        console.error("Erro na API OpenAI:", error);
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
      const openaiResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: data.message }],
          }),
        }
      );

      const result = await openaiResponse.json();
      ws.send(JSON.stringify({ reply: result.choices[0].message.content }));
    } catch (error) {
      console.error("Erro na API OpenAI:", error);
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
