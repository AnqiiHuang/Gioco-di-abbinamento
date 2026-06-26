const TEXT = {
  title: "🎮 Emoji Collega",
  subtitle: "Abbina le tessere uguali con un percorso (massimo 2 curve)",
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
  statTime: "⏱ Tempo",
  statScore: "⭐ Punti",
  statRemaining: "🧩 Rimaste",
  statBest: "🏆 Record",
  btnHint: "💡 Suggerimento",
  btnShuffle: "🔀 Mischia",
  btnRestart: "🔄 Ricomincia",
  btnNextLevel: "➡️ Prossimo livello",
  btnRetry: "🔁 Riprova",
  soundOn: "🔊 Suoni attivi",
  soundOff: "🔇 Suoni spenti",
  btnDark: "🌙 Modalità scura",
  btnLight: "☀️ Modalità chiara",
  level: "Livello",
  levelLocked: "Bloccato",
  levelInfo: "Livello {n} · griglia {grid}×{grid}{time}",
  noTimeLimit: " · senza limite di tempo",
  timeLimitSec: " · {s} secondi",
  msgPathBlocked: "Stesse tessere, ma il percorso è bloccato",
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
    str = str.replaceAll(`{${k}}`, String(params[k]));
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
