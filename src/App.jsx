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
import ProtectedRoute, { AdminPanelProtectedRoute } from "./components/ProtectedRoute"
import BookingHistoryPage from "./Page/BookingHistoryPage"
import {SearchContextProvider} from "./context/SearchContext"
import AdminPanel from "./Page/AdminPanel"
import AddHotel from "./Page/AddHotel"
import AdminRequest from "./Page/AdminRequest"
import AdminList from "./Page/AdminList"
import UserList from "./Page/UserList"
import EditHotelPage from "./Page/EditHotelPage"



function App() {
  const token = localStorage.getItem("Token")
  const user_id = localStorage.getItem("user_id")
  return (
    <SearchContextProvider>
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
          <Route path="/booking_history" element={
            <ProtectedRoute token={token}>
              <BookingHistoryPage/>
            </ProtectedRoute>
          }/>
          <Route path="/admin_panel" element={
             <AdminPanelProtectedRoute token={token} user_id={user_id}>
             <AdminPanel/>
            </AdminPanelProtectedRoute>
          }/>
          <Route path="/add_hotel" element={
             <AdminPanelProtectedRoute token={token} user_id={user_id}>
             <AddHotel/>
            </AdminPanelProtectedRoute>

          }/>
          <Route path="/admin_request" element={
             <AdminPanelProtectedRoute token={token} user_id={user_id}>
             <AdminRequest/>
            </AdminPanelProtectedRoute>
          }/>
          <Route path="/admin_list" element={
             <AdminPanelProtectedRoute token={token} user_id={user_id}>
             <AdminList/>
            </AdminPanelProtectedRoute>  
          }/>
          <Route path="/user_list" element={
             <AdminPanelProtectedRoute token={token} user_id={user_id}>
             <UserList/>
            </AdminPanelProtectedRoute>  
          }/>
          <Route path="/edit_hotel/:hotel_id" element={
             <AdminPanelProtectedRoute token={token} user_id={user_id}>
             <EditHotelPage/>
            </AdminPanelProtectedRoute>  
          }/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      </SearchContextProvider>
  )
}

export default App
