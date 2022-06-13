import Header from "../components/Header";
import Landing from "../components/Landing";
import About from "../components/About";
import Resume from "../components/Resume";
import Services from "../components/Services";
import Works from "../components/Works";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div>
      <Header />
      <Landing />
      <About />
      <Resume />
      <Services />
      <Works />
      <Contact></Contact>
    </div>
  );
}
