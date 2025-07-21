import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAnswer, checkAnswers, resetQuiz } from '../redux/quizSlice';
import { Card, Button, ListGroup, Container } from 'react-bootstrap';

const Quiz = () => {
  const dispatch = useDispatch();
  const { questions, isChecked } = useSelector(state => state.quiz);
  const handleSelect = (questionId, answer) => {
    if (!isChecked) {
      dispatch(selectAnswer({ questionId, answer }));
    }
  };
  const handleCheck = () => {
    dispatch(checkAnswers());
  };
  const handleReset = () => {
    dispatch(resetQuiz());
  };
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Quiz App</h2>
      {questions.map((q) => (
        <Card key={q.id} className="mb-3">
          <Card.Body>
            <Card.Title>{q.question}</Card.Title>
            <ListGroup>
              {q.options.map((option, idx) => {
                const isSelected = q.selectedAnswer === option;
                const isCorrect = q.correctAnswer === option;
                const isWrong = isSelected && option !== q.correctAnswer;
                let variant = '';
                if (isChecked) {
                  if (isCorrect) variant = 'success';
                  else if (isWrong) variant = 'danger';
                }
                return (
                  <ListGroup.Item key={idx} action variant={variant} 
                  active={isSelected} onClick={() => handleSelect(q.id, option)} >
                    {option}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
      <div className="d-flex gap-2">
        <Button onClick={handleCheck} disabled={isChecked}>Check Answers</Button>
        <Button variant="secondary" onClick={handleReset}>Reset</Button>
      </div>
      {isChecked && (
        <div className="mt-3">
          {questions.map(q => (
            <div key={q.id}>
              <strong>Q:</strong> {q.question} — 
              {q.selectedAnswer === q.correctAnswer ? (
                <span className="text-success"> Correct ✅</span>
              ) : (
                <span className="text-danger"> Incorrect ❌</span>
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Quiz;
