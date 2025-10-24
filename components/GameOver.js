import styles from '../styles/GameOver.module.css';
import ScoreBoard from './ScoreBoard';

export default function GameOver({ winner, onRestart, scores }) {
  const winnerName = winner === 'player1' ? 'PLAYER 1 (BLUE)' : 'PLAYER 2 (RED)';
  const winnerClass = winner === 'player1' ? styles.player1Winner : styles.player2Winner;
  
  return (
    <div className={styles.gameOverScreen}>
      <div className={styles.gameOverContent}>
        <h1 className={styles.gameOverTitle}>GAME OVER</h1>
        
        <div className={`${styles.winnerAnnouncement} ${winnerClass}`}>
          <div className={styles.winnerLabel}>WINNER</div>
          <div className={styles.winnerName}>{winnerName}</div>
        </div>
        
        <div className={styles.finalScore}>
          <h3>FINAL SCORE</h3>
          <ScoreBoard player1Score={scores.player1} player2Score={scores.player2} />
        </div>
        
        <div className={styles.gameOverActions}>
          <button className={styles.restartButton} onClick={onRestart}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
}