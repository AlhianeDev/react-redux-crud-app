import { useEffect, useRef } from "react";

import { useAppDispatch } from "../hooks/useAppDispatch";

import { useAppSelectore } from "../hooks/useAppSelector";

import { deleteUser, fetchUsers } from "../app/UserSlice";

import { Link } from "react-router-dom";

import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

const Home = () => {

    const MySwal = withReactContent(Swal);

    const user = useAppSelectore(state => state.user);

    const dispatch = useAppDispatch();

    const firstTime = useRef(false);

    const handleDelete = (userId: string = "") => {

        dispatch(deleteUser(userId));

        MySwal.fire({

            title: "Do you want to delete a user ?",

            showDenyButton: true,

            showCancelButton: true,

            confirmButtonText: "Delete",

            denyButtonText: "Don't Delete"

        }).then(result => {

            if (result.isConfirmed) {

                dispatch(deleteUser(userId));

                MySwal.fire("Will Be Deleted.", '', "info");

            } else if (result.isDenied) {

                MySwal.fire("Won't Be Deleted.", '', "info");

            }

        });

    }

    useEffect(() => {

        if (firstTime.current) {

            if (user.deleteUserStatus === "loading") {

                MySwal.fire("Loading...", '', "info");

            } else if (user.deleteUserStatus === "success") {

                MySwal.fire("User deleted successfully.", '', "success");

            } else if (user.deleteUserStatus === "error") {

                MySwal.fire("Something went wrong!", '', "error");

            }

        }

        dispatch(fetchUsers());

        firstTime.current = true;

    }, [user.deleteUserStatus]);

    return (
        
        <section className="home">

            <div className="container">

                <h2 className="main-heading">React + Redux + TypeScript Crud App</h2>

                <Link to={ "/create" }>
                
                    <button className="btn green">Create</button> 
                
                </Link>

                <table className="table">

                    <thead>

                        <tr>

                            <th>Id</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>
                        
                        { user.loading && <tr>
                            
                            <td colSpan={4} style={{ textAlign: "center" }}>Loading...</td>
                            
                        </tr> }

                        { !user.loading && user.error ?
                        
                        <tr><td colSpan={4}  style={{ textAlign: "center" }}>
                            
                            { user.error }
                            
                        </td></tr> : null }

                        { !user.loading && !user.error ? user.users.length > 0 ? 
                        
                        user.users.map(user => {

                            return <tr key={ user.id }>

                                <td>{ user.id }</td>

                                <td>{ user.name }</td>

                                <td>{ user.email }</td>

                                <td>

                                    <Link to={ `/update/${ user.id }` }>

                                        <button className="btn blue">Update</button>

                                    </Link>

                                    <button className="btn red"
                                    
                                    onClick={() => { handleDelete(user.id) }}>
                                        
                                        Delete
                                        
                                    </button>

                                </td>

                            </tr>
                            
                        }) : <tr>
                            
                            <td colSpan={4} style={{ textAlign: "center" }}>
                                
                                No users to show!
                                
                            </td>
                            
                        </tr> : null }
                    
                    </tbody>

                </table>

            </div>
        
        </section>

    );

}

export default Home;
