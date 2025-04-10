import {combineReducers} from "@reduxjs/toolkit";
import authSlice from "../Slices/authSlices"
import cartSlice from "../Slices/cartSlices"
import profileSlice from "../Slices/profileSlices"
import courseSlice from "../Slices/CourseSlices"
import viewCourseSlice from "../Slices/viewCourseSlice" 

const rootReducer  = combineReducers({
    auth: authSlice,
    cart:cartSlice,
    profile:profileSlice,
    course:courseSlice,
    viewCourse:viewCourseSlice,
    
})

export default rootReducer