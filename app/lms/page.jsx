"use client"
import React, { useState } from 'react';
import '../globals.css';

const SwahiliProgrammingLMS = () => {
  const [completedConcepts, setCompletedConcepts] = useState([]);
  
  const concepts = [
    {
      id: 1,
      title: "Variables (Vigezo)",
      points: 10,
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
      requiredPoints: 0
    },
    {
      id: 2,
      title: "Arithmetic Operations (Operesheni za Hisabati)",
      points: 15,
      explanation: "Swahili programming supports basic arithmetic operations:\n+ (Ongeza) for addition\n- (Toa) for subtraction\n* (Mara) for multiplication\n/ (Gawa) for division\n^ (Karisimu) for exponentiation",
      examples: [
        {
          code: "var a = 5\nvar b = 2\nvar matokeo = a * b\nandika(matokeo)",
          description: "Basic arithmetic operations"
        }
      ],
      requiredPoints: 10
    },
    {
      id: 3,
      title: "Control Structures (Miundo ya Kudhibiti)",
      points: 20,
      explanation: "Control structures help manage program flow using conditions and loops.",
      examples: [
        {
          code: "ikiwa condition basi\n    # Code block\nikiwa_nyingine\n    # Else block\nfunga",
          description: "If statement structure"
        },
        {
          code: "kwa var i = start hadi end basi\n    # Loop body\nfunga",
          description: "For loop structure"
        }
      ],
      requiredPoints: 25
    },
    {
      id: 4,
      title: "Functions (Njia)",
      points: 20,
      explanation: "Functions are defined using the 'njia' keyword and can return values using 'rudisha'.",
      examples: [
        {
          code: "njia ongeza(a, b) basi\n    rudisha a + b\nfunga",
          description: "Function definition and usage"
        }
      ],
      requiredPoints: 45
    },
    {
      id: 5,
      title: "Logical & Comparison Operators",
      points: 15,
      explanation: "Logical operators (na, au) and comparison operators (==, !=, <, >, <=, >=) are used for creating conditions.",
      examples: [
        {
          code: "ikiwa a == 5 na b == 10 basi\n    andika(\"Zote ni kweli\")\nfunga",
          description: "Using logical operators"
        }
      ],
      requiredPoints: 65
    },
    {
      id: 6,
      title: "Input and Output (Ingizo na Tokeo)",
      points: 10,
      explanation: "Input and output operations are handled using 'andika' for output and 'ingiza' for input.",
      examples: [
        {
          code: "var jina = ingiza(\"Jina lako ni nani? \")\nandika(\"Habari, \" + jina)",
          description: "Basic I/O operations"
        }
      ],
      requiredPoints: 80
    },
    {
      id: 7,
      title: "Comments & Documentation",
      points: 10,
      explanation: "Comments are created using the # symbol and are useful for documentation.",
      examples: [
        {
          code: "# This is a comment\nvar nambari = 10  # This stores the number 10",
          description: "Adding comments to code"
        }
      ],
      requiredPoints: 90
    }
  ];

  const badges = [
    {
      name: "Mwanafunzi (Beginner)",
      requiredPoints: 25,
      icon: "🌱"
    },
    {
      name: "Mjuzi (Intermediate)",
      requiredPoints: 60,
      icon: "⭐"
    },
    {
      name: "Mtaalam (Expert)",
      requiredPoints: 100,
      icon: "👑"
    }
  ];

  const getCurrentPoints = () => {
    return completedConcepts.reduce((total, conceptId) => {
      const concept = concepts.find(c => c.id === conceptId);
      return total + (concept ? concept.points : 0);
    }, 0);
  };

  const handleConceptComplete = (conceptId) => {
    if (!completedConcepts.includes(conceptId)) {
      setCompletedConcepts([...completedConcepts, conceptId]);
    }
  };

  const isConceptLocked = (concept) => {
    return getCurrentPoints() < concept.requiredPoints;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gradient-to-br from-pink-100 via-teal-100 to-indigo-100 rounded-lg shadow-xl">
    <div className=" rounded-xl shadow-lg p-8 space-y-6">
      {/* Header */}
      <div className="border-b pb-6 mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">SwahiliPro Documentation</h1>
        <p className="text-lg font-medium text-gray-500">Track your learning progress and earn badges!</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center mb-6">
        <span className="text-lg font-semibold text-gray-700">Points: {getCurrentPoints()}/100</span>
        <div className="w-full h-4 bg-gray-200 rounded-full ml-4 shadow-inner">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-300 shadow-lg"
            style={{ width: `${(getCurrentPoints() / 100) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-3 mb-8 justify-center">
        {badges.map(badge => (
          <span
            key={badge.name}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm shadow
              ${getCurrentPoints() >= badge.requiredPoints 
                ? 'bg-green-100 text-green-800 font-bold' 
                : 'bg-gray-100 text-gray-500'}`}
          >
            {badge.icon} {badge.name}
          </span>
        ))}
      </div>

      {/* Concepts */}
      <div className="space-y-8">
        {concepts.map(concept => (
          <div key={concept.id} className="bg-gradient-to-r from-blue-50 to-white border border-gray-200 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{concept.title}</h2>
              <span className="text-md font-semibold text-teal-600">+{concept.points} points</span>
            </div>

            {isConceptLocked(concept) ? (
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Unlock at {concept.requiredPoints} points</span>
              </div>
            ) : (
              <>
                <p className="bg-gray-100 text-gray-700 rounded-lg p-4 mb-4 whitespace-pre-wrap shadow-sm">
                  {concept.explanation}
                </p>
                
                {concept.examples.map((example, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium mb-2 text-gray-600">{example.description}:</p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto shadow-md">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                ))}

                <button
                  onClick={() => handleConceptComplete(concept.id)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg shadow-md font-semibold transition
                    ${completedConcepts.includes(concept.id)
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  disabled={completedConcepts.includes(concept.id)}
                >
                  {completedConcepts.includes(concept.id) ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Completed
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      Mark as Complete
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default SwahiliProgrammingLMS;