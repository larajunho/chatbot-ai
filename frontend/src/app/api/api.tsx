export const sendMessageToAI = async (message: string) => {
  try {
    const response = await fetch("http://localhost:5001/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Erro na comunicação com o backend");
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error(error);
    return "Desculpe, não consigo te responder agora.";
  }
};
