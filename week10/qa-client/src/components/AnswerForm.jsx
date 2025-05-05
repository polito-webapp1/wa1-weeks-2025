import { useActionState } from "react"
import LanguageContext from "./LanguageContext"
import { useContext } from "react"
import { Form, Button, Container } from "react-bootstrap"
import { Answer } from "../models/QAModels.mjs"
import dayjs from "dayjs"
import { useNavigate, useParams } from "react-router"

function AddEditAnswerForm_Uncontrolled(props) {  // UN-CONTROLLED FORM


    // props.mode = 'add' or 'edit'
    // in edit mode, we have props.editing that is the current value of the Answer

    // const [text, setText] = useState(props.editing ? props.editing.text : '')
    // const [email, setEmail] = useState(props.editing ? props.editing.email : '')

    const lang = useContext(LanguageContext);
    const navigate = useNavigate(); //Hook to navigate to different routes
    const params = useParams(); //Hook to extract the parameters from the current URL
    const aid = params.aid; //Extracting the answer ID from the URL parameters

    // We determine if we are in 'edit' or 'add' mode based on presence of aid. 
    // We also extract the answer to be edited from the props.answers array using the aid.
    const editing = aid ? props.answers.find(a => a.id === parseInt(aid)) : undefined;
    //If aid is present in the URL and so, editing is defined, we are in 'edit' mode, otherwise 'add' mode.
    const mode = editing ? "edit" : "add"; 


    const submitAnswer = async (prevState, formData) => {

        const text = formData.get('text')
        const email = formData.get('email')
        /// validations here

        if (mode == 'add') {
            const newAns = new Answer(undefined, text, email, undefined, dayjs().format('YYYY-MM-DD'), 0)
            props.addAnswer(newAns)
   
        }

        if (mode == 'edit') {
            const newAns = { ...editing, text: text, email: email }
            props.editAnswer(newAns)
        }

        // After adding or editing, we want to navigate back to the previous page
        // Altenative 
        // const questionId = params.qid;
        // navigate(`/question/${quetionId}`)
        navigate(-1)
        return prevState
    }

    const emptyAnswer = new Answer(undefined, '', '', undefined, undefined, 0)
    const [state, formAction, isPending] = useActionState(submitAnswer, editing || emptyAnswer)

    

    let msg = mode == 'add' ? 'Add new Answer' : 'Edit current answer ' + editing.id
    if (lang=='it')
        msg = mode == 'add' ? 'Aggiungi una risposta' : 'Modifica la risposta ' + editing.id

    return <Container fluid>
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
                {mode == 'add' && 'Add Answer'}
                {mode == 'edit' && 'Save Edits'}
            </Button> <></>
            <Button variant='secondary' onClick={() => {navigate(-1)}}>Cancel</Button>
        </Form>
    </Container >
}

export default AddEditAnswerForm_Uncontrolled