import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const req = await fetch("/videos/output.mp4");
        const blob = await req.blob();
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
      } catch (error) {
        console.error("Gagal load video", error);
      }
    };

    fetchVideo();

    return () => {
      if (videoSrc) URL.revokeObjectURL(videoSrc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
      delay: 1,
    });

    gsap.from(".cus-animation", {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% 50%" : "bottom top";

    // Video timeline animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    if (!videoRef.current) return;

    videoRef.current!.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current!.duration,
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left leaf"
          className="left-leaf"
        />

        <img
          src="/images/hero-right-leaf.png"
          alt="right leaf"
          className="right-leaf"
        />

        <div className="body lg:px-10">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p className="cus-animation">Cool. Crisp. Clasic.</p>
              <p className="subtitle">
                Sip The Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktails on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes - designed to delight your
                sense.
              </p>
              <a href="#cocktails" className="cus-animation">
                View Cocktails
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
        ></video>
      </div>
    </>
  );
};

export default Hero;
