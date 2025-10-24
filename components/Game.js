'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Player from './Player';
import Bullet from './Bullet';
import ScoreBoard from './ScoreBoard';
import styles from '../styles/Game.module.css';

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 800;
const PLAYER_SIZE = 40;
const BULLET_SIZE = 10;
const BULLET_SPEED = 8;
const PLAYER_SPEED = 5;
const MAX_HEALTH = 10;
const RESPAWN_TIME = 3000; // 3 seconds

export default function Game({ onGameOver }) {
  const [player1, setPlayer1] = useState({
    x: 100,
    y: GAME_HEIGHT / 2,
    health: MAX_HEALTH,
    direction: 'right',
    isAlive: true,
    respawnTime: null
  });
  
  const [player2, setPlayer2] = useState({
    x: GAME_WIDTH - 100,
    y: GAME_HEIGHT / 2,
    health: MAX_HEALTH,
    direction: 'left',
    isAlive: true,
    respawnTime: null
  });
  
  const [bullets, setBullets] = useState([]);
  const [keys, setKeys] = useState({});
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  
  const gameAreaRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: true }));
    };
    
    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: false }));
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  // Check collision between two rectangles
  const checkCollision = (rect1, rect2) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };
  
  // Handle player shooting
  const handleShoot = useCallback((playerNum) => {
    const player = playerNum === 1 ? player1 : player2;
    if (!player.isAlive) return;
    
    const newBullet = {
      id: Date.now() + Math.random(),
      x: player.x,
      y: player.y,
      direction: player.direction,
      owner: playerNum,
      width: BULLET_SIZE,
      height: BULLET_SIZE,
      bounces: 0,
      maxBounces: 3
    };
    
    setBullets(prev => [...prev, newBullet]);
  }, [player1, player2]);
  
  // Game loop
  const gameLoop = useCallback((timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;
    
    // Update player 1 position
    setPlayer1(prev => {
      if (!prev.isAlive) {
        // Handle respawn
        if (prev.respawnTime && Date.now() > prev.respawnTime) {
          return {
            ...prev,
            x: 100,
            y: GAME_HEIGHT / 2,
            health: MAX_HEALTH,
            isAlive: true,
            respawnTime: null
          };
        }
        return prev;
      }
      
      let newX = prev.x;
      let newY = prev.y;
      let newDirection = prev.direction;
      
      // Player 1 movement (WASD)
      if (keys['w'] || keys['W']) {
        newY -= PLAYER_SPEED;
        newDirection = 'up';
      }
      if (keys['s'] || keys['S']) {
        newY += PLAYER_SPEED;
        newDirection = 'down';
      }
      if (keys['a'] || keys['A']) {
        newX -= PLAYER_SPEED;
        newDirection = 'left';
      }
      if (keys['d'] || keys['D']) {
        newX += PLAYER_SPEED;
        newDirection = 'right';
      }
      
      // Diagonal movement for Player 1
      if ((keys['w'] || keys['W']) && (keys['a'] || keys['A'])) {
        newDirection = 'upLeft';
      }
      if ((keys['w'] || keys['W']) && (keys['d'] || keys['D'])) {
        newDirection = 'upRight';
      }
      if ((keys['s'] || keys['S']) && (keys['a'] || keys['A'])) {
        newDirection = 'downLeft';
      }
      if ((keys['s'] || keys['S']) && (keys['d'] || keys['D'])) {
        newDirection = 'downRight';
      }
      
      // Boundary checking
      newX = Math.max(PLAYER_SIZE / 2, Math.min(GAME_WIDTH - PLAYER_SIZE / 2, newX));
      newY = Math.max(PLAYER_SIZE / 2, Math.min(GAME_HEIGHT - PLAYER_SIZE / 2, newY));
      
      // Player 1 shooting (C)
      if (keys['c'] || keys['C']) {
        handleShoot(1);
        setKeys(prevKeys => ({ ...prevKeys, 'c': false, 'C': false }));
      }
      
      return { ...prev, x: newX, y: newY, direction: newDirection };
    });
    
    // Update player 2 position
    setPlayer2(prev => {
      if (!prev.isAlive) {
        // Handle respawn
        if (prev.respawnTime && Date.now() > prev.respawnTime) {
          return {
            ...prev,
            x: GAME_WIDTH - 100,
            y: GAME_HEIGHT / 2,
            health: MAX_HEALTH,
            isAlive: true,
            respawnTime: null
          };
        }
        return prev;
      }
      
      let newX = prev.x;
      let newY = prev.y;
      let newDirection = prev.direction;
      
      // Player 2 movement (Arrow keys)
      if (keys['ArrowUp']) {
        newY -= PLAYER_SPEED;
        newDirection = 'up';
      }
      if (keys['ArrowDown']) {
        newY += PLAYER_SPEED;
        newDirection = 'down';
      }
      if (keys['ArrowLeft']) {
        newX -= PLAYER_SPEED;
        newDirection = 'left';
      }
      if (keys['ArrowRight']) {
        newX += PLAYER_SPEED;
        newDirection = 'right';
      }
      
      // Diagonal movement for Player 2
      if (keys['ArrowUp'] && keys['ArrowLeft']) {
        newDirection = 'upLeft';
      }
      if (keys['ArrowUp'] && keys['ArrowRight']) {
        newDirection = 'upRight';
      }
      if (keys['ArrowDown'] && keys['ArrowLeft']) {
        newDirection = 'downLeft';
      }
      if (keys['ArrowDown'] && keys['ArrowRight']) {
        newDirection = 'downRight';
      }
      
      // Boundary checking
      newX = Math.max(PLAYER_SIZE / 2, Math.min(GAME_WIDTH - PLAYER_SIZE / 2, newX));
      newY = Math.max(PLAYER_SIZE / 2, Math.min(GAME_HEIGHT - PLAYER_SIZE / 2, newY));
      
      // Player 2 shooting (Space)
      if (keys[' ']) {
        handleShoot(2);
        setKeys(prevKeys => ({ ...prevKeys, ' ': false }));
      }
      
      return { ...prev, x: newX, y: newY, direction: newDirection };
    });
    
    // Update bullets
    setBullets(prev => {
      const updatedBullets = prev.map(bullet => {
        let newX = bullet.x;
        let newY = bullet.y;
        let newDirection = bullet.direction;
        let newBounces = bullet.bounces;
        
        // Calculate next position
        let nextX = newX;
        let nextY = newY;
        
        switch (bullet.direction) {
          case 'up':
            nextY -= BULLET_SPEED;
            break;
          case 'down':
            nextY += BULLET_SPEED;
            break;
          case 'left':
            nextX -= BULLET_SPEED;
            break;
          case 'right':
            nextX += BULLET_SPEED;
            break;
          case 'upLeft':
            nextX -= BULLET_SPEED * 0.707;
            nextY -= BULLET_SPEED * 0.707;
            break;
          case 'upRight':
            nextX += BULLET_SPEED * 0.707;
            nextY -= BULLET_SPEED * 0.707;
            break;
          case 'downLeft':
            nextX -= BULLET_SPEED * 0.707;
            nextY += BULLET_SPEED * 0.707;
            break;
          case 'downRight':
            nextX += BULLET_SPEED * 0.707;
            nextY += BULLET_SPEED * 0.707;
            break;
        }
        
        // Check for wall collisions and handle bounces
        if (nextX <= BULLET_SIZE/2 || nextX >= GAME_WIDTH - BULLET_SIZE/2) {
          if (newBounces < bullet.maxBounces) {
            // Horizontal bounce - reverse horizontal component
            switch (bullet.direction) {
              case 'left':
                newDirection = 'right';
                break;
              case 'right':
                newDirection = 'left';
                break;
              case 'upLeft':
                newDirection = 'upRight';
                break;
              case 'downLeft':
                newDirection = 'downRight';
                break;
              case 'upRight':
                newDirection = 'upLeft';
                break;
              case 'downRight':
                newDirection = 'downLeft';
                break;
            }
            newBounces++;
            nextX = newX; // Don't update X this frame
          }
        }
        
        if (nextY <= BULLET_SIZE/2 || nextY >= GAME_HEIGHT - BULLET_SIZE/2) {
          if (newBounces < bullet.maxBounces) {
            // Vertical bounce - reverse vertical component
            switch (bullet.direction) {
              case 'up':
                newDirection = 'down';
                break;
              case 'down':
                newDirection = 'up';
                break;
              case 'upLeft':
                newDirection = 'downLeft';
                break;
              case 'downLeft':
                newDirection = 'upLeft';
                break;
              case 'upRight':
                newDirection = 'downRight';
                break;
              case 'downRight':
                newDirection = 'upRight';
                break;
            }
            newBounces++;
            nextY = newY; // Don't update Y this frame
          }
        }
        
        // Update position after bounce checks
        newX = nextX;
        newY = nextY;
        
        return { ...bullet, x: newX, y: newY, direction: newDirection, bounces: newBounces };
      });
      
      // Remove bullets that are out of bounds or have exceeded max bounces
      return updatedBullets.filter(
        bullet => 
          bullet.x > 0 && 
          bullet.x < GAME_WIDTH && 
          bullet.y > 0 && 
          bullet.y < GAME_HEIGHT &&
          bullet.bounces <= bullet.maxBounces
      );
    });
    
    // Check collisions between bullets and players
    setBullets(prev => {
      const remainingBullets = [];
      
      prev.forEach(bullet => {
        let hit = false;
        
        // Check collision with player 1
        if (bullet.owner !== 1 && player1.isAlive) {
          const player1Rect = {
            x: player1.x - PLAYER_SIZE / 2,
            y: player1.y - PLAYER_SIZE / 2,
            width: PLAYER_SIZE,
            height: PLAYER_SIZE
          };
          
          if (checkCollision(bullet, player1Rect)) {
            hit = true;
            setPlayer1(p => {
              const newHealth = p.health - 1;
              if (newHealth <= 0) {
                return {
                  ...p,
                  health: 0,
                  isAlive: false,
                  respawnTime: Date.now() + RESPAWN_TIME
                };
              }
              return { ...p, health: newHealth };
            });
            
            setScores(s => ({ ...s, player2: s.player2 + 1 }));
          }
        }
        
        // Check collision with player 2
        if (bullet.owner !== 2 && player2.isAlive && !hit) {
          const player2Rect = {
            x: player2.x - PLAYER_SIZE / 2,
            y: player2.y - PLAYER_SIZE / 2,
            width: PLAYER_SIZE,
            height: PLAYER_SIZE
          };
          
          if (checkCollision(bullet, player2Rect)) {
            hit = true;
            setPlayer2(p => {
              const newHealth = p.health - 1;
              if (newHealth <= 0) {
                return {
                  ...p,
                  health: 0,
                  isAlive: false,
                  respawnTime: Date.now() + RESPAWN_TIME
                };
              }
              return { ...p, health: newHealth };
            });
            
            setScores(s => ({ ...s, player1: s.player1 + 1 }));
          }
        }
        
        if (!hit) {
          remainingBullets.push(bullet);
        }
      });
      
      return remainingBullets;
    });
    
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [keys, player1, player2, handleShoot]);
  
  // Start game loop
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);
  
  // Check for game over
  useEffect(() => {
    if (scores.player1 >= 10) {
      onGameOver('player1');
    } else if (scores.player2 >= 10) {
      onGameOver('player2');
    }
  }, [scores, onGameOver]);
  
  return (
    <div className={styles.gameCanvas} ref={gameAreaRef}>
      <div className={`${styles.scoreDisplay} ${styles.player1Score}`}>
        P1: {scores.player1}
      </div>
      <div className={`${styles.scoreDisplay} ${styles.player2Score}`}>
        P2: {scores.player2}
      </div>
      
      {player1.isAlive && (
        <Player
          x={player1.x}
          y={player1.y}
          health={player1.health}
          maxHealth={MAX_HEALTH}
          direction={player1.direction}
          playerNum={1}
        />
      )}
      
      {player2.isAlive && (
        <Player
          x={player2.x}
          y={player2.y}
          health={player2.health}
          maxHealth={MAX_HEALTH}
          direction={player2.direction}
          playerNum={2}
        />
      )}
      
      {bullets.map(bullet => (
        <Bullet
          key={bullet.id}
          x={bullet.x}
          y={bullet.y}
          direction={bullet.direction}
          owner={bullet.owner}
        />
      ))}
    </div>
  );
}