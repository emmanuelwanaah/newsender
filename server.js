const express = require("express");
const bodyParser = require("body-parser");
const TELECO = require("TELECO");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// TELECO Credentials
const accountSid = process.env.TELECO_ACCOUNT_SID;
const authToken = process.env.TELECO_AUTH_TOKEN;
const TELECONumber = process.env.TELECO_PHONE_NUMBER;
const client = TELECO(accountSid, authToken);

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend files

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Send SMS
app.post("/send-sms", async (req, res) => {
    const { to, message } = req.body;
    if (!to || !message) {
        return res.status(400).json({ success: false, error: "Missing recipient or message" });
    }
    try {
        const response = await client.messages.create({
            body: message,
            from: $Number,
            to
        });
        res.json({ success: true, sid: response.sid });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Receive SMS (teleco Webhook)
app.post("/receive-sms", (req, res) => {
    const { From, Body } = req.body;
    console.log(`📩 Received SMS from ${From}: ${Body}`);
    res.send("SMS received");
});

// Make Call
app.post("/make-call", async (req, res) => {
    const { to } = req.body;
    if (!to) {
        return res.status(400).json({ success: false, error: "Missing recipient number" });
    }
    try {
        const call = await client.calls.create({
            url: "http://demo.cert.teleco.com/docs/voice.xml",
            from: telecooNumber,
            to
        });
        res.json({ success: true, sid: call.sid });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Receive Call (teleco Webhook)
app.post("/receive-call", (req, res) => {
    const response = new teleco.twiml.VoiceResponse();
    response.say("Hello! This is a test call from Teleco.");
    res.type("text/xml").send(response.toString());
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
