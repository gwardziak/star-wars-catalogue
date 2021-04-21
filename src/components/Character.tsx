import { useState } from "react";

type CharacterProps = {
  name: string;
  gender: string;
  birthYear: string;
  height: string;
  films: string[];
};

export const Character = ({
  name,
  gender,
  birthYear,
  height,
  films,
}: CharacterProps) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  return (
    <li x-for="item in items" onClick={() => setIsToggle(!isToggle)}>
      <div className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
        <dl className="grid sm:block lg:grid xl:block grid-cols-1 grid-rows-2 items-center">
          <div>
            <dt className="sr-only">Name</dt>
            <dd className="group-hover:text-light-blue-200 leading-6 font-medium text-black">
              {`Name: ${name}`}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Gender</dt>
            <dd className="group-hover:text-light-blue-200 text-sm font-medium ">
              {`Gender: ${gender}`}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Birth year</dt>
            <dd className="group-hover:text-light-blue-200 text-sm font-medium ">
              {`Birth year: ${birthYear}`}
            </dd>
          </div>
          {isToggle ? (
            <>
              <div>
                <dt className="sr-only">Height</dt>
                <dd className="group-hover:text-light-blue-200 text-sm font-medium">
                  {`Height: ${height}`}
                </dd>
              </div>
              <div>
                <dt className="sr-only">Show more</dt>
                <dd className="group-hover:text-light-blue-200 text-sm font-medium ">
                  {`Played in films`}
                  <ul className="list-disc list-inside">
                    {films.map((film, i) => (
                      <li key={i}>{film}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Hide</dt>
                <dd className="group-hover:text-light-blue-200 text-sm font-medium mt-4">
                  {"Hide"}
                </dd>
              </div>
            </>
          ) : (
            <div>
              <dt className="sr-only">Show more</dt>
              <dd className="group-hover:text-light-blue-200 text-sm font-medium mt-4">
                {"Show more..."}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </li>
  );
};
