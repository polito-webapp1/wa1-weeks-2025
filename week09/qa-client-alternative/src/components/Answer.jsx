import { useState } from "react"
import { Table, Button, Form } from "react-bootstrap"
import { ArrowUpSquare, Pencil, Trash } from "react-bootstrap-icons"
import { Answer } from "../models/QAModels.mjs"
import dayjs from "dayjs"
import { useNavigate, useParams, useLocation, Outlet } from "react-router"



function AnswersDisplay(props) {

    //Hook to navigate to different routes
    const navigate = useNavigate();
    // Hook to get current route path
    const location = useLocation();
    //Hook to extract the parameters from the current URL
    const params = useParams();
    //Extracting the question ID from the URL parameters
    const questionId = params.qid;

    // Check if the current path ends with /add or contains /edit/
    const isFormPage = location.pathname.endsWith("/add") || location.pathname.includes("/edit");

    const ans = props.answers
    return <Table>
        <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Text</th>
                <th scope="col">Author</th>
                <th scope="col">Score</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            {ans.map(a => <AnswerRow key={a.id} answer={a} {...props} delAnswer={props.delAnswer} upVote={props.upVote} />)}
        </tbody>
        <tfoot>
            <tr><td colSpan={5}>
                {/* Only show button if not on add/edit form page */}
                {!isFormPage && (
                    <Button variant="primary" onClick={() => navigate(`/question/${questionId}/add`)}>
                        Add new Answer
                    </Button>
                )}
                <Outlet/>
            </td></tr>

        </tfoot>
    </Table>
}

function AnswerRow(props) {
    const a = props.answer

    return <tr>
        <AnswerRowData answer={a} />
        <AnswerActionButtons answer={a} delAnswer={props.delAnswer} upVote={props.upVote} />
    </tr>
}

function AnswerRowData(props) {
    const a = props.answer
    return <>
        <td>{a.date.format('YYYY-MM-DD')}</td>
        <td>{a.text}</td>
        <td>{a.email}</td>
        <td>{a.score}</td>
    </>
}

function AnswerActionButtons(props) {
    //question/:qid/edit/:aid
    const navigate = useNavigate();
    const params = useParams();
    const questionId = params.qid;


    return <td>
        <Button variant='primary' onClick={() => props.upVote(props.answer.id)}><ArrowUpSquare /></Button> <></>
        { /* Button to navigate to the edit answer page with URL /question/:qid/edit/:aid*/}
        <Button variant='warning' onClick={() => navigate(`/question/${questionId}/edit/${props.answer.id}`)} ><Pencil /></Button><></>
        <Button variant='danger' onClick={() => props.delAnswer(props.answer.id)}><Trash /></Button>
    </td>
}


export default AnswersDisplay