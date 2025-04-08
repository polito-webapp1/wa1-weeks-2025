import { Container, Row, Col, Badge } from "react-bootstrap"

function QuestionDisplay(props) {

    const q = props.question

    // props.question is a Question object
    return <Container fluid>
        <Row >
            <Col as='h2'>Question number {q.id}</Col>
            <Col>Asked by: <Badge pill>{q.email}</Badge></Col>
        </Row>
        <Row>
            <Col>{q.text}</Col>
        </Row>
    </Container>

}

export default QuestionDisplay;