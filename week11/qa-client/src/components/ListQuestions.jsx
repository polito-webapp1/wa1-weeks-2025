
import { useNavigate, useLocation } from "react-router";
import { Row, Col, Container, Badge, Card } from "react-bootstrap";

function ListQuestions(props) {

    // Hook to navigate between routes
    const navigate = useNavigate();
    // Hook to get the current location, used to identify the current route
    const location = useLocation();

    // Determine if current route is root "/"
    const isRoot = location.pathname === '/';

    // We set the button text and target route based on the current route
    const buttonText = isRoot ? "Asked Questions" : "All Questions";
    const targetRoute = isRoot ? "/asked-questions" : "/";

    // We show all the questions if we are at "/", or only user's if we are at "/asked-questions"
    const questions = isRoot
        ? props.questions
        : props.questions.filter(q => q.userId === props.loggedUser);


    return (
        <Container fluid className="mt-3">
            <Row className="float-end">
                <Col xs={12} >
                    {/* Button toggles between viewing all questions or only user's questions */}
                    <Badge bg="secondary" onClick={() => navigate(targetRoute)}>
                        {buttonText}
                    </Badge>
                </Col>
            </Row>
            <h1>{isRoot ? "List of All Questions" : "List of Asked Questions"}</h1>
            <div>
                {questions.map((q) => {
                    return (<Card key={q.id} onClick={() => { navigate(`/question/${q.id}`) }}>
                        <Card.Title>{q.text}</Card.Title>

                    </Card>)
                })}
            </div>
        </Container>
    )

}

export default ListQuestions;