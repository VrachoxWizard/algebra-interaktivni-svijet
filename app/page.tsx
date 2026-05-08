"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BookOpenCheck,
  Check,
  ChevronRight,
  Clock3,
  Flame,
  GraduationCap,
  HelpCircle,
  Link2,
  ListChecks,
  Play,
  RadioTower,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  badges,
  missionQuizQuestionsBySection,
  officialProgram,
  quizQuestions,
  sections,
  subnetDrills,
  tickets,
  type QuizQuestion,
} from "@/data/course";

type Mode = "learn" | "quiz" | "timed" | "tickets" | "subnet" | "exam";

const modeMeta: Record<
  Mode,
  {
    label: string;
    icon: typeof BookOpenCheck;
    description: string;
  }
> = {
  learn: {
    label: "Misije",
    icon: BookOpenCheck,
    description: "Brzi pregled sekcija iz priručnika.",
  },
  quiz: {
    label: "Kviz",
    icon: HelpCircle,
    description: "Provjera razumijevanja s objašnjenjima.",
  },
  timed: {
    label: "Brzi test",
    icon: Clock3,
    description: "90 sekundi, 12 rotiranih pitanja.",
  },
  tickets: {
    label: "Service desk",
    icon: ShieldAlert,
    description: "Rješavanje korisničkih prijava.",
  },
  subnet: {
    label: "Binary lab",
    icon: Zap,
    description: "Pretvaranje binarnih okteta.",
  },
  exam: {
    label: "Završni test",
    icon: GraduationCap,
    description: "Mješoviti ispit za spremnost.",
  },
};

const chapterColors = ["#e30613", "#057a75", "#243b55", "#f5a524"];
const mentorTarget = 1600;

function getStoredNumber(key: string, fallback: number) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const stored = window.localStorage.getItem(key);
  return stored ? Number(stored) : fallback;
}

function getStoredStringArray(key: string) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

function shuffleItems<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function takeUnique(existing: QuizQuestion[], candidates: QuizQuestion[], count: number) {
  const seen = new Set(existing.map((question) => question.id));
  const picked: QuizQuestion[] = [];

  for (const candidate of shuffleItems(candidates)) {
    if (!seen.has(candidate.id)) {
      picked.push(candidate);
      seen.add(candidate.id);
    }

    if (picked.length >= count) {
      break;
    }
  }

  return picked;
}

function buildPracticeSession(questions: QuizQuestion[]) {
  const srednje = questions.filter((question) => question.difficulty === "srednje");
  const teze = questions.filter((question) => question.difficulty === "teže");
  const izazov = questions.filter((question) => question.difficulty === "izazov");
  const picked = [
    ...takeUnique([], srednje, 10),
    ...takeUnique([], teze, 4),
    ...takeUnique([], izazov, 1),
  ];

  return shuffleItems(picked).slice(0, 15);
}

function buildTimedSession(questions: QuizQuestion[]) {
  const srednje = questions.filter((question) => question.difficulty === "srednje");
  const teze = questions.filter((question) => question.difficulty === "teže");
  const izazov = questions.filter((question) => question.difficulty === "izazov");
  const picked = [
    ...takeUnique([], srednje, 8),
    ...takeUnique([], teze, 3),
    ...takeUnique([], izazov, 1),
  ];

  return shuffleItems(picked).slice(0, 12);
}

function buildExamSession(questions: QuizQuestion[]) {
  const bySection = new Map<string, QuizQuestion[]>();
  for (const question of questions) {
    bySection.set(question.sectionId, [...(bySection.get(question.sectionId) ?? []), question]);
  }

  const picked: QuizQuestion[] = [];
  for (const section of sections) {
    picked.push(...takeUnique(picked, bySection.get(section.id) ?? [], 2));
  }

  const harder = questions.filter((question) => question.difficulty !== "srednje");
  picked.push(...takeUnique(picked, harder, 4));

  return shuffleItems(picked).slice(0, 40);
}

function questionXp(difficulty: QuizQuestion["difficulty"]) {
  if (difficulty === "izazov") {
    return 80;
  }

  if (difficulty === "teže") {
    return 60;
  }

  return 40;
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("learn");
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

  useEffect(() => {
    setXp(getStoredNumber("ait-xp", 0));
    setStreak(getStoredNumber("ait-streak", 0));
    setCompletedMissions(getStoredStringArray("ait-completed-missions"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("ait-xp", String(xp));
    window.localStorage.setItem("ait-streak", String(streak));
    window.localStorage.setItem("ait-completed-missions", JSON.stringify(completedMissions));
  }, [xp, streak, completedMissions]);

  const currentBadge = useMemo(() => {
    return [...badges].reverse().find((badge) => xp >= badge.min) ?? badges[0];
  }, [xp]);

  const active = sections.find((section) => section.id === activeSection) ?? sections[0];
  const progress = Math.min(100, Math.round((xp / mentorTarget) * 100));
  const BadgeIcon = currentBadge.icon;

  function reward(points: number, correct = true) {
    setXp((value) => value + points);
    setStreak((value) => (correct ? value + 1 : 0));
  }

  function completeMission(sectionId: string, points: number) {
    if (completedMissions.includes(sectionId)) {
      setStreak((value) => value + 1);
      return false;
    }

    setCompletedMissions((items) => [...items, sectionId]);
    reward(points, true);
    return true;
  }

  return (
    <main className="min-h-screen overflow-x-hidden px-3 py-3 text-[var(--ink)] sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-5">
        <header className="grid gap-5 border-b border-[var(--line)] pb-5 xl:grid-cols-[1.08fr_0.92fr]">
          <section className="flex flex-col justify-between gap-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-[var(--algebra)]">
                  Algebra course trainer
                </p>
                <h1 className="fluid-title mt-2 max-w-3xl font-black leading-[0.98] text-[#202124]">
                  IT administracija kroz misije, prijave i vremenske testove
                </h1>
              </div>
              <a
                className="command-button w-full px-3 py-2 text-sm sm:w-auto"
                href={officialProgram.sourceUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Link2 size={16} />
                Službena stranica
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Metric label="Program" value={officialProgram.duration} helper={officialProgram.csvet} />
              <Metric label="Sekcije" value={String(sections.length)} helper="4 poglavlja" />
              <Metric label="Trenutno" value={`${xp} XP`} helper={currentBadge.label} icon={BadgeIcon} />
            </div>
          </section>

          <aside className="console-panel p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-[var(--muted)]">Helpdesk status</p>
                <p className="mt-1 text-3xl font-black leading-tight">{currentBadge.label}</p>
                <p className="mt-2 max-w-md text-sm font-semibold leading-6 text-[var(--muted)]">{officialProgram.promise}</p>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#202124] text-white">
                <BadgeIcon size={28} />
              </div>
            </div>
            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black text-[var(--muted-strong)]">Napredak do mentora</p>
                <p className="mt-1 text-2xl font-black">{progress}%</p>
              </div>
              <div className="text-right text-sm font-black text-[var(--muted)]">
                <p>{xp}/{mentorTarget} XP</p>
                <p className="inline-flex items-center gap-1 text-[var(--algebra)]">
                  <Flame size={16} />
                  Niz {streak}
                </p>
              </div>
            </div>
            <div className="progress-track mt-3">
              <div className="progress-fill bg-[var(--algebra)]" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <span className="status-chip">
                <Trophy size={15} />
                Rank
              </span>
              <span className="status-chip">
                <RadioTower size={15} />
                Smjena
              </span>
              <span className="status-chip">
                <Zap size={15} />
                Drill
              </span>
            </div>
          </aside>
        </header>

        <nav aria-label="Načini učenja" className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {(Object.keys(modeMeta) as Mode[]).map((modeKey) => {
            const Icon = modeMeta[modeKey].icon;
            const selected = mode === modeKey;

            return (
              <button
                aria-pressed={selected}
                className={`mode-tab flex items-center gap-3 p-3 text-left ${selected ? "mode-tab-active" : ""}`}
                data-testid={`mode-${modeKey}`}
                key={modeKey}
                onMouseDown={() => setMode(modeKey)}
                onClick={() => setMode(modeKey)}
                type="button"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center border ${
                    selected ? "border-white/75 text-white" : "border-[#202124] text-[#202124]"
                  }`}
                >
                  <Icon size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black">{modeMeta[modeKey].label}</span>
                  <span className={`mt-0.5 block text-xs leading-5 ${selected ? "text-white/75" : "text-[var(--muted)]"}`}>
                    {modeMeta[modeKey].description}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        <AnimatePresence mode="wait">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[420px] sm:min-h-[500px]"
            exit={{ opacity: 0, y: 12 }}
            initial={{ opacity: 0, y: 12 }}
            key={mode}
            transition={{ duration: 0.2 }}
          >
            {mode === "learn" && (
              <LearnMode
                active={active}
                activeSection={activeSection}
                completedMissions={completedMissions}
                onMissionPass={completeMission}
                onSelect={setActiveSection}
              />
            )}
            {mode === "quiz" && (
              <QuizMode questions={quizQuestions} onReward={reward} title="Kviz provjere" selection="practice" />
            )}
            {mode === "timed" && <TimedMode onReward={reward} />}
            {mode === "tickets" && <TicketMode onReward={reward} />}
            {mode === "subnet" && <SubnetMode onReward={reward} />}
            {mode === "exam" && (
              <QuizMode questions={quizQuestions} onReward={reward} title="Završni test" selection="exam" compactResults />
            )}
          </motion.section>
        </AnimatePresence>
      </div>
    </main>
  );
}

function Metric({
  label,
  value,
  helper,
  icon: Icon = Trophy,
}: {
  label: string;
  value: string;
  helper: string;
  icon?: typeof Trophy;
}) {
  return (
    <div className="micro-panel flex min-h-24 items-center gap-3 p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#202124] text-white">
        <Icon size={20} />
      </div>
      <div>
        <p className="eyebrow text-[var(--muted)]">{label}</p>
        <p className="mt-1 text-xl font-black leading-tight">{value}</p>
        <p className="text-xs font-bold text-[var(--muted)]">{helper}</p>
      </div>
    </div>
  );
}

function LearnMode({
  active,
  activeSection,
  completedMissions,
  onMissionPass,
  onSelect,
}: {
  active: (typeof sections)[number];
  activeSection: string;
  completedMissions: string[];
  onMissionPass: (id: string, points: number) => boolean;
  onSelect: (id: string) => void;
}) {
  const chapterIndex = Number(active.chapter.slice(0, 1)) - 1;
  const Icon = active.icon;
  const missionQuestions = missionQuizQuestionsBySection[active.id] ?? [];
  const completed = completedMissions.includes(active.id);
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    setQuizOpen(false);
  }, [active.id]);

  if (quizOpen) {
    return (
      <MissionQuizMode
        completed={completed}
        onBack={() => setQuizOpen(false)}
        onPass={() => onMissionPass(active.id, active.xp)}
        questions={missionQuestions}
        section={active}
      />
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.86fr_1.14fr]">
      <section className="soft-panel overflow-hidden xl:max-h-[720px] xl:overflow-auto">
        <div className="sticky top-0 z-10 border-b border-[var(--line)] bg-[var(--paper)] p-4">
          <p className="eyebrow text-[var(--muted)]">Sekcije</p>
          <p className="mt-1 text-sm font-semibold text-[var(--muted)]">Sadržaj je organiziran prema PDF priručniku.</p>
        </div>
        <div className="grid">
          {sections.map((section) => {
            const SelectedIcon = section.icon;
            const selected = section.id === activeSection;
            return (
              <button
                className={`grid min-h-[4.6rem] grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-[var(--line)] p-3 text-left transition ${
                  selected ? "bg-[#202124] text-white" : "hover:bg-[var(--paper-warm)]"
                }`}
                key={section.id}
                onClick={() => onSelect(section.id)}
                type="button"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center border ${
                    selected ? "border-white text-white" : "border-[#202124] text-[#202124]"
                  }`}
                >
                  <SelectedIcon size={20} />
                </span>
                <span>
                  <span className="block text-sm font-black">{section.title}</span>
                  <span className={`block text-xs ${selected ? "text-white/70" : "text-[var(--muted)]"}`}>
                    {section.chapter} · {section.pages}
                  </span>
                </span>
                <ChevronRight size={18} />
              </button>
            );
          })}
        </div>
      </section>

      <section className="console-panel p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow" style={{ color: chapterColors[chapterIndex] }}>
              {active.chapter} · {active.pages}
            </p>
            <h2 className="panel-title mt-2 font-black leading-tight">{active.title}</h2>
          </div>
          <div className="flex h-16 w-16 items-center justify-center text-white" style={{ background: chapterColors[chapterIndex] }}>
            <Icon size={32} />
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
          <div className="micro-panel p-4">
            <p className="eyebrow text-[var(--muted)]">Izvadak iz gradiva</p>
            <p className="mt-3 text-lg font-semibold leading-8">{active.extract}</p>
          </div>

          <div className="border border-[var(--line-strong)] bg-[var(--paper-warm)] p-4">
            <p className="eyebrow text-[var(--muted)]">Terenska misija</p>
            <p className="mt-3 text-base font-bold leading-7">{active.fieldMission}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <p className="eyebrow text-[var(--muted)]">Ciljevi</p>
            <ul className="mt-3 grid gap-2">
              {active.objectives.map((objective) => (
                <li className="flex items-start gap-2 text-sm font-semibold" key={objective}>
                  <Check className="mt-0.5 text-[var(--teal)]" size={17} />
                  {objective}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l-4 border-[var(--algebra)] bg-white p-4 shadow-[inset_0_0_0_1px_var(--line)]">
            <p className="eyebrow text-[var(--muted)]">Checkpoint</p>
            <p className="mt-2 text-lg font-black">{active.checkpoint}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="micro-panel p-4">
            <p className="eyebrow text-[var(--muted)]">Što moraš znati</p>
            <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6">
              {(active.mustKnow ?? []).slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="micro-panel p-4">
            <p className="eyebrow text-[var(--muted)]">Pojmovi</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(active.keyTerms ?? []).map((term) => (
                <span className="border border-[#202124] px-2 py-1 text-xs font-black" key={term}>
                  {term}
                </span>
              ))}
            </div>
          </div>
          <div className="micro-panel p-4">
            <p className="eyebrow text-[var(--muted)]">Česta zamka</p>
            <p className="mt-3 text-sm font-semibold leading-6">{active.commonTrap}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            className="command-button w-full px-4 py-3 sm:w-auto"
            onClick={() => setQuizOpen(true)}
            type="button"
          >
            <Sparkles size={18} />
            Pokreni kviz misije
          </button>
          <span className="status-chip">
            {completed ? "Misija polozena" : `6/8 za prolaz - +${active.xp} XP`}
          </span>
        </div>
      </section>
    </div>
  );
}

function MissionQuizMode({
  completed,
  onBack,
  onPass,
  questions,
  section,
}: {
  completed: boolean;
  onBack: () => void;
  onPass: () => boolean;
  questions: QuizQuestion[];
  section: (typeof sections)[number];
}) {
  const [ordered, setOrdered] = useState<QuizQuestion[]>(() => shuffleItems(questions).slice(0, 8));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const [awarded, setAwarded] = useState(false);
  const question = ordered[index] ?? null;
  const passScore = 6;

  function answer(choice: number) {
    if (!question || selected !== null) {
      return;
    }

    setSelected(choice);
    if (choice === question.correct) {
      setScore((value) => value + 1);
    }
  }

  function next() {
    if (!question) {
      return;
    }

    const finalScore = score;
    if (index + 1 >= ordered.length) {
      setComplete(true);
      if (finalScore >= passScore && !completed) {
        setAwarded(onPass());
      }
      return;
    }

    setIndex((value) => value + 1);
    setSelected(null);
  }

  function retry() {
    setOrdered(shuffleItems(questions).slice(0, 8));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setComplete(false);
    setAwarded(false);
  }

  if (!question) {
    return <EmptyPanel title="Kviz misije" body="Ova misija jos nema dostupna teorijska pitanja." onReset={onBack} />;
  }

  if (complete) {
    const passed = score >= passScore;
    return (
      <section className="console-panel p-5 sm:p-7">
        <div className={`flex h-16 w-16 items-center justify-center text-white ${passed ? "bg-[var(--teal)]" : "bg-[var(--algebra)]"}`}>
          {passed ? <Award size={34} /> : <RotateCcw size={34} />}
        </div>
        <p className="eyebrow mt-5 text-[var(--muted)]">{section.title}</p>
        <h2 className="panel-title mt-2 font-black">{passed ? "Misija polozena" : "Ponovi teoriju"}</h2>
        <p className="mt-3 text-2xl font-black">Rezultat: {score}/{ordered.length}</p>
        <p className="mt-2 max-w-2xl text-base font-semibold leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
          {passed
            ? awarded
              ? `Osvojeno je ${section.xp} XP.`
              : "Misija je vec bila polozena, pa XP nije dodan ponovno."
            : "Za prolaz treba 6 tocnih odgovora od 8. Vrati se na izvadak i pokusaj ponovno."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="command-button px-5 py-3" onClick={retry} type="button">
            <RotateCcw size={18} />
            Ponovi kviz
          </button>
          <button className="command-button px-5 py-3" onClick={onBack} type="button">
            Natrag na misiju
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
      <aside className="soft-panel p-5">
        <p className="eyebrow text-[var(--muted)]">Kviz misije</p>
        <h2 className="panel-title mt-2 font-black leading-tight">{section.title}</h2>
        <div className="mt-5 flex items-center justify-between text-xs font-black text-[var(--muted)]">
          <span>{index + 1}/{ordered.length}</span>
          <span>Prolaz {passScore}/8</span>
        </div>
        <div className="progress-track mt-2">
          <div className="progress-fill bg-[var(--teal)]" style={{ width: `${((index + 1) / ordered.length) * 100}%` }} />
        </div>
        <p className="mt-4 text-sm font-semibold leading-6 text-[var(--muted)]">
          Izvor: {question.sourcePages} - {question.sourceTopic}
        </p>
        <button className="command-button mt-5 px-4 py-2" onClick={onBack} type="button">
          Natrag na gradivo
        </button>
      </aside>

      <article className="console-panel p-4 sm:p-6">
        <p className="question-text font-black">{question.prompt}</p>
        <div className="mt-5 grid gap-3">
          {question.answers.map((answerText, answerIndex) => {
            const isCorrect = answerIndex === question.correct;
            const isSelected = selected === answerIndex;
            const visible = selected !== null;

            return (
              <button
                className={`answer-card flex items-center justify-between gap-3 p-4 text-left font-bold ${
                  visible && isCorrect
                    ? "border-[var(--teal)] bg-[var(--teal-soft)]"
                    : visible && isSelected
                      ? "border-[var(--algebra)] bg-[var(--danger-soft)]"
                      : ""
                }`}
                disabled={selected !== null}
                key={answerText}
                onClick={() => answer(answerIndex)}
                type="button"
              >
                {answerText}
                {visible && isCorrect && <Check size={20} />}
                {visible && isSelected && !isCorrect && <X size={20} />}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-5 border-l-4 border-[#202124] bg-white p-4 shadow-[inset_0_0_0_1px_var(--line)]">
            <p className="font-black">{selected === question.correct ? "Tocno." : "Nije tocno."}</p>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{question.explanation}</p>
            <button className="command-button mt-4 px-4 py-2" onClick={next} type="button">
              Dalje
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </article>
    </section>
  );
}

function QuizMode({
  questions,
  onReward,
  title,
  compactResults = false,
  selection,
}: {
  questions: QuizQuestion[];
  onReward: (points: number, correct?: boolean) => void;
  title: string;
  compactResults?: boolean;
  selection: "practice" | "exam";
}) {
  const makeSession = () => (selection === "exam" ? buildExamSession(questions) : buildPracticeSession(questions));
  const [ordered, setOrdered] = useState<QuizQuestion[]>(makeSession);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const question = ordered[index] ?? null;
  const section = question ? sections.find((item) => item.id === question.sectionId) : null;

  function answer(choice: number) {
    if (!question || selected !== null) {
      return;
    }

    const correct = choice === question.correct;
    setSelected(choice);
    if (correct) {
      setScore((value) => value + 1);
      onReward(questionXp(question.difficulty), true);
    } else {
      onReward(0, false);
    }
  }

  function next() {
    if (index + 1 >= ordered.length) {
      const finalScore = score;
      setComplete(true);
      onReward(finalScore >= Math.ceil(ordered.length * 0.75) ? 120 : 40, true);
      return;
    }

    setIndex((value) => value + 1);
    setSelected(null);
  }

  function reset() {
    setOrdered(makeSession());
    setIndex(0);
    setSelected(null);
    setScore(0);
    setComplete(false);
  }

  if (!question) {
    return <EmptyPanel title={title} body="Trenutno nema dostupnih pitanja za ovaj način rada." onReset={reset} />;
  }

  if (complete) {
    const pct = Math.round((score / ordered.length) * 100);
    return <ResultPanel title={title} score={`${score}/${ordered.length}`} pct={pct} onReset={reset} compact={compactResults} />;
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
      <aside className="soft-panel p-5">
        <p className="eyebrow text-[var(--muted)]">{title}</p>
        <h2 className="panel-title mt-2 font-black leading-tight">Pitanje {index + 1}</h2>
        <div className="mt-5 flex items-center justify-between text-xs font-black text-[var(--muted)]">
          <span>{index + 1}/{ordered.length}</span>
          <span>{Math.round(((index + 1) / ordered.length) * 100)}%</span>
        </div>
        <div className="progress-track mt-2">
          <div className="progress-fill bg-[var(--teal)]" style={{ width: `${((index + 1) / ordered.length) * 100}%` }} />
        </div>
        <p className="mt-4 text-sm font-semibold text-[var(--muted)]">
          Sekcija: {section?.title ?? "Mješovito"} · težina {question.difficulty}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <span className="status-chip">To&#269;no {score}</span>
          <span className="status-chip">XP +{questionXp(question.difficulty)}</span>
        </div>
      </aside>

      <article className="console-panel p-4 sm:p-6">
        <p className="question-text font-black">{question.prompt}</p>
        <div className="mt-5 grid gap-3">
          {question.answers.map((answerText, answerIndex) => {
            const isCorrect = answerIndex === question.correct;
            const isSelected = selected === answerIndex;
            const visible = selected !== null;

            return (
              <button
                className={`answer-card flex items-center justify-between gap-3 p-4 text-left font-bold ${
                  visible && isCorrect
                    ? "border-[var(--teal)] bg-[var(--teal-soft)]"
                    : visible && isSelected
                      ? "border-[var(--algebra)] bg-[var(--danger-soft)]"
                      : ""
                }`}
                data-testid={`answer-${answerIndex}`}
                disabled={selected !== null}
                key={answerText}
                onClick={() => answer(answerIndex)}
                type="button"
              >
                {answerText}
                {visible && isCorrect && <Check size={20} />}
                {visible && isSelected && !isCorrect && <X size={20} />}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-5 border-l-4 border-[#202124] bg-white p-4 shadow-[inset_0_0_0_1px_var(--line)]">
            <p className="font-black">{selected === question.correct ? "Točno." : "Nije točno."}</p>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{question.explanation}</p>
            <button
              className="command-button mt-4 px-4 py-2"
              onClick={next}
              type="button"
            >
              Dalje
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </article>
    </section>
  );
}

function TimedMode({ onReward }: { onReward: (points: number, correct?: boolean) => void }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => buildTimedSession(quizQuestions));
  const [remaining, setRemaining] = useState(90);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const finished = remaining === 0 || index >= questions.length;
  const question = questions[Math.min(index, questions.length - 1)] ?? null;

  useEffect(() => {
    if (!started || finished) {
      return;
    }

    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [finished, started]);

  function choose(choice: number) {
    if (!question) {
      return;
    }

    const correct = choice === question.correct;
    if (correct) {
      setScore((value) => value + 1);
      onReward(questionXp(question.difficulty), true);
    } else {
      onReward(0, false);
    }
    setIndex((value) => value + 1);
  }

  function reset() {
    setQuestions(buildTimedSession(quizQuestions));
    setRemaining(90);
    setStarted(false);
    setIndex(0);
    setScore(0);
  }

  if (!started) {
    return (
      <StartPanel
        icon={Clock3}
        title="Brzi test od 90 sekundi"
        body="Dvanaest rotiranih pitanja iz cijelog priručnika. Većina je srednje težine, uz nekoliko težih i jedan izazov."
        action="Pokreni test"
        onStart={() => setStarted(true)}
      />
    );
  }

  if (!question) {
    return <EmptyPanel title="Brzi test" body="Trenutno nema dostupnih pitanja za brzi test." onReset={reset} />;
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return <ResultPanel title="Brzi test" score={`${score}/${questions.length}`} pct={pct} onReset={reset} />;
  }

  return (
    <article className="console-panel p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="panel-title font-black">Brzi test</h2>
        <div className={`border border-[#202124] px-4 py-2 text-xl font-black ${remaining <= 15 ? "bg-[var(--algebra)] text-white" : "bg-white"}`}>
          {remaining}s
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between text-xs font-black text-[var(--muted)]">
        <span>Pitanje {Math.min(index + 1, questions.length)}/{questions.length}</span>
        <span>Rezultat {score}</span>
      </div>
      <div className="progress-track mt-2">
        <div className="progress-fill bg-[var(--algebra)]" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>
      <p className="question-text mt-6 font-black">{question.prompt}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {question.answers.map((answer, answerIndex) => (
          <button
            className="answer-card p-4 text-left font-bold"
            data-testid={`timed-answer-${answerIndex}`}
            key={answer}
            onClick={() => choose(answerIndex)}
            type="button"
          >
            {answer}
          </button>
        ))}
      </div>
    </article>
  );
}

function TicketMode({ onReward }: { onReward: (points: number, correct?: boolean) => void }) {
  const [ticketIndex, setTicketIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const ticket = tickets[ticketIndex] ?? null;
  const actions = useMemo(() => (ticket ? [ticket.bestAction, ...ticket.distractors].sort(() => 0.5 - Math.random()) : []), [ticket]);
  const done = !ticket;

  function choose(action: string) {
    if (!ticket || selected) {
      return;
    }

    setSelected(action);
    onReward(action === ticket.bestAction ? 90 : 0, action === ticket.bestAction);
  }

  function next() {
    setTicketIndex((value) => value + 1);
    setSelected(null);
  }

  if (done) {
    return <ResultPanel title="Service desk smjena" score="Zatvoreno" pct={100} onReset={() => setTicketIndex(0)} />;
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <aside className="soft-panel p-5">
        <p className="eyebrow text-[var(--muted)]">Prijava {ticketIndex + 1}</p>
        <h2 className="panel-title mt-2 font-black leading-tight">{ticket.title}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="status-chip">Korisnik: {ticket.user}</span>
          <span className={`status-chip ${ticket.severity === "P1" ? "border-[var(--algebra)] text-[var(--algebra)]" : ""}`}>
            Prioritet {ticket.severity}
          </span>
        </div>
        <ul className="mt-5 grid gap-2">
          {ticket.symptoms.map((symptom) => (
            <li className="micro-panel flex items-start gap-2 p-3 text-sm font-semibold" key={symptom}>
              <ListChecks className="mt-0.5 text-[var(--algebra)]" size={17} />
              {symptom}
            </li>
          ))}
        </ul>
      </aside>

      <article className="console-panel p-4 sm:p-6">
        <p className="eyebrow text-[var(--muted)]">Odaberi najbolji prvi korak</p>
        <div className="mt-4 grid gap-3">
          {actions.map((action) => {
            const isBest = action === ticket.bestAction;
            const active = selected === action;

            return (
              <button
                className={`answer-card p-4 text-left font-bold ${
                  selected && isBest
                    ? "border-[var(--teal)] bg-[var(--teal-soft)]"
                    : active
                      ? "border-[var(--algebra)] bg-[var(--danger-soft)]"
                      : ""
                }`}
                data-testid={`ticket-action-${actions.indexOf(action)}`}
                key={action}
                onClick={() => choose(action)}
                type="button"
              >
                {action}
              </button>
            );
          })}
        </div>
        {selected && (
          <div className="mt-5 border-l-4 border-[#202124] bg-white p-4 shadow-[inset_0_0_0_1px_var(--line)]">
            <p className="font-black">{selected === ticket.bestAction ? "Ticket riješen." : "To bi moglo pogoršati smjenu."}</p>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{ticket.lesson}</p>
            <button
              className="command-button mt-4 px-4 py-2"
              onClick={next}
              type="button"
            >
              Sljedeća prijava
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </article>
    </section>
  );
}

function SubnetMode({ onReward }: { onReward: (points: number, correct?: boolean) => void }) {
  const [drillIndex, setDrillIndex] = useState(0);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const drill = subnetDrills[drillIndex];

  function submit() {
    const normalizedValue = value.trim().toLowerCase();
    const normalizedAnswer = drill.answer.trim().toLowerCase();
    const correct = normalizedValue === normalizedAnswer;
    setMessage(correct ? `Točno: ${drill.value} → ${drill.answer}.` : `Nije još. Trag: ${drill.hint}`);
    onReward(correct ? 80 : 0, correct);
    if (correct) {
      window.setTimeout(() => {
        setDrillIndex((index) => (index + 1) % subnetDrills.length);
        setValue("");
        setMessage(null);
      }, 900);
    }
  }

  return (
    <article className="console-panel p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-[var(--muted)]">Binary lab</p>
          <h2 className="panel-title mt-2 font-black leading-tight">{drill.prompt}</h2>
        </div>
        <div className="w-full min-w-0 bg-[#202124] px-4 py-3 font-mono text-2xl font-black text-white sm:w-auto sm:text-3xl">{drill.value}</div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="grid gap-2 text-sm font-black uppercase tracking-[0.12em] text-[var(--muted)]">
          Odgovor
          <input
            className="h-16 border border-[#202124] bg-white px-4 font-mono text-2xl font-black text-[#202124] shadow-[inset_4px_0_0_var(--teal)]"
            inputMode={drill.mode === "binary-to-decimal" ? "numeric" : "text"}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                submit();
              }
            }}
            value={value}
          />
        </label>
        <button
          className="command-button self-end px-5 py-4 md:w-auto"
          onClick={submit}
          type="button"
        >
          Provjeri
        </button>
      </div>
      {drill.mode === "mask-check" ? (
        <div className="micro-panel mt-5 p-4">
          <p className="eyebrow text-[var(--muted)]">Mrežni trag</p>
          <p className="mt-2 font-semibold">{drill.hint}</p>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {[128, 64, 32, 16, 8, 4, 2, 1].map((bit, index) => (
            <div className="micro-panel p-3 text-center" key={bit}>
              <p className="font-mono text-xl font-black">
                {drill.mode === "binary-to-decimal" ? drill.value[index] : drill.answer[index] ?? "-"}
              </p>
              <p className="text-xs font-bold text-[var(--muted)]">{bit}</p>
            </div>
          ))}
        </div>
      )}
      {message && <p className="mt-5 border-l-4 border-[var(--algebra)] bg-white p-4 font-bold shadow-[inset_0_0_0_1px_var(--line)]">{message}</p>}
    </article>
  );
}

function EmptyPanel({ title, body, onReset }: { title: string; body: string; onReset: () => void }) {
  return (
    <section className="console-panel p-5 sm:p-7">
      <div className="flex h-16 w-16 items-center justify-center bg-[#202124] text-white">
        <HelpCircle size={34} />
      </div>
      <h2 className="panel-title mt-5 font-black">{title}</h2>
      <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">{body}</p>
      <button
        className="command-button mt-6 px-5 py-3"
        onClick={onReset}
        type="button"
      >
        <RotateCcw size={18} />
        Pokušaj ponovno
      </button>
    </section>
  );
}

function StartPanel({
  icon: Icon,
  title,
  body,
  action,
  onStart,
}: {
  icon: typeof Clock3;
  title: string;
  body: string;
  action: string;
  onStart: () => void;
}) {
  return (
    <section className="console-panel p-5 sm:p-7">
      <div className="flex h-16 w-16 items-center justify-center bg-[#202124] text-white">
        <Icon size={32} />
      </div>
      <h2 className="panel-title mt-5 font-black">{title}</h2>
      <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">{body}</p>
      <button
        className="command-button command-button-danger mt-6 px-5 py-3"
        onClick={onStart}
        type="button"
      >
        <Play size={18} />
        {action}
      </button>
    </section>
  );
}

function ResultPanel({
  title,
  score,
  pct,
  onReset,
  compact = false,
}: {
  title: string;
  score: string;
  pct: number;
  onReset: () => void;
  compact?: boolean;
}) {
  return (
    <section className="console-panel p-5 sm:p-7">
      <div className="flex h-16 w-16 items-center justify-center bg-[var(--teal)] text-white">
        <Award size={34} />
      </div>
      <h2 className="panel-title mt-5 font-black">{title}</h2>
      <p className="mt-3 text-xl font-black sm:text-2xl">
        Rezultat: {score} {score.includes("/") ? `(${pct}%)` : ""}
      </p>
      {!compact && (
        <p className="mt-2 max-w-2xl text-base font-semibold leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
          {pct >= 80
            ? "Spreman si za sljedeću smjenu. Sad samo čuvaj redoslijed dijagnostike."
            : "Dobro zagrijavanje. Vrati se na misije s najnižom sigurnošću i ponovi test."}
        </p>
      )}
      <button
        className="command-button mt-6 px-5 py-3"
        onClick={onReset}
        type="button"
      >
        <RotateCcw size={18} />
        Ponovi
      </button>
    </section>
  );
}
