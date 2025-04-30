
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

function ListQuestions(props){

    const navigate = useNavigate();
   
    const questions = props.question;

    return(
        <div>
            
            <h1>List of Questions</h1>
            <ul>
                {questions.map((q)=>{
                    {/* Render each item as a clickable item and on click, 
                        we navigate to the page that displays the question details */}
                    return (<li key={q.id} onClick={()=>{navigate(`/question/${q.id}`)}}>
                        <h2>{q.text}</h2>

                    </li>)
                })}
            </ul>
        </div>
    )

}

export default ListQuestions;