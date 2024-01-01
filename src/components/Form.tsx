import { BindType } from "../hooks/useInput";

type FormProps = {

    type: string;

    bindName: BindType;

    bindEmail: BindType;

    handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;

}

const Form = ({ type, bindName, bindEmail, handleSubmit }: FormProps) => {

    return (

        <form onSubmit={ handleSubmit }>

            <div className="input-box">

                <label htmlFor="name">Name</label>

                <input
                
                    type="text"
                    
                    name="name"
                    
                    id="name" 

                    { ...bindName }
                
                />

            </div>

            <div className="input-box">

                <label htmlFor="name">Email</label>

                <input 
                
                    type="text"
                    
                    name="name"
                    
                    id="name" 

                    { ...bindEmail }
                
                />

            </div>

            <button type="submit" className="btn blue">{

                type === "create" ? "Add User" : "Update User"

            }</button>

        </form>

    );

}

export default Form;
