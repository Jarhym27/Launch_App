import React from "react";
import '../css/About.css'
import * as icons from "react-bootstrap-icons";


function About() {

    let devs = ["Jaheem Christopher", "Tyler Hancock", "Kyle Mersinger", "Khoa Nguyen", "Mackenzie Nickle", "Jose Ocasio", "Izyk Pringle"]
    return (
        <>
            <div className="bg-dark">
                <div className="container py-5">
                    <div className="row h-100 align-items-center py-5">
                        <div className="col-lg-6">
                            <h1 className="display-4">Our Vision</h1>
                            <p className="lead text-muted mb-0">Government customers need a more efficient and effective way to know what launch vehicle is available that can accommodate their payload and mission requirements. L-Uber will allow Launch Service Providers to set the availability of their launch pads and specify their launch vehicle capabilities. The Gov't customer can then use the app to view which pad, launch vehicle, and date fits their mission requirement and book with a Launch Service Provider.</p>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block"><icons.RocketTakeoffFill color="red" size={345} /></div>
                    </div>
                </div>
            </div>
            <div className="bg-dark">
                <div className="container py-5">
                    <div className="row h-100 align-items-center py-5">
                        <div className="col-lg-6">
                            <h1 className="display-4">Our Team</h1>
                            <p className="lead text-muted mb-0">Our developers are a join team of civilian and active duty service members from across the DoD.  From Vandenburg SFB, California to the AEGIS Techrep Naval Station in Moorestown, NJ, and everywhere in-between, we have come together to learn web development via the Supra Coders program.</p>
                            <p className="lead text-muted mb-0">Learn more at <a href="https://supracoders.us/" className="text-muted">
                                <u>Supra Coders</u></a>
                            </p>
                        </div>
                    </div>
                    <div className="row text-center">
                        {devs.map((dev) => {
                            return (
                                <div key={dev} className="col-xl-3 col-sm-6 mb-5">
                                    <div className="bg-white rounded shadow-sm py-5 px-4"><img src={`/${dev}.png`} alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                        <h5 className="mb-0">{dev}</h5><span className="small text-uppercase text-muted">Junior Dev</span>
                                        <ul className="social mb-0 list-inline mt-3">
                                            <li className="list-inline-item"><a href="#" className="social-link"><icons.Facebook size={29} /></a></li>
                                            <li className="list-inline-item"><a href="#" className="social-link"><icons.Twitter size={26} /></a></li>
                                            <li className="list-inline-item"><a href="#" className="social-link"><icons.Reddit size={29} /></a></li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
