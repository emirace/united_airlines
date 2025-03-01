const ImportantInfo = () => {
  return (
    <div className="w-full border mt-10 rounded-lg p-4 md:p-6 space-y-4">
      {/* Title */}
      <h2 className="text-4xl font-bold">Important Information</h2>

      {/* Passengers traveling to the USA */}
      <div>
        <h3 className="text-xl font-semibold flex items-center">
          <span className="mr-2">→</span> Passengers traveling to the United
          States, please note
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2 ml-4">
          <li>
            Who can travel?{" "}
            <span className="font-bold">All fully vaccinated travelers</span>{" "}
            are allowed to enter the country.
            <span className="font-bold">
              {" "}
              All WHO-approved vaccines, including Covishield and Covaxin
            </span>
            , are accepted by the USA.
          </li>
          <li>
            Destination restrictions:
            <span className="font-bold">
              {" "}
              Non-vaccinated travelers from India cannot enter.
            </span>{" "}
            Any traveler transiting via EU/UK cannot enter the USA.
          </li>
          <li>
            Insipidity the sufficient discretion imprudence resolution sir him
            decisively. Proceed how any engaged visitor.
          </li>
          <li>
            Explained propriety off out perpetual his you. Feel sold off felt
            nay rose met you. We so entreaties cultivated astonished is.
          </li>
          <li>
            Was sister for a few longer Mrs sudden talent become. Done may bore
            quit evil old mile. If likely am of beauty tastes.
          </li>
        </ul>
      </div>

      {/* Note on Guidelines */}
      <div>
        <h3 className="text-xl font-semibold flex items-center">
          <span className="mr-2">→</span> A Note on Guidelines
        </h3>
        <p className="text-gray-600 mt-2 ml-4">
          While we do our best to get you the latest information, due to the
          rapidly evolving nature of current events, sometimes that is not
          possible. Please note, it is the sole responsibility of the passenger
          to ensure his or her eligibility to enter the destination or transit
          countries (as applicable). We accept no liability in this regard.
          Please check the travel rules of all regulatory websites before
          booking as well as commencing.
        </p>
      </div>
    </div>
  );
};

export default ImportantInfo;
