import { storeSecrets } from "../../models/Secrets.js";

const postSecrets = async (req, res) => {
    const secretName = "blogSecretManager";
    try {
        const response = await storeSecrets(secretName);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Failed to store secret" });
    }
}

export default postSecrets