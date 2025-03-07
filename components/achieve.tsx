"use client";
import React, { useState } from "react";

// Define TypeScript interfaces
interface ImageData {
  src: string;
  alt: string;
}

interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  images: ImageData[];
}

// Sample events data with multiple images per event
const events: EventData[] = [
  {
    id: 1,
    title: "JKUAT Tech Expo Pitching Session",
    description:
      "Our team pitching swahilipro for an opportunity to compete at the JKUAT Tech Expo 14.",
    date: "September 2024",
    images: [
      { src: "/pitch.jpg", alt: "Swahilipro founders" },
      { src: "/pitch2.jpg", alt: "Product demo" },
      { src: "/pitch3.jpg", alt: "Expo Committee" },
      { src: "/pitch4.jpg", alt: "Patent session" },
    ],
  },
  {
    id: 2,
    title: "Jkuat Tech Expo 2024",
    description:
      "Our team presenting swahilipro at the Jkuat University Tech Expo 14 where we won first runners up.",
    date: "November 2024",
    images: [
      { src: "/EXPO2.JPG", alt: "Product demo" },
      { src: "/EXPO5.JPG", alt: "Product demo" },
      { src: "/EXPO7.JPG", alt: "Award ceremony" },
      { src: "/EXPO8.JPG", alt: "Award ceremony" },
    ],
  },
  {
    id: 3,
    title: "Diplomacy Exhibition at KICC",
    description:
      "At the Diplomacy Exhibition  interacting with various stakeholders,government officials and diplomats.",
    date: "December 2024",
    images: [
      { src: "/kicc8.jpg", alt: "Venue" },
      { src: "/kicc7.jpg", alt: "Setup" },
      { src: "/kicc1.jpg", alt: "Government officials" },
      { src: "/kicc.jpg", alt: "Diplomats" },
    ],
  },
];

interface AchievementsGalleryProps {
  className?: string;
}

const AchievementsGallery: React.FC<AchievementsGalleryProps> = ({
  className = "",
}) => {
  const [activeEvent, setActiveEvent] = useState<number>(events[0].id);
  const [fullscreenImage, setFullscreenImage] = useState<ImageData | null>(
    null,
  );

  const currentEvent = events.find(
    (event) => event.id === activeEvent,
  ) as EventData;

  const handleImageClick = (image: ImageData): void => {
    setFullscreenImage(image);
  };

  const closeFullscreenImage = (): void => {
    setFullscreenImage(null);
  };

  const switchEvent = (eventId: number): void => {
    setActiveEvent(eventId);
  };

  return (
    <section
      className={`relative  pb-12 text-white overflow-hidden ${className}`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-600 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold tracking-wider text-indigo-800 uppercase">
            Our Milestones
          </h2>
          <h3 className="mt-2 text-5xl font-extrabold text-black tracking-tight">
            Featured Events
          </h3>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-indigo-800">
            Celebrating our journey through impactful moments
          </p>
        </div>

        {/* Event selector tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {events.map((event) => (
            <button
              key={event.id}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeEvent === event.id
                  ? "bg-white text-indigo-900 shadow-lg"
                  : "bg-indigo-800/50 text-white hover:bg-indigo-700/50"
              }`}
              onClick={() => switchEvent(event.id)}
            >
              {event.title}
            </button>
          ))}
        </div>

        {/* Current event info */}
        <div className="text-center mb-12">
          <h4 className="text-3xl font-bold text-black">
            {currentEvent.title}
          </h4>
          <p className="mt-2 text-black">{currentEvent.description}</p>

          <div className="mt-3 inline-block px-4 py-1 bg-indigo-800/50 rounded-full text-white text-sm">
            {currentEvent.date}
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentEvent.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              role="button"
              tabIndex={0}
              onClick={() => handleImageClick(image)}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 to-purple-900 opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10" />
              <img
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={image.src}
              />
              <div className="absolute inset-0 p-4 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <span className="text-white text-sm bg-black/50 p-2 rounded backdrop-blur-sm">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen image modal */}
        {fullscreenImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            role="button"
            tabIndex={0}
            onClick={closeFullscreenImage}
          >
            <div className="relative max-w-5xl max-h-screen">
              <button
                className="absolute -top-12 right-0 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  closeFullscreenImage();
                }}
              >
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
              </button>
              <img
                alt={fullscreenImage.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                src={fullscreenImage.src}
              />
              <p className="text-white text-center mt-4">
                {fullscreenImage.alt}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AchievementsGallery;
