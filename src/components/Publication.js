import React from "react";
import { publication } from "../Data/PublicationData";

function Publication() {
  return (
    <div className="home body">
      <div className="home-main body-child">
        <div className="publication-main">
          <div className="publication-banner"></div>
          {publication.reverse().map((item, index) => {
            return (
              <p>
                <b>{index + 1}.</b>&nbsp;
                {item.details}
                {item.link}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Publication;
