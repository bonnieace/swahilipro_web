
"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Lock, CheckCircle, X } from 'lucide-react';

// Constants
const BADGES = [
  {
    name: "Mwanafunzi",
    requiredPoints: 25,
    icon: "🌱",
    description: "Mwanafunzi"
  },
  {
    name: "Mjuzi",
    requiredPoints: 60,
    icon: "⭐",
    description: "Mjuzi"
  },
  {
    name: "Mtaalam",
    requiredPoints: 100,
    icon: "👑",
    description: "Mtaalam"
  }
];

const CONCEPTS = [
  {
    id: 0,
    title: "Introduction (Utangulizi)",
    points: 20,
    shortDescription: "Jifunze kuandika msimbo kwa kiswahili na kutekeleza.",
    explanation: "Karibu katika masomo ya swahilipro.\nHapa utajifunza kuandika na kutekeleza lugha hii.\n Fungua Visual Studio Code.\nUnda faili na kiendelezi (extension) .swa. \nFungua Command Line Interface. (CMD)\nAndika swahilipro  katika CMD ili uweze kuanzisha mkusanyaji (compiler).\nKisha andika swa(\"filename.swa\") ili kutekeleza faili hilo.",
    examples: [
      {
        code: "ikiwa faili yako umeiita msimbo.swa \nandika swahilipro katika cmd\nKisha andika swa(\"msimbo.swa\")",
        description: "utekelezaji (Compilation)"
      },
      {
        code: "andika(\"Habari Kenya!\")",
        description: "Hello world!"
      },
      
    ],
    practice: [
      {
        question: "Unda msimbo unaoandika neno swahilipro",
        answer: "andika(\"Swahilipro.\")"
      }
    ],
    requiredPoints: 0
  },
  {
    id: 1,
    title: "Variables (Vigezo)",
    points: 10,
    shortDescription: "Jifunze kuhifadhi data katika vigezo na kuvitumia.",
    explanation: "Variabu/Vigezo hutangazwa kwa kutumia neno kuu var. Vigezo hivi vinaweza kuhifadhi aina tofauti za data kama maandishi (string) na nambari (int).",
    examples: [
     
      {
        code: "var jina = \"Habari\"\nvar idadi = 10",
        description: "Kutangaza Kigezo cha Msingi (Basic variable declaration)"
      },
      {
        code: "var salamu = \"Habari\" + \" Dunia\"\nandika(salamu)",
        description: "Kuunganisha maneno (String Concatenation)"
      }
    ],
    practice: [
      {
        question: "Unda Kigezo Kinachoitwa 'umri' na Kipe Thamani 25",
        answer: "var umri = 25"
      }
    ],
    requiredPoints: 20
  },
  {
    id: 2,
    title: "Arithmetic Operations (Operesheni za Hisabati)",
    points: 15,
    shortDescription: "Jifunze kutumia operesheni za hisabati katika msimbo.",
    explanation: "Operesheni za hisabati :\n + Ongeza  (addition),\n - Toa  (subtraction)\n* Mara  (multiplication),\n/ Gawa  (division), \n^ Karisimu  (exponentiation)",
    examples: [
      {
        code: "var a = 5\nvar b = 2\nvar jumla = a + b\nandika(jumla)  \n",
        description: "Operesheni ya Jumla (Addition)"
      },
      {
        code: "var tofauti = 10 - 3\nandika(tofauti)  \n",
        description: "Operesheni ya Toa (Subtraction)"
      },
      {
        code: "var zao = 4 * 3\nandika(zao)  \n# Matokeo: 12",
        description: "Operesheni ya mara (Multiplication)"
      }
    ],
    practice: [
      {
        question: "Andika msimbo unaohesabu wastani wa nambari : 10, 15, and 20",
        answer: "var jumla = 10 + 15 + 20\nvar wastani = jumla / 3\nandika(wastani)"
      }
    ],
    requiredPoints: 30
  },
  {
    id: 3,
    title: "Control Structures (Miundo ya Kudhibiti)",
    points: 20,
    shortDescription: "Jifunze miundo ya kudhibiti na matumizi yake.",
    explanation: "Miundo ya udhibiti husimamia mtiririko wa programu kwa kutumia masharti  kama vile taarifa za `ikiwa`(if) na `kwa`(for)",
    examples: [
      {
        code: "var umri = 18\nikiwa umri >= 18 basi\n    andika(\"Umekua\")\nikiwa_nyingine\n    andika(\"Bado mdogo\")\nfunga",
        description: "(If-else statement) :Taarifa ya ikiwa/ikiwa_nyingine hutumika kutekeleza vitendo tofauti kulingana na sharti lililotolewa. Ikiwa sharti ni kweli (true), sehemu ya kwanza ya msimbo hufanyika. Ikiwa si kweli (false), sehemu nyingine (ikiwa_nyingine) hutekelezwa."
      },
      {
        code: " var i = 1\n kwa i=1 hadi 5 basi\n    andika(i)\nfunga",
        description: "(For loop): Kwa hutumika kurudia utekelezaji wa msimbo fulani kwa idadi maalum ya mara. "
      }
    ],
    practice: [
      {
        question: " msimbo unaoandika nambari toka moja hadi tatu",
        answer: "var i = 1\nkwa  i = 1 hadi 4 basi\n    andika(i)\nfunga"
      }
    ],
    requiredPoints: 45
  },
  {
    id: 4,
    title: "Functions (Njia)",
    points: 20,
    shortDescription: "Unda Vipande vya Msimbo Vinavyotumika Tena kwa Kutumia njia",
    explanation: "Functions zinatambulishwa kwa kutumia neno kuu njia, na zinaweza kurudisha thamani kwa kutumia neno rudisha.Hii ni sehemu ya msimbo inayotekeleza jukumu maalum na inaweza kuitwa tena inapohitajika bila kuandikwa upya.",
    examples: [
      {
        code: "njia ongeza(a,b)\n    rudisha (a + b)\nfunga\n\nvar jibu = ongeza(5,3)\n andika(jibu) ",
        description: " Njia inayopokea thamani ya nambari  kama ingizo (integer parameter) ili kutekeleza jukumu maalum."
      },
      {
        code: "njia karibisha(jina) \n    rudisha( \"Habari, \" + jina)\nfunga\n var jibu = karibisha(\"bonnie\")\nandika(jibu)",
        description: "njia inayopokea thamani ya maandishi  kama ingizo (string parameter) ili kutekeleza jukumu maalum."
      }
    ],
    practice: [
      {
        question: "Andika njia inayozidisha nambari mbili(multiplication of two numbers)",
        answer: "njia zidisha(a, b) \n    rudisha (a * b)\nfunga\nvar tokeo = zidisha(2,3)"
      }
    ],
    requiredPoints: 65
  },
  {
    id: 5,
    title: "Logical & Comparison Operators. (Operesheni za ulinganishaji)",
    points: 15,
    shortDescription: "Jifunze Jinsi ya Kulinganisha Thamani .",
    explanation: " uendeshaji wa mantiki kwa kutumia na , au (AND OR Statements)  na  ulinganishaji  kwa kutumia  (==, !=, <, >, <=, >=) (Comparission operators) ni muhimu kwa kutengeneza masharti yanayosaidia kudhibiti mtiririko wa programu.",
    examples: [
      {
        code: "var umri = 25\nvar ana_kitambulisho = kweli\n\nikiwa umri >= 18 na ana_kitambulisho basi\n    andika(\"Unaweza kuingia\")\nfunga",
        description: "(Logical AND operator) Na: hutumika kuunganisha masharti mawili au zaidi, na kurudisha kweli tu ikiwa yote ya masharti yaliyounganishwa ni kweli (true). Ikiwa hata moja ya masharti ni false, basi matokeo yatakuwa false."
      },
      {
        code: "var saa = 17\nikiwa saa < 12 au saa > 22 basi\n    andika(\"Duka limefungwa\")\nfunga",
        description: "(Logical OR operator)Au:  hutumika kuunganisha masharti mawili au zaidi, na kurudisha kweli ikiwa angalau moja ya masharti ni kweli (true)"
      }
    ],
    practice: [
      {
        question: "Andika msimbo unaotafuta nambari kati ya 1 na 10.",
        answer: "var nambari = 5\nikiwa nambari >= 1 na nambari <= 10 basi\n    andika(\"Nambari sahihi\")\nfunga"
      }
    ],
    requiredPoints: 85
  }
  // ... other concepts
];

// Components
const PracticeItem = ({ item }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="mb-6 bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <p className="font-medium mb-4 text-gray-800">{item.question}</p>
      
      <button
        onClick={() => setIsRevealed(!isRevealed)}
        className={`transition-colors duration-300 px-4 py-2 rounded-md text-white font-medium ${
          isRevealed ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
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
    {BADGES.map(badge => (
      <div
        key={badge.name}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm
          ${currentPoints >= badge.requiredPoints 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-500'}`}
      >
        <span>{badge.icon}</span>
        <span>{badge.description}</span>
      </div>
    ))}
  </div>
);

const CompletionAlert = ({ onClose }) => (
  <div 
    role="alert"
    className="fixed top-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
  >
    <CheckCircle className="w-4 h-4" aria-hidden="true" />
    Concept completed! Keep up the great work!
    <button 
      onClick={onClose}
      className="ml-2 text-green-800 hover:text-green-900"
      aria-label="Close alert"
    >
      <X className="w-4 h-4" aria-hidden="true" />
    </button>
  </div>
);

const ConceptCard = ({ concept, isLocked, isCompleted, points, onClick }) => (
  <button 
    onClick={onClick}
    disabled={isLocked}
    className={`p-4 sm:p-6 w-full text-left rounded-lg shadow-md transition-all hover:shadow-lg
      ${isLocked 
        ? 'bg-gray-100 border border-gray-300 opacity-60 cursor-not-allowed' 
        : isCompleted 
          ? 'bg-green-50 border border-green-500' 
          : 'bg-blue-50 border border-blue-500'}`}
    aria-label={`${concept.title}${isLocked ? ' (Locked)' : ''}`}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-base sm:text-lg">{concept.title}</h3>
        <p className="text-xs sm:text-sm text-gray-600">{concept.shortDescription}</p>
      </div>
      {isLocked ? (
        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
      ) : isCompleted ? (
        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" aria-hidden="true" />
      ) : (
        <span className="text-xs sm:text-sm font-semibold text-blue-600">+{points}</span>
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
  <div className="fixed inset-0 z-50 overflow-auto bg-white" role="dialog" aria-label={`${concept.title} details`}>
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          aria-label="Back to concepts list"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
         Rudi nyuma
        </button>
        
        {!isCompleted && (
          <button
            onClick={onComplete}
            className="bg-blue-500 text-white px-4 py-2 fixed right-6 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            aria-label="Mark concept as complete"
          >
            <CheckCircle className="w-4 h-4" aria-hidden="true" />
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
    const savedProgress = localStorage.getItem('swahiliLMSProgress');
    if (savedProgress) {
      setCompletedConcepts(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('swahiliLMSProgress', JSON.stringify(completedConcepts));
  }, [completedConcepts]);

  const getCurrentPoints = () => {
    return completedConcepts.reduce((total, conceptId) => {
      const concept = CONCEPTS.find(c => c.id === conceptId);
      return total + (concept ? concept.points : 0);
    }, 0);
  };

  const handleConceptComplete = (conceptId) => {
    if (!completedConcepts.includes(conceptId)) {
      setCompletedConcepts([...completedConcepts, conceptId]);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      
      const currentPoints = getCurrentPoints() + CONCEPTS.find(c => c.id === conceptId).points;
      const newBadge = BADGES.find(b => 
        b.requiredPoints <= currentPoints && 
        b.requiredPoints > getCurrentPoints()
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
        <div className="min-h-screen w-full mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">SwahiliPro</h1>
              <p className="text-gray-600">Jifunze lugha ya msimbo ya kiswahili</p>
            </div>
            <BadgeDisplay currentPoints={getCurrentPoints()} />
          </div>

          <ProgressBar currentPoints={getCurrentPoints()} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONCEPTS.map(concept => (
              <ConceptCard
                key={concept.id}
                concept={concept}
                isLocked={isConceptLocked(concept)}
                isCompleted={completedConcepts.includes(concept.id)}
                points={concept.points}
                onClick={() => !isConceptLocked(concept) && setSelectedConcept(concept)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SwahiliProgrammingLMS;