
"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Lock, CheckCircle, X } from 'lucide-react';

// Constants
const BADGES = [
  {
    name: "Mwanafunzi",
    requiredPoints: 25,
    icon: "🌱",
    description: "Beginner"
  },
  {
    name: "Mjuzi",
    requiredPoints: 60,
    icon: "⭐",
    description: "Intermediate"
  },
  {
    name: "Mtaalam",
    requiredPoints: 100,
    icon: "👑",
    description: "Expert"
  }
];

const CONCEPTS = [
  {
    id: 1,
    title: "Variables (Vigezo)",
    points: 10,
    shortDescription: "Learn about storing and manipulating data with variables",
    explanation: "Variables in Swahili programming are declared using the 'var' keyword. They can store different types of data like text (string) and numbers.",
    examples: [
      {
        code: "var jina = \"Habari\"\nvar idadi = 10",
        description: "Basic variable declaration"
      },
      {
        code: "var salamu = \"Habari\" + \" Dunia\"\nandika(salamu)",
        description: "String operations"
      }
    ],
    practice: [
      {
        question: "Create a variable named 'umri' and assign it the value 25",
        answer: "var umri = 25"
      }
    ],
    requiredPoints: 0
  },
  {
    id: 2,
    title: "Arithmetic Operations (Operesheni za Hisabati)",
    points: 15,
    shortDescription: "Master basic mathematical operations in Swahili",
    explanation: "Swahili programming supports basic arithmetic operations:\n+ (Ongeza) for addition\n- (Toa) for subtraction\n* (Mara) for multiplication\n/ (Gawa) for division\n^ (Karisimu) for exponentiation",
    examples: [
      {
        code: "var a = 5\nvar b = 2\nvar jumla = a + b\nandika(jumla)  \n# Matokeo: 7",
        description: "Addition"
      },
      {
        code: "var tofauti = 10 - 3\nandika(tofauti)  \n# Matokeo: 7",
        description: "Subtraction"
      },
      {
        code: "var zao = 4 * 3\nandika(zao)  \n# Matokeo: 12",
        description: "Multiplication"
      }
    ],
    practice: [
      {
        question: "Calculate the average of numbers 10, 15, and 20",
        answer: "var jumla = 10 + 15 + 20\nvar wastani = jumla / 3\nandika(wastani)"
      }
    ],
    requiredPoints: 10
  },
  {
    id: 3,
    title: "Control Structures (Miundo ya Kudhibiti)",
    points: 20,
    shortDescription: "Learn about conditional statements and loops",
    explanation: "Control structures help manage program flow using conditions and loops. They include if statements (ikiwa) and loops (kwa).",
    examples: [
      {
        code: "var umri = 18\nikiwa umri >= 18 basi\n    andika(\"Umekua\")\nikiwa_nyingine\n    andika(\"Bado mdogo\")\nfunga",
        description: "If-else statement"
      },
      {
        code: " var i = 1\n kwa i=1 hadi 5 basi\n    andika(i)\nfunga",
        description: "For loop"
      }
    ],
    practice: [
      {
        question: "Write a loop that prints numbers from 1 to 3",
        answer: "kwa var i = 1 hadi 3 basi\n    andika(i)\nfunga"
      }
    ],
    requiredPoints: 25
  },
  {
    id: 4,
    title: "Functions (Njia)",
    points: 20,
    shortDescription: "Create reusable blocks of code with functions",
    explanation: "Functions are defined using the 'njia' keyword and can return values using 'rudisha'.",
    examples: [
      {
        code: "njia ongeza(a, b) basi\n    rudisha a + b\nfunga\n\nvar matokeo = ongeza(5, 3)\nandika(matokeo)  \n# Matokeo: 8",
        description: "Basic function"
      },
      {
        code: "njia karibisha(jina) basi\n    rudisha \"Habari, \" + jina\nfunga",
        description: "Function with string parameter"
      }
    ],
    practice: [
      {
        question: "Create a function that multiplies two numbers",
        answer: "njia zidisha(a, b) basi\n    rudisha a * b\nfunga"
      }
    ],
    requiredPoints: 45
  },
  {
    id: 5,
    title: "Logical & Comparison Operators",
    points: 15,
    shortDescription: "Learn how to compare values and combine conditions",
    explanation: "Logical operators (na, au) and comparison operators (==, !=, <, >, <=, >=) are used for creating conditions.",
    examples: [
      {
        code: "var umri = 25\nvar ana_kitambulisho = kweli\n\nikiwa umri >= 18 na ana_kitambulisho basi\n    andika(\"Unaweza kuingia\")\nfunga",
        description: "Logical AND operator"
      },
      {
        code: "var saa = 17\nikiwa saa < 12 au saa > 22 basi\n    andika(\"Duka limefungwa\")\nfunga",
        description: "Logical OR operator"
      }
    ],
    practice: [
      {
        question: "Write a condition that checks if a number is between 1 and 10",
        answer: "var nambari = 5\nikiwa nambari >= 1 na nambari <= 10 basi\n    andika(\"Nambari sahihi\")\nfunga"
      }
    ],
    requiredPoints: 65
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
        {isRevealed ? "Hide Answer" : "Reveal Answer"}
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
      <span>{currentPoints} points earned</span>
      <span>{totalPoints} points total</span>
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
        Unlocks at {concept.requiredPoints} points
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
          Back to Concepts
        </button>
        
        {!isCompleted && (
          <button
            onClick={onComplete}
            className="bg-blue-500 text-white px-4 py-2 fixed right-6 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            aria-label="Mark concept as complete"
          >
            <CheckCircle className="w-4 h-4" aria-hidden="true" />
            Mark as Complete
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{concept.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <span>{concept.points} points</span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-4 h-4" />
                Completed
              </span>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 shadow-md">
          {concept.explanation}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Examples</h2>
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
    <>
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
              <p className="text-gray-600">Master Swahili Programming</p>
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
    </>
  );
};

export default SwahiliProgrammingLMS;