import Home from "./Home/Home";
import MealSearch from "./MealSearch/MealSearch";
import MealType from "./MealType/MealType";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../Common/Services/ProtectedRoute.js";
import AuthModule from "../Common/Services/Auth/Auth.js"
import AuthRegister from "../Common/Services/Auth/AuthRegister.js";
import AuthLogin from "../Common/Services/Auth/AuthLogin.js";

// Components function initializes routing between the pages
export default function Components() {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<AuthModule />} />
                <Route path="/auth/register" element={<AuthRegister />} />
                <Route path="/auth/login" element={<AuthLogin />} />
                <Route path="/" element={<ProtectedRoute element={Home} />} />
                <Route path="/mealsearch" element={<ProtectedRoute element={MealSearch} />} />
                <Route path="/mealtype" element={<ProtectedRoute element={MealType} />} />
            </Routes>
        </Router>
    );
    
}