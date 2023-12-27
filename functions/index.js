const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51OPnXfCtmH0NLR6yE8k8epVsSCrvOmxtmhy4Ae7ThTkypG4UB3TgTSPgW8HGQdNpqN7pEFpLulg5b9I4ntcudUTJ005izFsTHw"); // Ensure this is secure

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Received for this amount: ", total);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total, // subunits of the currency
            currency: "usd",
        });

        console.log("Created PaymentIntent:", paymentIntent.id, "with Client Secret:", paymentIntent.client_secret);

        // OK - Created
        response.status(201).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating PaymentIntent:", error);
        response.status(500).send({ error: error.message });
    }
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/your-project-id/us-central1/api
