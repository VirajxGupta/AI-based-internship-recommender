import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Fab,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! Ask me for internship recommendations." },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null); // ✅ track session id
  const chatEndRef = useRef(null);

  // bounce controls
  const bounceControls = useAnimation();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // trigger bounce when a new bot message arrives
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last && last.from === "bot") {
      bounceControls.start({
        y: [0, -5, 0],
        transition: { duration: 0.4, ease: "easeOut" },
      });
    }
  }, [messages]);

  const toggleChat = async () => {
    if (isOpen) {
      // user is closing the chat – clear history on server
      try {
        await axios.delete(`https://pulastya0-sih-ml-backend.hf.space/chat/${sessionId}/delete`, {
          session_id: sessionId, // ✅ send session id to clear server-side
        });
        // also clear local messages + reset session
        setMessages([
          { from: "bot", text: "Hello! Ask me for internship recommendations." },
        ]);
        setSessionId(null);
      } catch (err) {
        console.error("Error clearing chat history:", err);
      }
    }

    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === "" || isLoading) return;

    const userMessage = { from: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://pulastya0-sih-ml-backend.hf.space/chat",
        {
          query: currentInput,
          session_id: sessionId, // ✅ attach session id if exists
        }
      );

      console.log("API response:", response.data);

      // ✅ if new session id is returned, store it
      if (!sessionId && response.data.session_id) {
        setSessionId(response.data.session_id);
        console.log("New session started:", response.data.session_id);
      }

      const botResponse = {
        from: "bot",
        text:
          response.data.answer ||
          response.data.recommendation ||
          response.data.response ||
          "I couldn't find a recommendation.",
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      const errorMessage = {
        from: "bot",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
      {isOpen && (
        <Card
          sx={{
            width: 420, // <- wider box
            height: 500,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            mb: 2,
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <CardHeader
            avatar={
              <motion.div animate={bounceControls}>
                <DotLottieReact
                  src="https://lottie.host/e3d50330-e364-4006-ac37-5fe2bc1fbda5/OXV0LKA4ft.lottie"
                  loop
                  autoplay
                  style={{ width: 40, height: 40 }}
                />
              </motion.div>
            }
            title="Internship Helper"
            titleTypographyProps={{ fontWeight: "bold", fontSize: "1.1rem" }}
            action={
              <IconButton onClick={toggleChat}>
                <CloseIcon />
              </IconButton>
            }
            sx={{
              background: "linear-gradient(135deg, #1e40af, #2563eb)",
              color: "white",
            }}
          />
          {/* Message area */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflowY: "auto",
          pb: 1,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              bgcolor: msg.from === "user" ? "#1976d2" : "#f1f1f1",
              color: msg.from === "user" ? "white" : "black",
              px: 1.5,
              py: 1,
              borderRadius: 2,
              maxWidth: "80%",
            }}
          >
            <Typography variant="body2">{msg.text}</Typography>
          </Box>
        ))}

        {isLoading && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <DotLottieReact
              src="https://lottie.host/e3d50330-e364-4006-ac37-5fe2bc1fbda5/OXV0LKA4ft.lottie"
              loop
              autoplay
              style={{ width: 30, height: 30, marginRight: 8 }}
            />
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 0.4, delay: 0 }}
                style={{
                  width: 6,
                  height: 6,
                  background: "#aaa",
                  borderRadius: "50%",
                }}
              />
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 0.4, delay: 0.2 }}
                style={{
                  width: 6,
                  height: 6,
                  background: "#aaa",
                  borderRadius: "50%",
                }}
              />
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 0.4, delay: 0.4 }}
                style={{
                  width: 6,
                  height: 6,
                  background: "#aaa",
                  borderRadius: "50%",
                }}
              />
            </Box>
          </Box>
        )}
         <div ref={chatEndRef} />
      </CardContent>
          <Divider />

          {/* Input with sloth-style robot hanging */}
          <Box
            sx={{
              position: "relative",
              p: 1.5,
              display: "flex",
              alignItems: "center",
              bgcolor: "white",
            }}
          >
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={isLoading}
              sx={{ ml: 1 }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Card>
      )}

      {/* Floating Robot Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="robotFab"
            initial={{ y: 0, scale: 1, opacity: 1 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 1001,
            }}
          >
            <Fab
              color="primary"
              aria-label="chat"
              onClick={toggleChat}
              sx={{
                background: "white",
                width: 64,
                height: 64,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DotLottieReact
                src="https://lottie.host/e3d50330-e364-4006-ac37-5fe2bc1fbda5/OXV0LKA4ft.lottie"
                loop
                autoplay
                style={{ width: 60, height: 60 }}
              />
            </Fab>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}