import { useState, useEffect } from 'react';
import './styles/styles.css';

const Fly = ({ onDelete }) => {
  const [flies, setFlies] = useState([]);
  const [deletedCount, setDeletedCount] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const newFly = {
        id: Date.now(),
        x: Math.random() < 0.5 ? -50 : window.innerWidth + 50,
        y: Math.random() * window.innerHeight,
      };

      setFlies(prevFlies => [...prevFlies, newFly]);
    }, 1000 / speedMultiplier);

    return () => clearInterval(interval);
  }, [speedMultiplier]);

  useEffect(() => {localStorage.setItem('PontosJogoMosca', deletedCount)}, [deletedCount])

  useEffect(() => {
    const moveFlies = () => {
      setFlies(prevFlies =>
        prevFlies.map(fly => ({
          ...fly,
          x: fly.x + (window.innerWidth / 2 - fly.x) * (0.01 * speedMultiplier),
          y: fly.y + (window.innerHeight / 2 - fly.y) * (0.01 * speedMultiplier),
        }))
      );
    };

    const interval = setInterval(moveFlies, 16);

    return () => clearInterval(interval);
  }, [speedMultiplier]);

  const handleClick = id => {
    setFlies(prevFlies => prevFlies.filter(fly => fly.id !== id));
    setDeletedCount(prevCount => prevCount + 1);

    if (deletedCount + 1 !== 0 && (deletedCount + 1) % 2 === 0) {
      setSpeedMultiplier(prevMultiplier => prevMultiplier + 0.1);
    }

    onDelete();
  };

  useEffect(() => {
    const checkGameOver = () => {
      for (const fly of flies) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const distance = Math.sqrt((fly.x - centerX) ** 2 + (fly.y - centerY) ** 2);

        if (distance <= 100) {
          alert('Você perdeu!');
          setFlies([]);
          window.location.reload();
          break;
        }
      }
    };

    checkGameOver();
  }, [flies]);

  return (
    <>
      <div className="deleted-count">Divs Excluídas: {deletedCount}</div>
      {flies.map(fly => (
        <div
          key={fly.id}
          className={`container_fly ${fly.x < window.innerWidth / 2 ? '' : 'flipped'}`}
          style={{ left: fly.x + 'px', top: fly.y + 'px' }}
          onMouseEnter={() => handleClick(fly.id)}
        >
          <img src="/src/assets/Imgs/fly.png" alt="" />
        </div>
      ))}
    </>
  );
};

export default Fly;
