'use client';

import { useState, useEffect, useRef } from 'react';
import Game from '../components/Game';
import StartScreen from '../components/StartScreen';
import GameOver from '../components/GameOver';
import styles from '../styles/Game.module.css';

export default function Home() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  
  const handleStartGame = () => {
    setGameState('playing');
    setWinner(null);
  };
  
  const handleGameOver = (winner) => {
    setWinner(winner);
    setGameState('gameOver');
  };
  
  const handleRestart = () => {
    setGameState('start');
    setWinner(null);
  };
  
  const handleExit = () => {
    setGameState('start');
  };
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && gameState === 'playing') {
        handleExit();
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
        
        {gameState === 'gameOver' && (
          <GameOver winner={winner} onRestart={handleRestart} scores={scores} />
        )}
      </div>
    </div>
  );
}