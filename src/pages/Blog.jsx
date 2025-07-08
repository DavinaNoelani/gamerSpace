import React from "react";
// import Header from "../components/layout/Header.jsx";
import ganon from '../assets/images/ganonInTheWoods.jpg'
import zelda from '../assets/images/zeldaBridge.jpg'
import zelda2 from '../assets/images/zelda2.png'
import foxMcloud from '../assets/images/Fox_Mccloud_star_fox.png'


const Blog = () => {


    return (
        <>
            {/* <Header /> */}

            <div className="blogContent">
                {/* header */}
                <header className="container text-center padding-32">
                    <div className="blogHead headerText">
                        <b>BlogSpace</b>
                    </div>
                    <p className="blogSubHead subHeaderText">
                        Welcome to the blog of <span className="tag">unknown</span>
                    </p>
                </header>

                {/* grid */}
                <div className="row">

                    {/* blog entries */}
                    <div className="col-lg-8 col-sm-12">
                        {/* blog entry */}
                        <div className="card-4 margin white">
                            <img src={ganon} className='blogImg' alt='Nature' />
                            <div className="container-fluid">
                                <h3>
                                    <b>TITLE HEADING</b>
                                </h3>
                                <h5 className="blogDescription">Title description,
                                    <span className="opacity"> April 7, 2023</span>
                                </h5>
                            </div>

                            <div className="container-fluid blogEntry">
                                <p>
                                    Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed
                                    tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.
                                </p>

                                <div className="row">
                                    <div className="col-md-8 col-sm-12">
                                        <p>
                                            <button className="readMoreBtn padding-large white border">
                                                <b>READ MORE »</b>
                                            </button>
                                        </p>
                                    </div>

                                    <div className="col-md-4 hide-small">
                                        <p>
                                            <span className="padding-large right">
                                                <b>Comments &nbsp;</b>
                                                <span className="tag">0</span>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="hrBlog" />

                        {/* another blog Entry */}
                        <div className="card-4 margin white">
                            <img src={zelda} className='blogImg' alt='Nature' />
                            <div className="container-fluid">
                                <h3>
                                    <b>BLOG ENTRY</b>
                                </h3>
                                <h5 className="blogDescription">Title description,
                                    <span className="opacity"> April 2, 2023</span>
                                </h5>
                            </div>

                            <div className="container-fluid blogEntry">
                                <p>
                                    Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed
                                    tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.
                                </p>

                                <div className="row">
                                    <div className="col-md-8 col-sm-12">
                                        <p>
                                            <button className="readMoreBtn padding-large white border">
                                                <b>READ MORE »</b>
                                            </button>
                                        </p>
                                    </div>

                                    <div className="col-md-4 hide-small">
                                        <p>
                                            <span className="padding-large right">
                                                <b>Comments &nbsp;</b>
                                                <span className="badge">2</span>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end of blog entries */}
                    </div>

                    {/* intro menu */}
                    <div className="col-lg-4">
                        {/* about card */}
                        <div className="blogCard margin margin-top">
                            <img src={zelda2} alt='blog avatar' className="blogImg" />
                            <div className="container-fluid white">
                                <h4>
                                    <b>Unknown</b>
                                </h4>
                                <p>
                                    Just me, myself and I, exploring the universe of uknownment. I have a heart of love and a interest of lorem ipsum and mauris neque quam blog. I want to share my world with you.
                                </p>
                            </div>
                        </div>

                        <hr className="hrBlog" />

                        {/* posts */}
                        <div className="blogCard margin">
                            <div className="container-fluid padding">
                                <h4>Popular Posts</h4>
                            </div>

                            <ul className="ul hoverable white">
                                <li className="padding16">
                                    <img src={foxMcloud} className='postImg left margin-right' />
                                    <span className="large">Lorem</span>
                                    <br />
                                    <span>Sed mattis nunc</span>
                                </li>
                                <li className="padding16">
                                    <img src={foxMcloud} className='postImg left margin-right' />
                                    <span className="large">Ipsum</span>
                                    <br />
                                    <span>Praes tinci sed</span>
                                </li>
                                <li className="padding16">
                                    <img src={foxMcloud} className='postImg left margin-right' />
                                    <span className="large">Dorum</span>
                                    <br />
                                    <span>Ultricies congue</span>
                                </li>
                                <li className="padding16">
                                    <img src={foxMcloud} className='postImg left margin-right' />
                                    <span className="large">Mingsum</span>
                                    <br />
                                    <span>Lorem ipsum dipsum</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Blog