const TEXT = {
  title: "🎮 Emoji Collega",
  subtitle: "Abbina le tessere uguali con un percorso di massimo 3 segmenti",
  instructionsTitle: "📖 Come si gioca",
  instructions:
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
  statBestTime: "🏅 Miglior tempo",
  btnStart: "▶️ Inizia",
  btnPause: "⏸️ Pausa",
  btnResume: "▶️ Riprendi",
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
  msgNoPairs: "Nessuna coppia disponibile. Mischia o ricomincia",
  msgHintUsed: "Suggerimento usato (−{n} punti)",
  msgShuffleFew: "Troppo poche tessere per mischiare",
  msgShuffleFail: "Mischio non riuscito, riprova",
  msgShuffled: "Tessere mischiate (−{n} punti)",
  msgDeadlock: "⚠️ Bloccato. Mischia o ricomincia",
  msgWin: "🎉 Complimenti! Hai completato il gioco in {time}. Bonus +{bonus} punti",
  msgNewRecord: "🌟 Nuovo record",
  msgNewTimeRecord: "🏅 Nuovo miglior tempo!",
  msgLevelWin: "🎉 Livello {n} superato in {time}. Punti {score}",
  msgLevelUnlock: "Livello {n} sbloccato",
  msgTimeUp: "⏰ Tempo scaduto. Riprova",
  msgNextLevel: "Premi Prossimo livello per continuare",
  msgReady: "Premi Inizia per cominciare",
  msgPaused: "Gioco in pausa — premi Riprendi",
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
