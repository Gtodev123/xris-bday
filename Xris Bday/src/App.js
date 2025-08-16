import React, { useState, useRef, useEffect } from "react";
import Balloons from "./Balloons";
import Confetti from "./Confetti";
import Modal from "./Modal";
import "./App.css";

export default function App() {
  const [openModal, setOpenModal] = useState(false);
  const contentRefs = useRef([]);
  const [visible, setVisible] = useState([]);


  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisible((prev) => {
              const newVis = [...prev];
              newVis[index] = true;
              return newVis;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    contentRefs.current.forEach((el) => el && observer.observe(el));
    return () => contentRefs.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  return (
    <div className="app">
      {/* Анимации зад контейнерите */}
      <div className="animations">
        <Balloons />
        <Confetti />
      </div>

      {/* Контейнери с текст */}
      <div
        ref={(el) => (contentRefs.current[0] = el)}
        data-index={0}
        className={`content-section ${visible[0] ? "visible" : ""}`}
      >
        <h1>
  <span className="fade-line" style={{ transitionDelay: `0s` }}>
    Първи рожден ден,
    <br />
  </span>
  <span className="fade-line" style={{ transitionDelay: `0.3s` }}>
    Християн
    <br />
  </span>
  <span className="fade-line date-small" style={{ transitionDelay: `0.6s` }}>
    26.09.2025
  </span>
</h1>
        <p className="fade-line" style={{ transitionDelay: "1s" }}>
  Каня Вас, скъпи приятели и роднини.
</p>
<p className="fade-line" style={{ transitionDelay: "1.2s" }}>
  В този дълго чакан ден аз ще имам Ден Рожден!
</p>
<p className="fade-line" style={{ transitionDelay: "1.4s" }}>
  Ще съм слънчице засмяно, все пак ставам на годинка само.
</p>
<p className="fade-line" style={{ transitionDelay: "1.6s" }}>
  Торта вкусна с една свещичка сладко ще си хапнем всички!!!
</p>
<p className="fade-line" style={{ transitionDelay: "1.8s" }}>
  С песни, танци и игри, с детски грейнали очи.
</p> 
<p className="fade-line" style={{ transitionDelay: "2s" }}>
  Искам в този ден и час, да празнувате с нас!
</p>
      </div>

      <div
        ref={(el) => (contentRefs.current[1] = el)}
        data-index={1}
        className={`content-section ${visible[1] ? "visible" : ""}`}
      >
        <h4><b>📅 Дата:</b> 26 Септември 2025</h4>
        <h4><b>⏰ Час:</b> 17:00</h4>
        <h4><b>📍 Локация:</b> Ресторант Авокадо</h4>
      </div>

      {/* Фиксиран бутон */}
      <button
  className="invite-button fixed bottom-5 left-1/2 transform -translate-x-1/2 z-10"
  onClick={() => setOpenModal(true)}
>
  Потвърди присъствие до 15.09
</button>

      {openModal && <Modal onClose={() => setOpenModal(false)} />}
    </div>
  );
}