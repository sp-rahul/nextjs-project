import * as React from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {Box, Button, Container, TextField} from "@mui/material";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({

    cart: yup.array().of(yup.object().shape({
        phone: yup.string().required('Phone number is required')}))


});

type FormValues = {
    cart?: {
        phone: string;
    }[];
};


export default function Prac1() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            cart: [{ phone: "",}]
        },
        resolver: yupResolver(validationSchema)
    ,
    });
    const { fields, append, remove } = useFieldArray({
        name: "cart",
        control
    });

    const onSubmit = (data: FormValues) => console.log(data);

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => {
                    return (
                        <Box key={field.id}>
                            <Box  key={field.id}>
                                <TextField
                                    placeholder="Phone Number"
                                    {...register(`cart.${index}.phone` as const, {
                                        required: true
                                    })}
                                    error={!!errors?.cart?.[index]?.phone}
                                    helperText={errors?.cart?.[index]?.phone?.message}
                                />

                                <Button type="button" onClick={() => remove(index)}>
                                    DELETE
                                </Button>
                            </Box>
                        </Box>
                    );
                })}


                <Button
                    type="button"
                    onClick={() =>
                        append({
                            phone: "",
                        })
                    }
                >
                    APPEND
                </Button>
                <Button
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
}