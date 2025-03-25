function Welcome(props) {

    if (props.times) {
        let list = []
        for (let i = 0; i < props.times; i++)
            list.push(0)

        return list.map(() => <SingleWelcome lang={props.lang} />)

    } else {
        return <SingleWelcome lang={props.lang} formal={props.formal} />
    }
}

function SingleWelcome(props) {
    // if (props.lang && props.lang == 'it')
    //     return <p>Buongiorno</p>
    // else 
    //     return <p>Hello!!</p>

    return <p>
        {props.lang && props.lang == 'it' ?
            "Benvenuti" :
            "Welcome"}
    </p>
}

export default Welcome