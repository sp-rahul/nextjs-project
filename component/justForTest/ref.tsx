import { useRef, useImperativeHandle } from "react"
import { useForm } from "react-hook-form"


type Inputs = {
    firstName: string
    lastName: string
}


export default function App() {
    const { register, handleSubmit } = useForm<Inputs>()
    const firstNameRef = useRef<HTMLInputElement>(null)
    const onSubmit = (data: Inputs) => console.log(data)
    const { ref, ...rest } = register("firstName")
    const onClick = () => {
        firstNameRef.current!.value = ""
    }


    useImperativeHandle(ref, () => firstNameRef.current)


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...rest} ref={firstNameRef} />
            <button type="button" onClick={onClick}>
                clear
            </button>
            <button>Submit</button>
        </form>
    )
}