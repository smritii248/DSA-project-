import { Box, Button, Grid2 } from "@mui/material"; // Import Grid2
import { useNavigate } from "react-router-dom";
import Banner from "../assets/banner.png"; // Import the Banner image
import { useEffect } from "react"; // Import useEffect

export default function Home() {
  const navigate = useNavigate();

  const handleSortingVisualizer = () => {
    navigate("/visual-sorting-project");
  };

  const handleBinaryTree = () => {
    navigate("/binary-tree-traversal");
  };

  // Apply background styles to the body element
  useEffect(() => {
    document.body.style.backgroundImage = `url(${Banner})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Cleanup function to reset the background when the component unmounts
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
    };
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Grid2 container direction="row" spacing={4}>
        <Grid2 item>
          <Button
            variant="contained"
            color="info"
            onClick={handleSortingVisualizer}
            sx={{ fontSize: "1.25rem", padding: "12px 24px" }}
          >
            Go to Sorting Visualizer
          </Button>
        </Grid2>
        <Grid2 item>
          <Button
            onClick={handleBinaryTree}
            variant="contained"
            color="success"
            sx={{ fontSize: "1.25rem", padding: "12px 24px" }}
          >
            Go to Binary Tree
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
}
