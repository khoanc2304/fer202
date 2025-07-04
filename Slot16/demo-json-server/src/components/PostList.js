import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, ListGroup, Card } from "react-bootstrap";
import PropTypes from "prop-types";

const PostList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa bài viết này?")) {
      try {
        await axios.delete(`http://localhost:3000/posts/${id}`);
        setData(data.filter((post) => post.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa bài viết:", error);
      }
    }
  };

  if (loading) return <Container className="my-4">Đang tải...</Container>;
  if (!data || data.length === 0) return <Container className="my-4">Không có bài viết nào!</Container>;

  return (
    <Container className="my-4">
      <h1>Danh sách bài viết</h1>
      <Button variant="primary" className="mb-3">
        <Link to="/create" style={{ color: "white", textDecoration: "none" }}>
          Tạo bài viết mới
        </Link>
      </Button>
      <ListGroup>
        {data.map((post) => (
          <ListGroup.Item key={post.id}>
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Link to={`/edit/${post.id}`}>
                  <Button variant="warning" className="me-2">
                    Chỉnh sửa
                  </Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(post.id)}>
                  Xóa
                </Button>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

PostList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default PostList;