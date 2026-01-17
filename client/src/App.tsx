import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegistrationProvider } from "./Context/RegistrationContext";
import Layout from "./Components/Layout";
import Home from "./User/Home";
import AdminDashboard from "./Admin/AdminDashboard";

export default function App() {
  return (
    <RegistrationProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </RegistrationProvider>
  );
}