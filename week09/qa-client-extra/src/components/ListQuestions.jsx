
import { useNavigate, useLocation } from "react-router";
import { Button } from "react-bootstrap";

function ListQuestions(props){

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
    ? props.question
    : props.question.filter(q => q.userId === props.fakeLoggedUser);


    return(
        <div>
            {/* Button toggles between viewing all questions or only user's questions */}
            <Button variant="info" onClick={() => navigate(targetRoute)}>
            {buttonText}
            </Button>
            <h1>{isRoot ? "List of All Questions" : "List of Asked Questions"}</h1>
            <ul>
                {questions.map((q)=>{
                    return (<li key={q.id} onClick={()=>{navigate(`/question/${q.id}`)}}>
                        <h1>{q.text}</h1>

                    </li>)
                })}
            </ul>
        </div>
    )

}

export default ListQuestions;