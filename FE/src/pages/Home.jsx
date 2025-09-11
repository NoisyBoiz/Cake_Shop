import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategory } from '../services/categories.js';
import Cart from "./Cart.jsx";
import Products from '../components/Products.jsx';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import '../assets/styles/home.css';

function Home() {
    const fragment = useParams().fragment;

    useEffect(() => {
        const fragmentList = ["intro", "category", "product", "footer"];
        if (fragmentList.includes(fragment)) {
            var target = document.querySelector(`#${fragment}`);
            var targetPosition = target.getBoundingClientRect().top;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }, [fragment]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategory();
                console.log("Category data:", data.data);
                setCategories(data.data);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchData();
    }, []);

    const Feedback = [
        {
            id: 1,
            name: "Khoa",
            image: "src/assets/images/user-10.jpg",
            comment: "Bánh ở đây rất ngon và đẹp mắt!",
        },
        {
            id: 2,
            name: "Nhung",
            image: "src/assets/images/user-6.jpg",
            comment: "Dịch vụ khách hàng tuyệt vời, tôi sẽ quay lại!",
        },
        {
            id: 3,
            name: "Hồng",
            image: "src/assets/images/user-11.jpg",
            comment: "Bánh sinh nhật của tôi thật hoàn hảo, cảm ơn BakeJoy!",
        }
    ];

    return (
        <main id='main-home'>
            <section id="intro" className="p-5 bg-light">
                <h2 className="display-3 fw-bold mb-3" style={{color:"var(--primary-color)"}}>BakeJoy</h2>
                <h4 className="mb-4" style={{color:"var(--primary-color)"}}>Cung cấp những loại bánh ngọt ngon nhất cho bạn.</h4>
                <Link to="/home/product">
                    <Button size="lg" className="shadow">Shop now</Button>
                </Link>
            </section>

            <section className="py-5 bg-light">
                <Container>
                    <h3 className="mb-3 fw-bold text-center" style={{color:"var(--primary-color)"}}>Chỉ có bánh tươi</h3>
                    <p className="mb-4 text-center mx-auto sale-description">
                        Tất cả các sản phẩm của chúng tôi đều được làm từ đầu bằng cách sử dụng công thức nấu ăn gia đình chỉ với những nguyên liệu chất lượng cao nhất. Chúng tôi nướng và bán tươi hàng ngày để đảm bảo chỉ bán những sản phẩm tốt nhất cho khách hàng.
                    </p>
                </Container>
            </section>

            <section id="category" className="py-5 bg-white">
                <Container>
                    <h2 className="mb-4 fw-bold text-center" style={{color:"var(--primary-color)"}}>Những gì chúng tôi cung cấp</h2>
                    <Row>
                        <Col md={4} className="mb-4">
                            <Card className="h-100 shadow-sm border-0 rounded-4">
                                <Card.Img variant="top" src="src/assets/images/offer-1.jpg" alt="offer" style={{ height: '220px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title className="text-success">Bông lan trứng muối</Card.Title>
                                    <Card.Text>Chúng tôi cung cấp nhiều loại bánh nướng nhỏ cho bất kỳ bữa tiệc nào được làm bằng nguyên liệu tự nhiên chất lượng cao thành phần và không có chất bảo quản.</Card.Text>
                                    <Button>Đọc thêm</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card className="h-100 shadow-sm border-0 rounded-4">
                                <Card.Img variant="top" src="src/assets/images/offer-2.jpg" alt="offer" style={{ height: '220px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title className="text-success">Bánh kem dâu tây</Card.Title>
                                    <Card.Text>Không có gì ngon hơn một chiếc bánh sô cô la với nhiều hương vị khác nhau. luôn có sẵn tại tiệm bánh của chúng tôi.</Card.Text>
                                    <Button>Đọc thêm</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card className="h-100 shadow-sm border-0 rounded-4">
                                <Card.Img variant="top" src="src/assets/images/offer-3.jpg" alt="offer" style={{ height: '220px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title className="text-success">Bánh kem Cherry</Card.Title>
                                    <Card.Text>Bạn muốn làm cho đám cưới của bạn trở nên khó quên? Vậy thì bạn cần đặt một đám cưới độc đáo bánh tại Sweet Bakery!</Card.Text>
                                    <Button>Đọc thêm</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section id="product" className="py-5 bg-light">
                <Container>
                    <Row>
                        {categories && categories.length !== 0 &&
                            categories.map((category, i) => (
                                <Products category={category} key={i} />
                            ))
                        }
                    </Row>
                </Container>
            </section>

            <section className="pb-5 bg-light">
                <Container>
                    <h2 className="mb-4 fw-bold text-center" style={{color:"var(--primary-color)"}}>
                        Tại sao bạn nên lựa chọn BakeJoy
                    </h2>
                    <Row className="g-4 justify-content-center">
                        {/* Cột bên trái */}
                        <Col md={5} className="d-flex flex-column gap-3">
                            <Card className="text-center shadow border-0 rounded-4 flex-fill">
                                <Card.Body>
                                    <Card.Title className="fw-bold">Chất lượng</Card.Title>
                                    <Card.Text>
                                        Đảm bảo chất lượng của tất cả các loại bánh với nguyên liệu tươi ngon nhất.
                                    </Card.Text>
                                    <i className="bx bx-cookie fs-2 text-warning"></i>
                                </Card.Body>
                            </Card>
                            <Card className="text-center shadow border-0 rounded-4 flex-fill">
                                <Card.Body>
                                    <Card.Title className="fw-bold">Giao hàng</Card.Title>
                                    <Card.Text>
                                        Đội ngũ chuyên ship 12 quận Hà Nội. Freeship từ 300k
                                    </Card.Text>
                                    <i className="bx bxs-truck fs-2 text-info"></i>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Cột bên phải */}
                        <Col md={5} className="d-flex flex-column gap-3">
                            <Card className="text-center shadow border-0 rounded-4 flex-fill">
                                <Card.Body>
                                    <Card.Title className="fw-bold">Dịch vụ</Card.Title>
                                    <Card.Text>
                                        Cung cấp dịch vụ ăn uống xuất sắc cho các sự kiện và bữa tiệc.
                                    </Card.Text>
                                    <i className="bx bxs-spa fs-2 text-danger"></i>
                                </Card.Body>
                            </Card>
                            <Card className="text-center shadow border-0 rounded-4 flex-fill">
                                <Card.Body>
                                    <Card.Title className="fw-bold">Thanh toán</Card.Title>
                                    <Card.Text>
                                        Chấp nhận tất cả các loại thanh toán trực tuyến bao gồm Visa,
                                        MasterCard, American Express, thẻ tín dụng nhanh.
                                    </Card.Text>
                                    <i className="bx bx-credit-card-front fs-2 text-primary"></i>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div style={{ position: "fixed", zIndex: '-1', top: 0, left: 0, width: '100vw', height: '100vh' }}>
                <img src="src/assets/images/grid-gallery-3-original.jpg" style={{ width: '100vw', height: '100vh' }} />
            </div>

            <section
                className="py-5 winter-sale-section"
                style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
            >
                <Container style={{backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
                    <h2 className="fw-bold mb-3 text-center" style={{color: 'var(--primary-color)'}}>
                        Giảm giá mùa đông
                    </h2>
                    <div className="mb-3 text-center">
                        <Badge bg="danger" className="fs-5 me-2 shadow-sm">-20%</Badge>
                        <span className="fs-5 text-success fw-semibold">Tất cả loại bánh</span>
                    </div>
                    <p className="mb-4 text-center mx-auto sale-description">
                        Mua bánh và kẹo ngon của chúng tôi cho sự kiện tiếp theo hoặc bữa tối gia đình
                        của bạn tại trang web trực tuyến của chúng tôi và tiết kiệm nhiều
                        tiền hơn bất cứ nơi nào.
                    </p>
                    <div className="text-center">
                        <Link to="/home/product">
                            <Button variant="primary" size="lg" className="shadow-lg px-4 py-2">
                                Shop now
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>


            <section className="py-5 bg-light">
                <Container>
                    <div className="p-4 text-center">
                        <h3 className="mb-2 fw-bold" style={{color:"var(--primary-color)"}}>Hương vị độc đáo và Nguyên liệu tươi</h3>
                        <h4 className="mb-3 text-success">Tất cả Các loại bánh</h4>
                        <Button size="lg" style={{background:"var(--primary-color)"}}>Đọc thêm</Button>
                    </div>
                </Container>
            </section>

            <section className="pb-5 bg-light">
                <Container>
                    <h2 className="mb-4 fw-bold text-center" style={{color:"var(--primary-color)"}}>Phản Hồi</h2>
                    <Row>
                        {Feedback && Feedback.length !== 0 &&
                            Feedback.map((fb) => (
                                <Col md={4} className="mb-4" key={fb.id}>
                                    <Card className="h-100 shadow border-0 rounded-4">
                                        <Card.Body>
                                            <blockquote className="blockquote mb-3 text-secondary">{fb.comment}</blockquote>
                                            <div className="d-flex align-items-center">
                                                <img src={fb.image} alt="Client" className="rounded-circle me-3 border border-2" style={{ width: "60px", height: "60px" }} />
                                                <div>
                                                    <h6 className="mb-0 text-success">{fb.name}</h6>
                                                    <small className="text-muted">Khách Hàng</small>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </section>
            <section className="py-5">
                <Container style={{backgroundColor:'rgba(0,0,0,0)'}}>
                    <Row className="justify-content-center align-items-center">
                        {[1, 2, 3, 4, 5].map(num => (
                            <Col md={2} xs={4} className="mb-3" key={num}>
                                <Card className="border-0 shadow-sm rounded-4 p-2 text-center bg-light">
                                    <Card.Img src={`src/assets/images/partner-${num}.png`} alt="Partner" className="img-fluid" style={{ height: '80px', objectFit: 'contain' }} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default Home;