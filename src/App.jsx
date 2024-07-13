import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from  './components/Header'
import HomePage from './Page/HomePage'
import ChangePasswordPage from './Page/ChangePasswordPage'
import EditProfilePage from './Page/EditProfilePage'
import HotelDetailsPage from './Page/HotelDetailsPage'
import LoginPage from './Page/LoginPage'
import RegisterPage from './Page/RegisterPage'
import ProfilePage from "./Page/ProfilePage"
import './App.css'
import DepositPage from "./Page/DepositPage"
import EditReviewPage from "./Page/EditReviewPage"
import { Footer } from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"
const token = localStorage.getItem("Token")
function App() {

  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/change_password" element={
            <ProtectedRoute token={token}>
              <ChangePasswordPage/>
            </ProtectedRoute>
          }/>
          <Route path="/edit_profile"element={
            <ProtectedRoute token={token}>
              <EditProfilePage/>
            </ProtectedRoute>
          }/>
          <Route path="/edit_review/:review_id/:hotel_id/:guestId" element={
            <ProtectedRoute token={token}>
              <EditReviewPage/>
            </ProtectedRoute>
          }/>
          <Route path="/hotel_details/:hotel_id"element={
            <ProtectedRoute token={token}>
              <HotelDetailsPage/>
            </ProtectedRoute>
          }/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/profile" element={
            <ProtectedRoute token={token}>
              <ProfilePage/>
            </ProtectedRoute>
          }/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/deposit" element={
            <ProtectedRoute token={token}>
              <DepositPage/>
            </ProtectedRoute>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute token={token}>
              <ProfilePage/>
            </ProtectedRoute>
          }/>
        </Routes>
        <Footer/>
      </BrowserRouter>
  )
}

export default App
