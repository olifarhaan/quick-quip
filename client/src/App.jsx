import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute"
import ScrollToTop from "./components/ScrollToTop"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Profile from "./pages/Profile"
import MyUrls from "./pages/MyUrls"
import UpdateLink from "./components/UpdateLink"
import NotFound from "./pages/NotFound"
import MyQRs from "./pages/MyQRs"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/sign-in"
            element={<SignIn />}
          />
          <Route
            path="/sign-up"
            element={<SignUp />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/reset-password/:userId/:token"
            element={<ResetPassword />}
          />

          {/* For all logged in users */}
          <Route
            path="/"
            element={<PrivateRoute />}
          >
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/my-urls"
              element={<MyUrls />}
            />
            <Route
              path="/my-qrs"
              element={<MyQRs />}
            />
            <Route
              path="/edit-url/:urlId"
              element={<UpdateLink />}
            />
          </Route>
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </div>
  )
}

export default App
