// [ ELEMENTS ]

const currentYearSpan = document.querySelector("#current-year");
const loadingText = document.querySelector("#loading-text");
const btnGenerate = document.querySelector("#btnGenerate");
const btnNewGenerate = document.querySelector("#btnNewGenerate");
const content = document.querySelector("#content");
const pages = document.querySelectorAll(".page");
const results = document.querySelector("#output-results");

const modal = document.querySelector(".modal");
const modalHeader = document.querySelector(".modal-header");
const modalContent = document.querySelector(".modal-content");
const modalImage = document.querySelector(".modal-image");
const modalTextContainer = document.querySelector(".modal-text-container");
const btnClose = document.querySelector(".btn-close");

// ============
const currentYear = new Date().getFullYear();
if (currentYear !== 2024) {
  currentYearSpan.innerHTML = `-${currentYear}`;
} else {
  currentYearSpan.innerHTML = "";
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PAGE_CODES = {
  start: "page-start",
  loader: "page-loader",
  result: "page-result",
};

const phrases = [
  "Составляем список планов",
  "Определяем цели",
  "Разрабатываем стратегию",
  "Проектируем план действий",
  "Ставим задачи",
];

const plans = [
  {
    message: "Сделай зарядку",
    imageUrl: "assets/images/zaryadka_small_optimized.webp",
    description: [
      "Зарядись энергией на весь день! Выполни 10-15 минут простых и эффективных упражнений, которые разогреют твое тело и настроят на продуктивность. Попробуй несколько классических упражнений, таких как приседания, отжимания, наклоны и вращения туловища.",
    ],
  },
  {
    message: "Изучи 10 новых иностранных слов",
    imageUrl: "assets/images/english_small.webp",
    description: [
      "Расширь свой словарный запас! Выдели 15-20 минут, чтобы изучить 10 новых слов на иностранном языке. Используй карточки, аудиозаписи или приложения для запоминания, чтобы легко запомнить значение, произношение и применение этих слов в речи.",
    ],
  },
  {
    message: "Сделай фото/видео-влог этого дня, снимай каждый момент",
    imageUrl: "assets/images/vlog_small.webp",
    description: [
      "Запечатли этот день! Возьми камеру или смартфон и снимай короткие видео или делай фотографии на протяжении всего дня. Сохрани свои впечатления, интересные события и красивые моменты — это поможет тебе вспомнить этот день в деталях.",
    ],
  },
  {
    message: "Приготовь новое блюдо",
    imageUrl: "assets/images/cook_small.webp",
    description: [
      "Поэкспериментируй на кухне! Выбери незнакомое тебе ранее блюдо, например, мексиканские тако, индийское карри или классическую итальянскую карбонару, и сотвори его своими руками. Попробуй освоить новые для себя ингредиенты и кулинарные приемы — это станет интересным кулинарным вызовом!",
    ],
  },
  {
    message: "Проведи день в тишине, не говоря ничего вслух",
    imageUrl: "assets/images/silence_small.webp",
    description: [
      "Погрузись в тишину на один день, отказавшись от всех форм общения. Найди спокойное место, закрой глаза и понаблюдай за своими мыслями и чувствами. Не пытайся их контролировать или судить. Если тишина станет подавляющей, сделай перерыв и послушай успокаивающую музыку или прогуляйся на природе. Этот день тишины поможет тебе глубже понять себя и обрести новый взгляд на мир.",
    ],
  },
  {
    message: "Ничего не покупай и не трать сегодня деньги",
    imageUrl: "assets/images/nomoney_small.webp",
    description: [
      "Сегодня откажись от всех покупок и расходов. Попробуй обойтись тем, что у тебя есть, и понаблюдай за своими желаниями и привычками тратить деньги. Этот день без покупок может помочь тебе стать более осознанным потребителем и сэкономить деньги.",
    ],
  },
  {
    message: "Откажись сегодня от фастфуда, только домашняя кухня",
    imageUrl: "assets/images/healthyfood_small.webp",
    description: [
      "Сегодня сделай перерыв от фастфуда и попробуй домашнюю кухню. Приготовь полезные блюда из свежих ингредиентов. Насладись процессом приготовления и ароматами домашней еды. Этот кулинарный опыт не только принесет удовольствие, но и поможет тебе оценить преимущества здорового питания.",
    ],
  },
  {
    message: "Заведи беседу с незнакомым человеком",
    imageUrl: "assets/images/communication_small.webp",
    description: [
      "Сегодня выйди за рамки привычного общения и познакомься с кем-то новым в сети. Загляни на форумы, в группы по интересам или социальные сети. Найди собеседника, который разделяет твои увлечения или взгляды на жизнь. Этот виртуальный опыт не только расширит твой круг общения, но и поможет тебе найти единомышленников и завязать новые дружеские или романтические отношения.",
    ],
  },
  {
    message: "Учись чему-то новому весь день, замени развлекательный контент на познавательный",
    imageUrl: "assets/images/learningsomething_small.webp",
    description: [
      "Вместо того, чтобы тратить время на бесполезный развлекательный контент, сегодня посвяти себя изучению чего-то нового и полезного. Выбери интересную для тебя тему и погрузись в нее — читай книги, смотри обучающие видео, слушай подкасты. Обогати свои знания и навыки, уделяя время самообразованию в течение всего дня. Ты удивишься, как много можно успеть узнать и чему научиться, если направить энергию на познавательный контент вместо пассивного просмотра развлечений.",
    ],
  },
  {
    message: "Напиши стих/рассказ от руки на бумаге",
    imageUrl: "assets/images/writingonpaper_small.webp",
    description: [
      "Сегодня оторвись от экранов и посвяти время творчеству. Возьми ручку и бумагу и напиши что-нибудь — стихотворение, короткий рассказ или просто свои мысли. Почувствуй, как приятно выводить буквы на бумаге, погрузиться в процесс создания чего-то нового. Этот творческий акт поможет тебе расслабиться и взглянуть на мир под другим углом.",
    ],
  },
  {
    message: "Нарисуй картинку на бумаге",
    imageUrl: "assets/images/drawonpaper_small.webp",
    description: [
      "Сегодня выбери время, чтобы заняться творчеством в реальном мире. Возьми бумагу, карандаши или краски и позволь своему воображению воплотиться на листе. Не переживай о результате, просто получай удовольствие от самого процесса рисования. Этот творческий акт поможет тебе расслабиться, раскрыть свой потенциал и взглянуть на окружающий мир под новым углом.",
    ],
  },
  {
    message: "Нарисуй картинку в Paint/любом графическом редакторе",
    imageUrl: "assets/images/webdrawing_small.webp",
    description: [
      "Отложи повседневные дела и позволь себе немного творческого времени. Открой любимое приложение для рисования, будь то классический Paint, продвинутый Adobe Photoshop или современный Krita, и дай волю своему воображению. Используй все возможности этих программ - от базовых кистей до сложных слоев и инструментов, чтобы создать яркую и уникальную цифровую картину. Этот захватывающий процесс поможет тебе расслабиться, развить художественные навыки и взглянуть на окружающий мир под новым углом.",
    ],
  },
  {
    message: "Скажи что-нибудь приятное близкому человеку",
    imageUrl: "assets/images/kindwords_small.webp",
    description: [
      "Найди время, чтобы порадовать своего близкого человека. Скажи ему что-нибудь искреннее и доброе — похвали, поблагодари или просто признайся в своих чувствах. Эти простые, но душевные слова несомненно поднимут настроение твоему родному или любимому человеку и укрепят ваши взаимоотношения.",
    ],
  },
  {
    message: "Обними близкого человека",
    imageUrl: "assets/images/hugs_small.webp",
    description: [
      "Выбери момент, чтобы подарить искреннее объятие дорогому тебе человеку — будь то друг, родственник или любимый. Подойди к нему и мягко заключи в свои руки. Почувствуй, как он отвечает тебе, расслабляясь и доверяясь. Насладитесь этими краткими секундами близости, когда вы соединены в объятии. Пусть это тепло и ощущение единства наполнит ваши сердца. Такие моменты простой человеческой привязанности очень важны для наших отношений.",
    ],
  },
  {
    message: "Оставь позитивный комментарий под видео/постом",
    imageUrl: "assets/images/positive_small.webp",
    description: [
      "Найди в Интернете публикацию, которая тебе понравилась. Оставь под ней искренний, вдохновляющий комментарий. Поддержи автора, поделись своими впечатлениями и пожеланиями. Твои добрые слова помогут создать в Сети более позитивную и дружелюбную атмосферу.",
    ],
  },
  {
    message: "Послушай 10 новых незнакомых треков",
    imageUrl: "assets/images/music_small.webp",
    description: [
      "Выбери в музыкальном приложении несколько незнакомых тебе альбомов или исполнителей. Посвяти время внимательному прослушиванию не менее 10 новых для себя треков. Расширь свой музыкальный кругозор, открывая для себя непривычные жанры и направления.",
    ],
  },
  {
    message: "Покорми бездомного кота на улице",
    imageUrl: "assets/images/catfood_small.webp",
    description: [
      "Во время прогулки присмотрись к бездомным кошкам в округе. Возьми с собой сухой корм или влажные консервы для животных. Подойди осторожно и накорми одного из нуждающихся уличных котов, оказав ему небольшую помощь.",
    ],
  },
  {
    message: "Пройди 10 000 шагов за день",
    imageUrl: "assets/images/10000_small.webp",
    description: [
      "Воспользуйся сегодня функцией подсчета шагов на своем мобильном устройстве и постарайся пройти не менее 10 000. Это простой и эффективный способ повысить свою физическую активность без значительных затрат времени и сил. Отслеживая свои результаты, ты сможешь приблизиться к целям по улучшению самочувствия и постепенно выработать полезную привычку.",
    ],
  },
  {
    message: "Сходи в кинотеатр или музей",
    imageUrl: "assets/images/museumcinema_small.webp",
    description: [
      "Почему бы тебе сегодня не выкроить время, чтобы сходить в кинотеатр или музей? Это отличная возможность разнообразить свои будни и получить заряд вдохновения. В кинотеатре ты сможешь погрузиться в захватывающий сюжет любимого фильма, а в музее — открыть для себя новые грани искусства и культуры. Такая культурная активность не только поможет тебе отдохнуть от повседневных забот, но и расширит твой кругозор.",
    ],
  },
  {
    message: "Посмотри вдохновляющий или документальный фильм",
    imageUrl: "assets/images/movie_small.webp",
    description: [
      "Почему бы тебе не посвятить часок-другой просмотру вдохновляющего или документального фильма? Подобные киноленты могут расширить твое мировоззрение, затронуть важные темы и вдохновить на новые свершения. Такое культурное времяпрепровождение поможет тебе взглянуть на привычные вещи под другим углом и зарядиться положительными эмоциями.",
    ],
  },
  {
    message: "Сходи на прогулку в незнакомое место",
    imageUrl: "assets/images/journey_small.webp",
    description: [
      "Сегодня выйди из зоны комфорта и отправься на прогулку в незнакомое место. Это может быть новый район города, парк или тропа в лесу — главное, чтобы место было для тебя непривычным. Такая смена обстановки может открыть перед тобой неожиданные перспективы, вдохновить на размышления и дать заряд свежих впечатлений. Не упусти возможность познакомиться с чем-то новым и интересным.",
    ],
  },
  {
    message: "Напиши себе письмо в будущее",
    imageUrl: "assets/images/lettertofuture_small.webp",
    description: [
      "Напиши себе письмо, которое ты сможешь прочитать в будущем. Представь, каким ты видишь себя через год, пять или десять лет. Опиши свои цели, мечты и пожелания к самому себе на этом этапе жизни. Такое письмо-обращение поможет тебе сформулировать четкие ориентиры для саморазвития и вдохновит на достижение поставленных задач. Спрячь письмо в надежное место и вскрой его в назначенное время, чтобы сравнить, как изменилась твоя жизнь.",
    ],
  },
  {
    message: "Проведи день на природе",
    imageUrl: "assets/images/dayinnature_small.webp",
    description: [
      "Проведи день на природе, вдали от суеты городской жизни. Выбери живописное место за городом — будь то лес, поле или берег реки. Там ты сможешь насладиться уединением, полюбоваться красотой окружающего мира и зарядиться положительной энергией. Такой день, наполненный тишиной и созерцанием, поможет тебе отдохнуть от повседневной рутины, восстановить внутреннее равновесие и вдохновиться на новые свершения.",
    ],
  },
  {
    message: "Составь список книг, которые хочешь прочитать, и начни с первой",
    imageUrl: "assets/images/books_small.webp",
    description: [
      "Составь список книг, которые ты давно хотел прочитать, и начни с самой первой. Иногда мы откладываем интересные произведения на потом, забывая о них. Этот список станет вдохновляющим ориентиром, который поможет тебе восполнить пробелы в чтении и открыть для себя новые горизонты. Выдели время, чтобы погрузиться в первую книгу из списка — она может стать началом увлекательного интеллектуального путешествия.",
    ],
  },
  {
    message: "Поиграй в настольные игры с семьей или друзьями",
    imageUrl: "assets/images/boardgames_small.webp",
    description: [
      'Почему бы не собрать семью или друзей и не сыграть в несколько увлекательных настольных игр? Это прекрасный способ весело провести время вместе, укрепить социальные связи и отвлечься от повседневной рутины. Вы можете выбрать классические игры, проверенные временем, например "Монополию" или "Шахматы", либо попробовать более современные увлекательные варианты, такие как "Codenames" или "Ticket to Ride". Независимо от предпочтений, настольные игры помогут вам расслабиться, пообщаться и получить массу положительных эмоций.',
    ],
  },
  {
    message: "Приготовь бутерброд с самыми неожиданными ингредиентами и попробуй его",
    imageUrl: "assets/images/sandwich_small.webp",
    description: [
      "Почему бы не приготовить бутерброд с самыми необычными ингредиентами и решиться его попробовать? Это может стать увлекательным гастрономическим приключением. Конечно, важно соблюдать меры безопасности и не использовать ничего вредного для здоровья. Но смелые эксперименты с непривычными вкусовыми сочетаниями могут привести к интересным открытиям. Кто знает, возможно, твоя кулинарная импровизация окажется настоящим деликатесом!",
    ],
  },
  {
    message: "Разговаривай только с помощью цитат из фильмов на протяжении часа",
    imageUrl: "assets/images/dean_small.webp",
    description: [
      "Попробуй провести целый час, разговаривая исключительно цитатами из любимых фильмов. Это интересное упражнение на креативность и умение подбирать уместные киноречевые обороты. Вызов состоит в том, чтобы находить подходящие цитаты для разных ситуаций в общении, не выпадая из контекста. Такой опыт поможет тебе по-новому взглянуть на любимые фильмы и, возможно, откроет новые грани общения с окружающими.",
    ],
  },
  {
    message: "Расскажи анекдот каждому, с кем встретишься сегодня",
    imageUrl: "assets/images/anecdote_small.webp",
    description: [
      "Сегодня твоя задача — рассказывать анекдоты всем, с кем ты сегодня встретишься. Это отличная возможность поднять настроение окружающим и сделать их день чуточку ярче. Подбирай шутки, которые будут уместны в конкретной ситуации и подходить собеседнику. Твоя цель — вызвать искренние улыбки у людей и подарить им заряд хорошего настроения. Кто знает, возможно, некоторым твои истории особенно понравятся и запомнятся надолго.",
    ],
  },
  {
    message: "Придумай смешные прозвища для каждого знакомого и попробуй их использовать",
    imageUrl: "assets/images/nicknames_small.webp",
    description: [
      'Сегодня твоя задача — придумать смешные прозвища для всех своих знакомых и попробовать использовать их в общении. Это будет отличная возможность проявить свою креативность и пошутить над близкими людьми. Постарайся найти оригинальные "клички", которые бы забавным образом отражали характер или особенности каждого человека. Возможно, некоторым твои прозвища даже придутся по душе и станут новой дружеской традицией. Главное, чтобы твои шутки были добродушными и не обижали собеседников.',
    ],
  },
  {
    message: "Попробуй говорить с акцентом на протяжении часа",
    imageUrl: "assets/images/accent_small.webp",
    description: [
      "На сегодня твоя задача — говорить с необычным акцентом на протяжении целого часа. Это будет увлекательное испытание, которое поможет тебе проявить творческие способности и актерское мастерство. Попробуй примерить на себя самые разные варианты акцентов — от ярко выраженного иностранного до регионального. Следи за реакцией окружающих и старайся оставаться в образе, чтобы твой эксперимент получился максимально убедительным. Это отличная возможность удивить знакомых и немного развлечь их своей необычной манерой речи.",
    ],
  },
  {
    message: "Вырасти кристаллы в домашних условиях",
    imageUrl: "assets/images/crystals_small.webp",
    description: [
      "Вырастить кристаллы в домашних условиях проще, чем кажется. Для этого можно купить специальный набор в магазине, в котором уже есть все необходимые материалы и пошаговая инструкция. Достаточно лишь терпеливо следовать рекомендациям и наблюдать, как постепенно формируются красивые кристаллические структуры. Если под рукой нет готового набора, кристаллы можно вырастить и с помощью подручных средств, которые найдутся практически в любом доме — соли, сахара или пищевой соды. Этот несложный эксперимент станет увлекательным способом познакомиться с основами кристаллографии и получить массу положительных эмоций от наблюдения за кристаллизацией.",
    ],
  },
  {
    message: "Приобрети семена и начни выращивать растение в горшке",
    imageUrl: "assets/images/plant_small.webp",
    description: [
      "Хочешь стать начинающим садоводом? Тогда приобрети семена любимого растения и начни его выращивать в домашнем горшке. Следуя простым правилам ухода, ты сможешь наблюдать весь цикл развития — от маленького семечка до пышного цветения или плодоношения. Регулярный полив, доступ к свету и правильно подобранная почва — вот залог успешного выращивания. Терпеливо ухаживая за своим зеленым питомцем, ты получишь огромное удовольствие, видя, как растение преображается день ото дня.",
    ],
  },
  {
    message: "Устрой романтический ужин со второй половинкой",
    imageUrl: "assets/images/doshirak_small.webp",
    description: [
      "Устрой для своей второй половинки романтический ужин. Продумай меню, укрась комнату свечами и цветами, создай атмосферу уюта и нежности. Ваш совместный вечер станет незабываемым моментом близости и взаимопонимания, наполненным приятными эмоциями и теплыми воспоминаниями.",
    ],
  },
  {
    message: "Организуй маленький квест-сюрприз с записками для второй половинки",
    imageUrl: "assets/images/surprisequest_small.webp",
    description: [
      "Организуй для своего партнера интересную игру-квест с неожиданной концовкой. Разложи по дому забавные записки-подсказки, чтобы любимый человек отправился на поиски заветного сюрприза. Пусть этот квест-приключение завершится романтическим свиданием или трогательным презентом. Такое оригинальное мероприятие точно растрогает самые нежные чувства твоей второй половинки.",
    ],
  },
  {
    message: "Устрой битву подушками с близкими",
    imageUrl: "assets/images/pillowfight_small.webp",
    description: [
      'Как тебе идея устроить со своими близкими зажигательную битву подушками? Пригласи друзей и родных в просторную комнату, разделитесь на команды и вооружитесь мягкими "снарядами". Дай волю своей энергии и азарту, устроив веселую схватку, наполненную смехом и взлетающими перьями. Такая игра не только отлично взбодрит тебя и твоих друзей, но и сблизит вас еще сильнее, подарив массу ярких и запоминающихся эмоций.',
    ],
  },
  {
    message: "Пообщайся с нейросетью",
    imageUrl: "assets/images/neuralnetworks_small.webp",
    description: [
      "Пообщайся с нейросетью и познакомься с возможностями искусственного интеллекта. Задавай вопросы, обсуждай темы, которые тебя интересуют, и наблюдай, как нейросеть анализирует информацию и генерирует ответы. Это отличная возможность расширить свои знания, получить новую информацию и лучше понять, как работают современные технологии на основе ИИ.",
    ],
  },
];

function createTodoItem(id, updated = false) {
  return { id, updated, checked: false };
}

const randomTodos = [];
const savedIds = getPlanIds();

if (savedIds !== null) {
  showPage(PAGE_CODES.result);
  randomTodos.push(...savedIds);
  savePlanIds(); //HERE
  renderListItems();
} else {
  showPage(PAGE_CODES.start);
}

function showPage(pageCode) {
  pages.forEach((page) => {
    if (page.classList.contains(pageCode)) {
      page.classList.add("page-active");
      page.classList.remove("page-hidden");
    } else {
      page.classList.remove("page-active");
      page.classList.add("page-hidden");
    }
  });
}

function descriptionToHTML(descriptionsArr = []) {
  return descriptionsArr
    .map((item) => {
      return `<p>${item}</p>`;
    })
    .join("");
}

function showModal(planId) {
  modal.classList.remove("hidden");
  // const { imageUrl, description } = plans[35];
  const { imageUrl, description } = plans[planId];
  modalImage.src = imageUrl;
  modalTextContainer.innerHTML = descriptionToHTML(description);
}

function hideModal() {
  modal.classList.add("hidden");
  modalImage.src = "";
  modalTextContainer.innerHTML = "";
}

modal.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    hideModal();
  }
});

btnClose.addEventListener("click", () => {
  hideModal();
});

function getPlanIds() {
  return JSON.parse(localStorage.getItem("todoItems"));
}

function savePlanIds() {
  localStorage.setItem("todoItems", JSON.stringify(randomTodos));
}

function generateRandomIds(count = 4) {
  const newRandomArr = [];

  for (let i = 0; i < count; i++) {
    let rndValue = getRandomInt(0, plans.length - 1);

    while (true) {
      rndValue = getRandomInt(0, plans.length - 1);
      if (!newRandomArr.some((item) => item.id === rndValue)) {
        break;
      }
    }
    newRandomArr.push(createTodoItem(rndValue));
  }

  return newRandomArr;
}

function renderListItems() {
  results.innerHTML = "";

  const randomPlans = randomTodos.map((item) => {
    return plans[item.id].message;
  });

  for (let i = 0; i < randomPlans.length; i++) {
    const outputRow = document.createElement("div");
    outputRow.classList.add("plan-row");

    const outputText = document.createElement("div");
    outputText.classList.add("plan-row-text");
    outputText.dataset.uid = `${randomTodos[i].id}`;

    const outputTextWrapper = document.createElement("span");
    outputTextWrapper.textContent = randomPlans[i];
    outputText.append(outputTextWrapper);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const checkMarkLabel = document.createElement("label");
    checkMarkLabel.classList.add("checkbox-container");
    checkMarkLabel.innerHTML = "";

    const checkInput = document.createElement("input");
    checkInput.classList.add("checkbox-input");
    checkInput.type = "checkbox";
    checkInput.checked = randomTodos[i].checked;

    checkInput.addEventListener("change", (e) => {
      randomTodos[i].checked = e.currentTarget.checked;
      savePlanIds();
    });

    const checkMark = document.createElement("span");
    checkMark.classList.add("checkbox-mark");

    const reloadImg = document.createElement("img");
    reloadImg.src = "assets/icons/reload.svg";
    reloadImg.classList.add("reload-button");

    const tapImg = document.createElement("img");
    tapImg.src = "assets/icons/tap.svg";
    tapImg.classList.add("tap-icon");

    outputText.append(tapImg);

    if (randomTodos[i].updated) {
      reloadImg.classList.add("button-disabled");
    }

    reloadImg.addEventListener("click", () => {
      if (!reloadImg.classList.contains("button-disabled")) {
        reloadImg.classList.add("button-disabled");

        const rows = document.querySelectorAll(".plan-row-text");
        let rndValue = getRandomInt(0, plans.length - 1);
        while (true) {
          rndValue = getRandomInt(0, plans.length - 1);
          if (!randomTodos.map((item) => item.id).includes(rndValue)) {
            break;
          }
        }
        randomTodos[i] = createTodoItem(rndValue, true);
        checkInput.checked = false;
        savePlanIds(); //HERE
        randomPlans[i] = plans[rndValue].message;

        rows[i].childNodes[0].textContent = randomPlans[i];
        rows[i].dataset.uid = `${randomTodos[i].id}`;
      }
    });

    checkMarkLabel.append(checkInput, checkMark);
    buttonsContainer.append(checkMarkLabel, reloadImg);
    outputRow.append(outputText, buttonsContainer);
    results.append(outputRow);
  }

  const boxes = document.querySelectorAll(".plan-row-text");

  boxes.forEach((box, idx) => {
    box.addEventListener("click", () => {
      showModal(box.dataset.uid);
    });
  });
}

function startGeneration() {
  showPage(PAGE_CODES.loader);

  let counter = 0;
  const timerId = setInterval(() => {
    loadingText.textContent = phrases[counter] + "...";
    counter += 1;
  }, 1000);

  setTimeout(() => {
    clearInterval(timerId);
  }, 5000);

  setTimeout(() => {
    showPage(PAGE_CODES.result);
  }, 6000); // FIXME

  renderListItems();
}

btnGenerate.onclick = function () {
  randomTodos.push(...generateRandomIds(4));
  savePlanIds(); //HERE
  startGeneration();
};

btnNewGenerate.onclick = function () {
  randomTodos.length = 0;
  randomTodos.push(...generateRandomIds(4));
  savePlanIds(); //HERE

  startGeneration();
};
