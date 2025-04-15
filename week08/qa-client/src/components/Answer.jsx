import { useState } from "react"
import { Table, Button, Form } from "react-bootstrap"
import { ArrowUpSquare, Pencil, Trash } from "react-bootstrap-icons"
import { Answer } from "../models/QAModels.mjs"
import dayjs from "dayjs"
import { useActionState } from "react"
import LanguageContext from "./LanguageContext"
import { useContext } from "react"

function AnswersDisplay(props) {

    const [mode, setMode] = useState('add')
    const [editing, setEditing] = useState(undefined)

    const switchToEdit = (answer) => {
        setMode('edit')
        setEditing(answer)
    }
    const switchToAdd = () => {
        setMode('add')
        setEditing(undefined)
    }

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
            {ans.map(a => <AnswerRow key={a.id} answer={a} {...props} delAnswer={props.delAnswer} upVote={props.upVote} switchToEdit={switchToEdit} />)}
        </tbody>
        <tfoot>
            <tr><td colSpan={5}><AddEditAnswerForm_Uncontrolled key={editing ? editing.id : -1} mode={mode} editing={editing} addAnswer={props.addAnswer} editAnswer={props.editAnswer} switchToAdd={switchToAdd} /></td></tr>
        </tfoot>
    </Table>
}

function AnswerRow(props) {
    const a = props.answer

    return <tr>
        <AnswerRowData answer={a} />
        <AnswerActionButtons answer={a} delAnswer={props.delAnswer} upVote={props.upVote} switchToEdit={props.switchToEdit} />
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
        <Button variant='primary' onClick={() => props.upVote(props.answer.id)}><ArrowUpSquare /></Button> <></>
        <Button variant='warning' onClick={() => props.switchToEdit(props.answer)}><Pencil /></Button> <></>
        <Button variant='danger' onClick={() => props.delAnswer(props.answer.id)}><Trash /></Button>
    </td>
}


function AddEditAnswerForm_Controlled(props) {  // CONTROLLED FORM

    // props.mode = 'add' or 'edit'
    // in edit mode, we have props.editing that is the current value of the Answer

    const [text, setText] = useState(props.editing ? props.editing.text : '')
    const [email, setEmail] = useState(props.editing ? props.editing.email : '')

    const updateText = (newText) => {
        if (newText.length <= 10)
            setText(newText)
    }

    const submitAnswer = (e) => {
        e.preventDefault() // avoing the application to reload
        // console.log(e.target.text.value)  // uncontrolled -> read at submit time
        // console.log(text) // controlled -> already known

        /// validations here

        if (props.mode == 'add') {
            const newAns = new Answer(undefined, text, email, undefined, dayjs().format('YYYY-MM-DD'), 0)
            props.addAnswer(newAns)
        }

        if (props.mode == 'edit') {
            const newAns = { ...props.editing, text: text, email: email }
            props.editAnswer(newAns)
            props.switchToAdd()
        }

        setText('')
        setEmail('')

    }

    return <>
        <h3>{props.mode == 'add' ? 'Add new Answer' : 'Edit current answer ' + props.editing.id}</h3>
        <Form onSubmit={submitAnswer}>
            <Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Control type='text' name="text" value={text} onChange={(e) => { updateText(e.target.value) }} />
                <Form.Text className="text-muted">({text.length} characters)</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control type='email' name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </Form.Group>
            <Button variant="primary" type="submit">
                {props.mode == 'add' && 'Add Answer'}
                {props.mode == 'edit' && 'Save Edits'}
            </Button> <></>
            <Button variant='secondary' onClick={() => props.switchToAdd()}>Cancel</Button>
        </Form>
    </>
}


function AddEditAnswerForm_Uncontrolled(props) {  // UN-CONTROLLED FORM

    // props.mode = 'add' or 'edit'
    // in edit mode, we have props.editing that is the current value of the Answer

    // const [text, setText] = useState(props.editing ? props.editing.text : '')
    // const [email, setEmail] = useState(props.editing ? props.editing.email : '')

    const lang = useContext(LanguageContext)

    const submitAnswer = async (prevState, formData) => {

        const text = formData.get('text')
        const email = formData.get('email')
        /// validations here

        if (props.mode == 'add') {
            const newAns = new Answer(undefined, text, email, undefined, dayjs().format('YYYY-MM-DD'), 0)
            props.addAnswer(newAns)
            return emptyAnswer
        }

        if (props.mode == 'edit') {
            const newAns = { ...props.editing, text: text, email: email }
            props.editAnswer(newAns)
            props.switchToAdd()
            return emptyAnswer
        }

    }

    const emptyAnswer = new Answer(undefined, '', '', undefined, undefined, 0)
    const [state, formAction, isPending] = useActionState(submitAnswer, props.editing || emptyAnswer)

    let msg = props.mode == 'add' ? 'Add new Answer' : 'Edit current answer ' + props.editing.id
    if (lang=='it')
        msg = props.mode == 'add' ? 'Aggiungi una risposta' : 'Modifica la risposta ' + props.editing.id

    return <>
        <h3>{msg}</h3>
        <Form action={formAction}>
            <Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Control type='text' name="text" maxLength={10} defaultValue={state.text}/>
                <Form.Text className="text-muted">({state.text.length} characters)</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control type='email' name="email" defaultValue={state.email} />
            </Form.Group>
            <Button variant="primary" type="submit">
                {props.mode == 'add' && 'Add Answer'}
                {props.mode == 'edit' && 'Save Edits'}
            </Button> <></>
            <Button variant='secondary' onClick={() => props.switchToAdd()}>Cancel</Button>
        </Form>
    </>
}


export default AnswersDisplay