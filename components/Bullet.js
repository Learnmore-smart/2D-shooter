import styles from '../styles/Bullet.module.css';

export default function Bullet({ x, y, direction, owner }) {
  const ownerClass = owner === 1 ? styles.player1Bullet : styles.player2Bullet;

  return (
    <div
      className={`${styles.bullet} ${ownerClass}`}
      style={{
        left: `${x - 5}px`,
        top: `${y - 5}px`,
      }}
    />
  );
}