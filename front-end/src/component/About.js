import React from "react";
import '../css/About.css'
import * as icons from "react-bootstrap-icons";

function About() {
    return (
        <>
            <div className="bg-dark">
                <div className="container py-5">
                    <div className="row h-100 align-items-center py-5">
                        <div className="col-lg-6">
                            <h1 className="display-4">Our Vision</h1>
                            <p className="lead text-muted mb-0">Government customers need a more efficient and effective way to know what launch vehicle is available that can accommodate their payload and mission requirements. L-Uber will allow Launch Service Providers to set the availability of their launch pads and specify their launch vehicle capabilities. The Gov't customer can then use the app to view which pad, launch vehicle, and date fits their mission requirement and book with a Launch Service Provider.</p>
                            <p className="lead text-muted">Snippet by <a href="https://bootstrapious.com/snippets" className="text-muted">
                                <u>Bootstrapious</u></a>
                            </p>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block"><img src="https://bootstrapious.com/i/snippets/sn-about/illus.png" alt="" className="img-fluid" /></div>
                    </div>
                </div>
            </div>
            <div className="bg-dark py-5">
                <div className="container py-5">
                    <div className="row mb-4">
                        <div className="col-lg-5">
                            <h2 className="display-4 font-weight-light">Our team</h2>
                            <p className="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    <div className="row text-center">
                        {/* <!-- Team item--> */}
                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-4.png" alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">Jaheem Christopher</h5><span className="small text-uppercase text-muted">Junior Dev</span>
                                <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item"><a href="#" className="social-link"><icons.Facebook size={29}/></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><icons.Twitter size={26}/></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><icons.Reddit size={29}/></a></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- End--> */}
                        {/* <!-- Team item--> */}
                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png" alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">Samuel Hardy</h5><span className="small text-uppercase text-muted">Junior Dev</span>
                                <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- End--> */}
                        {/* <!-- Team item--> */}
                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-2.png" alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">Tom Sunderland</h5><span className="small text-uppercase text-muted">Junior Dev</span>
                                <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- End--> */}
                        {/* <!-- Team item--> */}
                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png" alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">John Tarly</h5><span className="small text-uppercase text-muted">Junior Dev</span>
                                <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- End--> */}
                    </div>
                </div>
            </div>

            <footer className="bg-light pb-5">
                <div className="container text-center">
                    <p className="font-italic text-muted mb-0">&copy; 2023 L-Uber.com</p>
                </div>
            </footer>
        </>
    )
}

export default About
