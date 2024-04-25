import { Link } from "react-router-dom";
import AuthLogout from "../../Common/Services/Auth/AuthLogout";

// Room for Change/Improvement: Using Flexbox/Bootstrap for a better NavBar
const NavMenu = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/mealsearch">Meal Search</Link>
            </li>
            <li>
                <Link to="/mealtype">Meal Type</Link>
            </li>
            <li>
                <Link to="/addmeal">Add a Meal</Link>
            </li>
        </ul>
        <br />
        <AuthLogout />
    </nav>
);

export default NavMenu;