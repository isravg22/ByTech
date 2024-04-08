export default function Workers(){

    const getEnterprise=async()=>{

        const token = localStorage.getItem('idUser');

        const response= await fetch('http://localhost:8000/enterprise')

    }
    return(
        <div>
            <h1>{}NOMBRE DE LA EMPRESA</h1>
        </div>
    );
};