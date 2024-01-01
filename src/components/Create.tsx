import { useNavigate } from "react-router-dom";

import { addUser } from "../app/UserSlice";

import { useAppDispatch } from "../hooks/useAppDispatch";

import { useInput } from "../hooks/useInput";

import { v4 as uuidv4 } from "uuid";

import Form from "./Form";

import { useAppSelectore } from "../hooks/useAppSelector";

import { useEffect, useRef } from "react";

import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

const Create = () => {

    const MySwal = withReactContent(Swal);

    const navigate = useNavigate();

    const { addUserStatus } = useAppSelectore(state => state.user);

    const dispatch = useAppDispatch();

    const firstTime = useRef(false);

    const [name, bindName, resetName] = useInput("");

    const [email, bindEmail, resetEmail] = useInput("");

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {

        e.preventDefault();

        MySwal.fire({

            title: "Do you want to create a new user ?",

            showDenyButton: true,

            showCancelButton: true,

            confirmButtonText: "Add",

            denyButtonText: "Don't Add"

        }).then(result => {

            if (result.isConfirmed) {

                dispatch(addUser({ id: uuidv4(), name, email }));

                MySwal.fire("Will Be Added.", '', "info");

            } else if (result.isDenied) {

                MySwal.fire("Won't Be Added.", '', "info");

            }

        });

    }

    useEffect(() => {

        if (firstTime.current) {

            if (addUserStatus === "loading") {

                MySwal.fire("Loading...", '', "info");

            } else if (addUserStatus === "success") {

                MySwal.fire("User added successfully.", '', "success");

                resetName("");

                resetEmail("");

                navigate("/");

            } else if (addUserStatus === "error") {

                MySwal.fire("Something went wrong!", '', "error");

            }

        }

        firstTime.current = true;

    }, [addUserStatus]);

    return (

        <section className="create">

            <div className="container">

                <h3 className="main-heading">Add New User</h3>

                <Form

                    type = { "create" }

                    bindName = { bindName }

                    bindEmail = { bindEmail }

                    handleSubmit = { handleSubmit }
                
                />

            </div>
        
        </section>

    );

}

export default Create;
