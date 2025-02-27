import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BinaryTree from "./binary-tree-traversal";
import SortingVisualizer from "./visual-sorting-project";
import Home from "./Home/index";
import GoogleComponent from "./Login/login";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error(
      "Google Client ID is not defined. Please check your .env file."
    );
    return <div>Error: Google Client ID is missing.</div>;
  }

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/binary-tree-traversal" element={<BinaryTree />} />
            <Route
              path="/visual-sorting-project"
              element={<SortingVisualizer />}
            />
            <Route path="/home" element={<Home />} />
            <Route
              path="/login"
              element={
                <GoogleOAuthProvider clientId={clientId}>
                  <div className="App">
                    <GoogleComponent />
                  </div>
                </GoogleOAuthProvider>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
