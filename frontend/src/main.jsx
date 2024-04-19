import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";
const entry = document.getElementById("root");
const root = createRoot(entry);
root.render(<App />);
