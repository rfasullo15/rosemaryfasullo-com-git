'use client';

import { useEffect, useRef } from 'react';

const TILE = 48;
const COLS = 20;
const ROWS = 13;
const W = COLS * TILE;
const H = ROWS * TILE;
const PW = 28;
const PH = 36;
const SPEED = 176;
const GROW_SEC = 10;
const FORAGE_RESPAWN = 20;
const DAY_SECS = 90;

const STAGES = ['planted', 'sprout', 'growing', 'ready'];
const SLOT_SIZE = 40;
const SLOTS = 10;
const SLOT_GAP = 2;
const INV_PANEL_W = SLOTS * (SLOT_SIZE + SLOT_GAP) - SLOT_GAP + 12;
const INV_PANEL_X = (W - INV_PANEL_W) / 2;
const SLOT_START_X = INV_PANEL_X + 6;
const INV_PANEL_Y = H - 68;
const SLOT_Y = INV_PANEL_Y + 4;

// --- Inventory helpers -------------------------------------------------------

function makeInv() {
  const slots = Array.from({ length: SLOTS }, () => ({ type: null, count: 0 }));
  slots[0] = { type: 'seed', count: 5 };
  return slots;
}

function addItem(inv, type, count = 1) {
  const existing = inv.find(s => s.type === type);
  if (existing) { existing.count += count; return; }
  const empty = inv.find(s => s.type === null);
  if (empty) { empty.type = type; empty.count = count; }
}

function removeItem(inv, type, count = 1) {
  const slot = inv.find(s => s.type === type && s.count >= count);
  if (!slot) return false;
  slot.count -= count;
  if (slot.count === 0) slot.type = null;
  return true;
}

function countItem(inv, type) {
  return inv.reduce((sum, s) => s.type === type ? sum + s.count : sum, 0);
}

// --- Map builder -------------------------------------------------------------

function rng(c, r) {
  return ((Math.abs(c * 1664525 + r * 1013904223) >>> 0) % 100);
}

function buildMap() {
  return Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: COLS }, (_, c) => {
      if (c >= 1 && c <= 10 && r >= 1 && r <= 10)
        return { type: 'dirt', timer: 0, crop: null };
      if (c === 11)
        return { type: 'path', timer: 0, crop: null };
      if (c >= 12) {
        const n = rng(c, r);
        if (c >= 13 && n < 20) return { type: 'tree', timer: 0, crop: null };
        if (n < 35)            return { type: 'forage', timer: 0, crop: null };
        if (n < 50)            return { type: 'forage_berry', timer: 0, crop: null };
      }
      return { type: 'grass', timer: 0, crop: null };
    })
  );
}

// --- Tile drawing ------------------------------------------------------------

const BASE_COLORS = {
  grass: '#4a7c55', path: '#c8a86a',
  dirt: '#8b5e3c', tilled: '#5c3318',
  planted: '#5c3318', sprout: '#5c3318', growing: '#5c3318', ready: '#5c3318',
  forage: '#2a5a2a', forage_empty: '#4a4a30',
  forage_berry: '#265226', forage_berry_empty: '#3a3a26',
  tree: '#1a3818',
};

function drawTile(ctx, tile, x, y) {
  ctx.fillStyle = BASE_COLORS[tile.type] || '#4a7c55';
  ctx.fillRect(x, y, TILE, TILE);

  const cx = x + TILE / 2;

  if (tile.type === 'tilled') {
    ctx.strokeStyle = '#3a2010';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(x + 4, y + i * 12);
      ctx.lineTo(x + TILE - 4, y + i * 12);
      ctx.stroke();
    }
  }

  if (tile.type === 'planted') {
    ctx.fillStyle = '#8b6040';
    ctx.beginPath();
    ctx.arc(cx, y + 34, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  if (tile.type === 'sprout') {
    ctx.fillStyle = tile.crop === 'blueberry' ? '#70b8e0' : '#70c040';
    ctx.fillRect(cx - 2, y + 18, 4, 16);
    ctx.fillRect(cx - 7, y + 22, 10, 4);
  }

  if (tile.type === 'growing') {
    ctx.fillStyle = tile.crop === 'blueberry' ? '#3a90c0' : '#3ea818';
    ctx.fillRect(cx - 2, y + 10, 4, 26);
    ctx.fillRect(cx - 9, y + 14, 12, 5);
    ctx.fillRect(cx - 1, y + 22, 11, 5);
  }

  if (tile.type === 'ready') {
    if (tile.crop === 'blueberry') {
      ctx.fillStyle = '#3a90c0';
      ctx.fillRect(cx - 2, y + 14, 4, 24);
      for (const [bx, by] of [[-6, -4], [6, -4], [0, -12], [-9, -10], [9, -10]]) {
        ctx.fillStyle = '#3858d0';
        ctx.beginPath();
        ctx.arc(cx + bx, y + 16 + by, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#9090f0';
        ctx.beginPath();
        ctx.arc(cx + bx - 1, y + 14 + by, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = '#3ea818';
      ctx.fillRect(cx - 2, y + 12, 4, 26);
      ctx.fillStyle = '#e8c020';
      ctx.beginPath();
      ctx.arc(cx, y + 11, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f8e040';
      ctx.beginPath();
      ctx.arc(cx - 2, y + 8, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (tile.type === 'forage') {
    ctx.fillStyle = '#1e4a1e';
    ctx.beginPath();
    ctx.arc(cx, y + 30, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2a6a2a';
    for (const [bx, by] of [[-7, 22], [7, 22], [0, 17]]) {
      ctx.beginPath();
      ctx.arc(cx + bx, y + by, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const [fx, fy] of [[-5, 18], [6, 20], [0, 14], [-9, 24], [9, 24]]) {
      ctx.fillStyle = '#fffae0';
      ctx.beginPath();
      ctx.arc(cx + fx, y + fy, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f0c820';
      ctx.beginPath();
      ctx.arc(cx + fx, y + fy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (tile.type === 'forage_empty') {
    ctx.fillStyle = '#3a3820';
    ctx.beginPath();
    ctx.arc(cx, y + 28, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4a4830';
    for (const [bx, by] of [[-6, 21], [6, 21]]) {
      ctx.beginPath();
      ctx.arc(cx + bx, y + by, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (tile.type === 'forage_berry') {
    ctx.fillStyle = '#1a3e1a';
    ctx.beginPath();
    ctx.arc(cx, y + 30, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#246024';
    for (const [bx, by] of [[-8, 23], [8, 23], [0, 18]]) {
      ctx.beginPath();
      ctx.arc(cx + bx, y + by, 9, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const [bx, by] of [[-4, 20], [5, 21], [-8, 26], [8, 25], [0, 15], [-2, 28], [6, 16]]) {
      ctx.fillStyle = '#3050c8';
      ctx.beginPath();
      ctx.arc(cx + bx, y + by, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#8090e8';
      ctx.beginPath();
      ctx.arc(cx + bx - 1, y + by - 1, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (tile.type === 'forage_berry_empty') {
    ctx.fillStyle = '#2a3020';
    ctx.beginPath();
    ctx.arc(cx, y + 28, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3a3828';
    for (const [bx, by] of [[-6, 22], [6, 22]]) {
      ctx.beginPath();
      ctx.arc(cx + bx, y + by, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (tile.type === 'tree') {
    ctx.fillStyle = '#4a2e10';
    ctx.fillRect(cx - 6, y + 26, 12, 22);
    for (const [shade, offset] of [['#0e3010', 0], ['#165818', 4], ['#1e6e20', 8]]) {
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.moveTo(cx, y + 2 + offset);
      ctx.lineTo(cx + 20 - offset, y + 26);
      ctx.lineTo(cx - 20 + offset, y + 26);
      ctx.closePath();
      ctx.fill();
    }
  }

  ctx.strokeStyle = 'rgba(0,0,0,0.09)';
  ctx.lineWidth = 0.5;
  ctx.strokeRect(x, y, TILE, TILE);
}

// --- Player drawing ----------------------------------------------------------

function drawPlayer(ctx, p) {
  const x = Math.round(p.x);
  const y = Math.round(p.y);

  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.beginPath();
  ctx.ellipse(x + PW / 2, y + PH, 11, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#5080d0';
  ctx.fillRect(x + 4, y + 18, PW - 8, PH - 18);

  ctx.fillStyle = '#f5c08a';
  ctx.beginPath();
  ctx.arc(x + PW / 2, y + 13, 11, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#333';
  if (p.facing === 'down') {
    ctx.fillRect(x + PW / 2 - 5, y + 11, 3, 3);
    ctx.fillRect(x + PW / 2 + 2, y + 11, 3, 3);
  } else if (p.facing === 'left') {
    ctx.fillRect(x + PW / 2 - 6, y + 12, 3, 3);
  } else if (p.facing === 'right') {
    ctx.fillRect(x + PW / 2 + 3, y + 12, 3, 3);
  }
}

// --- Day-night overlay -------------------------------------------------------

function drawDayNight(ctx, t) {
  let nightAlpha = 0;
  let tintR = 200, tintG = 90, tintB = 20, tintAlpha = 0;

  if (t < 0.18) {
    nightAlpha = 0.55 - (t / 0.18) * 0.28;
  } else if (t < 0.28) {
    const p = (t - 0.18) / 0.10;
    nightAlpha = 0.27 - p * 0.27;
    tintAlpha = 0.18 * Math.sin(p * Math.PI);
  } else if (t < 0.67) {
    nightAlpha = 0;
  } else if (t < 0.77) {
    const p = (t - 0.67) / 0.10;
    nightAlpha = p * 0.27;
    tintR = 200; tintG = 70; tintB = 10;
    tintAlpha = 0.22 * Math.sin(p * Math.PI);
  } else if (t < 0.88) {
    nightAlpha = 0.27 + ((t - 0.77) / 0.11) * 0.28;
  } else {
    nightAlpha = 0.55;
  }

  if (tintAlpha > 0.01) {
    ctx.fillStyle = `rgba(${tintR},${tintG},${tintB},${tintAlpha.toFixed(3)})`;
    ctx.fillRect(0, 0, W, H);
  }
  if (nightAlpha > 0.01) {
    ctx.fillStyle = `rgba(5,10,30,${nightAlpha.toFixed(3)})`;
    ctx.fillRect(0, 0, W, H);
  }
}

// --- Clock -------------------------------------------------------------------

function drawClock(ctx, cx, cy, t) {
  const R = 14;
  ctx.fillStyle = '#110d06';
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#7a5020';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.strokeStyle = '#5a3a14';
  ctx.lineWidth = 1;
  for (let h = 0; h < 12; h++) {
    const a = (h / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.sin(a) * (R - 4), cy - Math.cos(a) * (R - 4));
    ctx.lineTo(cx + Math.sin(a) * (R - 1), cy - Math.cos(a) * (R - 1));
    ctx.stroke();
  }

  const angle = t * Math.PI * 2;
  const isDay = t > 0.2 && t < 0.8;
  ctx.strokeStyle = isDay ? '#f0c840' : '#8090d0';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.sin(angle) * (R - 4), cy - Math.cos(angle) * (R - 4));
  ctx.stroke();
  ctx.lineCap = 'butt';

  ctx.fillStyle = isDay ? '#f0c840' : '#8090d0';
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

// --- Inventory icons ---------------------------------------------------------

function drawItemIcon(ctx, type, cx, cy) {
  if (type === 'seed') {
    ctx.fillStyle = '#8b6040';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 4, 5, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#5c3a18';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#70c040';
    ctx.fillRect(cx - 1, cy - 8, 2, 9);
    ctx.fillRect(cx - 5, cy - 5, 6, 3);
  }

  if (type === 'blueberry_seed') {
    ctx.fillStyle = '#506090';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 4, 5, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#304878';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#78b8e0';
    ctx.fillRect(cx - 1, cy - 8, 2, 9);
    ctx.fillRect(cx - 5, cy - 5, 6, 3);
    ctx.fillStyle = '#4868c8';
    ctx.beginPath();
    ctx.arc(cx + 4, cy - 6, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  if (type === 'crop') {
    ctx.fillStyle = '#60a028';
    ctx.fillRect(cx - 1, cy - 8, 3, 18);
    ctx.fillStyle = '#e8c020';
    ctx.beginPath();
    ctx.arc(cx, cy - 9, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f8e050';
    ctx.beginPath();
    ctx.arc(cx - 2, cy - 12, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#a0d040';
    ctx.fillRect(cx - 8, cy - 3, 5, 3);
    ctx.fillRect(cx + 4, cy, 5, 3);
  }

  if (type === 'blueberry') {
    ctx.fillStyle = '#4a2e10';
    ctx.fillRect(cx - 1, cy - 11, 2, 7);
    for (const [bx, by] of [[-5, -3], [5, -3], [0, 5], [-7, 3], [7, 3]]) {
      ctx.fillStyle = '#3858d0';
      ctx.beginPath();
      ctx.arc(cx + bx, cy + by, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#9090f0';
      ctx.beginPath();
      ctx.arc(cx + bx - 1, cy + by - 1, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// --- HUD ---------------------------------------------------------------------

function drawHUD(ctx, s) {
  ctx.fillStyle = 'rgba(10,6,2,0.82)';
  ctx.fillRect(0, 0, W, 38);

  drawClock(ctx, 20, 20, s.dayTime);

  const timeLabel = s.dayTime < 0.22 ? 'Night'
    : s.dayTime < 0.30 ? 'Dawn'
    : s.dayTime < 0.68 ? 'Day'
    : s.dayTime < 0.78 ? 'Dusk' : 'Night';
  ctx.fillStyle = '#e8c878';
  ctx.font = 'bold 13px monospace';
  ctx.fillText(`Day ${s.day}`, 42, 25);
  ctx.fillStyle = '#999';
  ctx.font = '11px monospace';
  ctx.fillText(timeLabel, 95, 25);

  ctx.fillStyle = '#c8a050';
  ctx.font = '10px monospace';
  ctx.fillText('FARM', TILE + 4, 32);
  ctx.fillStyle = '#60b860';
  ctx.fillText('FOREST', 12 * TILE + 4, 32);

  ctx.strokeStyle = '#7a5020';
  ctx.lineWidth = 2;
  ctx.strokeRect(TILE, TILE, 10 * TILE, 10 * TILE);

  // Inventory panel
  ctx.fillStyle = 'rgba(10,6,2,0.84)';
  ctx.fillRect(INV_PANEL_X, INV_PANEL_Y, INV_PANEL_W, SLOT_SIZE + 12);
  ctx.strokeStyle = '#5a3a10';
  ctx.lineWidth = 1;
  ctx.strokeRect(INV_PANEL_X, INV_PANEL_Y, INV_PANEL_W, SLOT_SIZE + 12);

  for (let i = 0; i < SLOTS; i++) {
    const slot = s.inv[i];
    const sx = SLOT_START_X + i * (SLOT_SIZE + SLOT_GAP);

    ctx.fillStyle = slot.type ? '#2a1a08' : '#160e04';
    ctx.fillRect(sx, SLOT_Y, SLOT_SIZE, SLOT_SIZE);
    ctx.strokeStyle = '#4a2a08';
    ctx.lineWidth = 1;
    ctx.strokeRect(sx, SLOT_Y, SLOT_SIZE, SLOT_SIZE);

    if (slot.type && slot.count > 0) {
      drawItemIcon(ctx, slot.type, sx + SLOT_SIZE / 2, SLOT_Y + SLOT_SIZE / 2);
      ctx.fillStyle = '#e8d090';
      ctx.font = 'bold 9px monospace';
      ctx.fillText(String(slot.count), sx + SLOT_SIZE - 11, SLOT_Y + SLOT_SIZE - 3);
    }
  }

  ctx.fillStyle = 'rgba(10,6,2,0.72)';
  ctx.fillRect(0, H - 20, W, 20);
  ctx.fillStyle = '#666';
  ctx.font = '10px monospace';
  ctx.fillText('WASD: move   E: till dirt → plant seed → harvest   Flowers = seeds   Berries = blueberry seeds', 10, H - 6);
}

// --- Main component ----------------------------------------------------------

export default function FarmGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);

  if (!stateRef.current) {
    stateRef.current = {
      player: {
        x: 5 * TILE + (TILE - PW) / 2,
        y: 5 * TILE + (TILE - PH) / 2,
        facing: 'down',
      },
      map: buildMap(),
      inv: makeInv(),
      day: 1,
      dayTime: 0.35,
      keys: new Set(),
      lastTs: null,
      interactCD: 0,
    };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function getTile(c, r) {
      const s = stateRef.current;
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return null;
      return s.map[r][c];
    }

    function isSolid(c, r) {
      const t = getTile(c, r);
      return !t || t.type === 'tree';
    }

    function playerTile() {
      const p = stateRef.current.player;
      return {
        c: Math.floor((p.x + PW / 2) / TILE),
        r: Math.floor((p.y + PH / 2) / TILE),
      };
    }

    function interact() {
      const s = stateRef.current;
      if (s.interactCD > 0) return;
      const { c, r } = playerTile();
      const tile = getTile(c, r);
      if (!tile) return;

      if (tile.type === 'dirt') {
        tile.type = 'tilled';
        s.interactCD = 0.25;
      } else if (tile.type === 'tilled') {
        for (const seedType of ['seed', 'blueberry_seed']) {
          if (countItem(s.inv, seedType) > 0) {
            tile.type = 'planted';
            tile.crop = seedType === 'blueberry_seed' ? 'blueberry' : 'generic';
            tile.timer = 0;
            removeItem(s.inv, seedType);
            s.interactCD = 0.25;
            break;
          }
        }
      } else if (tile.type === 'ready') {
        addItem(s.inv, tile.crop === 'blueberry' ? 'blueberry' : 'crop');
        tile.type = 'dirt';
        tile.crop = null;
        tile.timer = 0;
        s.interactCD = 0.25;
      } else if (tile.type === 'forage') {
        addItem(s.inv, 'seed', 1 + Math.floor(Math.random() * 3));
        tile.type = 'forage_empty';
        tile.timer = 0;
        s.interactCD = 0.25;
      } else if (tile.type === 'forage_berry') {
        addItem(s.inv, 'blueberry_seed', 1 + Math.floor(Math.random() * 2));
        tile.type = 'forage_berry_empty';
        tile.timer = 0;
        s.interactCD = 0.25;
      }
    }

    function update(dt) {
      const s = stateRef.current;
      const { player, keys } = s;

      let vx = 0, vy = 0;
      if (keys.has('a') || keys.has('arrowleft'))  { vx -= SPEED; player.facing = 'left'; }
      if (keys.has('d') || keys.has('arrowright')) { vx += SPEED; player.facing = 'right'; }
      if (keys.has('w') || keys.has('arrowup'))    { vy -= SPEED; player.facing = 'up'; }
      if (keys.has('s') || keys.has('arrowdown'))  { vy += SPEED; player.facing = 'down'; }
      if (vx && vy) { vx *= 0.707; vy *= 0.707; }

      const nx = player.x + vx * dt;
      const r1 = Math.floor(player.y / TILE);
      const r2 = Math.floor((player.y + PH - 1) / TILE);
      if (!isSolid(Math.floor(nx / TILE), r1) &&
          !isSolid(Math.floor(nx / TILE), r2) &&
          !isSolid(Math.floor((nx + PW - 1) / TILE), r1) &&
          !isSolid(Math.floor((nx + PW - 1) / TILE), r2)) {
        player.x = Math.max(0, Math.min(W - PW, nx));
      }

      const ny = player.y + vy * dt;
      const c1 = Math.floor(player.x / TILE);
      const c2 = Math.floor((player.x + PW - 1) / TILE);
      if (!isSolid(c1, Math.floor(ny / TILE)) &&
          !isSolid(c2, Math.floor(ny / TILE)) &&
          !isSolid(c1, Math.floor((ny + PH - 1) / TILE)) &&
          !isSolid(c2, Math.floor((ny + PH - 1) / TILE))) {
        player.y = Math.max(0, Math.min(H - PH, ny));
      }

      if (s.interactCD > 0) s.interactCD -= dt;

      s.dayTime += dt / DAY_SECS;
      if (s.dayTime >= 1) { s.dayTime -= 1; s.day++; }

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const tile = s.map[r][c];
          const idx = STAGES.indexOf(tile.type);
          if (idx >= 0 && idx < STAGES.length - 1) {
            tile.timer += dt;
            if (tile.timer >= GROW_SEC) {
              tile.timer -= GROW_SEC;
              tile.type = STAGES[idx + 1];
            }
          }
          if (tile.type === 'forage_empty' || tile.type === 'forage_berry_empty') {
            tile.timer += dt;
            if (tile.timer >= FORAGE_RESPAWN) {
              tile.type = tile.type === 'forage_berry_empty' ? 'forage_berry' : 'forage';
              tile.timer = 0;
            }
          }
        }
      }
    }

    function draw() {
      const s = stateRef.current;
      ctx.clearRect(0, 0, W, H);
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++)
          drawTile(ctx, s.map[r][c], c * TILE, r * TILE);
      drawPlayer(ctx, s.player);
      drawDayNight(ctx, s.dayTime);
      drawHUD(ctx, s);
    }

    let rafId;
    function loop(ts) {
      const s = stateRef.current;
      if (!s.lastTs) s.lastTs = ts;
      const dt = Math.min((ts - s.lastTs) / 1000, 0.05);
      s.lastTs = ts;
      update(dt);
      draw();
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    function onKeyDown(e) {
      const k = e.key.toLowerCase();
      stateRef.current.keys.add(k);
      if (k === 'e') interact();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k))
        e.preventDefault();
    }
    function onKeyUp(e) {
      stateRef.current.keys.delete(e.key.toLowerCase());
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      style={{ display: 'block', border: '2px solid #1a0e04', cursor: 'default' }}
    />
  );
}
