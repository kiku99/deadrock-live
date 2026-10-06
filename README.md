<p align="center">
  <img src="./deadrock-pixel.svg" alt="DEADROCK" width="357" />
</p>

<p align="center">
  <strong>데드락도 락이다</strong><br />
  START-UP × 클클밴드 · 2026.10.31 · SINCHON
</p>

<p align="center">
  <a href="#live-site">Live site</a> ·
  <a href="#run-locally">Run locally</a> ·
  <a href="#event">Event</a> ·
  <a href="#project-structure">Structure</a>
</p>

---

A one-page live-event guide styled as a MySQL terminal that has found its rhythm in a deadlock.

```text
ERROR 1213 (40001): Deadrock found
try restarting transaction._
```

## Event

| | |
| --- | --- |
| **DATE** | 2026년 10월 31일 토요일 |
| **DOORS** | 17:00 |
| **SHOW** | 17:10 — 20:00 |
| **LINEUP** | START-UP × 클클밴드 |
| **VENUE** | 신촌 스팀펑크락 라이브펍 B1 |

### Timeline

```text
17:00 — 17:10   입장
17:10 — 17:50   START-UP
17:50 — 18:10   INTERMISSION
18:10 — 20:00   클클밴드
```

## Live site

[https://deadrock-live.vercel.app](https://deadrock-live.vercel.app)

`main` 브랜치에 푸시하면 Vercel Production 배포가 자동으로 시작됩니다.

## Run locally

No build step is required.

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173) in a browser.

## Project structure

```text
.
├── index.html          # page structure and public event facts
├── deadrock.css        # terminal visual system and responsive layout
├── deadrock.js         # timetable, setlist, interaction rendering
├── event-data.js       # editable schedule, lineup and setlist data
├── deadrock-pixel.svg  # pixel wordmark
└── DESIGN.md           # color and typography rules
```

## Editing event information

Use [`event-data.js`](./event-data.js) for timetable, acts, songs, credits, and notices. Keep public facts in `index.html` when they are part of the fixed event shell: date, venue, map link, and the compact action dock.

## Design notes

- **Event facts lead.** Korean event information uses Pretendard for readable mobile scanning.
- **Terminal syntax supports.** `mysql>` and `$ cat ~/…` are atmosphere, not primary information.
- **DEADROCK stays loud.** Lime is reserved for system/status accents and the active navigation state; orange-red is reserved for the deadlock error and glitch offsets.
- **Small-screen first.** The desktop canvas preserves a centered mobile-readable event guide.

---

<p align="center">
  <sub>LIVE SESSION / STDERR · MADE FOR ONE NIGHT</sub>
</p>
