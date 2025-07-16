import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LaptopList() {
  const [laptops, setLaptops] = useState([]);
  const [allLaptops, setAllLaptops] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLaptops();
  }, []);

  const fetchLaptops = async () => {
    const res = await axios.get("http://localhost:3001/Laptops");
    setLaptops(res.data);
    setAllLaptops(res.data);
  };

  // ✅ Filter tự động khi search thay đổi
  useEffect(() => {
    if (search.trim() === "") {
      setLaptops(allLaptops);
    } else {
      const filtered = allLaptops.filter((l) =>
        l.model.toLowerCase().includes(search.toLowerCase()) ||
        l.brand.toLowerCase().includes(search.toLowerCase())
      );
      setLaptops(filtered);
    }
  }, [search, allLaptops]);

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">💻 Laptop List</h2>

      <Form className="d-flex justify-content-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search by brand or model..."
          style={{ maxWidth: "300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>

      <Row xs={1} md={2} lg={4} className="g-4">
        {laptops.map((laptop) => (
          <Col key={laptop.id}>
            <Card className="h-100 shadow-sm rounded">
              <Card.Img
                variant="top"
                src={laptop.image}
                style={{
                  height: "200px",
                  objectFit: "cover",
                  borderTopLeftRadius: "0.5rem",
                  borderTopRightRadius: "0.5rem",
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>
                  {laptop.brand} - {laptop.model}
                </Card.Title>
                <Card.Text>
                  Year: {laptop.year} <br />
                  Price: {laptop.price}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/laptops/${laptop.id}`)}
                  className="mt-auto"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default LaptopList;

