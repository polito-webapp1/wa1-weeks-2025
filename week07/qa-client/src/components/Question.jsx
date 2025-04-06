import { Container, Row, Col } from "react-bootstrap"

function QuestionDisplay(props) {

    const q = props.question

    // props.question is a Question object
    return <Container fluid>
        <Row>
            <Col as='h2'>Question number {q.id}</Col>
            <Col>Asked by: {q.email}</Col>
        </Row>
        <Row>
            <Col>{q.text}</Col>
        </Row>
    </Container>

}

export default QuestionDisplay;