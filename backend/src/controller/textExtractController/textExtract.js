import extractTextFromDocument from "../../models/TextExtractModel.js";

const textExtract = async (req, res) => {
  const file = req.file;
  const userId = req.user.userId;

  console.log("File:", file);
  console.log("User:", userId);

  try {
    const textractResponse = await extractTextFromDocument(file, userId);
    res
      .status(200)
      .json({ message: "Text extracted successfully", textractResponse });
  } catch (error) {
    console.log("Error extracting text from document:", error);
    res.status(500).json({ error: "Failed to extract text from document" });
  }
};

export default textExtract;
