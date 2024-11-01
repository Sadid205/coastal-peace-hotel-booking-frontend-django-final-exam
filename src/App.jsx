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
import AddBanner from "./Page/AddBanner"
import CreateOffer from "./Page/CrateOffer"
import CreateCategory from "./Page/CreateCategory"
import AddBestRoom from "./Page/AddBestRoom"
import CreateService from "./Page/CreateService"
import SelectFeedBack from "./Page/SelectFeedBack"
import BestRoomDetails from "./Page/BestRoomDetails"
import ServiceDetails from "./Page/ServicesDetails"
import AllBestRooms from "./Page/AllBestRooms"
import AllOfferHotels from "./Page/AllOfferHotels"
import AllCategoriesHotels from "./Page/AllCategoriesHotels"
import AllServices from "./Page/AllServices"



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
          <Route path="/best_room_details/:room_id"element={
            <ProtectedRoute token={token}>
              <BestRoomDetails/>
            </ProtectedRoute>
          }/>
          <Route path="/service_details/:service_id"element={
            <ProtectedRoute token={token}>
              <ServiceDetails/>
            </ProtectedRoute>
          }/>
          <Route path="/all-best-rooms"element={
            <ProtectedRoute token={token}>
              <AllBestRooms/>
            </ProtectedRoute>
          }/>
          <Route path="/all-offer-hotels"element={
            <ProtectedRoute token={token}>
              <AllOfferHotels/>
            </ProtectedRoute>
          }/>
          <Route path="/all-categories-hotels"element={
            <ProtectedRoute token={token}>
              <AllCategoriesHotels/>
            </ProtectedRoute>
          }/>
          <Route path="/all-services"element={
            <ProtectedRoute token={token}>
              <AllServices/>
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
          <Route path="/add_banner" element={
             <AdminPanelProtectedRoute token={token} user_id={user_id}>
             <AddBanner/>
            </AdminPanelProtectedRoute>  
          }/>
          <Route path="/create_offer" element={
             <AdminPanelProtectedRoute token={token} user_id={user_id}>
             <CreateOffer/>
            </AdminPanelProtectedRoute>  
          }/>
          <Route path="/create_category" element={
             <AdminPanelProtectedRoute token={token} user_id={user_id}>
             <CreateCategory/>
            </AdminPanelProtectedRoute>  
          }/>
          <Route path="/add_best_room" element={
             <AdminPanelProtectedRoute token={token} user_id={user_id}>
             <AddBestRoom/>
            </AdminPanelProtectedRoute>  
          }/>
          <Route path="/create_service" element={
             <AdminPanelProtectedRoute token={token} user_id={user_id}>
             <CreateService/>
            </AdminPanelProtectedRoute>  
          }/>
          <Route path="/select_feedback" element={
             <AdminPanelProtectedRoute token={token} user_id={user_id}>
             <SelectFeedBack/>
            </AdminPanelProtectedRoute>  
          }/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      </SearchContextProvider>
  )
}

export default App
