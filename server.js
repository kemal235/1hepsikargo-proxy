const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/quote", async (req, res) => {
  try {
    const { sender, receiver, desi, payment_type } = req.body;

    const response = await axios.post("https://api.hepsikargo.com/api/shipment/price", {
      sender,
      receiver,
      desi,
      payment_type
    });

    res.json(response.data);
  } catch (error) {
    console.error("quote error:", error.message);
    res.status(500).json({ error: "Fiyat bilgisi alınamadı." });
  }
});

app.post("/order", async (req, res) => {
  try {
    const response = await axios.post("https://api.hepsikargo.com/api/shipment/order", req.body);
    res.json(response.data);
  } catch (error) {
    console.error("order error:", error.message);
    res.status(500).json({ error: "Sipariş oluşturulamadı." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy ${PORT} portunda çalışıyor 🚀`));
