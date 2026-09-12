export const dynamic = "force-static";

const HTML = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Пробный ЕНТ · FM</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Golos+Text:wght@400;500;600;700&display=swap">
<style>
  :root {
    --paper: #e6ebf4;
    --paper-2: #eef2f9;
    --card: #ffffff;
    --header: #16233f;
    --header-2: #20315a;
    --ink: #17233f;
    --muted: #5c6982;
    --line: #d9e0ec;
    --gold: #d29426;
    --gold-bright: #e6a532;
    --gold-tint: #f6ebd4;
    --on-navy: #eef3fd;
    --on-navy-muted: #9fb0d0;
    --btn: #d29426;
    --btn-hover: #c1861d;
    --btn-text: #16233f;
    --shadow: 24px 40px 80px -40px rgba(18, 30, 54, .45);
    --ring: rgba(18, 30, 54, .08);
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --paper: #0b1120;
      --paper-2: #0f1626;
      --card: #151d31;
      --header: #172848;
      --header-2: #21335c;
      --ink: #e8edf7;
      --muted: #93a1bd;
      --line: #27324b;
      --gold: #e6a532;
      --gold-bright: #f0b653;
      --gold-tint: #2b2512;
      --on-navy: #eef3fd;
      --on-navy-muted: #a6b5d3;
      --btn: #e6a532;
      --btn-hover: #f0b653;
      --btn-text: #16233f;
      --shadow: 24px 40px 80px -44px rgba(0, 0, 0, .7);
      --ring: rgba(255, 255, 255, .06);
    }
  }
  :root[data-theme="dark"] {
    --paper: #0b1120;
    --paper-2: #0f1626;
    --card: #151d31;
    --header: #172848;
    --header-2: #21335c;
    --ink: #e8edf7;
    --muted: #93a1bd;
    --line: #27324b;
    --gold: #e6a532;
    --gold-bright: #f0b653;
    --gold-tint: #2b2512;
    --on-navy: #eef3fd;
    --on-navy-muted: #a6b5d3;
    --btn: #e6a532;
    --btn-hover: #f0b653;
    --btn-text: #16233f;
    --shadow: 24px 40px 80px -44px rgba(0, 0, 0, .7);
    --ring: rgba(255, 255, 255, .06);
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    background:
      radial-gradient(120% 90% at 50% -10%, var(--paper-2), var(--paper) 60%);
    color: var(--ink);
    font-family: "Golos Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: clamp(20px, 5vw, 56px) 16px;
  }

  .sheet {
    width: 100%;
    max-width: 552px;
    display: flex;
    flex-direction: column;
    gap: clamp(22px, 4vw, 34px);
  }

  /* ---------- top note ---------- */
  .note { display: flex; flex-direction: column; gap: 14px; }
  .kicker {
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 2.4px;
    text-transform: uppercase;
    color: var(--gold);
    display: inline-flex;
    align-items: center;
    gap: 9px;
  }
  .kicker::before {
    content: "";
    width: 26px; height: 2px;
    background: var(--gold);
    border-radius: 2px;
  }
  .note h1 {
    font-family: "Playfair Display", Georgia, "Times New Roman", serif;
    font-weight: 800;
    font-size: clamp(28px, 6.4vw, 40px);
    line-height: 1.08;
    letter-spacing: -0.4px;
    margin: 0;
    text-wrap: balance;
    color: var(--ink);
  }
  .note h1 em { font-style: normal; color: var(--gold); }
  .lede {
    margin: 0;
    font-size: 16.5px;
    line-height: 1.62;
    color: var(--muted);
    max-width: 48ch;
  }

  /* ---------- ticket / seal card ---------- */
  .ticket {
    background: var(--card);
    border-radius: 22px;
    box-shadow: var(--shadow);
    outline: 1px solid var(--ring);
    outline-offset: 0;
    position: relative;
    overflow: visible;
  }

  .ticket-top {
    background:
      radial-gradient(140% 120% at 50% -30%, var(--header-2), var(--header) 62%);
    border-radius: 22px 22px 0 0;
    padding: 34px 28px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 6px;
    position: relative;
  }
  .ticket-top::after {
    /* subtle gold hairline under the header content */
    content: "";
    position: absolute;
    left: 28px; right: 28px; bottom: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(230,165,50,.35), transparent);
  }

  .seal { width: 118px; height: 118px; margin-bottom: 8px; }

  .ticket-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: var(--gold-bright);
  }
  .ticket-title {
    font-family: "Playfair Display", Georgia, serif;
    font-weight: 700;
    font-size: 30px;
    line-height: 1.1;
    color: var(--on-navy);
    margin-top: 2px;
  }
  .ticket-sub {
    font-size: 14.5px;
    color: var(--on-navy-muted);
    letter-spacing: .2px;
  }

  /* perforation seam (ticket look) */
  .perf {
    position: relative;
    height: 0;
    border-top: 2px dashed var(--line);
    margin: 0 22px;
  }
  .perf::before, .perf::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 28px; height: 28px;
    background: var(--paper);
    border-radius: 50%;
    transform: translateY(-50%);
  }
  .perf::before { left: -36px; }
  .perf::after { right: -36px; }

  .ticket-body {
    padding: 30px 28px 30px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .facts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .fact {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 6px 4px;
    position: relative;
  }
  .fact + .fact::before {
    content: "";
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 1px;
    background: var(--line);
  }
  .fact .num {
    font-family: "Playfair Display", Georgia, serif;
    font-weight: 700;
    font-size: 34px;
    line-height: 1;
    color: var(--gold);
    font-variant-numeric: tabular-nums;
  }
  .fact .lbl {
    font-size: 12.5px;
    color: var(--muted);
    letter-spacing: .3px;
    text-align: center;
  }

  .cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: var(--btn);
    color: var(--btn-text);
    font-family: "Golos Text", sans-serif;
    font-weight: 700;
    font-size: 17px;
    letter-spacing: .2px;
    text-decoration: none;
    padding: 16px 22px;
    border-radius: 13px;
    box-shadow: 0 12px 26px -12px rgba(210, 148, 38, .7);
    transition: background .16s ease, transform .12s ease, box-shadow .16s ease;
  }
  .cta:hover { background: var(--btn-hover); transform: translateY(-1px); }
  .cta:active { transform: translateY(0); }
  .cta:focus-visible { outline: 3px solid var(--gold-bright); outline-offset: 3px; }
  .cta .arrow { font-size: 19px; line-height: 0; }

  .ticket-note {
    text-align: center;
    font-size: 13px;
    color: var(--muted);
    line-height: 1.5;
    margin-top: -6px;
  }

  /* ---------- footer ---------- */
  .foot {
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: center;
    font-size: 13.5px;
    color: var(--muted);
    line-height: 1.55;
    padding-top: 2px;
  }
  .foot b { color: var(--ink); font-weight: 600; }
  .foot a { color: var(--gold); text-decoration: none; font-weight: 600; }
  .foot a:hover { text-decoration: underline; }

  @media (max-width: 400px) {
    .fact .num { font-size: 28px; }
    .ticket-top { padding: 28px 20px 26px; }
    .ticket-body { padding: 26px 20px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .cta { transition: none; }
  }
</style>
</head>
<body>
<main class="sheet">

  <section class="note">
    <span class="kicker">FM · Подготовка к ЕНТ</span>
    <h1>Проверь свой балл на <em>пробном ЕНТ</em> — бесплатно</h1>
    <p class="lede">
      Привет! Мы открыли бесплатный пробный ЕНТ — точь‑в‑точь как настоящий
      экзамен: тот же формат, те же предметы и реальный тайминг. Пройди его
      дома за один вечер и узнай свой балл и слабые темы ещё до настоящего ЕНТ.
    </p>
  </section>

  <section class="ticket">
    <div class="ticket-top">
      <svg class="seal" viewBox="0 0 120 120" role="img" aria-label="Печать FM · Подготовка к ЕНТ">
        <defs>
          <path id="arcTop" d="M16,60 A44,44 0 0 1 104,60" fill="none"></path>
          <path id="arcBottom" d="M104,60 A44,44 0 0 1 16,60" fill="none"></path>
        </defs>
        <circle cx="60" cy="60" r="58" fill="#20315a" stroke="#d29426" stroke-width="1.5"></circle>
        <circle cx="60" cy="60" r="50.5" fill="none" stroke="rgba(230,165,50,.55)" stroke-width="1"></circle>
        <g fill="#e6a532" font-family="'Golos Text',sans-serif" font-size="9.2" font-weight="600" letter-spacing="1.6">
          <text text-anchor="middle"><textPath href="#arcTop" startOffset="50%">ПОДГОТОВКА К ЕНТ</textPath></text>
          <text text-anchor="middle"><textPath href="#arcBottom" startOffset="50%">ПОДГОТОВКА К ЕНТ</textPath></text>
        </g>
        <!-- book + flame emblem -->
        <g>
          <path d="M60,25 C57.2,29 58.4,32.2 60,33.6 C61.6,32.2 62.8,29 60,25 Z" fill="#e6a532"></path>
          <path d="M47,39.5 L59.2,36.8 L59.2,44.4 L47,45.6 Z" fill="#eef3fd"></path>
          <path d="M73,39.5 L60.8,36.8 L60.8,44.4 L73,45.6 Z" fill="#cdd8ee"></path>
        </g>
        <text x="60" y="82" text-anchor="middle" font-family="'Playfair Display',Georgia,serif"
              font-size="40" font-weight="800" fill="#ffffff" letter-spacing="1">FM</text>
      </svg>

      <span class="ticket-eyebrow">Пропуск</span>
      <div class="ticket-title">Пробный ЕНТ</div>
      <div class="ticket-sub">Точь‑в‑точь как настоящий экзамен</div>
    </div>

    <div class="perf"></div>

    <div class="ticket-body">
      <div class="facts">
        <div class="fact"><span class="num">120</span><span class="lbl">вопросов</span></div>
        <div class="fact"><span class="num">240</span><span class="lbl">минут</span></div>
        <div class="fact"><span class="num">140</span><span class="lbl">макс. балл</span></div>
      </div>

      <a class="cta" href="/">
        Пройти пробный ЕНТ <span class="arrow">→</span>
      </a>

      <div class="ticket-note">
        Нажми на кнопку — откроется пробный тест на нашей платформе.
      </div>
    </div>
  </section>

  <footer class="foot">
    <div>Приглашение от учебного центра <b>FM · Подготовка к ЕНТ</b></div>
    <div>Появились вопросы? Напиши нам: <a href="#">@fm_ent</a></div>
  </footer>

</main>
</body>
</html>`;

export async function GET() {
  return new Response(HTML, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
