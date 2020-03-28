import React, {useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string()
            .test('len', 'Must be at least 2 characters', val => val.length >= 2)
            .required(),
    size: yup.string(),
    ham: yup.boolean().defined(),
    onions: yup.boolean().defined(),
    pepperoni: yup.boolean().defined(),
    sausage: yup.boolean().defined(),
    specialReq: yup.string().notRequired()
});

export default function Form() {
    const [formState, setFormState] = useState({
        name: "",
        size: "",
        pepperoni: false,
        ham: false,
        onions: false,
        sausage: false,
        specialReq: ""

    });
    const [errors, setErrors] = useState({
        name: "",
        size: "",
        pepperoni: "",
        ham: "",
        onions: "",
        sausage: "",
        specialReq: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [user,setUser] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const validateChange = e => {
        yup 
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(error => {
                setErrors({
                    ...errors,
                    [e.target.name]: error.errors[0]
                });
            });
    };
    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => {
                setUser(response.data);
                console.log("YEET", user);

                setFormState({
                    name: "",
                    size: "",
                    pepperoni: false,
                    ham: false,
                    onions: false,
                    sausage: false,
                    specReq: ""
                });
            })
            .catch(error => {
                console.log(error.response)
            });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };
    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? 
                <p classname="error">{errors.name}</p> : null}
            </label>
            <br></br>
            <label htmlFor="size">
                Size 
                <select id="size" name="size" onChange={inputChange}>
                    <option value="Extra Small">Extra Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Extra Large">Extra Large</option>
                    <option value="Belly Buster">Belly Buster</option>
                </select>
            </label>
            <br></br>
            <label htmlFor="ham">
                Ham
                <input
                    type="checkbox"
                    name="ham"
                    id="hamBox"
                    checked={formState.ham}
                    onChange={inputChange}
                /> 
            </label>
            <br></br>
                <label htmlFor="onions">
                Onions
                <input
                    type="checkbox"
                    name="onions"
                    id="onionBox"
                    checked={formState.onions}
                    onChange={inputChange}
                />
                </label> 
                <br></br>
            <label htmlFor="pepperoni">
                Pepperoni
                <input
                    type="checkbox"
                    name="pepperoni"
                    id="pepperoniBox"
                    checked={formState.pepperoni}
                    onChange={inputChange}
                /> 
            </label>
            <br></br>
            <label htmlFor="sausage">
                Sausage
                <input
                    type="checkbox"
                    name="sausage"
                    id="sausageBox"
                    checked={formState.sausage}
                    onChange={inputChange}
                />    
            </label>
            <br></br>
            <label htmlFor = 'specialReq'>
                Special Request?
                <br/>
                <textarea
                name = 'specialReq'
                id = 'specialReqInput'
                placeholder = 'Type Special Request here...'
                value={formState.specialReq} 
                onChange={inputChange}
                />
            </label>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button disabled={buttonDisabled} name="order">Order</button>
        </form>
        ); 
}