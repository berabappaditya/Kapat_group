import React from "react";
import { education } from "../Data/AboutPIData";

function AboutPI() {
  return (
    <div className="home body">
      <div className="home-main body-child">
        <div
          className="aboutPI_edu row"
          style={{ paddingLeft: "3vw", marginTop: "5vh" }}
        >
          <div className="col-md-3">
            <img
              style={{ width: "50%", height: "auto" }}
              src="https://res.cloudinary.com/ajoy-kapat/image/upload/v1650744626/Dr._Ajoy_Kapat_mdps0i.jpg"
            />
          </div>

          <div div className="col-md-9">
            <h2>Education Details:</h2>
            {education.map((edu, index) => {
              return (
                <p style={{ display: "inline" }}>
                  {edu.date}
                  {edu.detail}
                </p>
              );
            })}
          </div>
        </div>

        <div
          div
          className="about-exp"
          style={{ paddingLeft: "3vw", marginTop: "10vh" }}
        >
          <h2 style={{ marginBottom: "3vh" }}>Professional Experience:</h2>
          <p style={{ paddingLeft: "2vw" }}>
            07/2019 – ongoing Assistant Professor, Department of Chemistry,
            School of Natural Science, Shiv Nadar University, India.
            <br /> 04/2019 - 06/2019 Visiting Research Scientist, Institute of
            Organic Chemistry, RWTH Aachen University, Germany.
            <br /> 11/2014 - 03/2019 Postdoctoral fellow, Institute of Organic
            Chemistry, RWTH Aachen University, Germany. <br />
            05/2014 - 10/2014 Research Associate-I, Department of Organic
            Chemistry, Indian Association for the Cultivation of Science, India.
            <br /> 08/2012 – 01/2014 Postdoctoral fellow, Frick Chemistry
            Laboratory, Princeton University, USA.
            <br /> 09/2011 – 03/2012 Assistant –I, Department of Chemistry and
            Biochemistry at University of Bern, Switzerland.
          </p>
        </div>

        <div
          div
          className="about-exp"
          style={{ paddingLeft: "3vw", marginTop: "10vh" }}
        >
          <h2 style={{ marginBottom: "3vh" }}>
            National and International Recognition:
          </h2>
          <ul>
            <li className="d-flex justify-content-between">
              <p>Start-up Research Grant from DST-SERB, Government of India </p>
              <p> 2020</p>
            </li>
            <li className="d-flex justify-content-between">
              <p>
                Molecular Science & Engineering Travel Grant from RWTH Aachen
                University{" "}
              </p>
              <p>2016</p>
            </li>
            <li className="d-flex justify-content-between">
              <p>
                Best poster presentation award sponsored by European Journal of
                Inorganic Chemistry
              </p>
              <p>2016</p>
            </li>
            <li className="d-flex justify-content-between">
              <p>Post-Doctoral Fellowship from RWTH Aachen University </p>
              <p>11/2014-11/2016</p>
            </li>
            <li className="d-flex justify-content-between">
              <p>Swiss National Science Foundation Post-Doctoral Fellowship</p>
              <p> 8/2012-1/2014</p>
            </li>
            <li className="d-flex justify-content-between">
              <p>
                2nd Best poster presentation award, Swiss Chemical Society fall
                meeting, ETH Zurich, 16th September, 2010{" "}
              </p>
              <p>2010</p>
            </li>
            <li className="d-flex justify-content-between">
              <p>SCNAT/SCS Chemistry Travel Award</p>
              <p>2010</p>
            </li>
            <li className="d-flex justify-content-between">
              <p>ESKAS Scholarship from Swiss Federal Commission </p>
              <p>7/2007 – 7/ 2009</p>
            </li>
            <li className="d-flex justify-content-between">
              <p>Award of Merit cum Means Scholarship from IITM</p>
              <p>2005</p>
            </li>
            <li className="d-flex justify-content-between">
              <p></p>
              <p></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutPI;
