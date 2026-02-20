import Hero from "@/components/component/Hero"
import SectionThree from "@/components/component/landing_page/SectionThree"
import SectionTwo from "@/components/component/landing_page/SectionTwo"
import Navbar from "@/components/shared/Navbar"

const landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <SectionTwo />
      <SectionThree />
    </div>
  )
}

export default landing