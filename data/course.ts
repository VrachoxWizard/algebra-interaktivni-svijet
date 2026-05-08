import {
  Binary,
  Cable,
  CircuitBoard,
  Cloud,
  Compass,
  Cpu,
  EthernetPort,
  FolderTree,
  Gauge,
  Globe2,
  HardDrive,
  LifeBuoy,
  Lock,
  Network,
  Puzzle,
  Router,
  Server,
  ShieldCheck,
  Timer,
  Wifi,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Section = {
  id: string;
  chapter: string;
  title: string;
  pages: string;
  icon: LucideIcon;
  extract: string;
  objectives: string[];
  fieldMission: string;
  checkpoint: string;
  xp: number;
  mustKnow?: string[];
  keyTerms?: string[];
  commonTrap?: string;
  scenario?: string;
};

export type QuizQuestion = {
  id: string;
  sectionId: string;
  prompt: string;
  answers: string[];
  correct: number;
  explanation: string;
  difficulty: "srednje" | "teže" | "izazov";
  type: "recall" | "definition" | "comparison" | "ordering" | "calculation" | "application";
  sourcePages: string;
  sourceTopic: string;
};

export type Ticket = {
  id: string;
  title: string;
  user: string;
  symptoms: string[];
  bestAction: string;
  distractors: string[];
  lesson: string;
  severity: "P1" | "P2" | "P3";
};

type SectionDeepDive = Pick<Section, "mustKnow" | "keyTerms" | "commonTrap" | "scenario">;


export const officialProgram = {
  sourceUrl:
    "https://www.algebra.hr/cjelozivotno-obrazovanje/program/administrator-u-podrsci-racunalnim-sustavima/",
  title: "Administrator u podršci računalnim sustavima",
  duration: "175 sati",
  csvet: "7 CSVET",
  promise:
    "Priprema za helpdesk administraciju: korisnička podrška, održavanje sustava, mreže, Microsoft 365, sigurnost i procedure rada.",
  competencies: [
    "instalirati operacijski sustav, aplikacije, upravljačke programe i antivirusnu zaštitu",
    "prikupiti korisničke zahtjeve i opisati probleme u radu sustava",
    "sudjelovati u rješavanju hardverskih, softverskih i mrežnih poteškoća",
    "ažurirati operacijski sustav, servise i sigurnosni softver",
    "primijeniti kontrolu pristupa, sigurnosnu pohranu i vatrozid",
    "zaštititi osobne podatke i raditi prema standardiziranim procedurama",
  ],
};

const baseSections: Section[] = [
  {
    id: "hardver-softver",
    chapter: "1. poglavlje",
    title: "Hardver i softver",
    pages: "str. 6",
    icon: CircuitBoard,
    extract:
      "Hardver su fizičke komponente računala, a softver su programi i aplikacije koje upravljaju hardverom i omogućuju zadatke.",
    objectives: ["razlikovati hardver i softver", "prepoznati CPU, RAM, disk, GPU i ulazno-izlazne uređaje"],
    fieldMission: "Razvrstaj prijavu korisnika: je li uzrok fizička komponenta ili programska postavka?",
    checkpoint: "Ako ga možeš vidjeti i dodirnuti, vjerojatno je hardver.",
    xp: 80,
  },
  {
    id: "komponente",
    chapter: "1. poglavlje",
    title: "Osnovne komponente računala",
    pages: "str. 7-9",
    icon: Cpu,
    extract:
      "CPU obrađuje instrukcije, RAM čuva trenutne podatke, diskovi trajno pohranjuju, GPU renderira sliku, a matična ploča povezuje sustav.",
    objectives: ["opisati funkcije glavnih komponenti", "povezati komponentu s utjecajem na performanse"],
    fieldMission: "Sastavi dijagnozu sporog računala koristeći tragove o CPU-u, RAM-u i SSD-u.",
    checkpoint: "RAM ubrzava rad s aktivnim aplikacijama, SSD ubrzava učitavanje i pokretanje.",
    xp: 95,
  },
  {
    id: "pohrana",
    chapter: "1. poglavlje",
    title: "Mediji za pohranu podataka",
    pages: "str. 9-11",
    icon: HardDrive,
    extract:
      "HDD nudi velik kapacitet uz nižu cijenu, SSD nema pokretnih dijelova i brži je, a cloud omogućuje pristup s više uređaja uz ovisnost o internetu.",
    objectives: ["usporediti HDD, SSD, USB i cloud", "odabrati pohranu prema scenariju"],
    fieldMission: "Odaberi medij za sigurnosnu kopiju, brz rad sustava i prijenosnu terensku podršku.",
    checkpoint: "Brzina, cijena, trajnost i dostupnost nisu isti kriterij.",
    xp: 85,
  },
  {
    id: "prikljucci",
    chapter: "1. poglavlje",
    title: "Priključci i periferni uređaji",
    pages: "str. 11-12",
    icon: EthernetPort,
    extract:
      "Priključci omogućuju komunikaciju računala s perifernim uređajima i mrežom: USB, video izlazi, audio, mrežni i naponski priključci.",
    objectives: ["prepoznati priključke", "odabrati ispravan kabel ili adapter"],
    fieldMission: "Uredi radno mjesto korisnika koji treba monitor, mrežu, slušalice i vanjski disk.",
    checkpoint: "Dobra podrška često počinje pravim priključkom.",
    xp: 70,
  },
  {
    id: "stolna-prijenosna",
    chapter: "1. poglavlje",
    title: "Stolna i prijenosna računala",
    pages: "str. 12-15",
    icon: Cpu,
    extract:
      "Stolna računala nude lakšu nadogradnju, jače hlađenje i stabilan rad na fiksnoj lokaciji, dok prijenosna računala daju mobilnost, bateriju i integrirane komponente uz ograničenije nadogradnje.",
    objectives: ["usporediti stolna i prijenosna računala", "povezati izbor računala s potrebama korisnika"],
    fieldMission: "Odaberi tip računala za korisnika koji radi na terenu, za učionicu i za grafičku obradu u uredu.",
    checkpoint: "Mobilnost, nadogradivost, cijena i performanse nisu isti kriterij.",
    xp: 85,
  },
  {
    id: "os",
    chapter: "1. poglavlje",
    title: "Operacijski sustavi",
    pages: "str. 16-20",
    icon: FolderTree,
    extract:
      "Operacijski sustav upravlja hardverom, datotekama, memorijom, procesima i korisničkim sučeljem te se učitava tijekom pokretanja računala.",
    objectives: ["definirati operacijski sustav", "opisati postupak podizanja sustava"],
    fieldMission: "Objasni korisniku zašto računalo staje prije prijave u Windows i što prvo provjeriti.",
    checkpoint: "OS je posrednik između korisnika, aplikacija i hardvera.",
    xp: 90,
  },
  {
    id: "mreze",
    chapter: "2. poglavlje",
    title: "Što su računalne mreže",
    pages: "str. 22-24",
    icon: Network,
    extract:
      "Računalna mreža povezuje uređaje radi razmjene podataka, dijeljenja resursa i komunikacije. Može biti ravnopravna ili centralizirana.",
    objectives: ["definirati mrežu", "razumjeti dijeljenje resursa i komunikaciju"],
    fieldMission: "Predloži osnovnu mrežu za mali ured s pisačem, datotekama i pristupom internetu.",
    checkpoint: "Mreža nije samo internet; ona je dogovorena komunikacija uređaja.",
    xp: 90,
  },
  {
    id: "povijest-mreza",
    chapter: "2. poglavlje",
    title: "Povijest računalnih mreža",
    pages: "str. 25-26",
    icon: Timer,
    extract:
      "Razvoj komunikacijskih mreža ide od telegrafa, telefona i teleprintera prema televiziji, računalnim mrežama, internetu i interaktivnim online uslugama.",
    objectives: ["povezati povijesne tehnologije s razvojem mreža", "razumjeti zašto mreže podržavaju komunikaciju i usluge"],
    fieldMission: "Objasni zašto moderne mrežne usluge nastavljaju isti cilj: prijenos informacije između udaljenih korisnika.",
    checkpoint: "Povijest mreža je povijest bržeg, pouzdanijeg i interaktivnijeg prijenosa informacija.",
    xp: 70,
  },
  {
    id: "podjela-mreza",
    chapter: "2. poglavlje",
    title: "Podjela mreža",
    pages: "str. 27-28",
    icon: Globe2,
    extract:
      "LAN povezuje uređaje na malom području, WAN pokriva veća geografska područja, a moderne mreže kombiniraju lokalnu i udaljenu povezanost.",
    objectives: ["razlikovati LAN i WAN", "prepoznati opseg i namjenu mreže"],
    fieldMission: "Klasificiraj mrežu učionice, poslovnice i povezanih gradskih lokacija.",
    checkpoint: "LAN je blizu, WAN povezuje udaljene mreže.",
    xp: 75,
  },
  {
    id: "topologije",
    chapter: "2. poglavlje",
    title: "Mrežne topologije",
    pages: "str. 28-32",
    icon: Compass,
    extract:
      "Sabirnica, zvijezda, prsten, hijerarhijska, isprepletena i hibridna topologija razlikuju se po otpornosti, cijeni, složenosti i lakom otkrivanju grešaka.",
    objectives: ["usporediti topologije", "povezati kvar s posljedicom na mrežu"],
    fieldMission: "Nađi najslabiju točku mreže koja ovisi o jednom centralnom uređaju.",
    checkpoint: "Zvijezda je praktična, ali centralni uređaj je kritična točka.",
    xp: 100,
  },
  {
    id: "tehnologije",
    chapter: "2. poglavlje",
    title: "Mrežne tehnologije",
    pages: "str. 32-42",
    icon: Wifi,
    extract:
      "Mrežne tehnologije uključuju Ethernet, DSL, optiku, WAN rješenja i Wi-Fi standarde od 802.11a/b/g do Wi-Fi 6 i Wi-Fi 7.",
    objectives: ["prepoznati žične i bežične tehnologije", "razumjeti brzinu, domet i latenciju"],
    fieldMission: "Odaberi vezu za ured u kojem su bitni stabilnost, mobilnost i sigurnost.",
    checkpoint: "Brzina bez stabilnosti i sigurnosti nije dovoljno dobra usluga.",
    xp: 110,
  },
  {
    id: "komponente-mreze",
    chapter: "2. poglavlje",
    title: "Mrežne komponente",
    pages: "str. 43-48",
    icon: Router,
    extract:
      "Mrežu čine mrežne kartice, preklopnici, usmjerivači, pristupne točke, modemi, vatrozidi i poslužitelji.",
    objectives: ["nabrojati mrežne komponente", "odabrati uređaj prema ulozi"],
    fieldMission: "Odluči treba li korisniku switch, router, access point ili firewall.",
    checkpoint: "Switch spaja uređaje u LAN-u, router usmjerava promet između mreža.",
    xp: 100,
  },
  {
    id: "modeli",
    chapter: "2. poglavlje",
    title: "Mrežni modeli",
    pages: "str. 49-52",
    icon: Server,
    extract:
      "OSI model dijeli komunikaciju na slojeve, što olakšava razumijevanje prijenosa podataka i sustavno rješavanje problema.",
    objectives: ["definirati OSI model", "mapirati problem na sloj"],
    fieldMission: "Kreni od fizičkog sloja prema aplikaciji i skrati vrijeme dijagnostike.",
    checkpoint: "Slojevi su mentalna mapa za troubleshooting.",
    xp: 95,
  },
  {
    id: "tcpip",
    chapter: "3. poglavlje",
    title: "TCP/IP protokol",
    pages: "str. 54-66",
    icon: Cable,
    extract:
      "TCP/IP je skup protokola za slanje i primanje podataka. TCP potvrđuje isporuku, UDP šalje brže bez jamstva isporuke.",
    objectives: ["opisati TCP/IP slojeve", "razlikovati TCP i UDP"],
    fieldMission: "Odaberi protokol za web stranicu, slanje datoteka i stream u stvarnom vremenu.",
    checkpoint: "TCP je pouzdaniji, UDP je brži kada toleriramo gubitak paketa.",
    xp: 110,
  },
  {
    id: "ip",
    chapter: "3. poglavlje",
    title: "IP adresiranje",
    pages: "str. 67-77",
    icon: Binary,
    extract:
      "IPv4 adresa sastoji se od četiri okteta. Binarni oktet koristi vrijednosti 128, 64, 32, 16, 8, 4, 2 i 1.",
    objectives: ["pretvoriti binarni oktet u dekadski", "razumjeti IP adresu i masku"],
    fieldMission: "Izračunaj oktete i uoči pogrešno unesenu IP konfiguraciju.",
    checkpoint: "11111111 je 255, a 00000000 je 0.",
    xp: 130,
  },
  {
    id: "dhcp-static",
    chapter: "3. poglavlje",
    title: "Statičko i dinamičko adresiranje",
    pages: "str. 78-80",
    icon: Gauge,
    extract:
      "Statičko adresiranje ručno zadaje IP postavke, a DHCP automatski dodjeljuje IP adresu, masku, gateway i DNS.",
    objectives: ["razlikovati statičko i DHCP adresiranje", "prepoznati kada koristiti ručni unos"],
    fieldMission: "Dodijeli serveru stabilnu adresu, a učionici automatske adrese.",
    checkpoint: "Serveri često trebaju predvidljivu adresu; klijenti vole DHCP.",
    xp: 95,
  },
  {
    id: "dns",
    chapter: "3. poglavlje",
    title: "DNS",
    pages: "str. 81-94",
    icon: Cloud,
    extract:
      "DNS prevodi imena računala u IP adrese i obrnuto. Forward zone sadrže A, CNAME, MX, SRV, SOA i NS zapise, a reverse zone PTR zapise.",
    objectives: ["objasniti rezoluciju imena", "razlikovati DNS zapise"],
    fieldMission: "Korisnik vidi IP, ali ne može otvoriti naziv domene. Provjeri DNS prije reinstalacije.",
    checkpoint: "Ako ping na IP radi, a na ime ne radi, DNS je glavni osumnjičenik.",
    xp: 125,
  },
  {
    id: "vjezbe-ip",
    chapter: "4. poglavlje",
    title: "Vježba: IP adrese i podmreže",
    pages: "str. 96-99",
    icon: Puzzle,
    extract:
      "Vježbe vode kroz izračun IP adresa, maski i podmreža te provjeru konfiguracije u praktičnim zadacima.",
    objectives: ["vježbati adresiranje", "primijeniti masku i gateway"],
    fieldMission: "Spoji računala u istu mrežu bez konflikta adresa.",
    checkpoint: "Dobra maska i gateway štede puno lutanja.",
    xp: 120,
  },
  {
    id: "vjezbe-povezivanje",
    chapter: "4. poglavlje",
    title: "Vježba: Povezivanje računala",
    pages: "str. 100-104",
    icon: Wrench,
    extract:
      "Windows 11 i Windows Server 2025 povezuju se u istu virtualnu mrežu, konfiguriraju se IP postavke i provjerava ping.",
    objectives: ["konfigurirati IP postavke", "provjeriti povezanost pingom"],
    fieldMission: "Postavi Windows 11 na 172.16.1.155/24, gateway 172.16.1.10 i DNS 172.16.1.5.",
    checkpoint: "Ping je brz test, ali ne govori sve o DNS-u ili aplikaciji.",
    xp: 115,
  },
  {
    id: "troubleshooting",
    chapter: "4. poglavlje",
    title: "Vježba: Detekcija i rješavanje povezivanja",
    pages: "str. 101-104",
    icon: LifeBuoy,
    extract:
      "Zadaci traže sustavno otkrivanje pogreške u povezivanju računala: provjeru virtualne mreže, IP postavki, ping testa i rezultata naredbi ipconfig i ipconfig /all.",
    objectives: ["detektirati pogreške u vezi između računala", "podesiti odgovarajuće postavke i ponoviti test"],
    fieldMission: "Windows 11 i Server VM ne komuniciraju. Prvo potvrdi mrežnu vezu i IP postavke, zatim ponovi ping.",
    checkpoint: "Rješavanje problema je redoslijed, ne pogađanje.",
    xp: 140,
  },
  {
    id: "vjezbe-dns",
    chapter: "4. poglavlje",
    title: "Vježba: Provjera rada DNS-a",
    pages: "str. 105-108",
    icon: Server,
    extract:
      "Provjera DNS-a uključuje ipconfig /all, nslookup prema IP adresi i nazivu poslužitelja te provjeru zapisa u Forward Lookup Zone na DNS poslužitelju.",
    objectives: ["koristiti nslookup za provjeru DNS-a", "prepoznati kada treba provjeriti DNS zapise"],
    fieldMission: "DNS treba vratiti naziv ili adresu poslužitelja; ako ne vrati očekivani rezultat, provjeri klijentske DNS postavke i zonu.",
    checkpoint: "Ako povezivost radi, ali rezolucija imena ne, dokaz traži u DNS postavkama i zapisima.",
    xp: 125,
  },
  {
    id: "vjezbe-hosts",
    chapter: "4. poglavlje",
    title: "Vježba: Hosts datoteka",
    pages: "str. 109-110",
    icon: ShieldCheck,
    extract:
      "Hosts datoteka u C:\\Windows\\System32\\drivers\\etc može ručno preusmjeriti naziv hosta na zadanu IP adresu i time nadjačati očekivanu DNS rezoluciju.",
    objectives: ["pronaći i protumačiti zapis u hosts datoteci", "ukloniti pogrešan ručni zapis i ponoviti provjeru"],
    fieldMission: "Web stranica ne radi iako internet radi. Provjeri postoji li ručni hosts zapis koji šalje naziv na krivu IP adresu.",
    checkpoint: "Hosts zapis može izgledati kao DNS problem, ali rješava se uređivanjem lokalne datoteke.",
    xp: 115,
  },
  {
    id: "vjezbe-mrezna-veza",
    chapter: "4. poglavlje",
    title: "Vježba: Mrežna veza i adapter",
    pages: "str. 110-111",
    icon: Wrench,
    extract:
      "Vježba prikazuje onemogućavanje i ponovno omogućavanje Ethernet veze u Windows 11 postavkama, zatim provjeru pingom, ipconfig i ipconfig /all.",
    objectives: ["prepoznati posljedice onemogućene mrežne veze", "ponovno omogućiti adapter i potvrditi povezanost"],
    fieldMission: "Ethernet veza je disabled. Omogući adapter, provjeri status i tek onda ponovi ping prema poslužitelju.",
    checkpoint: "Bez aktivnog adaptera nema smisla popravljati DNS ili aplikaciju.",
    xp: 115,
  },
];


const keyTermsBySection: Record<string, string[]> = {
  "hardver-softver": ["hardver", "softver", "driver", "aplikacija", "periferija"],
  komponente: ["CPU", "RAM", "SSD", "GPU", "PSU", "MBO"],
  pohrana: ["HDD", "SSD", "NVMe", "USB", "cloud", "backup"],
  prikljucci: ["USB", "HDMI", "DisplayPort", "RJ-45", "audio", "adapter"],
  "stolna-prijenosna": ["desktop", "laptop", "baterija", "nadogradnja", "hlađenje", "mobilnost"],
  os: ["OS", "boot", "driver", "proces", "datoteke", "azuriranje"],
  mreze: ["LAN", "resurs", "klijent", "posluzitelj", "P2P", "dijeljenje"],
  "povijest-mreza": ["telegraf", "telefon", "teleprinter", "online usluge", "e-learning", "e-trgovina"],
  "podjela-mreza": ["LAN", "WAN", "MAN", "lokacija", "segment", "opseg"],
  topologije: ["sabirnica", "zvijezda", "prsten", "hijerarhija", "mesh", "hibrid"],
  tehnologije: ["Ethernet", "DSL", "optika", "Wi-Fi", "MIMO", "OFDM"],
  "komponente-mreze": ["switch", "router", "AP", "modem", "firewall", "NIC"],
  modeli: ["OSI", "TCP/IP", "fizicki sloj", "transport", "aplikacija", "sloj"],
  tcpip: ["TCP", "UDP", "port", "HTTP", "FTP", "SMTP"],
  ip: ["IPv4", "oktet", "binarno", "maska", "gateway", "subnet"],
  "dhcp-static": ["DHCP", "staticka IP", "scope", "APIPA", "gateway", "DNS"],
  dns: ["DNS", "A", "CNAME", "MX", "PTR", "SOA", "NS"],
  "vjezbe-ip": ["subnet", "maska", "gateway", "ping", "konflikt", "ipconfig"],
  "vjezbe-povezivanje": ["Hyper-V", "Windows 11", "Server", "virtualni switch", "ping", "DNS"],
  troubleshooting: ["ipconfig /all", "ping", "virtualni switch", "gateway", "maska", "adapter"],
  "vjezbe-dns": ["nslookup", "Forward Lookup Zone", "A zapis", "DNS server", "ipconfig /all", "rezolucija"],
  "vjezbe-hosts": ["hosts", "Notepad admin", "C:\\Windows\\System32\\drivers\\etc", "ručni zapis", "DNS", "browser"],
  "vjezbe-mrezna-veza": ["Ethernet", "Disable", "Enable", "Advanced network settings", "ipconfig", "ping"],
};

const scenarioBySection: Record<string, string> = {
  "hardver-softver": "uredjaj je vidljiv u sustavu, ali aplikacija nakon azuriranja javlja gresku",
  komponente: "Windows se sporo pokrece, disk je 100%, a CPU i RAM nisu glavno opterecenje",
  pohrana: "korisnik treba brz sustav, veliku arhivu i kopiju dostupnu izvan ureda",
  prikljucci: "monitor radi preko HDMI-ja, ali RJ-45 nema link lampicu",
  "stolna-prijenosna": "korisnik radi pola vremena na terenu, ali traži i mogućnost lake nadogradnje",
  os: "Windows zastaje prije prijave nakon instalacije novog drivera",
  mreze: "lokalni pisac radi, ali web stranice se ne otvaraju",
  "povijest-mreza": "učenik miješa teleprinter, telefon i moderne online usluge kao da nisu dio razvoja komunikacijskih mreža",
  "podjela-mreza": "kvar pogadja samo jednu ucionicu, dok druge lokacije rade",
  topologije: "svi uredjaji spojeni na isti switch odjednom gube LAN",
  tehnologije: "Wi-Fi ima jak signal, ali je spor kad je u ucionici mnogo uredjaja",
  "komponente-mreze": "racunala u LAN-u se vide, ali nitko nema izlaz na internet",
  modeli: "nema link lampice, a korisnik trazi provjeru DNS-a",
  tcpip: "video poziv prezivi gubitak paketa, a prijenos datoteke mora stici cjelovit",
  ip: "klijent ima 172.16.2.55/24, a gateway 172.16.1.10",
  "dhcp-static": "novo racunalo dobiva 169.254.x.x adresu",
  dns: "ping na IP radi, ali naziv racunala ili domene ne radi",
  "vjezbe-ip": "dva racunala imaju slicne adrese, ali razlicite maske i ne komuniciraju pouzdano",
  "vjezbe-povezivanje": "Windows 11 i Server VM imaju dobre IP adrese, ali su na razlicitim virtualnim switchevima",
  troubleshooting: "Windows 11 VM ne pinga Server VM nakon promjene mrežnih postavki",
  "vjezbe-dns": "nslookup prema IP adresi vraća naziv poslužitelja, ali nslookup prema nazivu ne vraća očekivanu adresu",
  "vjezbe-hosts": "www.facebook.com ne radi nakon što je u hosts datoteku dodan ručni zapis 192.168.3.15",
  "vjezbe-mrezna-veza": "Ethernet veza je onemogućena u Advanced network settings i ping ne prolazi",
};


const trapBySection: Record<string, string> = Object.fromEntries(
  baseSections.map((section) => [
    section.id,
    `Ne preskakati provjere iz sekcije '${section.title}' i ne mijenjati vise postavki odjednom.`,
  ]),
);

export const sections: Section[] = baseSections.map((section) => ({
  ...section,
  mustKnow: [section.extract, ...section.objectives],
  keyTerms: keyTermsBySection[section.id] ?? [],
  commonTrap: trapBySection[section.id],
  scenario: scenarioBySection[section.id],
}));

function uniqueDistractors(distractors: string[], correctAnswer: string, offset = 0) {
  const pool = distractors.filter((item, index, list) => item !== correctAnswer && list.indexOf(item) === index);
  const pivot = pool.length ? offset % pool.length : 0;
  const rotated = [...pool.slice(pivot), ...pool.slice(0, pivot)];

  return rotated.slice(0, 3);
}

function placeAnswer(correctAnswer: string, distractors: string[], seed: number) {
  const answers = uniqueDistractors(distractors, correctAnswer, seed);
  const correct = seed % 4;

  while (answers.length < 3) {
    answers.push(`Nije tvrdnja iz PDF teme ${answers.length + 1}.`);
  }

  answers.splice(correct, 0, correctAnswer);
  return { answers, correct };
}

function pdfNote(section: Section, topic?: string) {
  return `Izvor: PDF ${section.pages}, tema "${topic ?? section.title}".`;
}

function theoryQuestion(
  section: Section,
  number: number,
  prompt: string,
  correctAnswer: string,
  distractors: string[],
  explanation: string,
  type: QuizQuestion["type"],
  difficulty: QuizQuestion["difficulty"] = number <= 5 ? "srednje" : number <= 7 ? "izazov" : "izazov",
): QuizQuestion {
  const placed = placeAnswer(correctAnswer, distractors, number);
  return {
    id: `${section.id}-theory-${String(number).padStart(2, "0")}`,
    sectionId: section.id,
    prompt,
    answers: placed.answers,
    correct: placed.correct,
    explanation: `${explanation} ${pdfNote(section)}`,
    difficulty,
    type,
    sourcePages: section.pages,
    sourceTopic: section.title,
  };
}

function fixedTheoryQuestion(
  section: Section,
  number: number,
  prompt: string,
  answers: string[],
  correct: number,
  explanation: string,
  type: QuizQuestion["type"],
  difficulty: QuizQuestion["difficulty"] = number <= 5 ? "srednje" : number <= 7 ? "izazov" : "izazov",
): QuizQuestion {
  return {
    id: `${section.id}-theory-${String(number).padStart(2, "0")}`,
    sectionId: section.id,
    prompt,
    answers,
    correct,
    explanation: `${explanation} ${pdfNote(section)}`,
    difficulty,
    type,
    sourcePages: section.pages,
    sourceTopic: section.title,
  };
}

function theoryDistractors(section: Section) {
  const terms = section.keyTerms ?? [];
  return [
    `Tema je prvenstveno o pojmu "${terms[1] ?? "nepovezano"}", a ne o "${terms[0] ?? section.title}".`,
    "PDF u ovoj sekciji ne uvodi posebne pojmove, nego samo ponavlja naslov poglavlja.",
    "Najbolje je preskociti definicije i uciti samo nazive bez znacenja.",
    "Ova tema pripada drugom poglavlju i ne povezuje se s navedenim stranicama.",
    "Tocan odgovor nije moguce izvesti iz prirucnika.",
  ];
}

function buildMissionTheoryQuestions(section: Section): QuizQuestion[] {
  const terms = section.keyTerms ?? [];
  const firstTerm = terms[0] ?? section.title;
  const secondTerm = terms[1] ?? section.objectives[0] ?? section.title;
  const thirdTerm = terms[2] ?? section.objectives[1] ?? section.title;
  const wrong = theoryDistractors(section);

  return [
    theoryQuestion(section, 1, `Koja tvrdnja najbolje sazima PDF temu "${section.title}"?`, section.extract, wrong, "Sazetak mora pratiti definiciju i objasnjenje iz odabranih PDF stranica.", "definition"),
    theoryQuestion(section, 2, `Koji pojam je kljucan za ovu sekciju prirucnika?`, firstTerm, [secondTerm, thirdTerm, "nepovezana aplikacija", "nasumican kabel"], "Kljucni pojmovi su izdvojeni iz iste PDF sekcije.", "recall"),
    theoryQuestion(section, 3, `Koji cilj ucenja najizravnije pripada misiji "${section.title}"?`, section.objectives[0] ?? section.checkpoint, wrong, "Cilj dolazi iz teorijskog opisa misije, ne iz helpdesk scenarija.", "recall"),
    theoryQuestion(section, 4, "Koja recenica najbolje cuva smisao checkpointa iz PDF gradiva?", section.checkpoint, wrong, "Checkpoint je kratka provjera razumijevanja teorije s navedenih stranica.", "application"),
    theoryQuestion(section, 5, "Koji je ispravan redoslijed ucenja ove misije?", "Definicija teme -> klju?ni pojmovi -> provjera razumijevanja", ["Pitanje korisnika -> hitna intervencija -> zatvaranje prijave", "Nasumi?an pojam -> preskakanje definicije -> pogadjanje", "Samo memoriranje stranice -> ignoriranje pojmova -> kraj"], "Misijski kviz provjerava teoriju: definiciju, pojmove i razumijevanje.", "ordering"),
    theoryQuestion(section, 6, `Koji drugi pojam iz PDF sekcije treba povezati s temom "${section.title}"?`, secondTerm, [firstTerm, thirdTerm, "ticket", "incident"], "Pitanje ostaje u pojmovniku PDF sekcije.", "comparison", "izazov"),
    fixedTheoryQuestion(section, 7, "Na kojim je stranicama u priru?niku smjestena ova misija?", [section.pages, "str. 1-2", "str. 200-210", "nije navedeno u PDF-u"], 0, "Svaka misija je vezana uz svoj raspon stranica u priru?niku.", "recall", "izazov"),
    theoryQuestion(section, 8, `Koja tvrdnja je najbolji teorijski zakljucak nakon citanja sekcije "${section.title}"?`, section.objectives[1] ?? section.checkpoint, wrong, "Zavrsno pitanje trazi razumijevanje ishoda ucenja iz PDF-a.", "application", "izazov"),
  ];
}

function buildHardPdfQuestion(section: Section, number: number): QuizQuestion {
  const terms = section.keyTerms ?? [];
  const firstTerm = terms[0] ?? section.title;
  const secondTerm = terms[1] ?? section.objectives[0] ?? section.title;
  const thirdTerm = terms[2] ?? section.objectives[1] ?? section.title;
  const variants: QuizQuestion[] = [
    theoryQuestion(section, 100 + number, `Teza provjera: sto mora ostati tocno kada usporedjujes "${firstTerm}" i "${secondTerm}"?`, `${firstTerm} i ${secondTerm} treba objasniti kroz ulogu u temi "${section.title}", a ne samo prepoznati naziv.`, [section.extract, thirdTerm, "Dovoljno je znati broj stranice.", "Oba pojma uvijek zna?e isto."], "Tezi kviz trazi povezivanje pojmova i uloge unutar iste PDF teme.", "comparison", "izazov"),
    theoryQuestion(section, 200 + number, `Teza provjera: koji dokaz pokazuje da razumijes temu "${section.title}" iz PDF-a?`, `Mozes objasniti: ${section.checkpoint}`, [firstTerm, "Mozes zatvoriti prijavu bez objasnjenja.", "Mozes navesti samo naslov bez znacenja.", "Mozes preskociti ciljeve ucenja."], "Tezi kviz koristi checkpoint kao dokaz razumijevanja, a ne operativni helpdesk korak.", "application", "izazov"),
    theoryQuestion(section, 300 + number, `Izazov iz PDF-a: koji ishod najbolje povezuje cilj i pojam "${thirdTerm}"?`, section.objectives[1] ?? section.objectives[0] ?? section.extract, [firstTerm, secondTerm, "Promijeniti nepovezanu postavku.", "Napisati kratku prijavu korisnika."], "Izazovno pitanje trazi povezivanje cilja ucenja s teorijskim pojmovima sekcije.", "application", "izazov"),
  ];

  return variants[number % variants.length];
}

export const missionQuizQuestionsBySection: Record<string, QuizQuestion[]> = Object.fromEntries(
  sections.map((section) => [section.id, buildMissionTheoryQuestions(section)]),
);

export const quizQuestions: QuizQuestion[] = sections.flatMap((section, index) => [
  buildHardPdfQuestion(section, index * 3),
  buildHardPdfQuestion(section, index * 3 + 1),
  buildHardPdfQuestion(section, index * 3 + 2),
]);

export const tickets: Ticket[] = [
  { id: "t1", title: "Racunalo se pokrece, ali aplikacije su izrazito spore", user: "Referada", severity: "P3", symptoms: ["Windows se ucitava nekoliko minuta", "Disk je stalno na 100%", "RAM nije potpuno zauzet"], bestAction: "Provjeriti zdravlje diska i predloziti migraciju s HDD-a na SSD.", distractors: ["Resetirati DNS zonu", "Zamijeniti monitor", "Dodati access point"], lesson: "Simptomi upucuju na diskovno usko grlo, ne na mrezni ili video problem." },
  { id: "t2", title: "Novo racunalo dobiva APIPA adresu", user: "Ucionica", severity: "P2", symptoms: ["ipconfig prikazuje 169.254.x.x", "DHCP je ukljucen", "Ostali uredjaji u ucionici rade"], bestAction: "Provjeriti kabel/switch port i DHCP scope za taj segment.", distractors: ["Dodati MX zapis", "Zamijeniti SSD", "Promijeniti HDMI kabel"], lesson: "APIPA znaci da klijent nije dobio DHCP odgovor." },
  { id: "t3", title: "Naziv servera ne radi, IP adresa radi", user: "Prodaja", severity: "P2", symptoms: ["ping 192.168.5.43 radi", "ping prodaja.racunarstvo.hr ne radi", "Gateway je dostupan"], bestAction: "Provjeriti DNS klijenta, A zapis i hosts datoteku.", distractors: ["Dodati RAM serveru", "Zamijeniti topologiju", "Formatirati USB disk"], lesson: "Kad IP radi, a ime ne, DNS/hosts je prvi smjer." },
  { id: "t4", title: "Svi korisnici na jednom switchu gube LAN", user: "Mali ured", severity: "P1", symptoms: ["Svi uredjaji na istom switchu su offline", "Switch nema lampice", "Drugi kat radi normalno"], bestAction: "Provjeriti napajanje, uplink i status centralnog switcha za taj segment.", distractors: ["Mijenjati hosts datoteku", "Reinstalirati Office", "Dodati PTR zapis"], lesson: "U zvjezdastoj topologiji centralni uredjaj moze srusiti cijeli segment." },
  { id: "t5", title: "Wi-Fi je spor samo tijekom ispita", user: "Ucionica 3", severity: "P2", symptoms: ["Signal je jak", "Na AP-u je 45 klijenata", "Zicna racunala rade stabilno"], bestAction: "Provjeriti opterecenje kanala/AP-a i za kriticne uredjaje koristiti Ethernet gdje je moguce.", distractors: ["Mijenjati DNS SOA zapis", "Zamijeniti HDD nastavniku", "Dodati CNAME za svaki laptop"], lesson: "Wi-Fi problem moze biti kapacitet i dijeljeni medij, ne samo jacina signala." },
  { id: "t6", title: "Windows VM ne pinga Server VM", user: "Lab Hyper-V", severity: "P2", symptoms: ["Obje IP adrese su u 172.16.1.0/24", "VM-ovi su na razlicitim virtualnim switchevima", "DNS je rucno upisan"], bestAction: "Spojiti VM-ove na istu virtualnu mrezu pa ponoviti ping.", distractors: ["Mijenjati MX zapis", "Dodati GPU serveru", "Resetirati temu Windowsa"], lesson: "Dobra IP konfiguracija ne pomaze ako virtualna povezanost nije ista." },
  { id: "t7", title: "Server ima staticku adresu koja se sukobljava s klijentom", user: "Administracija", severity: "P1", symptoms: ["Povremeno nestaje pristup serveru", "DHCP pool ukljucuje adresu servera", "ARP se mijenja izmedju dva MAC-a"], bestAction: "Izuzeti staticku adresu iz DHCP poola ili napraviti DHCP rezervaciju.", distractors: ["Promijeniti monitor servera", "Dodati USB hub", "Ugasiti reverse lookup bez razloga"], lesson: "Staticke adrese moraju biti planirane izvan automatske dodjele ili rezervirane." },
  { id: "t8", title: "Aplikacija radi sporo, ali samo kod prijenosa velikih datoteka", user: "Multimedija", severity: "P3", symptoms: ["Sustav je na HDD-u", "Veliki projekti se ucitavaju dugo", "CPU nije opterecen"], bestAction: "Provjeriti diskovne performanse i razmotriti SSD/NVMe za aktivne projekte.", distractors: ["Promijeniti DNS PTR zapis", "Mijenjati Wi-Fi kanal bez mreznog simptoma", "Dodati drugi monitor"], lesson: "Pohrana je cesto usko grlo kod velikih datoteka." },
  { id: "t9", title: "Mail server druge domene odbija poruke", user: "IT podrska", severity: "P2", symptoms: ["A zapis postoji", "Reverse lookup nije podesen", "Log spominje reputaciju posiljatelja"], bestAction: "Provjeriti PTR/reverse lookup i uskladjenost DNS zapisa mail posluzitelja.", distractors: ["Zamijeniti tipkovnicu", "Dodati RAM klijentima", "Promijeniti subnet masku pisaca"], lesson: "Reverse lookup je vazan za provjere mail posluzitelja i smanjenje spama." },
  { id: "t10", title: "Aplikacija ne radi, link lampica je ugasena", user: "Prijemni pult", severity: "P2", symptoms: ["Ethernet link je down", "Nema valjane IPv4 adrese", "Korisnik trazi reinstalaciju aplikacije"], bestAction: "Provjeriti kabel, port, mreznu karticu i switch prije aplikacije ili DNS-a.", distractors: ["Reinstalirati aplikaciju odmah", "Dodati DNS CNAME", "Mijenjati GPU driver"], lesson: "OSI redoslijed pomaze: bez fizickog linka aplikacijske provjere su prerane." },
  { id: "t11", title: "Interna aplikacija ide na staru IP adresu", user: "Racunovodstvo", severity: "P2", symptoms: ["nslookup vraca novu adresu", "Browser otvara staru adresu", "hosts datoteka ima rucni zapis"], bestAction: "Ukloniti ili ispraviti rucni zapis u hosts datoteci i ponoviti provjeru.", distractors: ["Zamijeniti router bez provjere hosts", "Dodati PSU", "Promijeniti Wi-Fi standard"], lesson: "Hosts datoteka moze nadjacati DNS i zavarati dijagnostiku." },
  { id: "t12", title: "Streaming radi, ali prijenos datoteke puca", user: "Online nastava", severity: "P3", symptoms: ["Video poziv se nastavlja uz kratke smetnje", "FTP prijenos se prekida", "Mreza povremeno gubi pakete"], bestAction: "Razlikovati UDP toleranciju za real-time promet od TCP potrebe za pouzdanim prijenosom datoteke.", distractors: ["Zakljuciti da su TCP i UDP isti", "Mijenjati HDMI kabel", "Brisati DHCP scope"], lesson: "TCP i UDP imaju razlicite ucinke na razlicite aplikacije." },
];

export type SubnetDrill = { id: string; mode: "binary-to-decimal" | "decimal-to-binary" | "mask-check"; prompt: string; value: string; answer: string; hint: string };

export const subnetDrills: SubnetDrill[] = [
  { id: "bd-121", mode: "binary-to-decimal", prompt: "Pretvori binarni oktet u dekadski broj.", value: "01111001", answer: "121", hint: "64 + 32 + 16 + 8 + 1" },
  { id: "bd-172", mode: "binary-to-decimal", prompt: "Pretvori binarni oktet u dekadski broj.", value: "10101100", answer: "172", hint: "128 + 32 + 8 + 4" },
  { id: "bd-192", mode: "binary-to-decimal", prompt: "Pretvori binarni oktet u dekadski broj.", value: "11000000", answer: "192", hint: "128 + 64" },
  { id: "bd-255", mode: "binary-to-decimal", prompt: "Pretvori binarni oktet u dekadski broj.", value: "11111111", answer: "255", hint: "Svi bitovi su ukljuceni." },
  { id: "db-10", mode: "decimal-to-binary", prompt: "Pretvori dekadski oktet u 8-bitni binarni oblik.", value: "10", answer: "00001010", hint: "8 + 2, dodaj vodece nule." },
  { id: "db-16", mode: "decimal-to-binary", prompt: "Pretvori dekadski oktet u 8-bitni binarni oblik.", value: "16", answer: "00010000", hint: "16 i vodece nule." },
  { id: "db-172", mode: "decimal-to-binary", prompt: "Pretvori dekadski oktet u 8-bitni binarni oblik.", value: "172", answer: "10101100", hint: "128 + 32 + 8 + 4." },
  { id: "db-255", mode: "decimal-to-binary", prompt: "Pretvori dekadski oktet u 8-bitni binarni oblik.", value: "255", answer: "11111111", hint: "Svi bitovi su 1." },
  { id: "mask-24", mode: "mask-check", prompt: "Koja je maska za /24 zapis?", value: "/24", answer: "255.255.255.0", hint: "Prva tri okteta su puna." },
  { id: "mask-16", mode: "mask-check", prompt: "Koja je maska za /16 zapis?", value: "/16", answer: "255.255.0.0", hint: "Prva dva okteta su puna." },
  { id: "gw-same", mode: "mask-check", prompt: "Za 172.16.1.155/24 koji gateway je u istoj mrezi?", value: "172.16.1.155/24", answer: "172.16.1.10", hint: "Kod /24 prva tri okteta moraju biti ista." },
  { id: "gw-other", mode: "mask-check", prompt: "Za 192.168.5.44/24 koji gateway je u istoj mrezi?", value: "192.168.5.44/24", answer: "192.168.5.1", hint: "192.168.5 je mrezni dio." },
];

export const badges = [
  { min: 0, label: "Pripravnik helpdeska", icon: LifeBuoy },
  { min: 300, label: "Mrežni tehničar", icon: Network },
  { min: 650, label: "DNS detektiv", icon: ShieldCheck },
  { min: 1000, label: "Admin u smjeni", icon: Lock },
  { min: 1500, label: "Sistemski mentor", icon: Timer },
];
