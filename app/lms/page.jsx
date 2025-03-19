"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, Lock, CheckCircle, X } from "lucide-react";

import Navbar from "@/components/navbar";

// Constants
const BADGES = [
  {
    name: "Mwanafunzi",
    requiredPoints: 25,
    icon: "🌱",
    description: "Mwanafunzi",
  },
  {
    name: "Mjuzi",
    requiredPoints: 60,
    icon: "⭐",
    description: "Mjuzi",
  },
  {
    name: "Mtaalam",
    requiredPoints: 100,
    icon: "👑",
    description: "Mtaalam",
  },
];

const CONCEPTS = [
  {
    id: 0,
    title: "Introduction (Utangulizi)",
    points: 20,
    shortDescription: "Jifunze kuandika msimbo kwa kiswahili na kutekeleza.",
    explanation:
      'Karibu katika masomo ya swahilipro.\nHapa utajifunza kuandika na kutekeleza lugha hii.\n Fungua Visual Studio Code.\nUnda faili na kiendelezi (extension) .swa. \nFungua Command Line Interface. (CMD)\nAndika swahilipro  katika CMD ili uweze kuanzisha mkusanyaji (compiler).\nKisha andika swa("filename.swa") ili kutekeleza faili hilo.',
    examples: [
      {
        code: 'ikiwa faili yako umeiita msimbo.swa \nandika swahilipro katika cmd\nKisha andika swa("msimbo.swa")',
        description: "utekelezaji (Compilation)",
      },
      {
        code: 'andika("Habari Kenya!")',
        description: "Hello world!",
      },
    ],
    practice: [
      {
        question: "Unda msimbo unaoandika neno swahilipro",
        answer: 'andika("Swahilipro.")',
      },
    ],
    requiredPoints: 0,
  },
  {
    id: 1,
    title: "Variables (Vigezo)",
    points: 10,
    shortDescription: "Jifunze kuhifadhi data katika vigezo na kuvitumia.",
    explanation:
      "Variabu/Vigezo hutangazwa kwa kutumia neno kuu wacha. Vigezo hivi vinaweza kuhifadhi aina tofauti za data kama maandishi (string) na nambari (int).",
    examples: [
      {
        code: 'wacha jina = "Habari"\nwacha idadi = 10',
        description: "Kutangaza Kigezo cha Msingi (Basic variable declaration)",
      },
      {
        code: 'wacha salamu = "Habari" + " Dunia"\nandika(salamu)',
        description: "Kuunganisha maneno (String Concatenation)",
      },
    ],
    practice: [
      {
        question: "Unda Kigezo Kinachoitwa 'umri' na Kipe Thamani 25",
        answer: "wacha umri = 25",
      },
    ],
    requiredPoints: 20,
  },
  {
    id: 2,
    title: "Arithmetic Operations (Operesheni za Hisabati)",
    points: 15,
    shortDescription: "Jifunze kutumia operesheni za hisabati katika msimbo.",
    explanation:
      "Operesheni za hisabati :\n + Ongeza  (addition),\n - Toa  (subtraction)\n* Mara  (multiplication),\n/ Gawa  (division), \n^ Karisimu  (exponentiation)",
    examples: [
      {
        code: "wacha a = 5\nwacha b = 2\nwacha jumla = a + b\nandika(jumla)  \n",
        description: "Operesheni ya Jumla (Addition)",
      },
      {
        code: "wacha tofauti = 10 - 3\nandika(tofauti)  \n",
        description: "Operesheni ya Toa (Subtraction)",
      },
      {
        code: "wacha zao = 4 * 3\nandika(zao)  \n# Matokeo: 12",
        description: "Operesheni ya mara (Multiplication)",
      },
    ],
    practice: [
      {
        question:
          "Andika msimbo unaohesabu wastani wa nambari : 10, 15, and 20",
        answer:
          "wacha jumla = 10 + 15 + 20\nwacha wastani = jumla / 3\nandika(wastani)",
      },
    ],
    requiredPoints: 30,
  },
  {
    id: 3,
    title: "Control Structures (Miundo ya Kudhibiti)",
    points: 20,
    shortDescription: "Jifunze miundo ya kudhibiti na matumizi yake.",
    explanation:
      "Miundo ya udhibiti husimamia mtiririko wa programu kwa kutumia masharti  kama vile taarifa za `ikiwa`(if) na `kwa`(for)",
    examples: [
      {
        code: 'wacha umri = 18\nikiwa umri >= 18 basi\n    andika("Umekua")\nikiwa_nyingine\n    andika("Bado mdogo")\nfunga',
        description:
          "(If-else statement) :Taarifa ya ikiwa/ikiwa_nyingine hutumika kutekeleza vitendo tofauti kulingana na sharti lililotolewa. Ikiwa sharti ni kweli (true), sehemu ya kwanza ya msimbo hufanyika. Ikiwa si kweli (false), sehemu nyingine (ikiwa_nyingine) hutekelezwa.",
      },
      {
        code: " wacha i = 1\n kwa i=1 hadi 5 basi\n    andika(i)\nfunga",
        description:
          "(For loop): Kwa hutumika kurudia utekelezaji wa msimbo fulani kwa idadi maalum ya mara. ",
      },
    ],
    practice: [
      {
        question: " msimbo unaoandika nambari toka moja hadi tatu",
        answer: "wacha i = 1\nkwa  i = 1 hadi 4 basi\n    andika(i)\nfunga",
      },
    ],
    requiredPoints: 45,
  },
  {
    id: 4,
    title: "Functions (Njia)",
    points: 20,
    shortDescription:
      "Unda Vipande vya Msimbo Vinavyotumika Tena kwa Kutumia njia",
    explanation:
      "Functions zinatambulishwa kwa kutumia neno kuu njia, na zinaweza kurudisha thamani kwa kutumia neno rudisha.Hii ni sehemu ya msimbo inayotekeleza jukumu maalum na inaweza kuitwa tena inapohitajika bila kuandikwa upya.",
    examples: [
      {
        code: "njia ongeza(a,b)\n    rudisha (a + b)\nfunga\n\nwacha jibu = ongeza(5,3)\n andika(jibu) ",
        description:
          " Njia inayopokea thamani ya nambari  kama ingizo (integer parameter) ili kutekeleza jukumu maalum.",
      },
      {
        code: 'njia karibisha(jina) \n    rudisha( "Habari, " + jina)\nfunga\n wacha jibu = karibisha("bonnie")\nandika(jibu)',
        description:
          "njia inayopokea thamani ya maandishi  kama ingizo (string parameter) ili kutekeleza jukumu maalum.",
      },
    ],
    practice: [
      {
        question:
          "Andika njia inayozidisha nambari mbili(multiplication of two numbers)",
        answer:
          "njia zidisha(a, b) \n    rudisha (a * b)\nfunga\nwacha tokeo = zidisha(2,3)",
      },
    ],
    requiredPoints: 65,
  },
  {
    id: 5,
    title: "Logical & Comparison Operators. (Operesheni za ulinganishaji)",
    points: 15,
    shortDescription: "Jifunze Jinsi ya Kulinganisha Thamani .",
    explanation:
      " uendeshaji wa mantiki kwa kutumia na , au (AND OR Statements)  na  ulinganishaji  kwa kutumia  (==, !=, <, >, <=, >=) (Comparission operators) ni muhimu kwa kutengeneza masharti yanayosaidia kudhibiti mtiririko wa programu.",
    examples: [
      {
        code: 'wacha umri = 25\nwacha ana_kitambulisho = kweli\n\nikiwa umri >= 18 na ana_kitambulisho basi\n    andika("Unaweza kuingia")\nfunga',
        description:
          "(Logical AND operator) Na: hutumika kuunganisha masharti mawili au zaidi, na kurudisha kweli tu ikiwa yote ya masharti yaliyounganishwa ni kweli (true). Ikiwa hata moja ya masharti ni false, basi matokeo yatakuwa false.",
      },
      {
        code: 'wacha saa = 17\nikiwa saa < 12 au saa > 22 basi\n    andika("Duka limefungwa")\nfunga',
        description:
          "(Logical OR operator)Au:  hutumika kuunganisha masharti mawili au zaidi, na kurudisha kweli ikiwa angalau moja ya masharti ni kweli (true)",
      },
    ],
    practice: [
      {
        question: "Andika msimbo unaotafuta nambari kati ya 1 na 10.",
        answer:
          'wacha nambari = 5\nikiwa nambari >= 1 na nambari <= 10 basi\n    andika("Nambari sahihi")\nfunga',
      },
    ],
    requiredPoints: 85,
  },
  // ... other concepts
];

// Components
const PracticeItem = ({ item }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="mb-6 bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <p className="font-medium mb-4 text-gray-800">{item.question}</p>

      <button
        className={`transition-colors duration-300 px-4 py-2 rounded-md text-white font-medium ${
          isRevealed
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={() => setIsRevealed(!isRevealed)}
      >
        {isRevealed ? "Ficha Jibu" : "Onyesha Jibu"}
      </button>

      {isRevealed && (
        <pre className="bg-gray-900 text-white p-4 rounded-lg mt-4">
          <code>{item.answer}</code>
        </pre>
      )}
    </div>
  );
};

const ProgressBar = ({ currentPoints, totalPoints = 100 }) => (
  <div className="space-y-2">
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(currentPoints / totalPoints) * 100}%` }}
      />
    </div>
    <div className="flex justify-between text-xs sm:text-sm text-gray-600">
      <span>Umewai pointi : {currentPoints} </span>
      <span>Pointi {totalPoints} jumla</span>
    </div>
  </div>
);

const BadgeDisplay = ({ currentPoints }) => (
  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
    {BADGES.map((badge) => (
      <div
        key={badge.name}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm
          ${
            currentPoints >= badge.requiredPoints
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
      >
        <span>{badge.icon}</span>
        <span>{badge.description}</span>
      </div>
    ))}
  </div>
);

const CompletionAlert = ({ onClose }) => (
  <div
    className="fixed top-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
    role="alert"
  >
    <CheckCircle aria-hidden="true" className="w-4 h-4" />
    Concept completed! Keep up the great work!
    <button
      aria-label="Close alert"
      className="ml-2 text-green-800 hover:text-green-900"
      onClick={onClose}
    >
      <X aria-hidden="true" className="w-4 h-4" />
    </button>
  </div>
);

const ConceptCard = ({ concept, isLocked, isCompleted, points, onClick }) => (
  <button
    aria-label={`${concept.title}${isLocked ? " (Locked)" : ""}`}
    className={`p-4 sm:p-6 w-full text-left rounded-lg shadow-md transition-all hover:shadow-lg
      ${
        isLocked
          ? "bg-gray-100 border border-gray-300 opacity-60 cursor-not-allowed"
          : isCompleted
            ? "bg-green-50 border border-green-500"
            : "bg-blue-50 border border-blue-500"
      }`}
    disabled={isLocked}
    onClick={onClick}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-base sm:text-lg">{concept.title}</h3>
        <p className="text-xs sm:text-sm text-gray-600">
          {concept.shortDescription}
        </p>
      </div>
      {isLocked ? (
        <Lock
          aria-hidden="true"
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
        />
      ) : isCompleted ? (
        <CheckCircle
          aria-hidden="true"
          className="w-4 h-4 sm:w-5 sm:h-5 text-green-500"
        />
      ) : (
        <span className="text-xs sm:text-sm font-semibold text-blue-600">
          +{points}
        </span>
      )}
    </div>

    {isLocked && (
      <div className="text-xs sm:text-sm text-gray-500 mt-4">
        Fungua na pointi {concept.requiredPoints}
      </div>
    )}
  </button>
);

const ConceptView = ({ concept, isCompleted, onBack, onComplete }) => (
  <div
    aria-label={`${concept.title} details`}
    className="fixed inset-0 z-50 overflow-auto bg-white"
    role="dialog"
  >
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <button
          aria-label="Back to concepts list"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          onClick={onBack}
        >
          <ChevronLeft aria-hidden="true" className="w-5 h-5" />
          Rudi nyuma
        </button>

        {!isCompleted && (
          <button
            aria-label="Mark concept as complete"
            className="bg-blue-500 text-white px-4 py-2 fixed right-6 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            onClick={onComplete}
          >
            <CheckCircle aria-hidden="true" className="w-4 h-4" />
            Maliza somo
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{concept.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <span>Pointi {concept.points} </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-4 h-4" />
                Imekamilika
              </span>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 shadow-md">
          {concept.explanation}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Mifano</h2>
          {concept.examples.map((example, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-medium mb-2">{example.description}</h3>
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                <code>{example.code}</code>
              </pre>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-6">Practice</h2>
          {concept.practice.map((item, index) => (
            <PracticeItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Main Component
const SwahiliProgrammingLMS = () => {
  const [completedConcepts, setCompletedConcepts] = useState([]);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem("swahiliLMSProgress");

    if (savedProgress) {
      setCompletedConcepts(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "swahiliLMSProgress",
      JSON.stringify(completedConcepts),
    );
  }, [completedConcepts]);

  const getCurrentPoints = () => {
    return completedConcepts.reduce((total, conceptId) => {
      const concept = CONCEPTS.find((c) => c.id === conceptId);

      return total + (concept ? concept.points : 0);
    }, 0);
  };

  const handleConceptComplete = (conceptId) => {
    if (!completedConcepts.includes(conceptId)) {
      setCompletedConcepts([...completedConcepts, conceptId]);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);

      const currentPoints =
        getCurrentPoints() + CONCEPTS.find((c) => c.id === conceptId).points;
      const newBadge = BADGES.find(
        (b) =>
          b.requiredPoints <= currentPoints &&
          b.requiredPoints > getCurrentPoints(),
      );

      if (newBadge) {
        alert(`Congratulations! You've earned the ${newBadge.name} badge!`);
      }
    }
  };

  const isConceptLocked = (concept) => {
    return getCurrentPoints() < concept.requiredPoints;
  };

  return (
    <div>
      {showAlert && <CompletionAlert onClose={() => setShowAlert(false)} />}

      {selectedConcept ? (
        <ConceptView
          concept={selectedConcept}
          isCompleted={completedConcepts.includes(selectedConcept.id)}
          onBack={() => setSelectedConcept(null)}
          onComplete={() => handleConceptComplete(selectedConcept.id)}
        />
      ) : (
        <div className=" bg-gradient-to-r from-rose-100 to-teal-100">
          <header className="">
            <div className="mx-auto  px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex-1 md:flex md:items-center md:gap-12">
                  <a className="block text-teal-600" href="/">
                    <span className="sr-only">Home</span>
                    <svg
                      className="h-8"
                      fill="none"
                      viewBox="0 0 28 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>

                <Navbar />
              </div>
            </div>
          </header>
          <div className="min-h-screen w-full mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  SwahiliPro
                </h1>
                <p className="text-gray-600">
                  Jifunze lugha ya msimbo ya kiswahili
                </p>
              </div>
              <BadgeDisplay currentPoints={getCurrentPoints()} />
            </div>

            <ProgressBar currentPoints={getCurrentPoints()} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONCEPTS.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  isCompleted={completedConcepts.includes(concept.id)}
                  isLocked={isConceptLocked(concept)}
                  points={concept.points}
                  onClick={() =>
                    !isConceptLocked(concept) && setSelectedConcept(concept)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwahiliProgrammingLMS;
