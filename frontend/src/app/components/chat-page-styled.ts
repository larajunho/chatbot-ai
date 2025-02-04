import styled from "styled-components";
export const ChatContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "expanded",
})<{ expanded: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  padding-right: ${({ expanded }) => (expanded ? "15%" : "25%")};
  width: ${({ expanded }) => (expanded ? "100%" : "35%")};
  padding-left: ${({ expanded }) => (expanded ? "15%" : "0%")};
  max-height: 80vh;
  @media (max-width: 789px) {
    padding-right: ${({ expanded }) => (expanded ? "5%" : "5%")};
    width: ${({ expanded }) => (expanded ? "90%" : "90%")};
    padding-left: ${({ expanded }) => (expanded ? "5%" : "5%")};
    max-height: 80vh;
  }
`;

export const ChatBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "expanded",
})<{ expanded: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ expanded }) => (expanded ? "95%" : "85%")};
  max-width: ${({ expanded }) => (expanded ? "100%" : "600px")};
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 24px;
  box-shadow: 0 0 15px #00faff;
  padding: 20px;
  overflow-y: auto;
  height: 70vh;
  border: 2px solid #00faff;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 24px;
    box-shadow: 0 0 20px #00faff;
    z-index: -1;
  }
`;

export const ExpandButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #00faff;
  font-size: 16px;
  cursor: pointer;
`;

export const Message = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isBot",
})<{ isBot: boolean }>`
  background-color: ${(props) => (props.isBot ? "#1e1e1e" : "#8442f5")};
  color: ${(props) => (props.isBot ? "#00faff" : "#fff")};
  padding: 12px;
  margin: 6px 0;
  border-radius: 20px;
  max-width: 75%;
  align-self: ${(props) => (props.isBot ? "flex-start" : "flex-end")};
  font-size: 16px;
  box-shadow: 0 0 10px rgba(0, 250, 255, 0.5);
`;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #00faff;
  border-radius: 16px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  outline: none;

  &:focus {
    box-shadow: 0 0 10px #00faff;
  }
`;
