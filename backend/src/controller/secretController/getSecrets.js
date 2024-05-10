import {getSecretsModel} from "../../models/Secrets.js";

const getSecret = async (req, res) => {
    const secretName = "blogSecretManager";
    try
    {
        const secret = await getSecretsModel(secretName);
        res.json(secret);
    }
    catch (error)
    {
        res.status(500).json({ error: "Failed to get secret" });
    }
}

export default getSecret