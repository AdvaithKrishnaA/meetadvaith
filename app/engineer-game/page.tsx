'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// Pixel art patterns (8x8 grids, 1 = black, 0 = transparent)
const PIXEL_PATTERNS = {
  player: [
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [0,1,0,1,1,0,1,0],
    [0,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,0,0],
    [0,0,1,1,1,1,0,0],
    [0,1,0,1,1,0,1,0],
    [0,1,0,0,0,0,1,0],
  ],
  playerShield: [
    [1,1,1,1,1,1,1,1],
    [1,0,1,1,1,1,0,1],
    [1,1,0,1,1,0,1,1],
    [1,1,1,1,1,1,1,1],
    [1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1],
    [1,1,0,1,1,0,1,1],
    [1,1,0,0,0,0,1,1],
  ],
  meeting: [
  [1,1,1,1,0,0,0,0],
  [1,1,1,1,0,0,0,0],
  [1,1,0,0,0,1,0,0],
  [1,1,0,0,0,0,1,0],
  [1,1,0,0,0,0,1,0],
  [1,1,0,0,0,1,0,0],
  [1,1,1,1,0,0,0,0],
  [1,1,1,1,0,0,0,0],
],
  bug: [
    [0,1,0,0,0,0,1,0],
    [0,0,1,0,0,1,0,0],
    [1,1,1,1,1,1,1,1],
    [0,1,0,1,1,0,1,0],
    [0,1,0,1,1,0,1,0],
    [1,1,1,1,1,1,1,1],
    [0,0,1,0,0,1,0,0],
    [0,1,0,0,0,0,1,0],
  ],
  salary: [
  [0,0,1,1,1,0,0,0],
  [0,1,1,0,0,1,1,0],
  [0,1,1,0,0,0,0,0],
  [0,0,1,1,1,1,0,0],
  [0,0,0,0,0,1,1,0],
  [0,1,1,0,0,1,1,0],
  [0,0,1,1,1,0,0,0],
  [0,0,0,1,1,0,0,0],
],
  promotion: [
    [0,0,0,1,1,0,0,0],
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [1,1,0,1,1,0,1,1],
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
  ],
  skill: [
    [1,1,1,1,1,1,1,0],
    [1,0,0,0,0,0,1,1],
    [1,0,1,1,1,0,1,1],
    [1,0,1,0,1,0,1,1],
    [1,0,1,1,1,0,1,1],
    [1,0,0,0,0,0,1,1],
    [1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,0],
  ],
}

interface GameObject {
  x: number
  y: number
  width: number
  height: number
  velocityX: number
}

interface Obstacle extends GameObject {
  type: 'meeting' | 'bug'
}

interface Pickup extends GameObject {
  type: 'salary' | 'promotion' | 'skill'
}

interface Player extends GameObject {
  velocityY: number
  isJumping: boolean
  hasShield: boolean
}

interface GameState {
  player: Player
  obstacles: Obstacle[]
  pickups: Pickup[]
  score: number
  salary: number
  level: number
  baseSpeed: number
  burnout: number
  streak: number
  gameOver: boolean
  paused: boolean
  started: boolean
  abilities: {
    shield: boolean
  }
  monthTimer: number
  lastSpawnX: number
}

const PIXEL_SIZE = 5
const PLAYER_SIZE = 8 * PIXEL_SIZE
const ITEM_SIZE = 8 * PIXEL_SIZE
const GRAVITY = 0.4
const JUMP_FORCE = -12
const BASE_SPEED = 5
const GROUND_HEIGHT = 60
const MIN_SPAWN_DISTANCE = 200
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 400

export default function TechRunnerPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<number | null>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 })
  
  const [gameState, setGameState] = useState<GameState>({
    player: {
      x: 80,
      y: 0,
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
      velocityX: 0,
      velocityY: 0,
      isJumping: false,
      hasShield: false,
    },
    obstacles: [],
    pickups: [],
    score: 0,
    salary: 0,
    level: 1,
    baseSpeed: BASE_SPEED,
    burnout: 0,
    streak: 0,
    gameOver: false,
    paused: false,
    started: false,
    abilities: {
      shield: false,
    },
    monthTimer: 0,
    lastSpawnX: 0,
  })

  // Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      const availableWidth = window.innerWidth - 32
      // Use CSS scaling for mobile - keep canvas at fixed logical size
      setDimensions({
        width: Math.min(availableWidth, 800),
        height: 300,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const groundY = CANVAS_HEIGHT - GROUND_HEIGHT - PLAYER_SIZE

  const startGame = useCallback(() => {
    setGameState({
      player: {
        x: 80,
        y: groundY,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
        velocityX: 0,
        velocityY: 0,
        isJumping: false,
        hasShield: false,
      },
      obstacles: [],
      pickups: [],
      score: 0,
      salary: 0,
      level: 1,
      baseSpeed: BASE_SPEED,
      burnout: 0,
      streak: 0,
      gameOver: false,
      paused: false,
      started: true,
      abilities: {
        shield: false,
      },
      monthTimer: 0,
      lastSpawnX: 0,
    })
  }, [groundY])

  const resetGame = useCallback(() => {
    startGame()
  }, [startGame])

  const spawnObstacle = useCallback((): Obstacle => {
    const types: Array<'meeting' | 'bug'> = ['meeting', 'bug']
    const type = types[Math.floor(Math.random() * types.length)]
    
    return {
      x: CANVAS_WIDTH,
      y: CANVAS_HEIGHT - GROUND_HEIGHT - ITEM_SIZE,
      width: ITEM_SIZE,
      height: ITEM_SIZE,
      type,
      velocityX: -BASE_SPEED,
    }
  }, [])

  const spawnPickup = useCallback((): Pickup => {
    const rand = Math.random()
    let type: 'salary' | 'promotion' | 'skill'
    if (rand < 0.85) {
      type = 'salary'
    } else if (rand < 0.95) {
      type = 'skill'
    } else {
      type = 'promotion'
    }
    
    const minHeight = CANVAS_HEIGHT - GROUND_HEIGHT - ITEM_SIZE - 100
    const maxHeight = CANVAS_HEIGHT - GROUND_HEIGHT - ITEM_SIZE - 30
    
    return {
      x: CANVAS_WIDTH,
      y: minHeight + Math.random() * (maxHeight - minHeight),
      width: ITEM_SIZE,
      height: ITEM_SIZE,
      type,
      velocityX: -BASE_SPEED,
    }
  }, [])

  const checkCollision = useCallback((a: GameObject, b: GameObject): boolean => {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    )
  }, [])

  const handleJump = useCallback(() => {
    setGameState(prev => {
      if (!prev.started) return prev
      if (prev.gameOver || prev.paused) return prev
      
      if (!prev.player.isJumping && prev.player.y >= groundY - 2) {
        return {
          ...prev,
          player: {
            ...prev.player,
            velocityY: JUMP_FORCE,
            isJumping: true,
          },
        }
      }
      
      return prev
    })
  }, [groundY])

  const updateGame = useCallback(() => {
    setGameState(prev => {
      if (!prev.started || prev.gameOver || prev.paused) return prev

      const newState = { ...prev }

      newState.player.velocityY += GRAVITY
      newState.player.y += newState.player.velocityY

      if (newState.player.y >= groundY) {
        newState.player.y = groundY
        newState.player.velocityY = 0
        newState.player.isJumping = false
      }

      newState.obstacles = newState.obstacles
        .map(obstacle => ({
          ...obstacle,
          x: obstacle.x + obstacle.velocityX,
        }))
        .filter(obstacle => obstacle.x > -obstacle.width)

      newState.pickups = newState.pickups
        .map(pickup => ({
          ...pickup,
          x: pickup.x + pickup.velocityX,
        }))
        .filter(pickup => pickup.x > -pickup.width)

      const allItems = [...newState.obstacles, ...newState.pickups]
      const rightmostX = allItems.length > 0 
        ? Math.max(...allItems.map(item => item.x))
        : 0

      if (Math.random() < 0.015) {
        if (rightmostX < CANVAS_WIDTH - MIN_SPAWN_DISTANCE) {
          newState.obstacles.push(spawnObstacle())
        }
      }

      if (Math.random() < 0.012) {
        if (rightmostX < CANVAS_WIDTH - MIN_SPAWN_DISTANCE) {
          newState.pickups.push(spawnPickup())
        }
      }

      for (const obstacle of newState.obstacles) {
        if (checkCollision(newState.player, obstacle)) {
          if (newState.player.hasShield) {
            newState.player.hasShield = false
            newState.abilities.shield = false
            newState.obstacles = newState.obstacles.filter(o => o !== obstacle)
          } else {
            if (obstacle.type === 'meeting') {
              newState.burnout += 20
            } else if (obstacle.type === 'bug') {
              newState.salary = Math.max(0, newState.salary - 50)
              newState.burnout += 25
            }
            
            newState.obstacles = newState.obstacles.filter(o => o !== obstacle)
            newState.streak = 0
            
            if (newState.burnout >= 100) {
              newState.gameOver = true
            }
          }
        }
      }

      for (const pickup of newState.pickups) {
        if (checkCollision(newState.player, pickup)) {
          newState.pickups = newState.pickups.filter(p => p !== pickup)
          
          const multiplier = Math.floor(newState.streak / 10) + 1
          
          switch (pickup.type) {
            case 'salary':
              newState.salary += 20 * multiplier
              newState.score += 10 * multiplier
              break
            case 'promotion':
              newState.level += 1
              newState.salary += 100
              newState.score += 50
              break
            case 'skill':
              newState.player.hasShield = true
              newState.abilities.shield = true
              setTimeout(() => {
                setGameState(s => ({ 
                  ...s, 
                  abilities: { ...s.abilities, shield: false },
                  player: { ...s.player, hasShield: false }
                }))
              }, 8000)
              break
          }
          
          newState.streak += 1
        }
      }

      newState.score += 1
      newState.monthTimer += 1
      
      if (newState.monthTimer >= 180) {
        newState.salary += newState.level * 10
        newState.monthTimer = 0
      }

      if (newState.burnout > 0) {
        newState.burnout = Math.max(0, newState.burnout - 0.05)
      }

      return newState
    })
  }, [groundY, spawnObstacle, spawnPickup, checkCollision])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.imageSmoothingEnabled = false

    const isDark = document.documentElement.classList.contains('dark')
    const bgColor = isDark ? '#09090b' : '#ffffff'
    const fgColor = isDark ? '#ffffff' : '#000000'

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    ctx.fillStyle = fgColor
    ctx.fillRect(0, CANVAS_HEIGHT - GROUND_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT)
    
    ctx.fillStyle = bgColor
    for (let x = 0; x < CANVAS_WIDTH; x += 20) {
      ctx.fillRect(x, CANVAS_HEIGHT - GROUND_HEIGHT + 5, 10, 2)
    }

    const pattern = gameState.player.hasShield ? PIXEL_PATTERNS.playerShield : PIXEL_PATTERNS.player
    ctx.fillStyle = fgColor
    for (let row = 0; row < pattern.length; row++) {
      for (let col = 0; col < pattern[row].length; col++) {
        if (pattern[row][col] === 1) {
          ctx.fillRect(
            gameState.player.x + col * PIXEL_SIZE,
            gameState.player.y + row * PIXEL_SIZE,
            PIXEL_SIZE,
            PIXEL_SIZE
          )
        }
      }
    }

    gameState.obstacles.forEach(obstacle => {
      const p = PIXEL_PATTERNS[obstacle.type]
      ctx.fillStyle = fgColor
      for (let row = 0; row < p.length; row++) {
        for (let col = 0; col < p[row].length; col++) {
          if (p[row][col] === 1) {
            ctx.fillRect(
              obstacle.x + col * PIXEL_SIZE,
              obstacle.y + row * PIXEL_SIZE,
              PIXEL_SIZE,
              PIXEL_SIZE
            )
          }
        }
      }
    })

    gameState.pickups.forEach(pickup => {
      const p = PIXEL_PATTERNS[pickup.type]
      ctx.fillStyle = fgColor
      for (let row = 0; row < p.length; row++) {
        for (let col = 0; col < p[row].length; col++) {
          if (p[row][col] === 1) {
            ctx.fillRect(
              pickup.x + col * PIXEL_SIZE,
              pickup.y + row * PIXEL_SIZE,
              PIXEL_SIZE,
              PIXEL_SIZE
            )
          }
        }
      }
    })

    if (gameState.started && !gameState.gameOver) {
      ctx.fillStyle = fgColor
      ctx.font = 'bold 14px monospace'
      ctx.fillText(`SCORE: ${gameState.score}`, 20, 25)
      ctx.fillText(`SALARY: $${gameState.salary}`, 20, 45)
      ctx.fillText(`LEVEL: ${gameState.level}`, 160, 25)
      ctx.fillText(`STREAK: ${gameState.streak}x`, 160, 45)
      
      const meterWidth = 100
      const meterHeight = 12
      const meterX = CANVAS_WIDTH - meterWidth - 15
      const meterY = 15
      
      ctx.strokeStyle = fgColor
      ctx.lineWidth = 2
      ctx.strokeRect(meterX, meterY, meterWidth, meterHeight)
      
      ctx.fillStyle = fgColor
      ctx.fillRect(meterX + 2, meterY + 2, (gameState.burnout / 100) * (meterWidth - 4), meterHeight - 4)
      
      ctx.font = '10px monospace'
      ctx.fillText('BURNOUT', meterX, meterY + meterHeight + 12)

      if (gameState.abilities.shield) {
        ctx.font = '12px monospace'
        ctx.fillText('◈ SHIELD', 300, 25)
      }
    }

    if (gameState.gameOver) {
      ctx.fillStyle = isDark ? 'rgba(9, 9, 11, 0.95)' : 'rgba(255, 255, 255, 0.95)'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      
      ctx.fillStyle = fgColor
      ctx.font = 'bold 36px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('BURNOUT!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50)
      
      ctx.font = '18px monospace'
      ctx.fillText(`SCORE: ${gameState.score}  |  SALARY: $${gameState.salary}  |  LEVEL: ${gameState.level}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
      
      ctx.font = '14px monospace'
      ctx.fillText('TAP OR PRESS [R] TO RESTART', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50)
      
      ctx.textAlign = 'left'
    }

    if (gameState.paused && !gameState.gameOver && gameState.started) {
      ctx.fillStyle = isDark ? 'rgba(9, 9, 11, 0.8)' : 'rgba(255, 255, 255, 0.8)'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      
      ctx.fillStyle = fgColor
      ctx.font = 'bold 36px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
      ctx.font = '14px monospace'
      ctx.fillText('PRESS [P] TO CONTINUE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40)
      ctx.textAlign = 'left'
    }
  }, [gameState, dimensions])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (!e.repeat) {
          if (!gameState.started) {
            startGame()
          } else {
            handleJump()
          }
        }
      } else if (e.code === 'Enter' && !gameState.started) {
        startGame()
      } else if (e.code === 'KeyR') {
        resetGame()
      } else if (e.code === 'KeyP' && gameState.started) {
        setGameState(prev => ({ ...prev, paused: !prev.paused }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleJump, gameState.gameOver, gameState.started, resetGame, startGame])

  // Touch controls for mobile - exclude UI elements
  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      
      // Don't handle touch if it's on a button, link, or interactive element
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('button') || 
          target.closest('a') ||
          target.closest('[role="button"]')) {
        return
      }
      
      e.preventDefault()
      if (!gameState.started) {
        startGame()
      } else if (gameState.gameOver) {
        resetGame()
      } else if (!gameState.paused) {
        handleJump()
      }
    }

    document.addEventListener('touchstart', handleTouch, { passive: false })
    return () => document.removeEventListener('touchstart', handleTouch)
  }, [handleJump, gameState.gameOver, gameState.started, gameState.paused, resetGame, startGame])

  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      updateGame()
      draw()
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [updateGame, draw])

  // Initialize player position
  useEffect(() => {
    if (dimensions.height > 0) {
      setGameState(prev => ({
        ...prev,
        player: {
          ...prev.player,
          y: groundY,
        }
      }))
    }
  }, [dimensions.height, groundY])

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center py-4 px-4">
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="mb-8 text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">
          ▓▒░ ENGINEER #099 ░▒▓
        </h1>
      </div>

      {/* Control Buttons */}
      {gameState.started && (
        <div className="mb-2 flex gap-2">
          <button
            onClick={() => setGameState(prev => ({ ...prev, paused: !prev.paused }))}
            className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-mono text-xs hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
          >
            {gameState.paused ? 'RESUME (P)' : 'PAUSE (P)'}
          </button>
          <button
            onClick={resetGame}
            className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-mono text-xs hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
          >
            RESTART (R)
          </button>
        </div>
      )}

      {/* Game Canvas */}
      <div className="relative w-full max-w-3xl">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="block border border-zinc-300 dark:border-zinc-700 touch-none w-full h-auto"
          style={{ imageRendering: 'pixelated' }}
          tabIndex={0}
        />
        
        {/* Start Screen Overlay */}
        {!gameState.started && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 dark:bg-zinc-950/95 p-4">
            
            <div className="grid grid-cols-2 gap-8 mb-4 text-xs font-mono max-w-md">
              <div>
                <div className="font-bold mb-1 text-zinc-900 dark:text-zinc-100 text-[10px]">✓ REWARDS</div>
                <div className="space-y-1 text-zinc-700 dark:text-zinc-300 text-[10px]">
                  <div className="flex items-center gap-1">
                    <PixelIcon pattern={PIXEL_PATTERNS.salary} size={20} />
                    <span>SALARY</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PixelIcon pattern={PIXEL_PATTERNS.promotion} size={20} />
                    <span>PROMOTION</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PixelIcon pattern={PIXEL_PATTERNS.skill} size={20} />
                    <span>SKILLS</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-bold mb-1 text-zinc-900 dark:text-zinc-100 text-[10px]">✗ OBSTACLES</div>
                <div className="space-y-1 text-zinc-700 dark:text-zinc-300 text-[10px]">
                  <div className="flex items-center gap-1">
                    <PixelIcon pattern={PIXEL_PATTERNS.meeting} size={20} />
                    <span>MEETING</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PixelIcon pattern={PIXEL_PATTERNS.bug} size={20} />
                    <span>BUG</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="mt-8 px-5 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono font-bold text-xs hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
            >
              START GAME
            </button>
            <p className="mt-2 text-[10px] text-zinc-500 font-mono">
              TAP or SPACE to jump
            </p>
          </div>
        )}
      </div>

      {/* Footer Instructions - only show when game is running */}
      {gameState.started && (
        <div className="mt-4 w-full max-w-3xl px-2">
          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] md:text-xs">
            <div>
              <div className="font-bold mb-1 text-zinc-900 dark:text-zinc-100">✓ REWARDS</div>
              <div className="space-y-0.5 text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-1">
                  <PixelIcon pattern={PIXEL_PATTERNS.salary} size={16} />
                  <span>SALARY</span>
                </div>
                <div className="flex items-center gap-1">
                  <PixelIcon pattern={PIXEL_PATTERNS.promotion} size={16} />
                  <span>PROMOTION</span>
                </div>
                <div className="flex items-center gap-1">
                  <PixelIcon pattern={PIXEL_PATTERNS.skill} size={16} />
                  <span>SKILLS (TEMP SHIELD)</span>
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-1 text-zinc-900 dark:text-zinc-100">✗ OBSTACLES</div>
              <div className="space-y-0.5 text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-1">
                  <PixelIcon pattern={PIXEL_PATTERNS.meeting} size={16} />
                  <span>MEETING</span>
                </div>
                <div className="flex items-center gap-1">
                  <PixelIcon pattern={PIXEL_PATTERNS.bug} size={16} />
                  <span>BUG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PixelIcon({ pattern, size = 24 }: { pattern: number[][], size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.imageSmoothingEnabled = false
    ctx.clearRect(0, 0, size, size)
    
    const isDark = document.documentElement.classList.contains('dark')
    ctx.fillStyle = isDark ? '#ffffff' : '#000000'
    
    const scale = size / 8
    for (let row = 0; row < pattern.length; row++) {
      for (let col = 0; col < pattern[row].length; col++) {
        if (pattern[row][col] === 1) {
          ctx.fillRect(col * scale, row * scale, scale, scale)
        }
      }
    }
  }, [pattern, size])
  
  return <canvas ref={canvasRef} width={size} height={size} className="shrink-0" style={{ imageRendering: 'pixelated' }} />
}