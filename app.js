const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const plan = [
  ["День 1", "Роли и диагностика", "Распределить связиста, медика, сапера, военкора, штурмовика, оператора БПА и командиров."],
  ["День 2", "Связь + ВПП", "Морзе, доклады, термины, символы, персонажи и быстрый командный опрос."],
  ["День 3", "Медицина + РХБЗ", "Зоны, повязки, эвакуация, средства защиты и сигналы опасности."],
  ["День 4", "Саперы + маскировка", "Минное поле, указки, проход, безопасность, маскировка позиции."],
  ["День 5", "Огневая + штурм", "Правила безопасности, сектор, синхронность пары, метание и поражение целей."],
  ["День 6", "Выживание + тактика", "Маршрут, укрытие, вода, тепло, взаимодействие на местности."],
  ["День 7", "Контрольный прогон", "Эстафета, разбор штрафов, финальное распределение и повтор слабых мест."]
];

const cards = [
  ["Связисты", "Что важнее при передаче сообщения?", "Точность, разборчивость, единый темп и контрольная проверка принятого текста."],
  ["Инженеры-саперы", "Что делать после обнаружения условной мины?", "Обозначить мину, сохранить безопасную дистанцию, отметить границы прохода и не касаться растяжек."],
  ["Военкоры", "Из каких частей строится публикация?", "Заголовок, вступление, основная часть, завершение, призыв к действию и визуальный материал."],
  ["Медики", "Что важно в красной зоне?", "Безопасность, контроль оружия, быстрый контакт с раненым и эвакуация из опасной зоны."],
  ["Штурмовики", "Какая ошибка сразу портит этап?", "Нарушение безопасности: палец на спуске, неверный сектор, действие без команды или потеря синхронности."],
  ["Огневая подготовка", "Какие правила безопасности повторять перед стартом?", "Ствол в безопасном направлении, палец вне спуска, предохранитель, действие только по команде."],
  ["РХБЗ", "Что нужно знать по РХБЗ?", "Сигналы, порядок надевания защиты, действия при условном заражении и доклад командиру."],
  ["Тактическая игра", "Что должен держать командир?", "Маршрут, связь, замысел, точки сбора и понимание задач каждым участником."]
];

const checks = [
  "Назначены роли и дублеры по каждому направлению",
  "Команда знает структуру регионального этапа",
  "Связисты тренировали кодирование и прием сообщений",
  "Медики отработали красную, желтую и зеленую зоны",
  "Саперы знают штрафы и безопасный алгоритм прохода",
  "Военкоры подготовили шаблон публикации",
  "Штурмовики отработали синхронность пары",
  "Огневая подготовка начинается с правил безопасности",
  "РХБЗ повторена по сигналам и средствам защиты",
  "Проведен контрольный прогон с секундомером"
];

const diagItems = ["Связисты", "Инженеры-саперы", "Военкоры", "Медики", "Штурмовики", "Операторы БПА", "Огневая подготовка", "РХБЗ", "Выживание", "Тактическая игра", "Военно-политическая подготовка", "Силовая выносливость"];
const teamRoles = ["Командир", "Связист", "Инженер-сапер", "Военкор", "Медик", "Штурмовик", "Оператор БПА", "Ответственный за ВПП", "Ответственный за физподготовку"];

function initModules() {
  if (!$("#moduleGrid")) return;
  $$(".module button").forEach((button) => button.addEventListener("click", () => button.closest(".module").classList.toggle("open")));
  $$(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      $$(".pill").forEach((item) => item.classList.remove("active"));
      pill.classList.add("active");
      const filter = pill.dataset.filter;
      $$(".module").forEach((module) => { module.hidden = filter !== "all" && !module.classList.contains(filter); });
    });
  });
}

function initPlan() {
  const list = $("#planList");
  if (!list) return;
  list.innerHTML = plan.map((item, index) => `<label class="day"><strong>${item[0]}</strong><span><b>${item[1]}</b><p>${item[2]}</p></span><input type="checkbox" data-plan="${index}"></label>`).join("");
  list.querySelectorAll("input").forEach((input) => {
    input.checked = localStorage.getItem(`zarnitsa-plan-${input.dataset.plan}`) === "1";
    input.addEventListener("change", () => localStorage.setItem(`zarnitsa-plan-${input.dataset.plan}`, input.checked ? "1" : "0"));
  });
}

function initTrainer() {
  const select = $("#topicSelect");
  if (!select) return;
  let current = 0;
  const topics = [...new Set(cards.map((card) => card[0]))];
  select.innerHTML = topics.map((topic) => `<option>${topic}</option>`).join("");
  function pool() { return cards.filter((card) => card[0] === select.value); }
  function render() {
    const items = pool();
    const card = items[current % items.length];
    $("#cardTopic").textContent = card[0];
    $("#cardQuestion").textContent = card[1];
    $("#cardAnswer").textContent = card[2];
    $("#cardAnswer").classList.remove("visible");
  }
  select.addEventListener("change", () => { current = 0; render(); });
  $("#nextCard").addEventListener("click", () => { current += 1; render(); });
  $("#showAnswer").addEventListener("click", () => $("#cardAnswer").classList.toggle("visible"));
  render();
}

function initScore() {
  const list = $("#checklist");
  if (!list) return;
  list.innerHTML = checks.map((text, index) => `<label class="check"><input type="checkbox" data-check="${index}"><span>${text}</span></label>`).join("");
  function update() {
    const inputs = list.querySelectorAll("input");
    const done = [...inputs].filter((input) => input.checked).length;
    const value = Math.round(done / inputs.length * 100);
    $("#scoreValue").textContent = `${value}%`;
    $("#scoreLabel").textContent = value >= 80 ? "Команда близка к готовности" : value >= 50 ? "Основа есть, усиливаем слабые места" : "Нужен системный тренировочный цикл";
  }
  list.querySelectorAll("input").forEach((input) => {
    input.checked = localStorage.getItem(`zarnitsa-check-${input.dataset.check}`) === "1";
    input.addEventListener("change", () => { localStorage.setItem(`zarnitsa-check-${input.dataset.check}`, input.checked ? "1" : "0"); update(); });
  });
  update();
}

function initKnowledge() {
  const input = $("#knowledgeSearch");
  const grid = $("#knowledgeGrid");
  if (!input || !grid) return;
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    grid.querySelectorAll("article").forEach((card) => {
      const text = `${card.textContent} ${card.dataset.tags}`.toLowerCase();
      card.hidden = query && !text.includes(query);
    });
  });
}

function initDiagnostics() {
  const list = $("#diagnosticsList");
  if (!list) return;
  list.innerHTML = diagItems.map((name, index) => `<label class="diag-row"><span>${name}</span><input type="range" min="0" max="5" value="0" data-diag="${index}"><b>0</b></label>`).join("");
  function update() {
    const inputs = [...list.querySelectorAll("input")];
    const values = inputs.map((input) => Number(input.value));
    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    $("#diagAverage").textContent = average.toFixed(1);
    const min = Math.min(...values);
    const weakest = diagItems[values.indexOf(min)];
    $("#diagAdvice").textContent = average >= 4 ? "Команда близка к контрольному прогону. Уберите точечные штрафы." : `Главный фокус сейчас: ${weakest}. Дайте этому направлению отдельную тренировку.`;
  }
  list.querySelectorAll("input").forEach((input) => {
    input.value = localStorage.getItem(`zarnitsa-diag-${input.dataset.diag}`) || "0";
    input.nextElementSibling.textContent = input.value;
    input.addEventListener("input", () => { localStorage.setItem(`zarnitsa-diag-${input.dataset.diag}`, input.value); input.nextElementSibling.textContent = input.value; update(); });
  });
  update();
}

function initTeam() {
  const board = $("#teamBoard");
  if (!board) return;
  board.innerHTML = teamRoles.map((role, index) => `<article class="role-card"><h2>${role}</h2><label>Участник<input data-field="name" data-role="${index}" placeholder="ФИО"></label><label>Задача<input data-field="task" data-role="${index}" placeholder="Что должен закрыть"></label><label>Слабое место<input data-field="risk" data-role="${index}" placeholder="Что тренируем"></label></article>`).join("");
  board.querySelectorAll("input").forEach((input) => {
    const key = `zarnitsa-team-${input.dataset.role}-${input.dataset.field}`;
    input.value = localStorage.getItem(key) || "";
    input.addEventListener("input", () => localStorage.setItem(key, input.value));
  });
}

initModules();
initPlan();
initTrainer();
initScore();
initKnowledge();
initDiagnostics();
initTeam();
