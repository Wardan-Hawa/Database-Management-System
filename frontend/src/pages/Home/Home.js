import Features from "../../components/Features/Features"
import HomeCarousel from "../../components/Hero/Hero"
import Layout from "../../components/layout/Layout"
import NavigationCards from "../../components/navigationCards/NavigationCards"



const Home = () => {
    return (
        <>
            <HomeCarousel />
           
            <div>
            <NavigationCards/>
  <hr style={{ height: '2px', backgroundColor: '#333', border: 'none', margin: '3px 0' }} />
</div>
            <Features />
        </>
    )
}

export default Home