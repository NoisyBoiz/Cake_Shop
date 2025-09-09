import React, { useEffect } from 'react';
import ProductsContainer from "../components/ProductsContainer";
import '../assets/styles/product.css';
import '../assets/styles/homepage.css';
import { Link, useParams } from 'react-router-dom';

function HomePage() {
    const type = useParams().type;

    function smoothScroll(target1, duration) {
        var target = document.querySelector(target1);
        var targetPosition = target.getBoundingClientRect().top;
        var startPosition = window.pageYOffset;
        var distance = targetPosition;
        var startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = easing(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easing(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        requestAnimationFrame(animation);
    }

    useEffect(() => {
        if (type == 'intro') {
            smoothScroll('#intro', 100);
        }
        if (type == 'category') {
            smoothScroll('#category', 100);
        }
        if (type == 'product') {
            smoothScroll('#product', 100);
        }
        if (type == 'footer') {
            smoothScroll('#footer', 100);
        }
    }, [type]);


    return (
        <main>
            {/* <Cart /> */}
            <section id="intro" className="section--custom1 section__hero">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-7 m-5 c-12">
                            <div className="hero__content">
                                <h2 className="hero__title">THƠM NGON</h2>
                                <h3 className="hero__phrase">bánh cho bạn</h3>
                                <h4 className="hero__sentence">Cake cung cấp những loại bánh ngọt ngon nhất cho bạn.
                                </h4>
                                <Link to="/homepage/product" className="btn btn--lg btn--shadow btn--primary btn--zakaria">Shop now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section__promo">
                <div className="grid wide">
                    <article className="promo__content">
                        <div className="promo__title">Chỉ có bánh tươi</div>
                        <p className="promo__paragraph">
                            Tất cả các sản phẩm của chúng tôi đều được làm từ đầu bằng cách sử dụng công thức nấu ăn gia đình chỉ với những nguyên liệu chất lượng cao nhất. Chúng tôi nướng và bán tươi hàng ngày để đảm bảo chỉ bán những sản phẩm tốt nhất cho khách hàng.
                        </p>
                        <a href="# " className="btn btn--icon btn--primary btn--zakaria">
                            <i className='bx bx-right-arrow-alt'></i>
                        </a>
                    </article>
                </div>
            </section>
            <section id="category" className="section--basic section__offer">
                <div className="grid wide">
                    <h2 className="section--title">Những gì chúng tôi cung cấp</h2>
                    <div className="offer__cards">
                        <div className="offer__card">
                            <a href="# " className="offer__img">
                                <img src="src/assets/images/offer-1.jpg" alt="offer" />
                            </a>
                            <div className="offer__content">
                                <div className="offer__top">
                                    <h3 className="offer__title">
                                        <a href="# ">Bông lan trứng muối</a>
                                    </h3>
                                    <p className="descriptions offer__descriptions">
                                        Chúng tôi cung cấp nhiều loại bánh nướng nhỏ cho bất kỳ bữa tiệc nào được làm bằng nguyên liệu tự nhiên chất lượng cao thành phần và không có chất bảo quản.
                                    </p>
                                </div>
                                <div className="offer__bottom">
                                    <a href="# " className="btn--link">Đọc thêm</a>
                                </div>
                            </div>
                        </div>
                        <div className="offer__card">
                            <a href="# " className="offer__img">
                                <img src="src/assets/images/offer-2.jpg" alt="offer" />
                            </a>
                            <div className="offer__content">
                                <div className="offer__top">
                                    <h3 className="offer__title">
                                        <a href="# ">Bánh kem dâu tây</a>
                                    </h3>
                                    <p className="descriptions offer__descriptions">
                                        Không có gì ngon hơn một chiếc bánh sô cô la với nhiều hương vị khác nhau.
                                        luôn có sẵn tại tiệm bánh của chúng tôi.
                                    </p>
                                </div>
                                <div className="offer__bottom">
                                    <a href="# " className="btn--link">Đọc thêm</a>
                                </div>
                            </div>
                        </div>
                        <div className="offer__card">
                            <a href="# " className="offer__img">
                                <img src="src/assets/images/offer-3.jpg" alt="offer" />
                            </a>
                            <div className="offer__content">
                                <div className="offer__top">
                                    <h3 className="offer__title">
                                        <a href="# ">Bánh kem Cherry</a>
                                    </h3>
                                    <p className="descriptions offer__descriptions">
                                        Bạn muốn làm cho đám cưới của bạn trở nên khó quên? Vậy thì bạn cần đặt một đám cưới độc đáo
                                        bánh tại Sweet Bakery!
                                    </p>
                                </div>
                                <div className="offer__bottom">
                                    <a href="# " className="btn--link">Đọc thêm</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="product" className="section--basic section--bg section__product">
                <ProductsContainer />
            </section>
            <section className="section--basic section__chooseus">
                <div className="grid wide">
                    <h2 className="section--title">Tại sao bạn nên lựa chọn bánh sinh nhật Cake</h2>
                    <div className="row">
                        <div className="col xl-4 m-4 s-6 c-10">
                            <article className="chooseus chooseus__left">
                                <div className="chooseus__wrap">
                                    <div className="chooseus__content">
                                        <h4 className="chooseus__title">
                                            <a href="# ">Chất lượng sản phẩm</a>
                                        </h4>
                                        <p className="descriptions chooseus__descriptions">
                                            Chúng tôi đảm bảo chất lượng của tất cả các loại bánh chúng tôi cung cấp khi chúng được nướng bằng máy
                                            nguyên liệu tươi ngon nhất.
                                        </p>
                                    </div>
                                    <div className="chooseus__icons">
                                        <i className='bx bx-cookie'></i>
                                        <svg className="chooseus__svg chooseus__svg-right" width="77.06" height="71.94"
                                            viewBox="0 0 77.06 71.94">
                                            <path
                                                d="M1220.63,3358.07c8.86-19.66,32.66-7.87,38.1,13a39.053,39.053,0,0,1-27.91,47.63c-20.85,5.44-43.52-6.76-47.59-27.93C1179.83,3373.1,1210.55,3380.43,1220.63,3358.07Z"
                                                transform="translate(-1182.94 -3348.03)"></path>
                                        </svg>
                                    </div>
                                </div>
                            </article>
                            <article className="chooseus chooseus__left">
                                <div className="chooseus__wrap">
                                    <div className="chooseus__content">
                                        <h4 className="chooseus__title">
                                            <a href="# ">Giao hàng miễn phí</a>
                                        </h4>
                                        <p className="descriptions chooseus__descriptions">
                                            Đội ngũ chuyên ship 12 quận Hà Nội. Freeship từ 300k
                                        </p>
                                    </div>
                                    <div className="chooseus__icons">
                                        <i className='bx bxs-truck'></i>
                                        <svg className="chooseus__svg chooseus__svg-right" width="77.06" height="71.94"
                                            viewBox="0 0 77.06 71.94">
                                            <path
                                                d="M1220.63,3358.07c8.86-19.66,32.66-7.87,38.1,13a39.053,39.053,0,0,1-27.91,47.63c-20.85,5.44-43.52-6.76-47.59-27.93C1179.83,3373.1,1210.55,3380.43,1220.63,3358.07Z"
                                                transform="translate(-1182.94 -3348.03)"></path>
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="col xl-4 m-4 c-0">
                            <div className="chooseus__img">
                                <img src="src/assets/images/why-choose-us.jpg" alt="Choose US" />
                            </div>
                        </div>
                        <div className="col xl-4 m-4 s-6 c-10">
                            <article className="chooseus chooseus__right">
                                <div className="chooseus__wrap">
                                    <div className="chooseus__icons">
                                        <i className='bx bxs-spa'></i>
                                        <svg className="chooseus__svg chooseus__svg-left" width="77.06" height="71.94"
                                            viewBox="0 0 77.06 71.94">
                                            <path
                                                d="M1220.63,3358.07c8.86-19.66,32.66-7.87,38.1,13a39.053,39.053,0,0,1-27.91,47.63c-20.85,5.44-43.52-6.76-47.59-27.93C1179.83,3373.1,1210.55,3380.43,1220.63,3358.07Z"
                                                transform="translate(-1182.94 -3348.03)"></path>
                                        </svg>
                                    </div>
                                    <div className="chooseus__content">
                                        <h4 className="chooseus__title">
                                            <a href="# ">Dịch vụ ăn uống</a>
                                        </h4>
                                        <p className="descriptions chooseus__descriptions">
                                            Tiệm bánh của chúng tôi cũng cung cấp dịch vụ ăn uống xuất sắc cho các sự kiện và đặc biệt
                                            dịp.
                                        </p>
                                    </div>
                                </div>
                            </article>
                            <article className="chooseus chooseus__right">
                                <div className="chooseus__wrap">
                                    <div className="chooseus__icons">
                                        <i className='bx bx-credit-card-front'></i>
                                        <svg className="chooseus__svg chooseus__svg-left" width="77.06" height="71.94"
                                            viewBox="0 0 77.06 71.94">
                                            <path
                                                d="M1220.63,3358.07c8.86-19.66,32.66-7.87,38.1,13a39.053,39.053,0,0,1-27.91,47.63c-20.85,5.44-43.52-6.76-47.59-27.93C1179.83,3373.1,1210.55,3380.43,1220.63,3358.07Z"
                                                transform="translate(-1182.94 -3348.03)"></path>
                                        </svg>
                                    </div>
                                    <div className="chooseus__content">
                                        <h4 className="chooseus__title">
                                            <a href="# ">Thanh toán trực tuyến</a>
                                        </h4>
                                        <p className="descriptions chooseus__descriptions">
                                            Chúng tôi chấp nhận tất cả các loại thanh toán trực tuyến bao gồm Visa, MasterCard, American
                                            Thẻ tín dụng nhanh.
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section--basic section__sale">
                <div className="grid wide">
                    <div className="row">
                        <div className="col xl-5 l-6 m-9">
                            <div className="sale__content">
                                <h2 className="sale__title">
                                    Giảm giá mùa đông
                                </h2>
                                <div className="sale__discount">
                                    <span className="sale__percent">-20%</span>
                                    <span className="sale__type">Tất cả loại bánh</span>
                                </div>
                                <p className="descriptions sale__descriptions">
                                    Mua bánh và kẹo ngon của chúng tôi cho sự kiện tiếp theo hoặc bữa tối gia đình của bạn tại trang web trực tuyến của chúng tôi
                                    cửa hàng
                                    và tiết kiệm nhiều tiền hơn bất cứ nơi nào.
                                </p>
                                <Link to="/homepage/product" className="btn btn--lg btn--primary btn--zakaria btn--shadow">Shop now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section--basic section--bg section__team">
                <div className="grid wide">
                    <h2 className="section--title">Thành viên trong Nhóm</h2>
                    <div className="team__cards">
                        <article className="team__card">
                            <div className="team__thumbnail">
                                <a href="# " className="team__img">
                                    <img src="src/assets/images/sheff1.png" alt="Team" />
                                </a>
                                <div className="team__arrow"></div>
                            </div>
                            <div className="team__content">
                                <div className="team__top">
                                    <h4 className="team__title">
                                        <a href="# ">Đỗ Mạnh Dũng </a>
                                    </h4>
                                    <p className="descriptions team__descriptions">
                                        Dũng có niềm đam mê thực sự với việc làm bánh và đó là lý do tại sao anh ấy là người sáng lập và đồng thời là người sáng lập của chúng tôi.
                                        Thợ làm bánh trưởng kể từ ngày đầu tiên.
                                    </p>
                                </div>
                            </div>
                        </article>
                        <article className="team__card">
                            <div className="team__thumbnail">
                                <a href="# " className="team__img">
                                    <img src="src/assets/images/sheff3.jpg" alt="Team" />
                                </a>
                                <div className="team__arrow"></div>
                            </div>
                            <div className="team__content">
                                <div className="team__top">
                                    <h4 className="team__title">
                                        <a href="# ">Nguyễn Quốc Đại</a>
                                    </h4>
                                    <p className="descriptions team__descriptions">
                                        Đại dành phần lớn thời gian của mình để nướng bánh và trang trí bánh cũng như phụ trách công việc
                                        sáng kiến tiếp thị của tiệm bánh.
                                    </p>
                                </div>
                            </div>
                        </article>
                        <article className="team__card">
                            <div className="team__thumbnail">
                                <a href="# " className="team__img">
                                    <img src="src/assets/images/sheff2.png" alt="Team" />
                                </a>
                                <div className="team__arrow"></div>
                            </div>
                            <div className="team__content">
                                <div className="team__top">
                                    <h4 className="team__title">
                                        <a href="# ">Phạm Gia Đạt</a>
                                    </h4>
                                    <p className="descriptions team__descriptions">
                                        Đạt là nhà thiết kế bánh chính của chúng tôi. Anh ấy đã thiết kế những chiếc bánh đẹp mắt cho nhiều mục đích khác nhau
                                        các dịp bao gồm đám cưới, tiệc tùng, lễ tắm, ngày kỷ niệm và nhiều dịp khác.
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <section className="section--basic section__cta">
                <div className="grid wide">
                    <div className="row">
                        <div className="col xl-7 l-12 m-10">
                            <div className="cta__content">
                                <h3 className="cta__sologan">Hương vị độc đáo và
                                    Nguyên liệu tươi</h3>
                                <h2 className="cta__title">Tất cả
                                    Các loại bánh</h2>
                                <a href="# " className="btn btn--primary btn--lg btn--zakaria">Đọc thêm</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section--basic section__feedback">
                <div className="grid wide">
                    <h2 className="section--title">Phản Hồi</h2>
                    <div className="feedback__clients">
                        <article className="feedback__client">
                            <div className="feedback__top">
                                <blockquote>
                                    Cảm ơn bạn rất nhiều vì những chiếc bánh Cakes thanh lịch. Họ nhìn và nếm thử tuyệt vời. Tôi
                                    giới thiệu bạn với tất cả bạn bè của tôi.
                                </blockquote>
                            </div>
                            <div className="feedback__bottom">
                                <div className="feedback__img">
                                    <img src="src/assets/images/user-10.jpg" alt="Client" />
                                </div>
                                <div className="feedback__resume">
                                    <h6 className="feedback__author">Khoa</h6>
                                    <i className="feedback__role">Khách Hàng</i>
                                </div>
                            </div>
                        </article>
                        <article className="feedback__client">
                            <div className="feedback__top">
                                <blockquote>
                                    Chỉ cần một ghi chú để cho bạn biết chiếc bánh cưới của bạn tuyệt vời như thế nào. Nhiều khách
                                    Bình luận về
                                    nó ngon làm sao.
                                </blockquote>
                            </div>
                            <div className="feedback__bottom">
                                <div className="feedback__img">
                                    <img src="src/assets/images/user-11.jpg" alt="Client" />
                                </div>
                                <div className="feedback__resume">
                                    <h6 className="feedback__author">Nhung</h6>
                                    <i className="feedback__role">Khách Hàng</i>
                                </div>
                            </div>
                        </article>
                        <article className="feedback__client">
                            <div className="feedback__top">
                                <blockquote>
                                    Chỉ cần một ghi chú để cho bạn biết chiếc bánh cưới của bạn tuyệt vời như thế nào. Nhiều khách
                                    Bình luận về
                                    nó ngon làm sao.
                                </blockquote>
                            </div>
                            <div className="feedback__bottom">
                                <div className="feedback__img">
                                    <img src="src/assets/images/user-6.jpg" alt="Client" />
                                </div>
                                <div className="feedback__resume">
                                    <h6 className="feedback__author">Hồng</h6>
                                    <i className="feedback__role">Khách Hàng</i>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <section className="section--custom2 section__partner">
                <div className="grid wide">
                    <div className="partner__list">
                        <div className="partner__item">
                            <a href="# " className="partner__img">
                                <img src="src/assets/images/partner-1.png" alt="Partner" />
                            </a>
                        </div>
                        <div className="partner__item">
                            <a href="# " className="partner__img">
                                <img src="src/assets/images/partner-2.png" alt="Partner" />
                            </a>
                        </div>
                        <div className="partner__item">
                            <a href="# " className="partner__img">
                                <img src="src/assets/images/partner-3.png" alt="Partner" />
                            </a>
                        </div>
                        <div className="partner__item">
                            <a href="# " className="partner__img">
                                <img src="src/assets/images/partner-4.png" alt="Partner" />
                            </a>
                        </div>
                        <div className="partner__item">
                            <a href="# " className="partner__img">
                                <img src="src/assets/images/partner-5.png" alt="Partner" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default HomePage