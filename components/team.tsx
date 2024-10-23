import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

// Sample data for team members
const teamMembers = [
  {
    name: "Boniface Masota",
    position: "Founder, Lead Developer",
    bio: "As the Lead Developer, Boniface is responsible for guiding the foundations strategic direction and overseeing the development of the compiler",
    image:
      "https://th.bing.com/th/id/R.3cbf0ed318d716a013b48df28881e94d?rik=hNz9sffMEwL3yQ&riu=http%3a%2f%2fwww.somewhere-magazine.com%2fwp-content%2fuploads%2f2020%2f07%2fapple-memoji-update-headwear-masks-hairstyles-4.png&ehk=SFprajXcJfL1s1%2bHw8UzLmvspxflV710js9tyFFG6UM%3d&risl=&pid=ImgRaw&r=0", // Placeholder image URL
 
    contact:'Contact : 0722218106'
    },
  {
    name: "Godfrey Ngigi",
    position: "Co-founder, Product Lead ",
    bio: "As the Lead Developer, Godfrey is responsible for guiding the foundations strategic direction and overseeing the development of the compiler",
    image:
      "https://miro.medium.com/v2/resize:fit:2400/1*pyprQ9zXLGlVqYBvs7jz_w@2x.jpeg", // Placeholder image URL
    contact:'Contact :  0743533648'
    },

  // Add more team members as needed
];

const TeamPage = () => {
  return (
    <section
      id="team"
      className="mx-auto max-w-screen-2xl px-4  sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="flex justify-center">
        {" "}
        {/* Centering the grid */}
        <div className="">
          <h2 className="text-3xl font-bold text-center mb-12 ">Our Team</h2>
          {/* Team Member Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-member bg-white rounded-lg shadow-md w-80 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <Card className="py-4">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">
                      {member.name}
                    </p>
                    <small className="text-default-500">
                      {member.position}
                    </small>
                    <small className="text-default-500">
                      {member.contact}
                    </small>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image
                      alt={member.name}
                      className="object-cover rounded-xl"
                      src={member.image}
                      width={270}
                      height={270}
                    />
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
