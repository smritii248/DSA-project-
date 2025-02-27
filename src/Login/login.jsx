import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "./googleComponent.css";
import ishu from "../assets/ishu.png";
import googleLogo from "../assets/google.png";

const GoogleComponent = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Login Success:", tokenResponse);
      navigate("/home");
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
  });

  return (
    <div className="container">
      <div className="content">
        <h1 className="heading">Welcome to My App</h1>
        <div className="google-button-container">
          <img src={ishu} alt="Ishu" className="ishu-image" />
          <button onClick={login} className="google-login-button">
            <img
              src={googleLogo}
              height={10}
              width={10}
              alt="Google Logo"
              className="google-logo"
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleComponent;
