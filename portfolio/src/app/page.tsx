import { Hero } from "@/components/Hero/Hero"
import { AboutMe } from "@/components/AboutMe/AboutMe"
import { TimeLine } from "@/components/TimeLine/TimeLine"
import { Skills } from "@/components/Skills/Skills"
import { Projects } from "@/components/Projects/Projects"
export default function Home() {
  return (
    <div>
      <Hero />
      <AboutMe />
      <TimeLine />
      <Skills />
      <Projects />


    </div>
  )
}