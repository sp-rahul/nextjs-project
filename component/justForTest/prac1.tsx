import * as React from "react";
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";

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

    // const [inputFields, setInputFields] = useState(
    //     name: 'cart',
    //     control
    // )
    const onSubmit = (data: FormValues) => console.log(data);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => {
                    return (
                        <div key={field.id}>
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
                        </div>
                    );
                })}


                <button
                    type="button"
                    onClick={() =>
                        append({
                            phone: "",
                        })
                    }
                >
                    APPEND
                </button>
                <input type="submit" />
            </form>
        </div>
    );
}