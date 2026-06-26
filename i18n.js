const TEXT = {
  title: "🎮 Emoji Collega",
  subtitle: "Abbina le tessere uguali con un percorso di massimo 3 segmenti",
  instructionsTitle: "📖 Come si gioca",
  instructionsBody:
    "Tocca due emoji uguali. Se possono collegarsi con al massimo 3 linee rette (senza attraversare altre tessere), vengono eliminate. Svuota tutta la griglia per vincere!",
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
  statBest: "🏆 Miglior tempo",
  btnStart: "▶️ Inizia",
  btnPause: "⏸ Pausa",
  btnResume: "▶️ Riprendi",
  btnHint: "💡 Suggerimento",
  btnShuffle: "🔀 Mischia",
  btnRestart: "🔄 Ricomincia",
  btnPlayAgain: "🔄 Gioca ancora",
  btnNextLevel: "➡️ Prossimo livello",
  btnRetry: "🔁 Riprova",
  audioOn: "🔊 Audio attivo",
  audioOff: "🔇 Audio spento",
  btnDark: "🌙 Modalità scura",
  btnLight: "☀️ Modalità chiara",
  level: "Livello",
  levelLocked: "Bloccato",
  levelInfo: "Livello {n} · griglia {grid}×{grid}{time}",
  noTimeLimit: " · senza limite di tempo",
  timeLimitSec: " · {s} secondi",
  msgPathBlocked: "Il percorso non può attraversare altre tessere",
  msgNoPairs: "Nessuna coppia disponibile. Mischia o ricomincia",
  msgHintUsed: "Suggerimento usato (−{n} punti)",
  msgShuffleFew: "Troppo poche tessere per mischiare",
  msgShuffleFail: "Mischio non riuscito, riprova",
  msgShuffled: "Tessere mischiate (−{n} punti)",
  msgDeadlock: "⚠️ Bloccato. Mischia o ricomincia",
  msgPaused: "⏸ Gioco in pausa",
  msgPressStart: "Premi Inizia per cominciare",
  msgWin: "🎉 Vittoria. Tempo {time}, bonus +{bonus} punti",
  winTitle: "Complimenti!",
  winMessage: "Hai completato il gioco in {time}.",
  winLevelMessage: "Hai superato il livello {n} in {time}.",
  winScore: "Punti totali: {score}",
  msgNewRecord: "🌟 Nuovo record di tempo!",
  msgLevelWin: "🎉 Livello {n} superato. Punti {score}",
  msgLevelUnlock: "Livello {n} sbloccato",
  msgTimeUp: "⏰ Tempo scaduto. Riprova",
  msgNextLevel: "Premi Prossimo livello per continuare",
  bestNone: "—",
};

function t(key, params = {}) {
  let str = TEXT[key] || key;
  Object.keys(params).forEach((k) => {
    const token = `{${k}}`;
    str = str.split(token).join(String(params[k]));
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
