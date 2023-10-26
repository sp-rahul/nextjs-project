
"use client"

import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {useState} from "react";
import * as yup from 'yup';
import {useForm} from "react-hook-form";

const phone_regex = RegExp('^(01){1}[3456789]{1}(\\d){8}$')

const validationSchema = yup.object().shape({
    phone: yup.string().required('Name is required').matches(phone_regex,'Pattern does not match'),

});

const AddPhoneNumber=()=>{
    const [inputFields, setInputFields] = useState([
        { phone: '' }
    ])
  // const { formState: { isDirty, errors }} =useForm()
    const [errors, setErrors] = useState<Record<string, string>>({});
    const handleFormChange = (index:number, event:any) => {
        let data = [...inputFields];
        // @ts-ignore
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }
    const addFields = () => {
        let newField = { phone: ''}

        setInputFields((prev)=>[...prev,newField])
    }
    const removeFields = (index: number) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }
    const submit = async (e:any) => {
        e.preventDefault();
        console.log("data",inputFields)
        try {
            await validationSchema.validate(inputFields, { abortEarly: false });
            console.log('Form data is valid:', inputFields);
        } catch (validationError) {
            const validationErrors: Record<string, string> = {};

            if (validationError instanceof yup.ValidationError) {
                validationError.inner.forEach((error) => {
                    validationErrors[error.path as string] = error.message;
                });
            }
            setErrors(validationErrors);
        }
    }
    return( <Container sx={{display:'flex', m: '50px'}}>
        <form>
            {inputFields.map((input, index) => {
                return (
                    <Box key={index} sx={{m: '5px'}}>
                        <TextField
                            name='phone'
                            placeholder='Phone Number'
                            value={input.phone}
                            required={true}
                            onChange={event => handleFormChange(index, event)}
                            error={Boolean(errors[`name[${index}]`])}
                            helperText={errors[`name[${index}]`] || ''}
                        />
                        <Button onClick={() => removeFields(index)}>Remove</Button>
                    </Box>
                )
            })}
            <Button onClick={addFields}>Add More..</Button>
            <Button onClick={submit}>Submit</Button>

        </form>
    </Container>)
}
export default AddPhoneNumber