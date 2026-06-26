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
  ],
  fruit: [
    "🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🍒", "🥝",
    "🍉", "🍌", "🥭", "🍍", "🥥", "🫐", "🍈", "🍏",
    "🍅", "🥑", "🌽", "🥕", "🫑", "🥒", "🍆", "🥦",
    "🧄", "🧅", "🥔", "🍠", "🫛", "🌶️", "🍄", "🥜",
  ],
  animals: [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
    "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔",
    "🐧", "🐦", "🐤", "🦆", "🦅", "🦉", "🐝", "🦋",
    "🐌", "🐞", "🐢", "🐍", "🦎", "🐙", "🐠", "🐬",
  ],
  sweets: [
    "🍪", "🧁", "🍩", "🍰", "🎂", "🍫", "🍬", "🍭",
    "🍮", "🍯", "🧇", "🥞", "🍦", "🍧", "🍨", "🍡",
    "🥧", "🍢", "🍥", "🧋", "☕", "🍵", "🧃", "🥤",
    "🍹", "🍸", "🍷", "🍾", "🥛", "🍼", "🍱", "🍘",
  ],
  nature: [
    "🌸", "🌺", "🌻", "🌹", "🌷", "🌼", "💐", "🪻",
    "🌲", "🌳", "🌴", "🌵", "🍀", "🍁", "🍂", "🍃",
    "🌈", "⭐", "🌙", "☀️", "⛅", "🌊", "🏔️", "🌋",
    "🦋", "🐝", "🐞", "🌧️", "❄️", "🔥", "💧", "🌍",
  ],
  sports: [
    "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱",
    "🏓", "🏸", "🥊", "🥋", "⛳", "🏹", "🎣", "🤿",
    "🛹", "🛼", "⛸️", "🎿", "🏂", "🪂", "🏋️", "🤸",
    "🚴", "🏊", "🤽", "🧗", "🏇", "🤺", "⛷️", "🏆",
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
let audioEnabled = true;
let darkMode = false;

let board = [];
let selectedIndex = null;
let score = 0;
let elapsedSeconds = 0;
let countdownRemaining = null;
let timerRafId = null;
let timerActive = false;
let timerLastFrame = 0;
let timerAccumulator = 0;
let isLocked = false;
let gameWon = false;
let gameLost = false;
let gameStarted = false;
let gamePaused = false;
let hintIndices = null;
let boardAnimTimer = null;

// ===== DOM =====
const gameContainer = document.getElementById("game-container");
const boardEl = document.getElementById("board");
const pathLineEl = document.getElementById("path-line");
const audioToggle = document.getElementById("audio-toggle");
const themeModeToggle = document.getElementById("theme-mode-toggle");
const themePicker = document.getElementById("theme-picker");
const freePanel = document.getElementById("free-panel");
const levelPanel = document.getElementById("level-panel");
const levelListEl = document.getElementById("level-list");
const levelInfoEl = document.getElementById("level-info");
const restartBtn = document.getElementById("restart-btn");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
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
const winModal = document.getElementById("win-modal");
const winModalText = document.getElementById("win-modal-text");
const winModalRecord = document.getElementById("win-modal-record");
const winModalNext = document.getElementById("win-modal-next");
const winModalRetry = document.getElementById("win-modal-retry");
const winModalClose = document.getElementById("win-modal-close");
const pauseOverlay = document.getElementById("pause-overlay");
const modeBtns = document.querySelectorAll(".mode-btn");
const diffBtns = document.querySelectorAll(".diff-btn");

function getTotalCells() {
  return gridSize * gridSize;
}

function getActiveEmojis() {
  const base = THEMES[currentTheme] || THEMES.mixed;
  const needed = getTotalCells() / 2;
  if (base.length >= needed) return base.slice(0, needed);

  const combined = [...base];
  for (const emoji of BONUS_EMOJIS) {
    if (combined.length >= needed) break;
    if (!combined.includes(emoji)) combined.push(emoji);
  }
  return combined.slice(0, needed);
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
    if (typeof data.audioEnabled === "boolean") {
      audioEnabled = data.audioEnabled;
    } else {
      const sound = typeof data.soundEnabled === "boolean" ? data.soundEnabled : true;
      const music = typeof data.musicEnabled === "boolean" ? data.musicEnabled : true;
      audioEnabled = sound && music;
    }
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
      audioEnabled,
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

function saveBestTime(key, time, score) {
  const prev = getHighScore(key);
  const prevTime = prev?.time ?? Infinity;
  if (!prev || time < prevTime) {
    highScores[key] = {
      time,
      score,
      date: new Date().toISOString().slice(0, 10),
    };
    saveSettings();
    return true;
  }
  return false;
}

// ===== 音效与背景音乐 =====
let audioCtx = null;
let bgmGain = null;
let bgmPlaying = false;
let bgmLoopTimer = null;

const BGM_BPM = 88;
const BGM_BEAT = 60 / BGM_BPM;
const BGM_VOLUME = 0.07;
const BGM_PROGRESSION = [
  { freqs: [261.63, 329.63, 392.0], mel: 523.25 },
  { freqs: [220.0, 261.63, 329.63], mel: 440.0 },
  { freqs: [174.61, 220.0, 261.63], mel: 392.0 },
  { freqs: [196.0, 246.94, 293.66], mel: 440.0 },
  { freqs: [261.63, 329.63, 392.0], mel: 587.33 },
  { freqs: [220.0, 261.63, 329.63], mel: 523.25 },
  { freqs: [174.61, 220.0, 261.63], mel: 349.23 },
  { freqs: [196.0, 246.94, 293.66], mel: 392.0 },
];

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  if (audioEnabled && !bgmPlaying && !document.hidden) startBgm();
}

function ensureBgmGain() {
  ensureAudio();
  if (!bgmGain) {
    bgmGain = audioCtx.createGain();
    bgmGain.gain.value = BGM_VOLUME;
    bgmGain.connect(audioCtx.destination);
  }
}

function playBgmChord(freqs, startTime, duration) {
  freqs.forEach((freq) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.045, startTime + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(bgmGain);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  });
}

function playBgmMelody(freq, startTime, duration) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.035, startTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(gain);
  gain.connect(bgmGain);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

function scheduleBgmLoop() {
  if (!audioEnabled || !bgmPlaying || !audioCtx) return;

  const start = audioCtx.currentTime + 0.05;
  const stepDuration = BGM_BEAT * 2;

  BGM_PROGRESSION.forEach((step, i) => {
    const time = start + i * stepDuration;
    playBgmChord(step.freqs, time, stepDuration * 0.92);
    playBgmMelody(step.mel, time + BGM_BEAT * 0.35, BGM_BEAT * 1.1);
  });

  const loopMs = BGM_PROGRESSION.length * stepDuration * 1000;
  bgmLoopTimer = setTimeout(scheduleBgmLoop, loopMs - 120);
}

function startBgm() {
  if (!audioEnabled || bgmPlaying || document.hidden) return;
  ensureBgmGain();
  bgmPlaying = true;
  bgmGain.gain.setValueAtTime(BGM_VOLUME, audioCtx.currentTime);
  scheduleBgmLoop();
}

function stopBgm() {
  bgmPlaying = false;
  if (bgmLoopTimer) {
    clearTimeout(bgmLoopTimer);
    bgmLoopTimer = null;
  }
  if (bgmGain && audioCtx) {
    bgmGain.gain.setValueAtTime(0, audioCtx.currentTime);
  }
}

function pauseBgm() {
  if (bgmGain && audioCtx) {
    bgmGain.gain.setValueAtTime(0, audioCtx.currentTime);
  }
}

function resumeBgm() {
  if (!audioEnabled || !bgmPlaying) return;
  if (bgmGain && audioCtx) {
    bgmGain.gain.setValueAtTime(BGM_VOLUME, audioCtx.currentTime);
  }
}

function duckBgm() {
  if (!bgmGain || !audioCtx || !bgmPlaying) return;
  const now = audioCtx.currentTime;
  bgmGain.gain.cancelScheduledValues(now);
  bgmGain.gain.setValueAtTime(BGM_VOLUME * 0.35, now);
  bgmGain.gain.linearRampToValueAtTime(BGM_VOLUME, now + 0.35);
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
  if (!audioEnabled) return;
  try {
    ensureAudio();
    duckBgm();
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

function updateAudioToggle() {
  audioToggle.textContent = audioEnabled ? t("audioOn") : t("audioOff");
  audioToggle.setAttribute("aria-pressed", audioEnabled);
}

function applyDarkMode() {
  document.body.classList.toggle("dark-mode", darkMode);
  themeModeToggle.textContent = darkMode ? t("btnLight") : t("btnDark");
  themeModeToggle.setAttribute("aria-pressed", darkMode);
}

function refreshBestScore() {
  const best = getHighScore(getScoreKey());
  bestScoreEl.textContent = best?.time != null ? formatTime(best.time) : t("bestNone");
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

function hideWinModal() {
  winModal.classList.add("hidden");
  winModalNext.classList.add("hidden");
  winModalRetry.classList.add("hidden");
  winModalRecord.classList.add("hidden");
}

function showWinModal({ timeUsed, isNewRecord, canPlayNext, isLevel }) {
  const timeStr = formatTime(timeUsed);
  if (isLevel) {
    winModalText.textContent = t("winLevelMessage", { n: currentLevelId, time: timeStr });
  } else {
    winModalText.textContent = t("winMessage", { time: timeStr });
  }
  winModalRecord.textContent = isNewRecord ? t("msgNewRecord") : "";
  winModalRecord.classList.toggle("hidden", !isNewRecord);
  winModalNext.classList.toggle("hidden", !canPlayNext);
  winModalRetry.classList.add("hidden");
  winModal.classList.remove("hidden");
}

function showFailModal() {
  winModalText.textContent = t("msgTimeUp");
  winModalRecord.classList.add("hidden");
  winModalNext.classList.add("hidden");
  winModalRetry.classList.remove("hidden");
  winModal.classList.remove("hidden");
}

function updatePauseOverlay() {
  pauseOverlay.classList.toggle("hidden", !gamePaused || gameWon || gameLost);
  boardEl.classList.toggle("board-paused", gamePaused && !gameWon && !gameLost);
}

function updateControlButtons() {
  const blocked = gameWon || gameLost || gamePaused;
  startBtn.disabled = gameStarted;
  pauseBtn.disabled = !gameStarted || gameWon || gameLost;
  pauseBtn.textContent = gamePaused ? t("btnResume") : t("btnPause");
  hintBtn.disabled = blocked;
  shuffleBtn.disabled = blocked;
  restartBtn.disabled = false;
}

function ensureGameRunning() {
  if (gameStarted || gameWon || gameLost) return;
  ensureAudio();
  gameStarted = true;
  gamePaused = false;
  startTimer();
  updatePauseOverlay();
  updateControlButtons();
  if (messageEl.textContent === t("msgPressStart")) {
    messageEl.textContent = "";
  }
}

function startGame() {
  ensureGameRunning();
}

function togglePause() {
  if (!gameStarted || gameWon || gameLost) return;
  gamePaused = !gamePaused;
  if (gamePaused) {
    pauseBgm();
    selectedIndex = null;
    setSelectedVisual(null);
  } else if (audioEnabled) {
    resumeBgm();
  }
  updatePauseOverlay();
  updateControlButtons();
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

function clearBoardAnimTimer() {
  if (boardAnimTimer !== null) {
    clearTimeout(boardAnimTimer);
    boardAnimTimer = null;
  }
}

// ===== 游戏初始化 =====
function initGame() {
  stopTimer();
  stopBgm();
  clearBoardAnimTimer();
  hideWinActions();
  hideWinModal();
  boardEl.innerHTML = "";
  boardEl.classList.remove("board-dealing", "shuffling", "board-paused", "board-preparing");

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
  gameStarted = false;
  gamePaused = false;
  hintIndices = null;
  messageEl.textContent = "";
  messageEl.classList.remove("win");
  clearPathLine();
  applyGridSize();
  updateUI();
  updatePauseOverlay();
  updateControlButtons();
  renderBoardAnimated();
}

function applyGridSize() {
  gameContainer.classList.add("layout-instant");
  gameContainer.classList.remove("size-8", "size-10");
  if (gridSize === 8) gameContainer.classList.add("size-8");
  if (gridSize === 10) gameContainer.classList.add("size-10");

  boardEl.className = `board size-${gridSize} layout-instant`;
}

function createSpacedTemplateBoard(uniqueEmojis, slots = null) {
  const board = new Array(getTotalCells()).fill(null);
  const halfCols = gridSize / 2;
  const emojis = shuffleArray(uniqueEmojis);

  if (!slots) {
    emojis.forEach((emoji, i) => {
      const row = i % gridSize;
      const colPair = Math.floor(i / gridSize);
      board[row * gridSize + colPair] = emoji;
      board[row * gridSize + colPair + halfCols] = emoji;
    });
    return board;
  }

  const byRow = new Map();
  slots.forEach((idx) => {
    const row = Math.floor(idx / gridSize);
    if (!byRow.has(row)) byRow.set(row, []);
    byRow.get(row).push(idx);
  });
  byRow.forEach((rowSlots) => {
    rowSlots.sort((a, b) => (a % gridSize) - (b % gridSize));
  });

  let emojiIdx = 0;
  [...byRow.keys()].sort((a, b) => a - b).forEach((row) => {
    const rowSlots = byRow.get(row);
    const pairCount = Math.floor(rowSlots.length / 2);
    for (let p = 0; p < pairCount && emojiIdx < emojis.length; p++) {
      const emoji = emojis[emojiIdx++];
      board[rowSlots[p]] = emoji;
      board[rowSlots[p + pairCount]] = emoji;
    }
  });

  return board;
}

function scrambleSolvableBoard(boardData, budgetMs) {
  let board = [...boardData];
  const deadline = Date.now() + budgetMs;
  const memo = new Map();

  while (Date.now() < deadline) {
    const i = Math.floor(Math.random() * board.length);
    let j = Math.floor(Math.random() * board.length);
    while (j === i) j = Math.floor(Math.random() * board.length);
    if (board[i] === board[j]) continue;

    const next = [...board];
    [next[i], next[j]] = [next[j], next[i]];
    memo.clear();
    if (isFullySolvable(next, memo, deadline)) board = next;
  }

  return board;
}

function createShuffledBoard() {
  const emojis = getActiveEmojis();
  const pairCount = getTotalCells() / 2;
  const uniqueEmojis = emojis.slice(0, pairCount);
  const pairs = [];
  for (let i = 0; i < pairCount; i++) {
    pairs.push(uniqueEmojis[i], uniqueEmojis[i]);
  }

  const maxQuickAttempts = gridSize >= 10 ? 20 : gridSize >= 8 ? 60 : 120;
  for (let attempt = 0; attempt < maxQuickAttempts; attempt++) {
    const candidate = shuffleArray(pairs);
    if (isFullySolvable(candidate)) return candidate;
  }

  let board = createSpacedTemplateBoard(uniqueEmojis);
  const scrambleMs = gridSize >= 10 ? 1200 : gridSize >= 8 ? 600 : 0;
  if (scrambleMs > 0) board = scrambleSolvableBoard(board, scrambleMs);
  return board;
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ===== 计时器 =====
function isTimerPaused() {
  return document.hidden || gameWon || gameLost || gamePaused || !gameStarted;
}

function startTimer() {
  stopTimer();
  timerActive = true;
  timerLastFrame = performance.now();
  timerAccumulator = 0;
  updateTimerDisplay();
  timerRafId = requestAnimationFrame(tickTimer);
  if (audioEnabled) startBgm();
}

function tickTimer(now) {
  if (!timerActive) return;

  if (isTimerPaused()) {
    timerLastFrame = now;
    timerRafId = requestAnimationFrame(tickTimer);
    return;
  }

  const delta = now - timerLastFrame;
  timerLastFrame = now;
  timerAccumulator += delta;

  while (timerAccumulator >= 1000) {
    timerAccumulator -= 1000;
    if (countdownRemaining !== null) {
      countdownRemaining--;
      if (countdownRemaining <= 0) {
        updateTimerDisplay();
        handleTimeUp();
        return;
      }
    } else {
      elapsedSeconds++;
    }
    updateTimerDisplay();
  }

  timerRafId = requestAnimationFrame(tickTimer);
}

function stopTimer() {
  timerActive = false;
  timerAccumulator = 0;
  if (timerRafId !== null) {
    cancelAnimationFrame(timerRafId);
    timerRafId = null;
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
  updateControlButtons();
  showFailModal();
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

function isFullySolvable(boardData, memo = new Map(), deadline = Infinity) {
  if (Date.now() > deadline) return false;

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
    if (isFullySolvable(next, memo, deadline)) {
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

function startBoardDealAnimation() {
  const cells = [...boardEl.querySelectorAll(".cell:not(.empty)")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const delayStep = reducedMotion ? 0 : gridSize >= 10 ? 10 : gridSize >= 8 ? 18 : 28;

  if (reducedMotion || delayStep === 0) return;

  boardEl.classList.add("board-dealing");

  cells.forEach((cell, i) => {
    cell.classList.add("cell-deal");
    cell.style.animationDelay = `${i * delayStep}ms`;
  });

  const duration = cells.length * delayStep + 380;
  boardAnimTimer = setTimeout(() => {
    boardAnimTimer = null;
    boardEl.classList.remove("board-dealing");
    cells.forEach((cell) => {
      cell.classList.remove("cell-deal");
      cell.style.animationDelay = "";
    });
  }, duration);
}

function renderBoardAnimated() {
  renderBoard();
  isLocked = false;
  gameContainer.classList.remove("layout-instant");
  boardEl.classList.remove("layout-instant", "board-preparing");
  ensureGameRunning();
  startBoardDealAnimation();
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
  if (gameWon || gameLost || gamePaused || isLocked || board[index] === null) return;
  ensureGameRunning();
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
    if (navigator.vibrate) navigator.vibrate(40);
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
    if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
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
  if (gameWon || gameLost || gamePaused || isLocked) return;
  ensureGameRunning();
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
  if (gameWon || gameLost || gamePaused || isLocked) return;
  ensureGameRunning();
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
  const uniqueEmojis = [...new Set(emojis)];
  const maxQuickAttempts = gridSize >= 10 ? 20 : 40;
  for (let attempt = 0; attempt < maxQuickAttempts; attempt++) {
    const shuffled = shuffleArray(emojis);
    indices.forEach((idx, i) => { board[idx] = shuffled[i]; });
    if (isFullySolvable(board)) {
      success = true;
      break;
    }
  }

  if (!success) {
    const template = createSpacedTemplateBoard(uniqueEmojis, indices);
    indices.forEach((idx) => { board[idx] = template[idx]; });
    if (isFullySolvable(board)) {
      success = true;
    } else {
      const scrambled = scrambleSolvableBoard(
        [...board],
        gridSize >= 10 ? 800 : 400
      );
      board.splice(0, board.length, ...scrambled);
      success = isFullySolvable(board);
    }
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
    shuffleBtn.disabled = gameWon || gameLost || !gameStarted || gamePaused;
    messageEl.textContent = t("msgShuffled", { n: SHUFFLE_PENALTY });
    checkDeadlock();
  }, 450);
}

function updateUI() {
  remainingEl.textContent = board.filter((e) => e !== null).length;
  scoreEl.textContent = score;
  updateTimerDisplay();
  refreshBestScore();
  updateControlButtons();
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

  const isNewRecord = saveBestTime(getScoreKey(), timeUsed, score);
  refreshBestScore();
  playSound("win");
  messageEl.classList.add("win");
  updateControlButtons();
  updatePauseOverlay();

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
    showWinModal({ timeUsed, isNewRecord, canPlayNext, isLevel: true });
  } else {
    messageEl.textContent =
      t("msgWin", { time: formatTime(timeUsed), bonus: timeBonus }) +
      (isNewRecord ? " " + t("msgNewRecord") : "");
    showWinModal({ timeUsed, isNewRecord, canPlayNext: false, isLevel: false });
  }
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
function handleBoardPointer(event) {
  const cell = event.target.closest(".cell:not(.empty)");
  if (!cell || !boardEl.contains(cell)) return;
  const index = Number(cell.dataset.index);
  if (!Number.isFinite(index)) return;
  handleCellClick(index);
}

boardEl.addEventListener("click", handleBoardPointer);

function handleRestart() {
  ensureAudio();
  playSound("restart");
  initGame();
}

restartBtn.addEventListener("click", handleRestart);
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", togglePause);
hintBtn.addEventListener("click", showHint);
shuffleBtn.addEventListener("click", shuffleRemaining);
nextLevelBtn.addEventListener("click", goNextLevel);
retryBtn.addEventListener("click", handleRestart);
winModalClose.addEventListener("click", () => {
  hideWinModal();
  handleRestart();
});
winModalNext.addEventListener("click", () => {
  hideWinModal();
  goNextLevel();
});
winModalRetry.addEventListener("click", () => {
  hideWinModal();
  handleRestart();
});
winModal.querySelector(".modal-backdrop")?.addEventListener("click", hideWinModal);

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

audioToggle.addEventListener("click", () => {
  ensureAudio();
  audioEnabled = !audioEnabled;
  updateAudioToggle();
  saveSettings();
  if (audioEnabled) {
    playSound("select");
    startBgm();
  } else {
    stopBgm();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    pauseBgm();
  } else if (audioEnabled && bgmPlaying) {
    resumeBgm();
  }
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
function bootGame() {
  try {
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
    updateAudioToggle();
    applyDarkMode();
    renderLevelList();

    if (gameMode === "level") {
      gridSize = getCurrentLevel().grid;
    } else {
      gridSize = Number(document.querySelector(".diff-btn.active")?.dataset.size || 6);
    }

    initGame();
  } catch (err) {
    console.error(err);
    messageEl.textContent = "Errore di avvio. Ricarica la pagina.";
  }
}

bootGame();
