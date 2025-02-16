import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import HomePage from "./pages/HomePage";
import TransactionPage from "./pages/transaction/TransactionPage";
import ProfilePage from "./pages/profile/ProfilePage";
import TopupPage from "./pages/topup/TopupPage";
import PaymentPage from "./pages/payment/PaymentPage";
import Protected from "./Protected";
import Loading from "./shared/Loading";
import Public from "./Public";

const App = () => {
  return (
    <BrowserRouter>
      <Loading />
      <Routes>
        <Route element={<Public />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/Transaction" element={<TransactionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/topup" element={<TopupPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
