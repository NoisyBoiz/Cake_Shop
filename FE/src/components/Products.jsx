import React, { useEffect, useState } from "react";
import { getCakes } from "../services/cakes";
import ProductItem from "./ProductItem";
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/styles/product.css'

const Products = ({ category }) => {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCakes({id_category: category.id});
        console.log(res.data.data)
        setCakes(res.data.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchData();
  }, [category.id]);

  return (
    <Container fluid className="category__cake--content">
      <h3 className="category__cake--title text-primary fw-bold mb-4">{category.category}</h3>
      <Row className="g-4">
        {cakes?.map((cake, i) => (
          <Col key={i} xs={12} sm={6} md={4} lg={3} xl={3} className="d-flex">
            <ProductItem cake={cake}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products