/**
 @see https://lemontree210.pythonanywhere.com/ru/doculects/list
 ```
 copy([...$0.querySelectorAll('li')].map(el => `${el.querySelector('a').getAttribute('href').match(/\w+$/)}: "${el.innerText.match(/^[а-яА-Я]+/)}",`).join('\n'))
 ```
 */
export const langs = {
  abaza: 'абазинский',
  abdui: 'абдуи',
  abkhaz: 'абхазский',
  avar: 'аварский',
  avestan: 'авесты',
  agul: 'агульский',
  adyghe: 'адыгейский',
  azerbaijani: 'азербайджанский',
  asiatic_eskimo: 'азиатских',
  akkadian: 'аккадский',
  alabugat_tatar: 'алабугатских',
  alanic: 'аланский',
  altai: 'алтайский',
  amharic: 'амхарский',
  english: 'английский',
  andi: 'андийский',
  andronovo_aryan: 'андроновский',
  aragonese: 'арагонский',
  argobba: 'аргобба',
  aromanian: 'арумынский',
  astrakhan_karagash_nogai: 'астраханских',
  asturian: 'астурийский',
  afrikaans: 'африкаанс',
  aftari: 'афтари',
  akhvakh: 'ахвахский',
  bagvalal: 'багвалинский',
  badaga: 'бадага',
  bactrian: 'бактрийский',
  pao_an: 'баоаньский',
  bartangi: 'бартангский',
  bats: 'бацбийский',
  bashkir: 'башкирский',
  bezhta: 'бежтинский',
  belorussian: 'белорусский',
  balochi: 'белуджский',
  beng: 'бен',
  biyabuneki: 'биябунеки',
  boko: 'боко',
  bulgarian: 'болгарский',
  botlikh: 'ботлихский',
  breton: 'бретонский',
  bulgar: 'булгарский',
  buryat: 'бурятский',
  welsh: 'валлийский',
  wanji: 'ванджский',
  waneci: 'ванеци',
  wakhi: 'ваханский',
  velatru: 'велатру',
  hungarian: 'венгерский',
  veps: 'вепсский',
  votic: 'водский',
  vonishuni: 'вонишуни',
  standard_eastern_armenian: 'восточноармянский',
  gagauz: 'гагаузский',
  galatian: 'галатский',
  galician: 'галисийский',
  gaulish: 'галльский',
  garwi: 'гарви',
  gascon: 'гасконский',
  gafat: 'гафат',
  gban: 'гбан',
  geez: 'геэз',
  gilaki: 'гилянский',
  ginukh: 'гинухский',
  grangali: 'глангали',
  godoberi: 'годоберинский',
  goo: 'гоо',
  gothic: 'готский',
  georgian: 'грузинский',
  hunzib: 'гунзибский',
  gurani: 'гурани',
  davani: 'давани',
  dagur: 'дагурский',
  dalmatian: 'далматинский',
  dargwa: 'даргинский',
  dari: 'дари',
  danish: 'датский',
  jawshakani: 'джавшакани',
  jogo: 'джого',
  dolgan: 'долганский',
  classical_armenian: 'древнеармянский',
  ancient_hebrew: 'древнееврейский',
  old_novgorod: 'древненовгородский',
  old_persian: 'древнеперсидский',
  old_russian: 'древнерусский',
  old_uighur: 'древнеуйгурский',
  santa: 'дунсянский',
  zaza: 'заза',
  zay: 'зай',
  standard_western_armenian: 'западноармянский',
  zefrei: 'зефреи',
  yiddish: 'идиш',
  ingrian: 'ижорский',
  official_aramaic: 'имперский',
  ingush: 'ингушский',
  irish_gaelic: 'ирландский',
  irula: 'ирула',
  icelandic: 'исландский',
  spanish: 'испанский',
  istriot: 'истророманский',
  istro_romanian: 'истрорумынский',
  italian: 'итальянский',
  itelmen: 'ительменский',
  jewish_palestinian_aramaic: 'иудейско',
  ishkashimi: 'ишкашимский',
  yazdi_and_kermani: 'йезди',
  kabardian: 'кабардинский',
  kazakh: 'казахский',
  kakabe: 'какабе',
  kalasha: 'калаша',
  kalmyk: 'калмыцкий',
  kamassian: 'камасинский',
  kannada: 'каннада',
  karaim: 'караимский',
  karakalpak: 'каракалпакский',
  karata: 'каратинский',
  karakhanid_uighur: 'караханидско',
  karachay_balkar: 'карачаево',
  karelian: 'карельский',
  carian: 'карийский',
  catalan: 'каталонский',
  katarkalai: 'катаркалаи',
  kashmiri: 'кашмири',
  kashubian: 'кашубский',
  celtiberian: 'кельтиберский',
  kerek: 'керекский',
  keshei: 'кешеи',
  kyrgyz: 'киргизский',
  classical_mandaic: 'классический',
  classical_syriac: 'классический',
  kodagu: 'кодагу',
  komi_zyrian: 'коми',
  komi_permyak: 'коми',
  korean: 'корейский',
  cornish: 'корнский',
  corsican: 'корсиканский',
  koryak: 'корякский',
  kota: 'кота',
  kohrudi: 'кохруди',
  crimean_tatar: 'крымскотатарский',
  kumzari: 'кумзари',
  kumyk: 'кумыкский',
  kurdari: 'курдари',
  kurdish: 'курдский',
  kurdshuli: 'курдшули',
  khowar: 'кховар',
  ladin: 'ладинский',
  laz: 'лазский',
  lak: 'лакский',
  lasgerdi: 'ласгерди',
  latvian: 'латышский',
  lezgian: 'лезгинский',
  lepontic: 'лепонтийский',
  livonian: 'ливский',
  lydian: 'лидийский',
  lycian: 'ликийский',
  lithuanian: 'литовский',
  loko: 'локо',
  luwian: 'лувийский',
  luxembourgian: 'люксембургский',
  neo_aramaic_of_maalula: 'маалулы',
  mazanderani: 'мазандеранский',
  mayan: 'майян',
  macedonian: 'македонский',
  malayalam: 'малаялам',
  mandinka: 'мандинка',
  mano: 'мано',
  mansi: 'мансийский',
  manchu: 'маньчжурский',
  mari: 'марийский',
  megleno_romanian: 'мегленорумынский',
  mingrelian: 'мегрельский',
  meimei: 'меймеи',
  median: 'мидийский',
  milyan: 'милийский',
  mitanni_indo_aryan: 'митаннийский',
  moghol: 'могольский',
  moksha: 'мокшанский',
  mongols_of_inner_mongolia: 'монголов',
  mongolian: 'монгольский',
  monguor: 'монгорский',
  mwan: 'муан',
  munji: 'мунджанский',
  manx: 'мэнкский',
  nanai: 'нанайский',
  nganasan: 'нганасанский',
  negidal: 'негидальский',
  german: 'немецкий',
  nenets: 'ненецкий',
  dutch: 'нидерландский',
  ningalami: 'нингалами',
  neo_mandaic: 'новомандейский',
  nogai: 'ногайский',
  norwegian: 'норвежский',
  oghuz_x_xi: 'огузский',
  oirat: 'ойратский',
  occitan: 'окситанский',
  ormuri: 'ормури',
  orok: 'орокский',
  oroch: 'орочский',
  orkhon_yenisei_inscriptions: 'орхоно',
  ossetian: 'осетинский',
  palaic: 'палайский',
  parachi: 'парачи',
  parthian: 'парфянский',
  pashai: 'пашаи',
  pashto: 'пашто',
  persian: 'персидский',
  pictish: 'пиктский',
  pisidian: 'писидийский',
  polabian: 'полабский',
  polovets: 'половецкий',
  polish: 'польский',
  portuguese: 'португальский',
  prussian: 'прусский',
  phalura: 'пхалура',
  rhaeto_romance: 'ретороманский',
  roshorvi: 'рошорвский',
  romanian: 'румынский',
  russian: 'русский',
  rutul: 'рутульский',
  rushani: 'рушанский',
  sawi: 'сави',
  salar: 'саларский',
  sangesari: 'сангесари',
  sanglechi: 'сангличский',
  sargulami: 'саргулямский',
  sardinian: 'сардинский',
  saryg_yugur: 'сарыг',
  sariqoli: 'сарыкольский',
  svan: 'сванский',
  selkup: 'селькупский',
  semnani: 'семнанский',
  sorbian: 'серболужицкий',
  serbocroatian: 'сербохорватский',
  judeo_spanish: 'сефардский',
  sivandi: 'сивенди',
  sidetic: 'сидетский',
  scythian: 'скифский',
  slovak: 'словацкий',
  slovene: 'словенский',
  modern_hebrew: 'современный',
  sogdian: 'согдийский',
  solon: 'солонский',
  soninke: 'сонинке',
  middle_persian: 'среднеперсидский',
  old_anatolian_turkic: 'староанатолийско',
  written_mongolian: 'старописьменный',
  old_church_slavonic: 'старославянский',
  old_french: 'старофранцузский',
  old_japanese: 'старояпонский',
  surkhei: 'сурхеи',
  susu: 'сусу',
  tabasaran: 'табасаранский',
  tajik: 'таджикский',
  tajrishi: 'таджриши',
  talysh: 'талышский',
  tamil: 'тамильский',
  tatar: 'татарский',
  tati: 'татский',
  telugu: 'телугу',
  tigre: 'тигре',
  tigrinya: 'тигринья',
  tindi: 'тиндинский',
  tirahi: 'тирахи',
  toda: 'тода',
  torwali: 'торвали',
  tofalar: 'тофаларский',
  tocharian_a: 'тохарский',
  tocharian_b: 'тохарский',
  tuvan: 'тувинский',
  tura: 'тура',
  turkish: 'турецкий',
  turkmen: 'туркменский',
  turoyo: 'туройо',
  turki: 'тюрки',
  wan: 'уан',
  ubykh: 'убыхский',
  ugaritic: 'угаритский',
  udmurt: 'удмуртский',
  udihe: 'удэгейский',
  uzbek: 'узбекский',
  uighur: 'уйгурский',
  ukrainian: 'украинский',
  ulch: 'ульчский',
  urartian: 'урартский',
  faroese: 'фарерский',
  farizandi: 'фаризанди',
  phoenician: 'финикийский',
  finnish: 'финский',
  franco_provencal: 'франкопровансальский',
  french: 'французский',
  phrygian: 'фригийский',
  frisian: 'фризский',
  friulian: 'фриульский',
  hazaragi: 'хазара',
  khakas: 'хакасский',
  khanty: 'хантыйский',
  harari: 'харари',
  hattic: 'хаттский',
  khvarshi: 'хваршинский',
  hittite: 'хеттский',
  khwaresmian: 'хорезмийский',
  khwarezmian_turkic: 'хорезмско',
  khotanese: 'хотаносакский',
  khunsari: 'хунсари',
  hurrian: 'хурритский',
  khufi: 'хуфский',
  tsez: 'цезский',
  chagatai: 'чагатайский',
  chamalal: 'чамалинский',
  chaha: 'чаха',
  chechen: 'чеченский',
  czech: 'чешский',
  chuvash: 'чувашский',
  chukchi: 'чукотский',
  shamerzadi: 'шамерзади',
  swedish: 'шведский',
  swiss_german: 'швейцарско',
  shina: 'шина',
  shira_yugur: 'шира',
  shor: 'шорский',
  scottish_gaelic: 'шотландский',
  shughni: 'шугнанский',
  shumashti: 'шумашти',
  sumerian: 'шумерский',
  evenki: 'эвенкийский',
  even: 'эвенский',
  elamite: 'эламский',
  enets: 'энецкий',
  erzya: 'эрзянский',
  estonian: 'эстонский',
  yaghnobi: 'ягнобский',
  yazghulami: 'язгулямский',
  yakut: 'якутский',
  japanese: 'японский',
  yarandi: 'яран',
  yaoure: 'яурэ',
};

export const langsList = Object.entries(langs).map(([key, label]) => ({
  key,
  label,
}));
