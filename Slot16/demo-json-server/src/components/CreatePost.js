import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setStatus("Vui lòng điền đầy đủ tiêu đề và nội dung!");
      return;
    }

    const newPost = { title, content };
    try {
      await axios.post("http://localhost:3000/posts", newPost);
      setStatus("Bài viết đã được tạo thành công!");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error) {
      setStatus("Có lỗi xảy ra khi tạo bài viết.");
      console.error("Lỗi khi tạo bài viết:", error);
    }
  };

  return (
    <Container className="my-4">
      <h1>Thêm bài viết mới</h1>
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
        <Button type="submit" variant="primary">  Tạo bài viết  </Button>
      </Form>
    </Container>
  );
};

CreatePost.propTypes = { title: PropTypes.string,  content: PropTypes.string,};

export default CreatePost;