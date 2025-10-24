import styles from '../styles/Player.module.css';

export default function Player({ x, y, health, maxHealth, direction, playerNum }) {
  const playerClass = playerNum === 1 ? styles.player1 : styles.player2;
  const directionClass = styles[direction];
  
  return (
    <div 
      className={`${styles.player} ${playerClass} ${directionClass}`}
      style={{
        left: `${x - 20}px`,
        top: `${y - 20}px`,
      }}
    >
      <div className={styles.healthBar}>
        <div 
          className={styles.healthBarFill}
          style={{ 
            width: `${(health / maxHealth) * 100}%`,
            backgroundColor: playerNum === 1 ? '#4dabf7' : '#ff6b6b'
          }}
        />
      </div>
      <div className={styles.playerBody}>
        <div className={styles.playerGun}></div>
      </div>
    </div>
  );
}