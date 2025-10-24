import styles from '../styles/StartScreen.module.css';
import ScoreBoard from './ScoreBoard';

export default function StartScreen({ onStart, scores }) {
  return (
    <div className={styles.startScreen}>
      <div className={styles.gameTitle}>
        <h1>2D 射击游戏</h1>
        <div className={styles.subtitle}>本地多人对战</div>
      </div>

      <div className={styles.controlsContainer}>
        <div className={styles.playerControls}>
          <h2 className={styles.player1Title}>玩家1 (蓝色)</h2>
          <div className={styles.controlGroup}>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>W</span>
              <span>向上移动</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>A</span>
              <span>向左移动</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>S</span>
              <span>向下移动</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>D</span>
              <span>向右移动</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>C</span>
              <span>射击</span>
            </div>
          </div>
        </div>

        <div className={styles.playerControls}>
          <h2 className={styles.player2Title}>玩家2 (红色)</h2>
          <div className={styles.controlGroup}>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>↑</span>
              <span>向上移动</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>←</span>
              <span>向左移动</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>↓</span>
              <span>向下移动</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>→</span>
              <span>向右移动</span>
            </div>
            <div className={styles.controlItem}>
              <span className={styles.controlKey}>空格</span>
              <span>射击</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.gameInfo}>
        <p>先得40分获胜！</p>
        <p>按ESC键退出游戏</p>
      </div>

      {scores && (scores.player1 > 0 || scores.player2 > 0) && (
        <div className={styles.previousScore}>
          <h3>上一场比赛</h3>
          <ScoreBoard player1Score={scores.player1} player2Score={scores.player2} />
        </div>
      )}

      <button className={styles.startButton} onClick={onStart}>
        开始游戏
      </button>
    </div>
  );
}