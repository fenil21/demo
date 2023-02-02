import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import './App.css';


function App() {

  // const[num,setnum]=useState(0)
  // const[pr,setpr]=useState(0)
  const[main,setmain]=useState([])
  const[value1,setval1]=useState({
    firstName: '',
    lastName: '',
    guj: '',
    eng:''})
  const[reset,setReset]=useState(-1)
  

  const deletehandler=(index)=>{
    let copy=[...main]
    copy.splice(index,1)
    setmain(copy)
  }
  const edithandler=(values,index)=>{
    setval1(values)
    setReset(index)
    // setval1('')
  }
  
  return (
    <div className="App">
  <div>
    <h1>Student result</h1>
    <Formik
    // enableReinitialize
      initialValues={value1}
      enableReinitialize
      let onSubmit={ async (values,{resetForm},value1) => {
        const sum=parseInt(values.guj)+parseInt(values.eng)
        const total=sum/2;
        if(values.firstName&&values.lastName&&values.guj&&values.eng)
        {
        if(reset>=0)
        {
          let copy1=[...main]
          copy1.splice(reset,1,{firstName:(values.firstName),lastName:(values.lastName),guj:(values.guj),eng:(values.eng),total:(sum),pr:(total)})
          setmain(copy1)
          
          // resetForm()
          // value1()
        } 
        else {
          let copy=[...main]
          copy.push({firstName:(values.firstName),lastName:(values.lastName),guj:(values.guj),eng:(values.eng),total:(sum),pr:(total)})
          setmain(copy)
          resetForm()
          console.log(copy);
        }
      setReset(-1)
      setval1({
        firstName: '',
        lastName: '',
        guj: '',
        eng:''})
     } 
        // else{
        //   alert("enter data")
        // }
        // resetForm()
        // setRe(-1)
      }}
    >

      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field id="firstName" name="firstName" placeholder="Name"/>

        <label htmlFor="lastName">Last Name</label>
        <Field id="lastName" name="lastName" placeholder="LastName" />

        <label htmlFor="guj">Guj</label>
        <Field id="guj" name="guj"placeholder="Enter Marks" />
        
        <label htmlFor="eng">Eng</label>
        <Field id="eng" name="eng"placeholder="Enter Marks" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>

    <table border={1}>
      <tr>
        <td>firstName</td>
        <td>lastName</td>
        <td>guj</td>
        <td>eng</td>
        <td>total</td>
        <td>pr</td>
        <td>delete</td>
        <td>edit</td>
      </tr>
      {
        main.map((values,index)=>{
          return(
            <tr>
              <td>{values.firstName}</td>
              <td>{values.lastName}</td>
              <td>{values.guj}</td>
              <td>{values.eng}</td>
              <td>{values.total}</td>
              <td>{values.pr}</td>
              <td><button onClick={()=>deletehandler(index)}>delete</button></td>
              <td><button onClick={()=>edithandler(values,index)}>edit</button></td>
            </tr>
          )
        })
      }
    </table>
  </div>

    </div>
  );
}

export default App;
