import { Table, Button } from "react-bootstrap"
import {ArrowUpSquare, Pencil, Trash} from "react-bootstrap-icons"

function AnswersDisplay(props) {
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
            {ans.map(a => <AnswerRow key={a.id} answer={a} upVote={props.upVote} delAnswer={props.delAnswer} />)}
        </tbody>
        <tfoot>
            <tr><td>actions</td></tr>
        </tfoot>
    </Table>
}

function AnswerRow(props) {
    const a = props.answer

    return <tr>
        <AnswerRowData answer={a} />
        <AnswerActionButtons answer={a} upVote={props.upVote} delAnswer={props.delAnswer}/>
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
    return <td>
        <Button variant='primary' onClick={()=>props.upVote(props.answer.id)}><ArrowUpSquare/></Button> <></>
        <Button variant='warning'><Pencil/></Button> <></>
        <Button variant='danger' onClick={()=>props.delAnswer(props.answer.id)}><Trash/></Button>
    </td>
}

export default AnswersDisplay