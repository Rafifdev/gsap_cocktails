import { useGSAP } from "@gsap/react";
import { navLinks } from "../../constants/index.ts";
import gsap from "gsap";

type NavLinks = {
  id: string;
  title: string;
};

const Navbar = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });

    navTween.fromTo(
      "nav",
      {
        backgroundColor: "transparent",
      },
      {
        backgroundColor: "#00000050",
        backgorundFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      },
    );

    gsap.from(".home", {
      opacity: 0,
      xPercent: -100,
      delay: 1,
      duration: 1.8,
      ease: "expo.out",
    })

    gsap.from(".navlink", {
      opacity: 0,
      xPercent: 100,
      delay: 1,
      duration: 1.8,
      ease: "expo.out",
    })
    
  });
  return (
    <nav>
      <div className="lg:px-10">
        <a href="#home" className="flex items-center gap-2 home">
          <img src="/images/logo.png" alt="logo" />
          <p>Velvet Pour</p>
        </a>
        <ul>
          {navLinks.map((link: NavLinks) => (
            <li key={link.id} className="navlink">
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
