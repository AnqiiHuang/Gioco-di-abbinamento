// ===== 配置 =====
const STORAGE_KEY = "emoji_link_v1";

const SCORE_PER_MATCH = 100;
const HINT_PENALTY = 30;
const SHUFFLE_PENALTY = 20;
const TIME_BONUS_FACTOR = 8;

const BONUS_EMOJIS = [
  "🎯", "🎪", "🎭", "🎬", "🎤", "🎧", "🎼", "🎹",
  "🥇", "🎖️", "🏅", "🎗️", "🎁", "🎀", "🎊", "🎉",
  "✨", "💫", "🔮", "🪄", "🔔", "🎵", "🃏", "🀄",
];

const THEMES = {
  mixed: [
    "🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🍒", "🥝",
    "🐶", "🐱", "🐭", "🐰", "🦊", "🐻", "🐼", "🐨",
    "⚽", "🏀", "🎾", "🎸", "🎨", "🚀", "🌈", "⭐",
    "🍪", "🧁", "🍩", "🎈", "🦋", "🌸", "🍭", "💎",
    "🐹", "🐯", "🦁", "🍉", "🍌", "🎹", "🏈", "🎳",
    "🎯", "🎲", "🧩", "🪁", "🛸", "🌺", "🌻", "🎤",
    "🎧", "🏆",
  ],
  fruit: [
    "🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🍒", "🥝",
    "🍉", "🍌", "🥭", "🍍", "🥥", "🫐", "🍈", "🍏",
    "🍅", "🥑", "🌽", "🥕", "🫑", "🥒", "🍆", "🥦",
    "🧄", "🧅", "🥔", "🍠", "🫛", "🌶️", "🍄", "🥜",
    "🍐", "🫒", "🥬", "🫚", "🌰", "🫘", "🥗", "🍱",
    "🍙", "🍚", "🍲", "🍛", "🍜", "🥟", "🥠", "🫙",
    "🧃", "🍹",
  ],
  animals: [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
    "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔",
    "🐧", "🐦", "🐤", "🦆", "🦅", "🦉", "🐝", "🦋",
    "🐌", "🐞", "🐢", "🐍", "🦎", "🐙", "🐠", "🐬",
    "🦈", "🐋", "🦭", "🐡", "🦐", "🦞", "🦀", "🐊",
    "🦛", "🦏", "🐘", "🦒", "🦘", "🐪", "🦬", "🐐",
    "🦙", "🐿️",
  ],
  sweets: [
    "🍪", "🧁", "🍩", "🍰", "🎂", "🍫", "🍬", "🍭",
    "🍮", "🍯", "🧇", "🥞", "🍦", "🍧", "🍨", "🍡",
    "🥧", "🍢", "🍥", "🧋", "☕", "🍵", "🧃", "🥤",
    "🍹", "🍸", "🍷", "🍾", "🥛", "🍼", "🍱", "🍘",
    "🥐", "🥖", "🥨", "🫓", "🥯", "🧀", "🍳", "🥚",
    "🥮", "🍿", "🧈", "🫔", "🧉", "🫖", "🍚", "🍙",
    "🍛", "🍜",
  ],
  nature: [
    "🌸", "🌺", "🌻", "🌹", "🌷", "🌼", "💐", "🪻",
    "🌲", "🌳", "🌴", "🌵", "🍀", "🍁", "🍂", "🍃",
    "🌈", "⭐", "🌙", "☀️", "⛅", "🌊", "🏔️", "🌋",
    "🦋", "🐝", "🐞", "🌧️", "❄️", "🔥", "💧", "🌍",
    "🪨", "🪵", "🌾", "🌿", "☘️", "🪴", "🌱", "⛰️",
    "🏕️", "🏜️", "🏝️", "🌫️", "🌩️", "⚡", "🌅", "🌄",
    "🌀", "🌪️",
  ],
  sports: [
    "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱",
    "🏓", "🏸", "🥊", "🥋", "⛳", "🏹", "🎣", "🤿",
    "🛹", "🛼", "⛸️", "🎿", "🏂", "🪂", "🏋️", "🤸",
    "🚴", "🏊", "🤽", "🧗", "🏇", "🤺", "⛷️", "🏆",
    "🥎", "🏏", "🪃", "🥏", "🪀", "🏑", "🥍", "🛷",
    "🏄", "🚵", "🤾", "🏌️", "🧘", "🤼", "🎳", "🥌",
    "🎯", "🎮",
  ],
};

const LEVELS = [
  { id: 1, grid: 6, timeLimit: 0 },
  { id: 2, grid: 6, timeLimit: 240 },
  { id: 3, grid: 6, timeLimit: 180 },
  { id: 4, grid: 6, timeLimit: 120 },
  { id: 5, grid: 6, timeLimit: 90 },
  { id: 6, grid: 6, timeLimit: 60 },
  { id: 7, grid: 8, timeLimit: 0 },
  { id: 8, grid: 8, timeLimit: 360 },
  { id: 9, grid: 8, timeLimit: 300 },
  { id: 10, grid: 8, timeLimit: 240 },
  { id: 11, grid: 8, timeLimit: 180 },
  { id: 12, grid: 8, timeLimit: 120 },
];

// ===== 状态 =====
let gridSize = 6;
let gameMode = "free";
let currentLevelId = 1;
let currentTheme = "mixed";
let unlockedLevel = 1;
let highScores = {};
let soundEnabled = true;
let darkMode = false;

let board = [];
let selectedIndex = null;
let score = 0;
let elapsedSeconds = 0;
let countdownRemaining = null;
let timerInterval = null;
let isLocked = false;
let gameWon = false;
let gameLost = false;
let hintIndices = null;

// ===== DOM =====
const gameContainer = document.getElementById("game-container");
const boardEl = document.getElementById("board");
const pathLineEl = document.getElementById("path-line");
const soundToggle = document.getElementById("sound-toggle");
const themeModeToggle = document.getElementById("theme-mode-toggle");
const themePicker = document.getElementById("theme-picker");
const freePanel = document.getElementById("free-panel");
const levelPanel = document.getElementById("level-panel");
const levelListEl = document.getElementById("level-list");
const levelInfoEl = document.getElementById("level-info");
const restartBtn = document.getElementById("restart-btn");
const hintBtn = document.getElementById("hint-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const nextLevelBtn = document.getElementById("next-level-btn");
const retryBtn = document.getElementById("retry-btn");
const winActions = document.getElementById("win-actions");
const remainingEl = document.getElementById("remaining");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");
const messageEl = document.getElementById("message");
const modeBtns = document.querySelectorAll(".mode-btn");
const diffBtns = document.querySelectorAll(".diff-btn");

function getTotalCells() {
  return gridSize * gridSize;
}

function getActiveEmojis() {
  const base = THEMES[currentTheme] || THEMES.mixed;
  const needed = getTotalCells() / 2;
  const unique = [...new Set(base)];

  if (unique.length >= needed) {
    return shuffleArray(unique).slice(0, needed);
  }

  const combined = [...unique];
  for (const emoji of BONUS_EMOJIS) {
    if (combined.length >= needed) break;
    if (!combined.includes(emoji)) combined.push(emoji);
  }

  return shuffleArray(combined).slice(0, needed);
}

function getBoardLayout() {
  const styles = getComputedStyle(boardEl);
  const padding = parseFloat(styles.getPropertyValue("--board-padding"));
  const gap = parseFloat(styles.getPropertyValue("--board-gap"));
  return {
    padding: Number.isFinite(padding) ? padding : 12,
    gap: Number.isFinite(gap) ? gap : 8,
  };
}

function getCurrentLevel() {
  return LEVELS.find((l) => l.id === currentLevelId) || LEVELS[0];
}

function getScoreKey() {
  return gameMode === "free" ? `free-${gridSize}` : `level-${currentLevelId}`;
}

// ===== 本地存储 =====
function loadSettings() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (data.theme && THEMES[data.theme]) currentTheme = data.theme;
    if (typeof data.soundEnabled === "boolean") soundEnabled = data.soundEnabled;
    if (typeof data.darkMode === "boolean") darkMode = data.darkMode;
    if (data.gameMode) gameMode = data.gameMode;
    if (data.unlockedLevel) unlockedLevel = data.unlockedLevel;
    if (data.currentLevelId) currentLevelId = data.currentLevelId;
    if (data.highScores) highScores = data.highScores;
  } catch (_) {
    /* 忽略损坏数据 */
  }
}

function saveSettings() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      theme: currentTheme,
      soundEnabled,
      darkMode,
      gameMode,
      unlockedLevel,
      currentLevelId,
      highScores,
    })
  );
}

function getHighScore(key) {
  return highScores[key] || null;
}

function saveHighScore(key, newScore, time) {
  const prev = getHighScore(key);
  if (!prev || newScore > prev.score) {
    highScores[key] = {
      score: newScore,
      time,
      date: new Date().toISOString().slice(0, 10),
    };
    saveSettings();
    return true;
  }
  return false;
}

// ===== 音效 =====
let audioCtx = null;

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
}

function cuteBoop(startFreq, endFreq, duration, volume = 0.12, wave = "sine", delay = 0) {
  const t = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = wave;
  osc.frequency.setValueAtTime(startFreq, t);
  osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 1), t + duration * 0.75);
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(volume, t + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

function cuteNote(freq, duration, volume = 0.1, wave = "sine", delay = 0) {
  const t = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = wave;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(volume, t + 0.01);
  gain.gain.setValueAtTime(volume * 0.7, t + duration * 0.6);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    ensureAudio();
    if (type === "select") cuteBoop(380, 620, 0.07, 0.1);
    else if (type === "match") {
      cuteNote(523, 0.1, 0.11, "sine", 0);
      cuteNote(659, 0.1, 0.11, "sine", 0.09);
      cuteNote(784, 0.14, 0.13, "sine", 0.18);
    } else if (type === "mismatch") cuteBoop(350, 180, 0.22, 0.08, "triangle");
    else if (type === "hint") {
      [1047, 1319, 1568].forEach((f, i) => cuteNote(f, 0.08, 0.07, "triangle", i * 0.07));
    } else if (type === "shuffle") {
      [400, 500, 600, 700, 800].forEach((f, i) => cuteBoop(f, f + 100, 0.06, 0.07, "sine", i * 0.05));
    } else if (type === "win") {
      [523, 587, 659, 784, 880, 1047].forEach((f, i) => cuteNote(f, 0.15, 0.1, "sine", i * 0.13));
      cuteBoop(1047, 1319, 0.3, 0.12, "sine", 0.78);
    } else if (type === "fail") {
      cuteBoop(400, 150, 0.35, 0.1, "triangle");
    } else if (type === "restart") {
      cuteNote(392, 0.08, 0.1, "sine", 0);
      cuteNote(494, 0.1, 0.1, "sine", 0.07);
      cuteNote(587, 0.16, 0.11, "sine", 0.15);
    }
  } catch (_) {}
}

// ===== UI 刷新 =====
function refreshThemeOptions() {
  themePicker.querySelectorAll("option").forEach((opt) => {
    if (opt.dataset.i18n) opt.textContent = t(opt.dataset.i18n);
  });
}

function updateSoundToggle() {
  soundToggle.textContent = soundEnabled ? t("soundOn") : t("soundOff");
  soundToggle.setAttribute("aria-pressed", soundEnabled);
}

function applyDarkMode() {
  document.body.classList.toggle("dark-mode", darkMode);
  themeModeToggle.textContent = darkMode ? t("btnLight") : t("btnDark");
  themeModeToggle.setAttribute("aria-pressed", darkMode);
}

function refreshBestScore() {
  const best = getHighScore(getScoreKey());
  bestScoreEl.textContent = best ? best.score : t("bestNone");
}

function updateLevelInfo() {
  const level = getCurrentLevel();
  const timeStr = level.timeLimit
    ? t("timeLimitSec", { s: level.timeLimit })
    : t("noTimeLimit");
  levelInfoEl.textContent = t("levelInfo", {
    n: level.id,
    grid: level.grid,
    time: timeStr,
  });
}

function renderLevelList() {
  levelListEl.innerHTML = "";
  LEVELS.forEach((level) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "level-btn";
    btn.textContent = level.id;
    if (level.id > unlockedLevel) {
      btn.classList.add("locked");
      btn.title = t("levelLocked");
      btn.disabled = true;
    }
    if (getHighScore(`level-${level.id}`)) btn.classList.add("completed");
    if (level.id === currentLevelId) btn.classList.add("active");
    btn.addEventListener("click", () => selectLevel(level.id));
    levelListEl.appendChild(btn);
  });
  updateLevelInfo();
}

function setGameMode(mode) {
  gameMode = mode;
  modeBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });
  freePanel.classList.toggle("hidden", mode !== "free");
  levelPanel.classList.toggle("hidden", mode !== "level");
  if (mode === "level") {
    gridSize = getCurrentLevel().grid;
    renderLevelList();
  }
  saveSettings();
  initGame();
}

function selectLevel(id) {
  if (id > unlockedLevel) return;
  currentLevelId = id;
  gridSize = getCurrentLevel().grid;
  renderLevelList();
  saveSettings();
  initGame();
}

function setDifficulty(size) {
  if (gameMode !== "free") return;
  gridSize = size;
  diffBtns.forEach((btn) => {
    btn.classList.toggle("active", Number(btn.dataset.size) === size);
  });
  initGame();
}

function hideWinActions() {
  winActions.classList.add("hidden");
  nextLevelBtn.classList.add("hidden");
  retryBtn.classList.add("hidden");
}

function showWinActions(showNext) {
  winActions.classList.remove("hidden");
  nextLevelBtn.classList.toggle("hidden", !showNext);
  retryBtn.classList.add("hidden");
}

function showRetryAction() {
  winActions.classList.remove("hidden");
  nextLevelBtn.classList.add("hidden");
  retryBtn.classList.remove("hidden");
}

// ===== 游戏初始化 =====
function initGame() {
  stopTimer();
  hideWinActions();

  if (gameMode === "level") {
    gridSize = getCurrentLevel().grid;
    const limit = getCurrentLevel().timeLimit;
    countdownRemaining = limit > 0 ? limit : null;
  } else {
    countdownRemaining = null;
  }

  board = createShuffledBoard();
  selectedIndex = null;
  score = 0;
  elapsedSeconds = 0;
  isLocked = false;
  gameWon = false;
  gameLost = false;
  hintIndices = null;
  messageEl.textContent = "";
  messageEl.classList.remove("win");
  clearPathLine();
  applyGridSize();
  updateUI();
  renderBoardAnimated();
}

function applyGridSize() {
  boardEl.className = `board size-${gridSize}`;
  gameContainer.classList.remove("size-8", "size-10");
  if (gridSize === 8) gameContainer.classList.add("size-8");
  if (gridSize === 10) gameContainer.classList.add("size-10");
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function hasGreedySolution(boardData, attempts = 4) {
  const guardLimit = boardData.length + 10;
  for (let a = 0; a < attempts; a++) {
    const trial = [...boardData];
    let guard = guardLimit;
    while (guard-- > 0) {
      if (trial.every((cell) => cell === null)) return true;
      const pairs = getAllConnectablePairs(trial);
      if (!pairs.length) break;
      const [i, j] = pairs[Math.floor(Math.random() * pairs.length)];
      trial[i] = null;
      trial[j] = null;
    }
  }
  return false;
}

function findAdjacentSamePairs(boardData) {
  const pairs = [];
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize - 1; c++) {
      const i = r * gridSize + c;
      const j = i + 1;
      if (boardData[i] !== null && boardData[i] === boardData[j]) {
        pairs.push([i, j]);
      }
    }
  }
  for (let r = 0; r < gridSize - 1; r++) {
    for (let c = 0; c < gridSize; c++) {
      const i = r * gridSize + c;
      const j = i + gridSize;
      if (boardData[i] !== null && boardData[i] === boardData[j]) {
        pairs.push([i, j]);
      }
    }
  }
  return pairs;
}

function createSequentialPairBoard(pairs) {
  const board = new Array(getTotalCells()).fill(null);
  pairs.forEach((emoji, i) => {
    board[i] = emoji;
  });
  return board;
}

function scatterSolvableBoard(initialBoard, budgetMs) {
  const board = [...initialBoard];
  const total = board.length;
  const deadline = Date.now() + budgetMs;

  while (Date.now() < deadline) {
    const adjacent = findAdjacentSamePairs(board);
    let i;
    let j;
    if (adjacent.length > 0 && Math.random() < 0.75) {
      const pair = adjacent[Math.floor(Math.random() * adjacent.length)];
      i = pair[Math.random() < 0.5 ? 0 : 1];
      j = Math.floor(Math.random() * total);
    } else {
      i = Math.floor(Math.random() * total);
      j = Math.floor(Math.random() * total);
    }
    if (i === j || board[i] === null || board[j] === null || board[i] === board[j]) continue;

    const savedI = board[i];
    const savedJ = board[j];
    board[i] = savedJ;
    board[j] = savedI;

    if (hasGreedySolution(board)) continue;

    board[i] = savedI;
    board[j] = savedJ;
  }

  return board;
}

function createShuffledBoard() {
  const emojis = getActiveEmojis();
  const pairCount = getTotalCells() / 2;
  const pairs = [];
  for (let i = 0; i < pairCount; i++) {
    const emoji = emojis[i];
    pairs.push(emoji, emoji);
  }

  if (gridSize <= 6) {
    for (let attempt = 0; attempt < 120; attempt++) {
      const candidate = shuffleArray(pairs);
      if (isFullySolvable(candidate) || hasGreedySolution(candidate)) return candidate;
    }
  }

  const scatterBudget = gridSize >= 10 ? 900 : gridSize >= 8 ? 650 : 450;
  return scatterSolvableBoard(createSequentialPairBoard(pairs), scatterBudget);
}

// ===== 计时器 =====
function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    if (gameWon || gameLost) return;
    if (countdownRemaining !== null) {
      countdownRemaining--;
      updateTimerDisplay();
      if (countdownRemaining <= 0) handleTimeUp();
    } else {
      elapsedSeconds++;
      updateTimerDisplay();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  const display = countdownRemaining !== null ? countdownRemaining : elapsedSeconds;
  timerEl.textContent = formatTime(Math.max(0, display));
  timerEl.classList.remove("timer-warning", "timer-danger");
  if (countdownRemaining !== null) {
    if (countdownRemaining <= 10) timerEl.classList.add("timer-danger");
    else if (countdownRemaining <= 30) timerEl.classList.add("timer-warning");
  }
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function handleTimeUp() {
  gameLost = true;
  stopTimer();
  playSound("fail");
  messageEl.classList.remove("win");
  messageEl.textContent = t("msgTimeUp");
  hintBtn.disabled = true;
  shuffleBtn.disabled = true;
  showRetryAction();
}

// ===== 路径判断 =====
function indexToRC(index) {
  return { r: Math.floor(index / gridSize), c: index % gridSize };
}

function isPassable(boardData, r, c) {
  if (r < 0 || r >= gridSize || c < 0 || c >= gridSize) return true;
  return boardData[r * gridSize + c] === null;
}

function isTileAt(boardData, r, c) {
  if (r < 0 || r >= gridSize || c < 0 || c >= gridSize) return false;
  return boardData[r * gridSize + c] !== null;
}

function lineClearHorizontalBetween(boardData, row, c1, c2) {
  const minC = Math.min(c1, c2);
  const maxC = Math.max(c1, c2);
  for (let c = minC + 1; c < maxC; c++) {
    if (!isPassable(boardData, row, c)) return false;
  }
  return true;
}

function lineClearVerticalBetween(boardData, col, r1, r2) {
  const minR = Math.min(r1, r2);
  const maxR = Math.max(r1, r2);
  for (let r = minR + 1; r < maxR; r++) {
    if (!isPassable(boardData, r, col)) return false;
  }
  return true;
}

function canConnect(boardData, i1, i2) {
  if (boardData[i1] === null || boardData[i2] === null) return false;
  if (boardData[i1] !== boardData[i2]) return false;
  if (i1 === i2) return false;

  const { r: r1, c: c1 } = indexToRC(i1);
  const { r: r2, c: c2 } = indexToRC(i2);

  if (r1 === r2 && lineClearHorizontalBetween(boardData, r1, c1, c2)) return true;
  if (c1 === c2 && lineClearVerticalBetween(boardData, c1, r1, r2)) return true;

  if (
    isPassable(boardData, r1, c2) &&
    lineClearHorizontalBetween(boardData, r1, c1, c2) &&
    lineClearVerticalBetween(boardData, c2, r1, r2)
  ) return true;

  if (
    isPassable(boardData, r2, c1) &&
    lineClearVerticalBetween(boardData, c1, r1, r2) &&
    lineClearHorizontalBetween(boardData, r2, c1, c2)
  ) return true;

  for (let c = -1; c <= gridSize; c++) {
    if (
      isPassable(boardData, r1, c) &&
      isPassable(boardData, r2, c) &&
      lineClearHorizontalBetween(boardData, r1, c1, c) &&
      lineClearVerticalBetween(boardData, c, r1, r2) &&
      lineClearHorizontalBetween(boardData, r2, c, c2)
    ) return true;
  }

  for (let r = -1; r <= gridSize; r++) {
    if (
      isPassable(boardData, r, c1) &&
      isPassable(boardData, r, c2) &&
      lineClearVerticalBetween(boardData, c1, r1, r) &&
      lineClearHorizontalBetween(boardData, r, c1, c2) &&
      lineClearVerticalBetween(boardData, c2, r, r2)
    ) return true;
  }

  return false;
}

function findPath(boardData, i1, i2) {
  const { r: r1, c: c1 } = indexToRC(i1);
  const { r: r2, c: c2 } = indexToRC(i2);

  function tryPath(points) {
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (a.r === b.r && !lineClearHorizontalBetween(boardData, a.r, a.c, b.c)) return null;
      if (a.c === b.c && !lineClearVerticalBetween(boardData, a.c, a.r, b.r)) return null;
    }
    return points;
  }

  if (r1 === r2 && lineClearHorizontalBetween(boardData, r1, c1, c2)) {
    return tryPath([{ r: r1, c: c1 }, { r: r2, c: c2 }]);
  }
  if (c1 === c2 && lineClearVerticalBetween(boardData, c1, r1, r2)) {
    return tryPath([{ r: r1, c: c1 }, { r: r2, c: c2 }]);
  }

  if (
    isPassable(boardData, r1, c2) &&
    lineClearHorizontalBetween(boardData, r1, c1, c2) &&
    lineClearVerticalBetween(boardData, c2, r1, r2)
  ) {
    return tryPath([{ r: r1, c: c1 }, { r: r1, c: c2 }, { r: r2, c: c2 }]);
  }
  if (
    isPassable(boardData, r2, c1) &&
    lineClearVerticalBetween(boardData, c1, r1, r2) &&
    lineClearHorizontalBetween(boardData, r2, c1, c2)
  ) {
    return tryPath([{ r: r1, c: c1 }, { r: r2, c: c1 }, { r: r2, c: c2 }]);
  }

  for (let c = -1; c <= gridSize; c++) {
    if (
      isPassable(boardData, r1, c) &&
      isPassable(boardData, r2, c) &&
      lineClearHorizontalBetween(boardData, r1, c1, c) &&
      lineClearVerticalBetween(boardData, c, r1, r2) &&
      lineClearHorizontalBetween(boardData, r2, c, c2)
    ) {
      return tryPath([
        { r: r1, c: c1 }, { r: r1, c }, { r: r2, c }, { r: r2, c: c2 },
      ]);
    }
  }

  for (let r = -1; r <= gridSize; r++) {
    if (
      isPassable(boardData, r, c1) &&
      isPassable(boardData, r, c2) &&
      lineClearVerticalBetween(boardData, c1, r1, r) &&
      lineClearHorizontalBetween(boardData, r, c1, c2) &&
      lineClearVerticalBetween(boardData, c2, r, r2)
    ) {
      return tryPath([
        { r: r1, c: c1 }, { r, c: c1 }, { r, c: c2 }, { r: r2, c: c2 },
      ]);
    }
  }

  return null;
}

function findHintPairOnBoard(boardData) {
  const indices = [];
  boardData.forEach((emoji, i) => {
    if (emoji !== null) indices.push(i);
  });
  for (let a = 0; a < indices.length; a++) {
    for (let b = a + 1; b < indices.length; b++) {
      if (canConnect(boardData, indices[a], indices[b])) {
        return [indices[a], indices[b]];
      }
    }
  }
  return null;
}

function getAllConnectablePairs(boardData) {
  const indices = [];
  boardData.forEach((emoji, i) => {
    if (emoji !== null) indices.push(i);
  });
  const pairs = [];
  for (let a = 0; a < indices.length; a++) {
    for (let b = a + 1; b < indices.length; b++) {
      const i = indices[a];
      const j = indices[b];
      if (boardData[i] === boardData[j] && canConnect(boardData, i, j)) {
        pairs.push([i, j]);
      }
    }
  }
  return pairs;
}

function boardKey(boardData) {
  return boardData.map((cell) => cell ?? ".").join("|");
}

function isFullySolvable(boardData, memo = new Map()) {
  const key = boardKey(boardData);
  if (memo.has(key)) return memo.get(key);

  const allCleared = boardData.every((cell) => cell === null);
  if (allCleared) {
    memo.set(key, true);
    return true;
  }

  const pairs = getAllConnectablePairs(boardData);
  for (const [i, j] of pairs) {
    const next = [...boardData];
    next[i] = null;
    next[j] = null;
    if (isFullySolvable(next, memo)) {
      memo.set(key, true);
      return true;
    }
  }

  memo.set(key, false);
  return false;
}

function findHintPair() {
  return findHintPairOnBoard(board);
}

function getBlockingTiles(boardData, i1, i2) {
  const blockers = [];
  const { r: r1, c: c1 } = indexToRC(i1);
  const { r: r2, c: c2 } = indexToRC(i2);

  if (r1 === r2) {
    const minC = Math.min(c1, c2);
    const maxC = Math.max(c1, c2);
    for (let c = minC + 1; c < maxC; c++) {
      const idx = r1 * gridSize + c;
      if (boardData[idx] !== null) blockers.push(idx);
    }
  }

  if (c1 === c2) {
    const minR = Math.min(r1, r2);
    const maxR = Math.max(r1, r2);
    for (let r = minR + 1; r < maxR; r++) {
      const idx = r * gridSize + c1;
      if (boardData[idx] !== null) blockers.push(idx);
    }
  }

  [[r1, c2], [r2, c1]].forEach(([r, c]) => {
    if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
      const idx = r * gridSize + c;
      if (boardData[idx] !== null && idx !== i1 && idx !== i2) blockers.push(idx);
    }
  });

  return [...new Set(blockers)];
}

function highlightPathBlockers(i1, i2) {
  const blockers = getBlockingTiles(board, i1, i2);
  const cells = boardEl.querySelectorAll(".cell");
  blockers.forEach((idx) => cells[idx]?.classList.add("path-blocked"));
  setTimeout(() => {
    blockers.forEach((idx) => cells[idx]?.classList.remove("path-blocked"));
  }, 900);
}

// ===== 渲染 =====
function renderBoard() {
  boardEl.innerHTML = "";
  board.forEach((emoji, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = index;
    if (emoji === null) {
      cell.classList.add("empty");
    } else {
      cell.textContent = emoji;
      if (hintIndices && hintIndices.includes(index)) cell.classList.add("hint");
    }
    boardEl.appendChild(cell);
  });
}

function renderBoardAnimated() {
  renderBoard();

  const cells = [...boardEl.querySelectorAll(".cell:not(.empty)")];
  boardEl.classList.add("board-dealing");

  const delayStep = gridSize >= 10 ? 10 : gridSize >= 8 ? 18 : 28;

  cells.forEach((cell, i) => {
    cell.classList.add("cell-deal");
    cell.style.animationDelay = `${i * delayStep}ms`;
  });

  const duration = cells.length * delayStep + 380;
  setTimeout(() => {
    boardEl.classList.remove("board-dealing");
    cells.forEach((cell) => {
      cell.classList.remove("cell-deal");
      cell.style.animationDelay = "";
    });
    startTimer();
  }, duration);
}

function drawPath(i1, i2) {
  const path = findPath(board, i1, i2);
  if (!path) return;
  clearPathLine();
  const { padding, gap } = getBoardLayout();
  const innerW = boardEl.clientWidth - padding * 2;
  const cellSize = (innerW - gap * (gridSize - 1)) / gridSize;
  const step = cellSize + gap;
  const points = path.map((p) => ({
    x: padding + p.c * step + cellSize / 2,
    y: padding + p.r * step + cellSize / 2,
  }));
  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", points.map((p) => `${p.x},${p.y}`).join(" "));
  polyline.setAttribute("fill", "none");
  pathLineEl.appendChild(polyline);
  setTimeout(clearPathLine, 500);
}

function clearPathLine() {
  pathLineEl.innerHTML = "";
}

function setSelectedVisual(index) {
  boardEl.querySelectorAll(".cell.selected").forEach((cell) => {
    cell.classList.remove("selected");
  });
  if (index !== null) {
    boardEl.querySelector(`.cell[data-index="${index}"]`)?.classList.add("selected");
  }
}

// ===== 交互 =====
function handleCellClick(index) {
  if (isLocked || gameWon || gameLost || board[index] === null) return;
  ensureAudio();
  const cells = boardEl.querySelectorAll(".cell");

  if (selectedIndex === null) {
    selectedIndex = index;
    setSelectedVisual(index);
    playSound("select");
    clearHint();
    return;
  }

  if (selectedIndex === index) {
    selectedIndex = null;
    setSelectedVisual(null);
    return;
  }

  const first = selectedIndex;
  const second = index;

  if (board[first] !== board[second]) {
    playSound("mismatch");
    cells[first].classList.add("mismatch");
    cells[second].classList.add("mismatch");
    setTimeout(() => {
      cells[first].classList.remove("mismatch");
      cells[second].classList.remove("mismatch");
      selectedIndex = null;
      setSelectedVisual(null);
    }, 400);
    return;
  }

  if (!canConnect(board, first, second)) {
    playSound("mismatch");
    messageEl.textContent = t("msgPathBlocked");
    cells[first].classList.add("mismatch");
    cells[second].classList.add("mismatch");
    highlightPathBlockers(first, second);
    setTimeout(() => {
      cells[first].classList.remove("mismatch");
      cells[second].classList.remove("mismatch");
      selectedIndex = null;
      setSelectedVisual(null);
      if (!gameWon && !gameLost) messageEl.textContent = "";
    }, 900);
    return;
  }

  eliminatePair(first, second);
}

function eliminatePair(first, second) {
  isLocked = true;
  selectedIndex = null;
  setSelectedVisual(null);
  clearHint();
  const cells = boardEl.querySelectorAll(".cell");
  cells[first].classList.add("removing", "locked");
  cells[second].classList.add("removing", "locked");
  playSound("match");
  drawPath(first, second);

  setTimeout(() => {
    board[first] = null;
    board[second] = null;
    score += SCORE_PER_MATCH;
    isLocked = false;
    updateUI();
    renderBoard();
    checkWin();
    checkDeadlock();
  }, 450);
}

function showHint() {
  if (isLocked || gameWon || gameLost) return;
  ensureAudio();
  const pair = findHintPair();
  if (!pair) {
    messageEl.textContent = t("msgNoPairs");
    return;
  }
  score = Math.max(0, score - HINT_PENALTY);
  hintIndices = pair;
  messageEl.textContent = t("msgHintUsed", { n: HINT_PENALTY });
  playSound("hint");
  updateUI();
  renderBoard();
  selectedIndex = null;
}

function clearHint() {
  if (hintIndices) {
    hintIndices = null;
    renderBoard();
  }
}

function shuffleRemaining() {
  if (isLocked || gameWon || gameLost) return;
  ensureAudio();

  const indices = [];
  const emojis = [];
  board.forEach((emoji, i) => {
    if (emoji !== null) {
      indices.push(i);
      emojis.push(emoji);
    }
  });

  if (emojis.length < 4) {
    messageEl.textContent = t("msgShuffleFew");
    return;
  }

  isLocked = true;
  shuffleBtn.disabled = true;

  let success = false;
  const snapshot = indices.map((idx) => board[idx]);

  for (let attempt = 0; attempt < 80; attempt++) {
    const shuffled = shuffleArray(snapshot);
    indices.forEach((idx, i) => { board[idx] = shuffled[i]; });
    if (hasGreedySolution(board) || isFullySolvable(board)) {
      success = true;
      break;
    }
  }

  if (!success) {
    indices.forEach((idx, i) => { board[idx] = snapshot[i]; });
    const budget = gridSize >= 10 ? 700 : gridSize >= 8 ? 500 : 350;
    scatterSolvableBoard(board, budget);
    success = hasGreedySolution(board);
  }

  if (!success) {
    isLocked = false;
    shuffleBtn.disabled = false;
    messageEl.textContent = t("msgShuffleFail");
    return;
  }

  score = Math.max(0, score - SHUFFLE_PENALTY);
  selectedIndex = null;
  clearHint();
  playSound("shuffle");
  boardEl.classList.add("shuffling");
  updateUI();
  renderBoard();

  setTimeout(() => {
    boardEl.classList.remove("shuffling");
    isLocked = false;
    shuffleBtn.disabled = gameWon || gameLost;
    messageEl.textContent = t("msgShuffled", { n: SHUFFLE_PENALTY });
    checkDeadlock();
  }, 450);
}

function updateUI() {
  remainingEl.textContent = board.filter((e) => e !== null).length;
  scoreEl.textContent = score;
  updateTimerDisplay();
  refreshBestScore();
  hintBtn.disabled = gameWon || gameLost;
  shuffleBtn.disabled = gameWon || gameLost;
  restartBtn.disabled = false;
}

function checkWin() {
  if (!board.every((e) => e === null)) return;

  gameWon = true;
  stopTimer();

  const timeUsed = countdownRemaining !== null
    ? getCurrentLevel().timeLimit - countdownRemaining
    : elapsedSeconds;

  const timeBonus = Math.max(0, 1000 - timeUsed * TIME_BONUS_FACTOR);
  score += timeBonus;
  scoreEl.textContent = score;

  const isNewRecord = saveHighScore(getScoreKey(), score, timeUsed);
  refreshBestScore();
  playSound("win");
  messageEl.classList.add("win");

  if (gameMode === "level") {
    let unlockMsg = "";
    if (currentLevelId >= unlockedLevel && currentLevelId < LEVELS.length) {
      unlockedLevel = currentLevelId + 1;
      saveSettings();
      unlockMsg = " " + t("msgLevelUnlock", { n: unlockedLevel });
    }
    messageEl.textContent =
      t("msgLevelWin", { n: currentLevelId, score }) +
      unlockMsg +
      (isNewRecord ? " " + t("msgNewRecord") : "");
    renderLevelList();

    const canPlayNext =
      currentLevelId < LEVELS.length && currentLevelId + 1 <= unlockedLevel;
    showWinActions(canPlayNext);
    if (canPlayNext) messageEl.textContent += " " + t("msgNextLevel");
  } else {
    messageEl.textContent =
      t("msgWin", { time: formatTime(timeUsed), bonus: timeBonus }) +
      (isNewRecord ? " " + t("msgNewRecord") : "");
  }

  hintBtn.disabled = true;
  shuffleBtn.disabled = true;
}

function checkDeadlock() {
  if (gameWon || gameLost) return;
  if (!findHintPair()) {
    messageEl.textContent = t("msgDeadlock");
  } else if (
    messageEl.textContent === t("msgDeadlock") ||
    messageEl.textContent === t("msgNoPairs")
  ) {
    messageEl.textContent = "";
  }
}

function goNextLevel() {
  if (currentLevelId < LEVELS.length) {
    currentLevelId++;
    saveSettings();
    renderLevelList();
    initGame();
  }
}

// ===== 事件 =====
function handleBoardClick(event) {
  const cell = event.target.closest(".cell:not(.empty)");
  if (!cell || !boardEl.contains(cell)) return;
  const index = Number(cell.dataset.index);
  if (!Number.isFinite(index)) return;
  handleCellClick(index);
}

boardEl.addEventListener("click", handleBoardClick);

function handleRestart() {
  ensureAudio();
  playSound("restart");
  initGame();
}

restartBtn.addEventListener("click", handleRestart);
hintBtn.addEventListener("click", showHint);
shuffleBtn.addEventListener("click", shuffleRemaining);
nextLevelBtn.addEventListener("click", goNextLevel);
retryBtn.addEventListener("click", handleRestart);

modeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.mode !== gameMode) setGameMode(btn.dataset.mode);
  });
});

diffBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const size = Number(btn.dataset.size);
    if (size !== gridSize) setDifficulty(size);
  });
});

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  updateSoundToggle();
  saveSettings();
  if (soundEnabled) playSound("select");
});

themeModeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  applyDarkMode();
  saveSettings();
});

themePicker.addEventListener("change", () => {
  currentTheme = themePicker.value;
  saveSettings();
  initGame();
});

// ===== 启动 =====
loadSettings();
themePicker.value = currentTheme;
diffBtns.forEach((btn) => {
  btn.classList.toggle("active", Number(btn.dataset.size) === gridSize);
});
modeBtns.forEach((btn) => {
  btn.classList.toggle("active", btn.dataset.mode === gameMode);
});
freePanel.classList.toggle("hidden", gameMode !== "free");
levelPanel.classList.toggle("hidden", gameMode !== "level");

applyI18n();
refreshThemeOptions();
updateSoundToggle();
applyDarkMode();
renderLevelList();

if (gameMode === "level") {
  gridSize = getCurrentLevel().grid;
} else {
  gridSize = Number(document.querySelector(".diff-btn.active")?.dataset.size || 6);
}

initGame();
