import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./context/TaskProvider"; // ✅ only this import
import { Auth0Provider } from "@auth0/auth0-react";

// Replace these with your Auth0 info
const domain = "dev-v7ookiki3oqw1i78.us.auth0.com";       // your Auth0 domain
const clientId = "p3YxiIFPJqpJciRCLB6Lq4LdVWWSLHjR";      // your Auth0 client ID

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin, // redirects back to your app after login
      }}
      cacheLocation="localstorage" // optional: keeps user logged in after refresh
    >
      <BrowserRouter>
        <TaskProvider>
          <App />
        </TaskProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
