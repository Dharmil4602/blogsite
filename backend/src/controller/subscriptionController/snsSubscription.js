import { sendSubscriptionEmail } from "../../models/Blog.js";

const subscription = async (req, res) => {
    const {email} = req.body;
    console.log("Request Body from Subscription: ", req.body);

    try {
        const response = await sendSubscriptionEmail(email);
        console.log("Notification sent: ", response);
        // res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Failed to subscribe" });
    }
}

export default subscription;