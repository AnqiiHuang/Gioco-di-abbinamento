const TEXT = {
  title: "🎮 Emoji Collega",
  modeFree: "Libero",
  modeLevel: "Livelli",
  difficulty: "Griglia",
  theme: "Tema",
  themeMixed: "🎲 Misto",
  themeFruit: "🍎 Frutta",
  themeAnimals: "🐶 Animali",
  themeSweets: "🧁 Dolci",
  themeNature: "🌸 Natura",
  themeSports: "⚽ Sport",
  howToPlayTitle: "📖 Come si gioca",
  howToPlayText:
    "Abbina le tessere identiche per liberare la griglia. Il percorso tra due tessere può avere al massimo due curve.",
  statTime: "⏱ Tempo",
  statScore: "⭐ Punti",
  statRemaining: "🧩 Rimaste",
  statBest: "🏆 Miglior tempo",
  btnStart: "▶️ Inizia",
  btnPause: "⏸ Pausa",
  btnHint: "💡 Suggerimento",
  btnShuffle: "🔀 Mischia",
  btnRestart: "🔄 Ricomincia",
  btnNextLevel: "➡️ Prossimo livello",
  btnRetry: "🔁 Riprova",
  soundOn: "🔊 Audio attivo",
  soundOff: "🔇 Audio spento",
  btnDark: "🌙 Modalità scura",
  btnLight: "☀️ Modalità chiara",
  level: "Livello",
  levelLocked: "Bloccato",
  levelInfo: "Livello {n} · griglia {grid}×{grid}{time}",
  noTimeLimit: " · senza limite di tempo",
  timeLimitSec: " · {s} secondi",
  msgPathBlocked: "Il percorso non può attraversare altre tessere",
  msgMismatch: "Abbinamento errato (−{n} punti)",
  msgNoPairs: "Nessuna coppia disponibile. Mischia o ricomincia",
  msgHintUsed: "Suggerimento usato (−{n} punti)",
  msgShuffleFew: "Troppo poche tessere per mischiare",
  msgShuffleFail: "Mischio non riuscito, riprova",
  msgShuffled: "Tessere mischiate (−{n} punti)",
  msgDeadlock: "⚠️ Bloccato. Mischia o ricomincia",
  msgWin: "🎉 Vittoria. Tempo {time}, bonus +{bonus} punti",
  msgNewRecord: "🌟 Nuovo record",
  msgLevelWin: "🎉 Livello {n} superato. Punti {score}",
  msgLevelUnlock: "Livello {n} sbloccato",
  msgTimeUp: "⏰ Tempo scaduto. Riprova",
  msgNextLevel: "Premi Prossimo livello per continuare",
  bestNone: "—",
};

function t(key, params = {}) {
  let str = TEXT[key] || key;
  Object.keys(params).forEach((k) => {
    str = str.split(`{${k}}`).join(String(params[k]));
  });
  return str;
}

function applyI18n() {
  document.documentElement.lang = "it";
  document.title = t("title");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
}
