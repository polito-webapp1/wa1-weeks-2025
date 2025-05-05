import { Container, Row, Col, Badge } from "react-bootstrap"
import { useParams } from "react-router";

function QuestionDisplay(props) {

    const {qid} = useParams()

    const q = props.questions.filter(q => q.id == qid)[0]

    // props.question is a Question object
    return <Container fluid>
        <Row >
            <Col as='h2'>Question number {qid}</Col>
            <Col>Asked by: <Badge pill>{q.email}</Badge></Col>
        </Row>
        <Row>
            <Col>{q.text}</Col>
        </Row>
    </Container>

}

export default QuestionDisplay;