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
          {["🎂 Първи рожден ден", "Християн", "26.09.2025 🎈"].map((text, i) => (
            <span key={i} className="fade-line" style={{ transitionDelay: `${i * 0.3}s` }}>
              {text}
              <br />
            </span>
          ))}
        </h1>
        <p className="fade-line" style={{ transitionDelay: "0.9s" }}>
          Каня Вас, скъпи приятели и роднини
          В този дълго чакан ден аз ще имам Ден Рожден!
          Ще съм слънчице засмяно, все пак ставам на годинка само.
          Торта вкусна с една свещичка сладко ще си хапнем всички!!!
          С песни, танци и игри, с детски грейнали очи
          искам в този ден и час, да празнувате с нас!
        </p>
        <p className="fade-line" style={{ transitionDelay: "1.2s" }}>
          Ще има изненади, игри и много забавления!
        </p>
      </div>

      <div
        ref={(el) => (contentRefs.current[1] = el)}
        data-index={1}
        className={`content-section ${visible[1] ? "visible" : ""}`}
      >
        <p><b>📅 Дата:</b> 26 Септември 2025</p>
        <p><b>📍 Час:</b> 17:00</p>
        <p><b>📍 Локация:</b> Ресторант Авокадо</p>
      </div>

      {/* Фиксиран бутон */}
      <button
        className="invite-button fixed bottom-5 left-1/2 transform -translate-x-1/2 z-10"
        onClick={() => setOpenModal(true)}
      >
        Потвърди присъствие
      </button>

      {openModal && <Modal onClose={() => setOpenModal(false)} />}
    </div>
  );
}