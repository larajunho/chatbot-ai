"use client";
import styled from "styled-components";
import ChatComponent from "./components/chatbot";

export default function Home() {
  return (
    <Container>
      <ChatComponent />
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/background.png") no-repeat center center;
  background-size: cover;
`;
