import { useState } from "react"
import { Table, Button, Form } from "react-bootstrap"
import { ArrowUpSquare, Pencil, Trash } from "react-bootstrap-icons"
import { Answer } from "../models/QAModels.mjs"
import dayjs from "dayjs"
import { useNavigate, useParams, Link } from "react-router"



function AnswersDisplay(props) {


    const navigate = useNavigate();
    const params = useParams();
    const questionId = params.qid;



    // props.answers
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
            <tr><td colSpan={5}>{/*
                <AddEditAnswerForm_Uncontrolled key={editing ? editing.id : -1} mode={mode} editing={editing} addAnswer={props.addAnswer} editAnswer={props.editAnswer} switchToAdd={switchToAdd} />
                */}

                <Button variant="primary" onClick={() => { navigate(`/question/${questionId}/add`) }} >Add new Answer</Button>
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
    // question/:qid/edit/:aid
    const navigate = useNavigate();
    const params = useParams();
    const questionId = params.qid;


    return <td>
        <Button variant='primary' onClick={() => props.upVote(props.answer.id)}><ArrowUpSquare /></Button> <></>
        <Button variant='warning' onClick={() => navigate(`/question/${questionId}/edit/${props.answer.id}`)} ><Pencil /></Button> <></>
        <Button variant='danger' onClick={() => props.delAnswer(props.answer.id)}><Trash /></Button>
    </td>
}


export default AnswersDisplay