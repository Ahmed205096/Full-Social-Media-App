import history_settings from "./History";

export default function updateHistory(who, message) {
  history_settings.push({
    role: who,
    parts: [message],
  });
}
