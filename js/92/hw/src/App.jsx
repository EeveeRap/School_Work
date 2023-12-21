
import './App.css'
import ChildComp from './childComp';

export default function App() {
  
  return (
    <>
      <h1>Hi, My name is Volvi!</h1>
      <h1>My address is 123 Anywhere Rd</h1>
      <h1>My email is randomEmail@gmail.com</h1>
      <ChildComp name= "John Doe" address= "456 Anywhere Rd." email= "anotherRandomEmail@gmail.com"/>
    </>
  );
}
