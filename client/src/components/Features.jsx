const aspects = [
  {
    heading: "View your workspaces differently",
    subheading:
      "MULTI offers multiple views of your work, making it easier to stay on track.",
    image: "",
  },
  {
    heading: "Stay up to date on what's going on",
    subheading:
      "The Dashboard allows you to keep track of recent activity and upcoming tasks that are due.",
    image: "",
  },
  {
    heading: "Chat with Teammates or Friends",
    subheading: "Always stay in tough with teammates or even friends",
    image: "",
  },
];

export default function Features({ featuresRef }) {
  return (
    <div
      ref={featuresRef}
      className=" mx-auto mt-20 max-w-7xl px-4 sm:mt-24 sm:px-6 md:mt-36 lg:mt-44 lg:px-8 xl:mt-52 "
    >
      <h2 className="text-5xl font-bold mb-10">Features</h2>
      {aspects.map((aspect, index) => {
        if (index % 2 === 0) {
          return (
            <div key={index} className="flex item-center justify-between mb-28">
              <div>
                <img src={aspect.image} alt="" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{aspect.heading}</h3>
                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  {aspect.subheading}
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="flex item-center justify-between mb-28">
              <div>
                <h3 className="text-xl font-bold">{aspect.heading}</h3>
                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  {aspect.subheading}
                </p>
              </div>
              <div>
                <img src={aspect.image} alt="" />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
