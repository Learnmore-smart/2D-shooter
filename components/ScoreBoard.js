import styles from '../styles/ScoreBoard.module.css';

export default function ScoreBoard({ player1Score, player2Score }) {
  return (
    <div className={styles.scoreBoard}>
      <div className={`${styles.playerScore} ${styles.player1}`}>
        <div className={styles.playerName}>PLAYER 1</div>
        <div className={styles.score}>{player1Score}</div>
      </div>
      
      <div className={styles.vs}>VS</div>
      
      <div className={`${styles.playerScore} ${styles.player2}`}>
        <div className={styles.playerName}>PLAYER 2</div>
        <div className={styles.score}>{player2Score}</div>
      </div>
    </div>
  );
}