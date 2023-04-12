import React from "react";
import '../css/About.css'
import * as icons from "react-bootstrap-icons";

function About() {
    return (
        <>
            <div class="bg-dark">
                <div class="container py-5">
                    <div class="row h-100 align-items-center py-5">
                        <div class="col-lg-6">
                            <h1 class="display-4">Our Vision</h1>
                            <p class="lead text-muted mb-0">Government customers need a more efficient and effective way to know what launch vehicle is available that can accommodate their payload and mission requirements. L-Uber will allow Launch Service Providers to set the availability of their launch pads and specify their launch vehicle capabilities. The Gov't customer can then use the app to view which pad, launch vehicle, and date fits their mission requirement and book with a Launch Service Provider.</p>
                            <p class="lead text-muted">Snippet by <a href="https://bootstrapious.com/snippets" class="text-muted">
                                <u>Bootstrapious</u></a>
                            </p>
                        </div>
                        <div class="col-lg-6 d-none d-lg-block"><img src="https://bootstrapious.com/i/snippets/sn-about/illus.png" alt="" class="img-fluid" /></div>
                    </div>
                </div>
            </div>
            <div class="bg-dark py-5">
                <div class="container py-5">
                    <div class="row mb-4">
                        <div class="col-lg-5">
                            <h2 class="display-4 font-weight-light">Our team</h2>
                            <p class="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    <div class="row text-center">
                        {/* <!-- Team item--> */}
                        <div class="col-xl-3 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-4.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 class="mb-0">Jaheem Christopher</h5><span class="small text-uppercase text-muted">Junior Dev</span>
                                <ul class="social mb-0 list-inline mt-3">
                                    <li class="list-inline-item"><a href="#" class="social-link"><icons.Facebook size={29}/></a></li>
                                    <li class="list-inline-item"><a href="#" class="social-link"><icons.Twitter size={26}/></a></li>
                                    <li class="list-inline-item"><a href="#" class="social-link"><icons.Reddit size={29}/></a></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- End--> */}
                        {/* <!-- Team item--> */}
                        <div class="col-xl-3 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 class="mb-0">Samuel Hardy</h5><span class="small text-uppercase text-muted">Junior Dev</span>
                                <ul class="social mb-0 list-inline mt-3">
                                    <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                                    <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
                                    <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
                                    <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- End--> */}
                        {/* <!-- Team item--> */}
                        <div class="col-xl-3 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-2.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 class="mb-0">Tom Sunderland</h5><span class="small text-uppercase text-muted">Junior Dev</span>
                                <ul class="social mb-0 list-inline mt-3">
                                    <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                                    <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
                                    <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
                                    <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- End--> */}
                        {/* <!-- Team item--> */}
                        <div class="col-xl-3 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 class="mb-0">John Tarly</h5><span class="small text-uppercase text-muted">Junior Dev</span>
                                <ul class="social mb-0 list-inline mt-3">
                                    <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                                    <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
                                    <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
                                    <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- End--> */}
                    </div>
                </div>
            </div>

            <footer class="bg-light pb-5">
                <div class="container text-center">
                    <p class="font-italic text-muted mb-0">&copy; 2023 L-Uber.com</p>
                </div>
            </footer>
        </>
    )
}

export default About
