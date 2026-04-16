# 🎷 TakeFive

**A life-measurement app for people who treat their day like a composition.**

Track your time on a piano keyboard. Build daily standards. Reflect on your setlist. The Bandleader (an AI) reviews your record at the end of each day.

> *Life isn't in 4/4.*

Because you can't improve what you don't measure — and you deserve a tool that feels as warm as your favorite record.

---

## ✨ The Five Pillars

TakeFive measures five things, every day. That's enough.

| Pillar | What it is |
|--------|------------|
| 🎹 **Time** | Your day on a piano keyboard grid — 48 × 30-min blocks |
| 🥁 **Standards** | Daily habits (like jazz standards, you practice them every day) |
| 🎭 **Mood** | 5-emoji daily rating, tracked over the week |
| 📓 **Journal** | Morning Soundcheck + evening After Hours reflection |
| 🍎 **Nutrition** | *Coming in v3* — calorie + fuel tracking |

---

## 🎼 Features

| Section | What it does |
|---------|-------------|
| 🎹 **Setlist** | The day's grid as a vertical piano keyboard. Tap a key to log what you did. |
| 🎙️ **Voice Entry** | "Took a nap for the last hour" → logged via Whisper + LLM |
| ✏️ **Text Entry** | "Worked out 7-8 then breakfast for 30 min" → split into blocks automatically |
| 🥁 **Standards** | Daily habit practice. Auto-completes when linked to a Key you tracked. |
| 🎤 **Soundcheck** | Morning intentions — what are we playing today? |
| 🥃 **After Hours** | Evening wins + mood + reflection |
| 📀 **Liner Notes** | Analytics: today's set, the week's album, 4-quadrant priority matrix |
| 🎷 **The Bandleader** | AI mentor who writes warm nightly liner notes connecting your day together |
| 🎨 **Keys** | Customizable categories (name, color, emoji, priority quadrant) |

---

## 📱 Try it (no install needed)

Runs on **Expo Go** — no App Store required.

### Step 1 — Install Expo Go
- iPhone: [App Store → Expo Go](https://apps.apple.com/app/expo-go/id982107779)
- Android: [Play Store → Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step 2 — Clone and run
```bash
git clone https://github.com/YOUR_USERNAME/takefive.git
cd takefive
npm install --legacy-peer-deps
npx expo start --tunnel
```

### Step 3 — Open on your phone
- Open **Expo Go** on your phone
- Scan the QR code from the terminal
- The app loads instantly ✅

> **Having trouble?** Log into the same Expo account on both your computer (`npx expo login`) and Expo Go. The project appears automatically.

---

## 🎷 The Bandleader (Optional AI)

Voice entry, text parsing, and nightly reflections use [Groq](https://console.groq.com) — free.

1. Sign up at [console.groq.com](https://console.groq.com) (30 seconds)
2. Create an API key
3. Open the app → ⚙️ **Green Room** → paste your key
4. The Bandleader is now on standby 🎷

**Free tier is generous** — thousands of requests/month. Your key is stored only on your device (iOS Keychain / Android Keystore). Never sent anywhere except directly to Groq.

> Don't want AI? The app works fully without it — manual entry + all tracking features stay.

---

## 🔊 Sound Design

TakeFive is a musical experience. Every interaction has a subtle sound:

- Tap a key → soft piano note
- Log an entry → walking bass note
- Complete a standard → ride cymbal *ting*
- Save journal → vinyl crackle + chord resolve
- Delete → stand-up bass slide

Sounds are **on by default** (it's the whole point!). Toggle off in Green Room → Sound FX.

---

## 🧠 How it works

```
Your voice / text
      ↓
Groq Whisper (speech → text)
      ↓
Groq llama-3.3-70b (parse → start time, end time, key)
      ↓
Saved to local SQLite on your phone
```

Everything is **local-first**. No account. No cloud sync. No tracking. No data leaves your device except text sent to Groq (and only if you've added a key).

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React Native + Expo SDK 54 |
| Navigation | expo-router |
| Storage | expo-sqlite |
| State | Zustand |
| AI | Groq (llama-3.3-70b + Whisper) |
| Audio | expo-av |
| Fonts | Fraunces (headings) · Inter (body) · JetBrains Mono (numbers) |
| Theme | Blue Note records — candlelit jazz club palette |

---

## 📂 Project Structure

```
takefive/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Setlist (piano keyboard grid)
│   │   ├── habits.tsx         # Standards (daily practice)
│   │   ├── journal.tsx        # Soundcheck + After Hours
│   │   ├── categories.tsx     # Keys (customizable)
│   │   └── insights.tsx       # Liner Notes (analytics)
│   ├── entry-modal.tsx
│   ├── category-edit.tsx
│   └── settings.tsx           # Green Room
├── src/
│   ├── services/              # database, sound, NLP, voice, AI
│   ├── stores/                # Zustand state
│   ├── constants/             # Colors, fonts, prompts
│   ├── types/
│   └── utils/
├── assets/sounds/             # Drop mp3 sound FX here
```

---

## 🗺 Roadmap

- [x] v1.0 — Setlist, Keys, entry modes (voice/text/tap)
- [x] v1.2 — Liner Notes, The Bandleader, CSV export
- [x] v2.0 — Standards, Soundcheck + After Hours, mood tracking
- [x] v2.1 — Jazz brand overhaul (piano grid, Fraunces/Inter, sound FX)
- [ ] v2.5 — Weekly Mood Melody (AI jazz trio from your week)
- [ ] v3.0 — Nutrition tracking + backend for easier sharing

---

## 🤝 Contributing

Personal project but PRs and issues welcome. Bug? Open an issue with your phone model.

---

## 📄 License

MIT — do whatever you want.

---

*Built with ☕ and late-night vinyl sessions. [@devyanshi](https://github.com/YOUR_USERNAME)*
