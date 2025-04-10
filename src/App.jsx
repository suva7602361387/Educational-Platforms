
 import "./App.css"
 import { Route,Routes } from "react-router-dom";
 import Home from "./pages/Home";
 import Navbar from "./component/common/Navbar";
 import Login from "./pages/Login";
 import Signup from "./pages/Signup";
 import OpenRoute from "./component/core/Auth/OpenRoute";
 import ForgotPassword from "./pages/ForgetPassword";
 import UpdatePassword from "./pages/UpdatePassword";
 import VerifyEmail from "./pages/VerifyEmail"
 import About from "./pages/About";
 import Contact from "./pages/Contact";
 import MyProfile from "./component/core/Dashboard/MyProfile";
 import PrivateRoute from "./component/core/Auth/PrivateRoute";
 import Dashboard from "./pages/Dashboard";
 import Settings from "./component/core/Dashboard/Settings";
 import EnrolledCourses from "./component/core/Dashboard/EnrolledCourses";
 import Cart from "./component/core/Dashboard/Cart"
 import AddCourse from "./component/core/Dashboard/AddCourse";
 import MyCourses from "./component/core/Dashboard/MyCourses";
 import EditCourse from "./component/core/Dashboard/EditCourse";
 import { useNavigate } from "react-router-dom";
 import { useDispatch, useSelector } from "react-redux"
 import { ACCOUNT_TYPE } from "./utils/constants";
 import Catalog from "./pages/Catalog";
 import { useEffect } from "react";
 import CourseDetails from "./pages/CourseDetails";
 import Success from "./utils/success";
 import Cancel from "./utils/cancel";
 import ViewCourse from "./pages/ViewCourse";
 import VideoDetails from "./component/core/ViewCourse/VideoDetails";
 import Instructor from "./component/core/Dashboard/InstructorDashboard/Instructor";
 
 function App(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)
 

  return(
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/cancel" element={<Cancel/>}/>
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />
      
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
      
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        /> 
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  
         <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  
         <Route
          path="about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />
        <Route
          path="contact"
          element={
            <OpenRoute>
              <Contact />
            </OpenRoute>
          }
        />
        {/*</Routes> <Route 
             element={
               <PrivateRoute>
                 <Dashboard />
               </PrivateRoute>
             }
             <Route path="dashboard/my-profile" element={<MyProfile/>}/>
         ></Route>*/}
         <Route 
          element={
            <PrivateRoute>
                 <Dashboard/>
            </PrivateRoute>
          }>
            <Route path="dashboard/my-profile" element={<MyProfile/>}/>
            <Route path="dashboard/Settings" element={<Settings/>}/>
            
         {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
            <Route path="dashboard/cart" element={<Cart />} />
            <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
            </>
          )
         }

        {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/instructor" element={<Instructor />} />

          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          
          </>
          )
        }

         </Route>
         <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>
         {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }


     

      </Route>
        
      </Routes>
     
    </div>
  );
 }
 export default App;