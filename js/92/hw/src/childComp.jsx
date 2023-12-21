import './childComp.css'
export default function ChildComp(props) {
    const {name, address, email} = props;
    return (
        <>
            <h1>----------------------------------------------------</h1>
            <h2> Hi, my name is {name}</h2>
            <h2> Hi, my address is {address}</h2>
            <h2> Hi, my email is {email}</h2>
        </>
    );
}