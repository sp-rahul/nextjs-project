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
    const addFields = () => {
        let newField = { phone: '' }

        setInputFields([...inputFields, newField])
        console.log("new",inputFields)
    }
    const removeFields = (indexToRemove: number) => {


       unregister(`inputFields[${indexToRemove}].phone`)
        const updatedFields = inputFields.filter((field, index) => index !== indexToRemove);

        setInputFields(updatedFields);
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
