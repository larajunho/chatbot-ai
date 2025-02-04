"use client";

import {
  ChatContainer,
  ChatBox,
  Message,
  InputContainer,
  InputField,
  ExpandButton,
} from "./chat-page-styled";
import { sendMessageToAI } from "../api/api";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import React, { useEffect, useState } from "react";

interface MessageType {
  text: string;
  isBot: boolean;
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, isBot: false };
    setMessages([...messages, userMessage]);

    setInput("");

    const botReply = await sendMessageToAI(input);

    const botMessage = { text: botReply, isBot: true };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };
  useEffect(() => {
    setMessages([
      {
        text: "Sou sua assistente virtual, me pergunte o que quiser!",
        isBot: true,
      },
    ]);
  }, []);
  return (
    <ChatContainer expanded={expanded}>
      <ChatBox expanded={expanded}>
        <ExpandButton onClick={() => setExpanded(!expanded)}>
          {expanded ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
        </ExpandButton>
        {messages.map((message, index) => (
          <Message key={index} isBot={message.isBot}>
            {message.text}
          </Message>
        ))}
      </ChatBox>
      <InputContainer>
        <InputField
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma mensagem..."
        />

        <FaPaperPlane
          onClick={handleSendMessage}
          color="#00faff"
          size={30}
          style={{ alignSelf: "center", marginLeft: 10 }}
        />
      </InputContainer>
    </ChatContainer>
  );
}
