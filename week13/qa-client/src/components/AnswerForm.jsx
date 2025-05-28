import { useActionState } from "react"
import LanguageContext from "./LanguageContext"
import { useContext, useState, useEffect } from "react"
import { Form, Button, Container } from "react-bootstrap"
import { Answer } from "../models/QAModels.mjs"
import dayjs from "dayjs"
import { useNavigate, useParams } from "react-router"
import { addAnswer, getAnswerById, editAnswer } from "../API/API"

function AddEditAnswerForm_Uncontrolled(props) {  // UN-CONTROLLED FORM

    const lang = useContext(LanguageContext);
    const navigate = useNavigate(); //Hook to navigate to different routes
    const params = useParams(); //Hook to extract the parameters from the current URL
    const aid = params.aid; //Extracting the answer ID from the URL parameters
    const questionId = params.qid;


    //If aid is present in the URL and so, editing is defined, we are in 'edit' mode, otherwise 'add' mode.
    const mode = aid ? 'edit' : 'add';

    const placeholder = new Answer(undefined, "", props.user.email, undefined, dayjs().format("YYYY-MM-DD"), 0);
    const [state, formAction, isPending] = useActionState(submitAnswer, placeholder);

    const [loading, setLoading] = useState(mode === "edit");

    useEffect(() => {
        if (mode === "edit") {
            getAnswerById(parseInt(aid))
                .then((ans) => {
                    console.log("origin", ans)
                    state.text = ans.text;
                    state.email = ans.email;
                    state.id = ans.id;
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to load answer:", err);
                    setLoading(false);
                });
        }
    }, []);

    async function submitAnswer(prevState, formData) {
        const text = formData.get("text");
        const email = formData.get("email");

        if (mode === "add") {
            const newAns = new Answer(undefined, text, email, undefined, dayjs().format("YYYY-MM-DD"), 0);
            try {
                await addAnswer(newAns, questionId);
            } catch (err) {
                newAns.error = err;
                return newAns;
            }
        }

        if (mode === "edit") {
            console.log("prev state", prevState)
            const newAns = { ...prevState, text, email };
            console.log("new ans", newAns)
            try {
                await editAnswer(newAns);
            } catch (err) {
                newAns.error = err;
                return newAns;
            }
        }

        navigate(`/question/${questionId}`);
        return prevState;
    }

    if (mode === "edit" && loading) return <div>Loading answer...</div>;

    const msg =
        mode === "add"
            ? lang === "it"
                ? "Aggiungi una risposta"
                : "Add new Answer"
            : lang === "it"
                ? `Modifica la risposta ${state.id}`
                : `Edit current answer ${state.id}`;

    return (
        <Container fluid>
            <h3>{msg}</h3>
            <Form action={formAction}>
                <Form.Group>
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                        type="text"
                        name="text"
                        maxLength={10}
                        defaultValue={state.text}
                    />
                    <Form.Text className="text-muted">
                        ({state.text.length} characters)
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        defaultValue={state.email}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isPending}>
                    {mode === "add" ? "Add Answer" : "Save Edits"}
                </Button>{" "}
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
}

export default AddEditAnswerForm_Uncontrolled;