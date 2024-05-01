// Home Page Component
import NavMenu from "../NavMenu/NavMenu"

export default function Home() {
    return (
        <section>
            <NavMenu />
            <div className="intro">
            <h1>Welcome to Your Food Aid!</h1>
            <p>Select your options to find your next recipe!</p>
            </div>
        </section> 
    )
}