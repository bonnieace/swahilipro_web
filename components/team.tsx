import React from "react";

// Sample data for team members
const teamMembers = [
  {
    name: "Boniface Masota",
    position: "Founder, Chief Technology Officer",
    bio: "As the Lead Developer, Boniface is responsible for guiding the foundations strategic direction and overseeing the development of the compiler",
    image: "/bonnie.JPG",
    contact: "0722218106",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Godfrey Ngigi",
    position: "Co-founder,chief Product Lead",
    bio: "As the Product Lead, Godfrey is responsible for overseeing product development and ensuring that the product meets the needs of the target audience",
    image: "/godfrey.JPG",
    contact: "0743533648",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  // Add more team members as needed
];

const TeamPage = () => {
  return (
    <section className="relative  py-24 overflow-hidden" id="team">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-20" />
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-indigo-100 rounded-full opacity-20" />
        <div className="absolute -bottom-24 left-1/4 w-64 h-64 bg-purple-100 rounded-full opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <h3 className="mt-2 text-5xl font-extrabold text-gray-900 tracking-tight">
            Meet Our Experts
          </h3>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
            Passionate professionals dedicated to revolutionizing the industry
            with cutting-edge solutions.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center md:items-start gap-8 group"
            >
              {/* Image container with effect */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 overflow-hidden rounded-2xl shadow-xl transition-all duration-300 group-hover:translate-y-2 group-hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <img
                  alt={member.name}
                  className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                  src={member.image}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-2xl font-bold text-gray-900">
                  {member.name}
                </h4>
                <p className="mt-1 text-lg font-medium text-indigo-600">
                  {member.position}
                </p>

                <p className="mt-4 text-gray-600 text-center md:text-left">
                  {member.bio}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 font-medium">
                    <span className="font-light">Contact:</span>{" "}
                    {member.contact}
                  </span>

                  {/* Social icons */}
                  <div className="flex space-x-3">
                    <a
                      className="text-gray-400 hover:text-indigo-600 transition-colors"
                      href={member.social.linkedin}
                    >
                      <svg
                        fill="none"
                        height="20"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect height="12" width="4" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a
                      className="text-gray-400 hover:text-indigo-600 transition-colors"
                      href={member.social.twitter}
                    >
                      <svg
                        fill="none"
                        height="20"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </a>
                    <a
                      className="text-gray-400 hover:text-indigo-600 transition-colors"
                      href={member.social.github}
                    >
                      <svg
                        fill="none"
                        height="20"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center p-1 px-1 pr-4 bg-gray-100 rounded-full">
            <span className="px-3 py-0.5 text-sm text-white font-semibold bg-indigo-600 rounded-full">
              Join Us
            </span>
            <span className="ml-4 text-sm font-medium text-gray-600">
              We are always looking for new community members
            </span>
          </div>
          <a
            className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:shadow-lg"
            href="#contact"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
