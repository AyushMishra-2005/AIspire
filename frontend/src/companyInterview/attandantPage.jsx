import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../components/ui/use-outside-click.jsx";

export function AttandantPage() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="min-h-screen w-screen overflow-x-hidden dark-mystic-bg">
      <h1 className="text-center text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text py-10 mt-[2rem]">
        Interview Results Overview
      </h1>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}>
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden">
              <motion.div layoutId={`image-${active.name}-${id}`} className="flex justify-center py-6">
                <img
                  width={120}
                  height={120}
                  src={active.src}
                  alt={active.name}
                  className="rounded-full object-cover h-32 w-32 border-4 border-white shadow-md" />
              </motion.div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start p-4 gap-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200">
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.email}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400">
                      {active.email}
                    </motion.p>
                    <p className="text-sm text-gray-500">Username: {active.username}</p>
                    <p className="text-sm font-semibold text-green-600">Score: {active.score}/100</p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.name}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.name}-${id}`}
            key={`card-${card.name}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 pr-8 flex flex-row items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
            <motion.div layoutId={`image-${card.name}-${id}`} className="flex justify-center">
              <img
                width={56}
                height={56}
                src={card.src}
                alt={card.name}
                className="h-14 w-14 rounded-full object-cover object-top" />
            </motion.div>
            <div className="flex flex-col">
              <motion.h3
                layoutId={`title-${card.name}-${id}`}
                className="font-medium text-neutral-800 dark:text-neutral-200">
                {card.name}
              </motion.h3>
              <motion.p
                layoutId={`description-${card.email}-${id}`}
                className="text-neutral-600 dark:text-neutral-400">
                {card.email}
              </motion.p>
              <p className="text-sm font-semibold text-green-600">Score: {card.score}/100</p>
            </div>
            <motion.button
              layoutId={`button-${card.name}-${id}`}
              className="mt-2 ml-auto px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black">
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    name: "Lana Del Rey",
    username: "lana_d",
    email: "lana@gmail.com",
    score: 85,
    src: "https://static.vecteezy.com/system/resources/thumbnails/003/492/180/small_2x/mulatto-woman-student-holding-book-in-her-hand-and-study-back-to-school-image-free-photo.jpg",
    ctaText: "View Result",
    ctaLink: "#",
    content: () => (
      <p>Lana Del Rey is a test candidate. Below are the results of her interview session. The AI evaluated responses based on fluency, topic knowledge, and confidence.</p>
    ),
  },
  {
    name: "Babbu Maan",
    username: "babbu_m",
    email: "babbu@gmail.com",
    score: 92,
    src: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    ctaText: "View Result",
    ctaLink: "#",
    content: () => (
      <p>Babbu Maan's interview shows strong leadership and analytical skills. See the full breakdown and individual scorecard inside.</p>
    ),
  },
  {
    name: "Metallica",
    username: "metallica",
    email: "metallica@gmail.com",
    score: 78,
    src: "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
    ctaText: "View Result",
    ctaLink: "#",
    content: () => (
      <p>Metallica's team interview demonstrates collaborative thinking. Download the PDF report for detailed insights and next steps.</p>
    ),
  },
];
