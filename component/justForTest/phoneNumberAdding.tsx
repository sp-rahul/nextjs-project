//
"use client"

import {Box, Button, Container, TextField} from "@mui/material";
import {useState} from "react";
import * as yup from 'yup';
import {Controller, useForm} from "react-hook-form";

const validationSchema = yup.object().shape({
    phone: yup.string().required('Name is required'),

});

const PhoneNumber=()=>{
    const [inputFields, setInputFields] = useState([
        { phone: ''}
    ])
    const {control,unregister,handleSubmit}=useForm()

    const handleFormChange = (index:number, event:any) => {
        let data = [...inputFields];
        // @ts-ignore
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }
    const addFields = () => {
        let newField = { phone: '' }

        setInputFields([...inputFields, newField])
        console.log("new",inputFields)
    }
    const removeFields = (indexToRemove: number) => {
        // let data = [...inputFields];
        // console.log("remove data",data)
        // // data.splice(index, 1)
        // const abc = unregister(data[index].phone)
        // console.log("remove abc",abc)
        const updatedFields = inputFields.filter((_, index) => index !== indexToRemove);
        console.log("updatedFields",updatedFields)
        setInputFields(updatedFields)
    }
    const submit =  (data:any) => {
       console.log(data)

    }
    return( <Container sx={{display:'flex', m: '50px'}}>
        <form onSubmit={handleSubmit(submit)}>
            {inputFields.map((input, index) => {
                return (
                    <Box key={index} sx={{m: '5px'}}>
                        <Controller
                            name={`inputFields[${index}].phone`}
                            control={control}
                            defaultValue={input.phone}
                            render={({ field:{onChange,value} }) => (
                                <TextField
                                   onChange={onChange}
                                   value={value}
                                    label="Phone Number"
                                    // error={errors.inputFields?.[index]?.phone}
                                    // helperText={errors.inputFields?.[index]?.phone?.message}
                                />
                            )}
                        />
                        <Button onClick={() => removeFields(index)}>Remove</Button>
                    </Box>
                )
            })}
            <Button onClick={addFields}>Add More..</Button>
            <Button type='submit'>Submit</Button>

        </form>
    </Container>)
}
export default PhoneNumber

//
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import {Button, Container, TextField} from "@mui/material";
//
// const PhoneNumber = () => {
//     const {register, handleSubmit} = useForm();
//
//     const [phoneFields, setPhoneFields] = useState<[string][]>([]);
//
//     const addPhoneField = () => {
//         setPhoneFields([...phoneFields, [""]]);
//     };
//
//     const removePhoneField = (index: number) => {
//         const updatedPhoneFields = [...phoneFields];
//         updatedPhoneFields.splice(index, 1);
//         setPhoneFields(updatedPhoneFields);
//     };
//
//     return (
//         <Container>
//         <form onSubmit={handleSubmit(() => {console.log(phoneFields)})}>
//             {phoneFields.map((phoneField, index) => {
//                 return (
//                     <div key={index}>
//                         <TextField
//                             type="tel"
//                             {...register(`phone[${index}]`)}
//                             value={phoneField[index]}
//                         />
//                         <Button type="button" onClick={() => removePhoneField(index)}>
//                             Remove
//                         </Button>
//                     </div>
//                 );
//             })}
//             <Button type="button" onClick={() => addPhoneField()}>
//                 Add
//             </Button>
//             <Button type="submit">Submit</Button>
//         </form>
//         </Container>)
//
// }
// export default PhoneNumber