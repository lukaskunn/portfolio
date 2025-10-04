import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobile from "./components/HeaderMobile";
import AnimationContainer from "./AnimationContainer";

function Header() {
  return (
    <AnimationContainer>
      <HeaderDesktop />
      <HeaderMobile />
    </AnimationContainer>
  );
}

export default Header;
