import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        if (response.data) {
          setTitle(response.data.title);
          setContent(response.data.content);
        } else {
          setStatus(`Không tìm thấy bài viết với id ${id}`);
        }
      } catch (error) {
        setStatus("Lỗi khi lấy bài viết.");
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setStatus("Vui lòng điền đầy đủ tiêu đề và nội dung!");
      return;
    }

    const updatedPost = { title, content };
    try {
      await axios.put(`http://localhost:3000/posts/${id}`, updatedPost);
      setStatus("Bài viết đã được cập nhật!");
      navigate("/");
    } catch (error) {
      setStatus("Có lỗi xảy ra khi cập nhật bài viết.");
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  };

  return (
    <Container className="my-4">
      <h1>Chỉnh sửa bài viết</h1>
      {status && <Alert variant={status.includes("lỗi") ? "danger" : "success"}>{status}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Nhập nội dung"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Cập nhật bài viết
        </Button>
      </Form>
    </Container>
  );
};

EditPost.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default EditPost;