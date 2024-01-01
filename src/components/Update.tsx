import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";

import { useInput } from "../hooks/useInput";

import Form from "./Form";

import { useAppSelectore } from "../hooks/useAppSelector";

import { updateUser } from "../app/UserSlice";

import { useEffect, useRef } from "react";

import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

const Update = () => {

    const MySwal = withReactContent(Swal);

    const { userId } = useParams();

    const { users, updateUserStatus } = useAppSelectore(state => state.user);

    const user = users.filter(user => user.id === userId)[0];

    const [name, bindName, resetName] = useInput(user.name);

    const [email, bindEmail, resetEmail] = useInput(user.email);

    const dispatch = useAppDispatch();

    const firstTime = useRef(false);

    const navigate = useNavigate();

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {

        e.preventDefault();

        MySwal.fire({

            title: "Do you want to update a user ?",

            showDenyButton: true,

            showCancelButton: true,

            confirmButtonText: "Update",

            denyButtonText: "Don't Update"

        }).then(result => {

            if (result.isConfirmed) {

                dispatch(updateUser({ id: userId, name, email }));

                MySwal.fire("Will Be Updated.", '', "info");

            } else if (result.isDenied) {

                MySwal.fire("Won't Be Updated.", '', "info");

            }

        });

    }

    useEffect(() => {

        if (firstTime.current) {

            if (updateUserStatus === "loading") {

                MySwal.fire("Loading...", '', "info");

            } else if (updateUserStatus === "success") {

                MySwal.fire("User updated successfully.", '', "success");

                resetName("");

                resetEmail("");

                navigate("/");

            } else if (updateUserStatus === "error") {

                MySwal.fire("Something went wrong!", '', "error");

            }

        }

        firstTime.current = true;

    }, [updateUserStatus]);

    return (

        <section className="update">

            <div className="container">
            
                <h3 className="main-heading">Update User</h3>

                <Form

                    type = { "update" }

                    bindName = { bindName }

                    bindEmail = { bindEmail }

                    handleSubmit = { handleSubmit }
                
                />

            </div>

        </section>

  );

}

export default Update;
