# 2D Shooter Game

A local multiplayer 2D shooting game built with Next.js, React, and JavaScript.

## Game Features

- Two-player local multiplayer gameplay
- Smooth 60 FPS performance
- Health system with respawn mechanics
- Score tracking
- Pause functionality
- Retro gaming aesthetic

## How to Play

### Player 1 (Blue)
- **Movement:** WASD keys
- **Shoot:** Q key
- **Starting Position:** Left side

### Player 2 (Red)
- **Movement:** Arrow keys (↑↓←→)
- **Shoot:** Spacebar
- **Starting Position:** Right side

### Game Rules
- First player to score 10 points wins
- Players respawn after 3 seconds when eliminated
- Press ESC to pause during gameplay

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Game Controls

- **ESC:** Pause/Resume game
- **Click Start Button:** Begin new game
- **Click Play Again:** Restart after game over

## Technical Implementation

- Built with Next.js 14 and React 18
- Uses requestAnimationFrame for smooth game loop
- CSS Modules for component-specific styling
- Frame-independent movement with delta time
- Efficient collision detection
- Component-based architecture for maintainability

## Performance Optimizations

- Limited bullet count on screen
- Efficient collision detection
- Clean event listener management
- Optimized rendering with React state management