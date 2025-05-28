import { useEffect, useState } from "react"
import { Table, Button, Form } from "react-bootstrap"
import { ArrowUpSquare, Pencil, Trash } from "react-bootstrap-icons"
import { Answer } from "../models/QAModels.mjs"
import dayjs from "dayjs"
import { useNavigate, useParams, Link } from "react-router"
import { loadAnswers, upVote, deleteAnswer } from "../API/API"



function AnswersDisplay(props) {

    const [answers, setAnswers] = useState([])


    const navigate = useNavigate();
    const params = useParams();
    const questionId = params.qid;

    useEffect(  () => {
        // loadAnswers(questionId).then((ans)=>{setAnswers(ans)})

        const loader = async () => {
            const ans = await loadAnswers(questionId)
            setAnswers(ans)
        }

        loader()

        // return ()=> {do some cleanup}

    }, [questionId])

    const doUpVote = async (id) => {
        await upVote(id)
        loadAnswers(questionId).then((ans)=>{setAnswers(ans)})
    }

    const delAnswer = async (id) => {
        await deleteAnswer(id)
        loadAnswers(questionId).then((ans)=>{setAnswers(ans)})
    }

    // const [num, setNum] = useState(props.answers.length)
    // useEffect(() => {
    //     setNum(props.answers.length)
    // }, [props.answers.length])

    const num = answers.length

    // props.answers
    const ans = answers
    return <>
    <p>We have {num} answers</p>
    <Table>
        <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Text</th>
                <th scope="col">Author</th>
                <th scope="col">Score</th>
                {props.loggedIn && <th scope="col">Actions</th>}
            </tr>
        </thead>
        <tbody>
            {ans.map(a => <AnswerRow key={a.id} answer={a} {...props} delAnswer={delAnswer} upVote={doUpVote} user={props.user}/>)}
        </tbody>
        <tfoot>
            <tr><td colSpan={5}>{}

                {props.loggedIn && <Button variant="primary" onClick={() => { navigate(`/question/${questionId}/add`) }} >Add new Answer</Button>}
            </td></tr>

        </tfoot>
    </Table></>
}

function AnswerRow(props) {
    const a = props.answer

    return <tr>
        <AnswerRowData answer={a} />
        {props.loggedIn && <AnswerActionButtons answer={a} delAnswer={props.delAnswer} upVote={props.upVote} user={props.user}/>}
    </tr>
}

function AnswerRowData(props) {
    const a = props.answer
    return <>
        <td>{a.date}</td>
        <td>{a.text}</td>
        <td>{a.email}</td>
        <td>{a.score}</td>
    </>
}

function AnswerActionButtons(props) {
    // question/:qid/edit/:aid
    const navigate = useNavigate();
    const params = useParams();
    const questionId = params.qid;

    console.log(props.answer)
    console.log(props.user)

    return <td>
        <Button variant='primary' onClick={() => props.upVote(props.answer.id)}><ArrowUpSquare /></Button> <></>
        {props.answer.email === props.user.email && <>
        <Button variant='warning' onClick={() => navigate(`/question/${questionId}/edit/${props.answer.id}`)} ><Pencil /></Button> <></>
        <Button variant='danger' onClick={() => props.delAnswer(props.answer.id)}><Trash /></Button> </>}
    </td>
}


export default AnswersDisplay