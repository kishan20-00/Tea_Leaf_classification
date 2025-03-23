import React, { useState } from "react";
import { Container, Typography, Button, Box, CircularProgress, Card, CardContent } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function Leaf() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPrediction(null); // Reset prediction when a new file is selected
    setError(""); // Clear any previous errors
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5001/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction.");
      }

      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      {/* Page Title */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#2E3B55", mb: 4 }}
      >
        Tea Disease Classification
      </Typography>

      {/* Upload Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          p: 3,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#fafafa",
        }}
      >
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-button"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-button">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            sx={{
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#45a049" },
              fontWeight: "bold",
            }}
          >
            Upload Image
          </Button>
        </label>
        {selectedFile && (
          <Typography variant="body1" sx={{ color: "#555" }}>
            Selected File: <strong>{selectedFile.name}</strong>
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedFile || isLoading}
          sx={{
            backgroundColor: "#2196F3",
            "&:hover": { backgroundColor: "#1976D2" },
            fontWeight: "bold",
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Predict"}
        </Button>
        {error && (
          <Typography color="error" variant="body1" sx={{ fontWeight: "bold" }}>
            {error}
          </Typography>
        )}
      </Box>

      {/* Prediction Result */}
      {prediction && (
        <Card
          sx={{
            mt: 4,
            width: "100%",
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#ffffff",
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2E3B55" }}>
              Prediction Result
            </Typography>
            <Typography sx={{ mt: 1, color: "#555" }}>
              <strong>Class:</strong> {prediction.predicted_class}
            </Typography>
            <Typography sx={{ mt: 1, color: "#555" }}>
              <strong>Confidence:</strong> {prediction.confidence}%
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default Leaf;