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

const diagItems = [
  "Связисты",
  "Инженеры-саперы",
  "Военкоры",
  "Медики",
  "Штурмовики",
  "Операторы БПА",
  "Огневая подготовка",
  "РХБЗ",
  "Выживание",
  "Тактическая игра",
  "Военно-политическая подготовка",
  "Силовая выносливость"
];

const teamRoles = [
  "Командир",
  "Связист",
  "Инженер-сапер",
  "Военкор",
  "Медик",
  "Штурмовик",
  "Оператор БПА",
  "Ответственный за ВПП",
  "Ответственный за физподготовку"
];

const prepTasks = [
  {
    type: "team",
    title: "Военизированная эстафета",
    time: "25-35 минут",
    team: "Собрать цепочку этапов, назначить порядок выхода, провести один спокойный и один скоростной прогон.",
    solo: "Каждый участник отрабатывает свой участок без подсказок и называет возможные штрафы.",
    criteria: ["передача этапа без паузы", "без нарушения безопасности", "командир видит весь порядок действий"]
  },
  {
    type: "role",
    title: "Связисты",
    time: "15 минут",
    team: "Пара передает короткий доклад: место, событие, количество участников, просьба о действии.",
    solo: "Один участник кодирует сообщение, второй принимает и сверяет по контрольной фразе.",
    criteria: ["сообщение принято без искажения", "темп стабильный", "есть подтверждение приема"]
  },
  {
    type: "role",
    title: "Инженеры-саперы",
    time: "20 минут",
    team: "Разметить условный опасный участок, провести группу через безопасный коридор.",
    solo: "Сапер вслух проговаривает алгоритм: обнаружить, обозначить, обойти, доложить.",
    criteria: ["нет касания опасной зоны", "границы понятны команде", "командир получил доклад"]
  },
  {
    type: "role",
    title: "Медики",
    time: "20 минут",
    team: "Отработать помощь пострадавшему: безопасность, контакт, остановка кровотечения, эвакуация.",
    solo: "Медик выбирает повязку, накладывает ее и объясняет контроль состояния пострадавшего.",
    criteria: ["помощь начата с безопасности", "повязка держится", "эвакуация выполнена согласованно"]
  },
  {
    type: "role",
    title: "Военкоры",
    time: "25 минут",
    team: "Подготовить короткий материал о тренировке команды: факт, эмоция, результат, вывод.",
    solo: "Военкор пишет заголовок, лид, 5-7 предложений текста и подбирает кадры для публикации.",
    criteria: ["есть структура", "нет фактических ошибок", "материал показывает команду и задачу"]
  },
  {
    type: "role",
    title: "Операторы БПА",
    time: "20 минут",
    team: "Смоделировать маршрут наблюдения: пилот, наблюдатель и аналитик ведут общий доклад.",
    solo: "Участник описывает цель по схеме: где, что, направление, риск, действие команды.",
    criteria: ["доклад краткий", "цель описана точно", "роли не мешают друг другу"]
  },
  {
    type: "solo",
    title: "Огневая подготовка",
    time: "15 минут",
    team: "Перед стартом вся команда хором повторяет правила безопасности и порядок действий.",
    solo: "Участник показывает безопасную стойку, направление ствола, палец вне спуска, доклад о готовности.",
    criteria: ["безопасное направление", "действие только по команде", "уверенный доклад"]
  },
  {
    type: "solo",
    title: "РХБЗ",
    time: "15 минут",
    team: "Команда реагирует на условный сигнал опасности и выстраивает порядок защиты.",
    solo: "Участник называет сигнал, средство защиты, первое действие и доклад командиру.",
    criteria: ["сигнал распознан", "порядок действий не перепутан", "доклад короткий"]
  },
  {
    type: "solo",
    title: "Выживание",
    time: "20 минут",
    team: "Собрать решение для ситуации: потеря ориентира, холод, ограниченная вода, ожидание помощи.",
    solo: "Участник выбирает три приоритета и объясняет, почему они важнее остальных.",
    criteria: ["сначала безопасность", "есть вода/тепло/сигнал", "нет одиночного ухода от группы"]
  },
  {
    type: "team",
    title: "Тактическая игра",
    time: "30 минут",
    team: "Командир ставит задачу, группа распределяет роли, проходит маршрут и собирается в контрольной точке.",
    solo: "Каждый участник повторяет свою задачу, соседей по группе и запасную точку сбора.",
    criteria: ["каждый знает задачу", "связь сохраняется", "группа не распадается"]
  },
  {
    type: "team",
    title: "Военно-политическая подготовка",
    time: "20 минут",
    team: "Провести блиц-турнир: термины, символы, даты, герои, история движения.",
    solo: "Каждый готовит 5 карточек вопрос-ответ и задает их другому участнику.",
    criteria: ["ответы без подсказок", "формулировки точные", "ошибки внесены в повторение"]
  },
  {
    type: "solo",
    title: "Силовая выносливость",
    time: "15 минут",
    team: "Провести круговую тренировку с учетом чистоты техники и восстановления.",
    solo: "Участник выполняет подход, напарник считает только правильные повторения.",
    criteria: ["техника не ломается", "счет честный", "темп ровный"]
  }
];

function initModules() {
  if (!$("#moduleGrid")) return;
  $$(".module button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module").classList.toggle("open"));
  });
  $$(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      $$(".pill").forEach((item) => item.classList.remove("active"));
      pill.classList.add("active");
      const filter = pill.dataset.filter;
      $$(".module").forEach((module) => {
        module.hidden = filter !== "all" && !module.classList.contains(filter);
      });
    });
  });
}

function initPlan() {
  const list = $("#planList");
  if (!list) return;
  list.innerHTML = plan.map((item, index) => `
    <label class="day">
      <strong>${item[0]}</strong>
      <span><b>${item[1]}</b><p>${item[2]}</p></span>
      <input type="checkbox" data-plan="${index}">
    </label>
  `).join("");
  list.querySelectorAll("input").forEach((input) => {
    input.checked = localStorage.getItem(`zarnitsa-plan-${input.dataset.plan}`) === "1";
    input.addEventListener("change", () => {
      localStorage.setItem(`zarnitsa-plan-${input.dataset.plan}`, input.checked ? "1" : "0");
    });
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
  list.innerHTML = checks.map((text, index) => `
    <label class="check"><input type="checkbox" data-check="${index}"><span>${text}</span></label>
  `).join("");
  function update() {
    const inputs = list.querySelectorAll("input");
    const done = [...inputs].filter((input) => input.checked).length;
    const value = Math.round(done / inputs.length * 100);
    $("#scoreValue").textContent = `${value}%`;
    $("#scoreLabel").textContent = value >= 80 ? "Команда близка к готовности" : value >= 50 ? "Основа есть, усиливаем слабые места" : "Нужен системный тренировочный цикл";
  }
  list.querySelectorAll("input").forEach((input) => {
    input.checked = localStorage.getItem(`zarnitsa-check-${input.dataset.check}`) === "1";
    input.addEventListener("change", () => {
      localStorage.setItem(`zarnitsa-check-${input.dataset.check}`, input.checked ? "1" : "0");
      update();
    });
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
  list.innerHTML = diagItems.map((name, index) => `
    <label class="diag-row">
      <span>${name}</span>
      <input type="range" min="0" max="5" value="0" data-diag="${index}">
      <b>0</b>
    </label>
  `).join("");

  function update() {
    const inputs = [...list.querySelectorAll("input")];
    const values = inputs.map((input) => Number(input.value));
    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    $("#diagAverage").textContent = average.toFixed(1);
    const min = Math.min(...values);
    const weakest = diagItems[values.indexOf(min)];
    $("#diagAdvice").textContent = average >= 4
      ? "Команда близка к контрольному прогону. Уберите точечные штрафы."
      : `Главный фокус сейчас: ${weakest}. Дайте этому направлению отдельную тренировку.`;
  }

  list.querySelectorAll("input").forEach((input) => {
    input.value = localStorage.getItem(`zarnitsa-diag-${input.dataset.diag}`) || "0";
    input.nextElementSibling.textContent = input.value;
    input.addEventListener("input", () => {
      localStorage.setItem(`zarnitsa-diag-${input.dataset.diag}`, input.value);
      input.nextElementSibling.textContent = input.value;
      update();
    });
  });
  update();
}

function initTeam() {
  const board = $("#teamBoard");
  if (!board) return;
  board.innerHTML = teamRoles.map((role, index) => `
    <article class="role-card">
      <h2>${role}</h2>
      <label>Участник<input data-field="name" data-role="${index}" placeholder="ФИО"></label>
      <label>Задача<input data-field="task" data-role="${index}" placeholder="Что должен закрыть"></label>
      <label>Слабое место<input data-field="risk" data-role="${index}" placeholder="Что тренируем"></label>
    </article>
  `).join("");
  board.querySelectorAll("input").forEach((input) => {
    const key = `zarnitsa-team-${input.dataset.role}-${input.dataset.field}`;
    input.value = localStorage.getItem(key) || "";
    input.addEventListener("input", () => localStorage.setItem(key, input.value));
  });
}

function initTasks() {
  const grid = $("#taskGrid");
  if (!grid) return;
  grid.innerHTML = prepTasks.map((task, index) => `
    <article class="task-card ${task.type}" data-task-type="${task.type}">
      <div class="task-head">
        <span>${task.type === "team" ? "Командное" : task.type === "role" ? "Роль" : "Индивидуально"}</span>
        <b>${task.time}</b>
      </div>
      <h2>${task.title}</h2>
      <h3>Команда</h3>
      <p>${task.team}</p>
      <h3>Участник</h3>
      <p>${task.solo}</p>
      <h3>Зачет</h3>
      <ul>${task.criteria.map((item) => `<li>${item}</li>`).join("")}</ul>
      <label class="task-check"><input type="checkbox" data-task="${index}"> Выполнено на тренировке</label>
    </article>
  `).join("");

  function updateTaskStats() {
    const inputs = [...grid.querySelectorAll("input")];
    const done = inputs.filter((input) => input.checked).length;
    $("#taskDone").textContent = String(done);
    $("#taskTotal").textContent = String(inputs.length);
    const next = prepTasks[inputs.findIndex((input) => !input.checked)];
    $("#taskFocus").textContent = next ? next.title : "финальный прогон";
  }

  grid.querySelectorAll("input").forEach((input) => {
    input.checked = localStorage.getItem(`zarnitsa-task-${input.dataset.task}`) === "1";
    input.addEventListener("change", () => {
      localStorage.setItem(`zarnitsa-task-${input.dataset.task}`, input.checked ? "1" : "0");
      updateTaskStats();
    });
  });

  $$('[data-task-filter]').forEach((pill) => {
    pill.addEventListener("click", () => {
      $$('[data-task-filter]').forEach((item) => item.classList.remove("active"));
      pill.classList.add("active");
      const filter = pill.dataset.taskFilter;
      grid.querySelectorAll(".task-card").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.taskType !== filter;
      });
    });
  });

  updateTaskStats();
}

initModules();
initPlan();
initTrainer();
initScore();
initKnowledge();
initDiagnostics();
initTeam();
initTasks();
