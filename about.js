// --- ABOUT SECTION HORIZONTAL SCROLL LOGIC ---

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    const wrapper = document.getElementById("horizontal-about-wrapper");
    const track = document.querySelector(".horizontal-track");

    if (!wrapper || !track) return;

    // 1. MASTER TIMELINE: Pin and translate horizontally
    // Calculate how far the track needs to move horizontally
    function getScrollAmount() {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth);
    }

    const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none"
    });

    ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
    });

    // 2. MICRO-INTERACTIONS (Using containerAnimation)

    // Intro Title fades out
    gsap.to(".intro-title", {
        x: -200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".panel-intro",
            containerAnimation: tween,
            start: "left left",
            end: "right left",
            scrub: true
        }
    });

    // Chapter 01: Story - Diagonal Mask expands & Image Parallax
    gsap.fromTo(".diag-mask-1",
        { clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" },
        { 
            clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
            ease: "none",
            scrollTrigger: {
                trigger: ".panel-story",
                containerAnimation: tween,
                start: "left center",
                end: "center center",
                scrub: true
            }
        }
    );
    gsap.fromTo(".panel-story .parallax-img",
        { x: -100, scale: 1.2 },
        { 
            x: 0, scale: 1,
            ease: "none",
            scrollTrigger: {
                trigger: ".panel-story",
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true
            }
        }
    );


    // Chapter 04: Philosophy - Sequential reveal
    gsap.utils.toArray('.phil-slide').forEach((slide, i) => {
        gsap.fromTo(slide, 
            { y: 50, opacity: 0 },
            { 
                y: 0, opacity: 1,
                scrollTrigger: {
                    trigger: slide,
                    containerAnimation: tween,
                    start: "left right",
                    end: "center center",
                    scrub: true
                }
            }
        );
    });

    // Chapter 05: Leadership
    gsap.utils.toArray('.leader-portrait').forEach((portrait) => {
        gsap.fromTo(portrait,
            { y: 100, opacity: 0, scale: 0.9 },
            {
                y: 0, opacity: 1, scale: 1,
                scrollTrigger: {
                    trigger: portrait,
                    containerAnimation: tween,
                    start: "left 80%",
                    end: "center center",
                    scrub: true
                }
            }
        );
    });

    // Chapter 07: Milestones (Vertical Scroll)
    gsap.utils.toArray('.panel-milestones .node').forEach((node) => {
        gsap.fromTo(node,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1,
                scrollTrigger: {
                    trigger: node,
                    start: "top 80%",
                    end: "top 40%",
                    scrub: true
                }
            }
        );
    });

});
