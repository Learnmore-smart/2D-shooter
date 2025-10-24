'use client';

import { useState, useEffect, useRef } from 'react';
import Game from '../components/Game';
import StartScreen from '../components/StartScreen';
import GameOver from '../components/GameOver';
import styles from '../styles/Game.module.css';

export default function Home() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'paused', 'gameOver'
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  
  const handleStartGame = () => {
    setGameState('playing');
    setWinner(null);
  };
  
  const handleGameOver = (winner) => {
    setWinner(winner);
    setGameState('gameOver');
    if (winner === 'player1') {
      setScores(prev => ({ ...prev, player1: prev.player1 + 1 }));
    } else {
      setScores(prev => ({ ...prev, player2: prev.player2 + 1 }));
    }
  };
  
  const handleRestart = () => {
    setGameState('start');
    setWinner(null);
  };
  
  const handlePause = () => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  };
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        handlePause();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);
  
  return (
    <div className={styles.container}>
      <div className={styles.gameArea}>
        {gameState === 'start' && (
          <StartScreen onStart={handleStartGame} scores={scores} />
        )}
        
        {gameState === 'playing' && (
          <Game onGameOver={handleGameOver} />
        )}
        
        {gameState === 'paused' && (
          <div className={styles.pauseScreen}>
            <h2>PAUSED</h2>
            <p>Press ESC to resume</p>
          </div>
        )}
        
        {gameState === 'gameOver' && (
          <GameOver winner={winner} onRestart={handleRestart} scores={scores} />
        )}
      </div>
    </div>
  );
}