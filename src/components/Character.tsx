import React from "react";

type CharacterProps = {
  name: string;
  gender: string;
  birthYear: string;
};

export const Character = ({ name, gender, birthYear }: CharacterProps) => {
  return (
    <>
      <li x-for="item in items">
        <div className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
          <dl className="grid sm:block lg:grid xl:block grid-cols-1 grid-rows-2 items-center">
            <div>
              <dt className="sr-only">Name</dt>
              <dd className="group-hover:text-light-blue-200 leading-6 font-medium text-black">
                {name}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Gender</dt>
              <dd className="group-hover:text-light-blue-200 text-sm font-medium ">
                {gender}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Birth year</dt>
              <dd className="group-hover:text-light-blue-200 text-sm font-medium mb-4">
                {birthYear}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Show more</dt>
              <dd className="group-hover:text-light-blue-200 text-sm font-medium">
                {"Show"}
              </dd>
            </div>
          </dl>
        </div>
      </li>
    </>
  );
};
