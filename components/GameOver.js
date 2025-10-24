import styles from '../styles/GameOver.module.css';
import ScoreBoard from './ScoreBoard';

export default function GameOver({ winner, onRestart, scores }) {
  const winnerName = winner === 'player1' ? '玩家1 (蓝色)' : '玩家2 (红色)';
  const winnerClass = winner === 'player1' ? styles.player1Winner : styles.player2Winner;
  
  return (
    <div className={styles.gameOverScreen}>
      <div className={styles.gameOverContent}>
        <h1 className={styles.gameOverTitle}>游戏结束</h1>
        
        <div className={`${styles.winnerAnnouncement} ${winnerClass}`}>
          <div className={styles.winnerLabel}>获胜者</div>
          <div className={styles.winnerName}>{winnerName}</div>
        </div>
        
        <div className={styles.finalScore}>
          <h3>最终得分</h3>
          <ScoreBoard player1Score={scores.player1} player2Score={scores.player2} />
        </div>
        
        <div className={styles.gameOverActions}>
          <button className={styles.restartButton} onClick={onRestart}>
            再玩一次
          </button>
        </div>
      </div>
    </div>
  );
}