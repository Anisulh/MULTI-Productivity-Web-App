import dashboard from "../assets/images/dashboard.png";
import calendar from "../assets/images/calendar.png";
import boardview from "../assets/images/boardview.png";
const aspects = [
  {
    heading: "View your workspaces differently",
    subheading:
      "MULTI offers multiple views of your work, making it easier to stay on track.",
    image: calendar,
    alt: "Calendar Page",
  },
  {
    heading: "Stay up to date on what's going on",
    subheading:
      "The Dashboard allows you to keep track of recent activity and upcoming tasks that are due.",
    image: dashboard,
    alt: "Dashboard Page",
  },
  {
    heading: "Customization at your fingertips",
    subheading:
      "Make your workspace your own by adding colors and making it look the way you want it to. ",
    image: boardview,
    alt: "Bordview Page",
  },
];

export default function Features({ featuresRef }) {
  return (
    <div
      ref={featuresRef}
      className=" mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8 "
    >
      <h2 className="text-5xl font-bold mb-10">Features</h2>
      <div className="hidden md:block">
        {aspects.map((aspect, index) => {
          if (index % 2 === 0) {
            return (
              <div
                key={index}
                className="md:flex md:item-center md:justify-between mb-28"
              >
                <div className=" rounded-lg shadow-md mr-5">
                  <img
                    src={aspect.image}
                    alt={aspect.alt}
                    width="1200"
                    height="800"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{aspect.heading}</h3>
                  <p className="mt-3 text-base text-gray-500 md:mt-5 md:text-xl lg:mx-0">
                    {aspect.subheading}
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="md:flex md:item-center md:justify-between mb-28"
              >
                <div>
                  <h3 className="text-xl font-bold">{aspect.heading}</h3>
                  <p className="mt-3 text-base text-gray-500  md:mt-5 md:text-xl lg:mx-0">
                    {aspect.subheading}
                  </p>
                </div>
                <div className=" shadow-md rounded-lg ml-5">
                  <img
                    src={aspect.image}
                    alt={aspect.alt}
                    width="1200"
                    height="800"
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="block md:hidden">
        {aspects?.map((aspect) => {
          return (
            <div
              key={aspect.heading}
              className="md:flex md:item-center md:justify-between mb-20 "
            >
              <div>
                <h3 className="text-xl font-bold">{aspect.heading}</h3>
                <p className=" text-base text-gray-500 sm:mx-auto sm:mt-3 sm:text-lg ">
                  {aspect.subheading}
                </p>
              </div>
              <div className=" shadow-md rounded-lg mt-5">
                <img
                  src={aspect.image}
                  alt={aspect.alt}
                  width="600"
                  height="600"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
