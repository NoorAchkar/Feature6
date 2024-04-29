import AuthLogout from "../../Common/Services/Auth/AuthLogout";
import Nav from 'react-bootstrap/Nav';

// Room for Change/Improvement: Using Flexbox/Bootstrap for a better NavBar
const NavMenu = () => (
  <Nav className="justify-content-end" activeKey="/home">
  <Nav.Item>
    <Nav.Link href="/">Home</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/mealsearch">Meal Search</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/mealtype">Meal Type</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/addmeal">Add a Meal</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/mealplanner">Meal Planner</Nav.Link>
  </Nav.Item>
  <AuthLogout />
</Nav>
);

export default NavMenu;