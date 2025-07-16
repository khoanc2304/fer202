import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function LaptopDetail() {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaptop = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/Laptops/${id}`);
        setLaptop(res.data);
      } catch (err) {
        setLaptop(null);
      }
    };
    fetchLaptop();
  }, [id]);

  if (!laptop) return <h2 className="text-center mt-5">404 - Laptop Not Found</h2>;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Row className="g-0">
              <Col md={5}>
                <Card.Img
                  src={laptop.image}
                  alt={laptop.model}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Col>
              <Col md={7}>
                <Card.Body>
                  <Card.Title as="h2">{laptop.brand} - {laptop.model}</Card.Title>
                  <Card.Text className="fs-5">
                    <strong>Year:</strong> {laptop.year}<br/>
                    <strong>Price:</strong> {laptop.price}
                  </Card.Text>
                  <Button variant="primary" onClick={() => navigate(-1)}>⬅️ Back</Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LaptopDetail;
