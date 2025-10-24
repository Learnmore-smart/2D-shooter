import styles from '../styles/StartScreen.module.css';
import ScoreBoard from './ScoreBoard';

export default function StartScreen({ onStart, scores }) {
  return (
    <div className={styles.startScreen}>
      <div className={styles.gameTitle}>
        <h1>2D SHOOTER</h1>
        <div className={styles.subtitle}>Local Multiplayer Battle</div>
      </div>
      
      <div className={styles.controlsContainer}>
        <div className={styles.playerControls}>
          <h2 className={styles.player1Title}>PLAYER 1 (BLUE)</h2>
          <div className={styles.controlGroup}>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>W</span>
              <span>Move Up</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>A</span>
              <span>Move Left</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>S</span>
              <span>Move Down</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>D</span>
              <span>Move Right</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>C</span>
              <span>Shoot</span>
            </div>
          </div>
        </div>
        
        <div className={styles.playerControls}>
          <h2 className={styles.player2Title}>PLAYER 2 (RED)</h2>
          <div className={styles.controlGroup}>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>↑</span>
              <span>Move Up</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>←</span>
              <span>Move Left</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>↓</span>
              <span>Move Down</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>→</span>
              <span>Move Right</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>SPACE</span>
              <span>Shoot</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.gameInfo}>
        <p>First to 10 points wins!</p>
        <p>Press ESC to pause during game</p>
      </div>
      
      {scores && (scores.player1 > 0 || scores.player2 > 0) && (
        <div className={styles.previousScore}>
          <h3>Previous Match</h3>
          <ScoreBoard player1Score={scores.player1} player2Score={scores.player2} />
        </div>
      )}
      
      <button className={styles.startButton} onClick={onStart}>
        START GAME
      </button>
    </div>
  );
}