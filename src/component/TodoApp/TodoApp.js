import React, { Component } from 'react'
import './TodoApp.css'
import Swal from 'sweetalert2'


export default class TodoApp extends Component {

  state={
    input : '',
    Items : []
  }
  
  handleChange = (event) => {
    this.setState({
      input : event.target.value
    })
  }

  storeItem =(event)=>{
    event.preventDefault();
    const { input } = this.state
    if(this.verifyInput(input)){
      this.setState({
        Items : [...this.state.Items,input],
         input:''
      })
    }
    
  }

  deleteItem = (index) =>{
    this.setState({
      Items: this.state.Items.filter((data,key) => key!==index)
    })
  }


  editItem = async(index)=>{
    const { value: text } = await Swal.fire({
      title: "Edit Task",
      input: "text",
      inputPlaceholder: this.state.Items[index],
      didOpen: (popup) => {
        popup.style.backgroundColor = '#231d47c6';
      }
    });
    if (text) {
      if(this.verifyInput(text)){
        let prev = this.state.Items
        prev[index] = text
       this.setState({
        Items : prev
       })
      }
    }
  }


  verifyInput = (input) =>{
    if(!input.trim()){
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.style.backgroundColor = '#231d47c6';
          toast.style.color = '#d94a4e'
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Please Add a Task"
      });
      return false
    }else if(this.state.Items.includes(input)){
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.style.backgroundColor = '#231d47c6';
          toast.style.color = '#3f77bf'
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "info",
        title: "Task Already Exist"
      });
      return false
    }else return true
  }

  render() {

    const {input,Items} = this.state

    return (
      <div className='todo-Container'>
        
        <form className='input-section' onSubmit={this.storeItem}>
            <h1><i className="fa-solid fa-list-check"></i> Todo App</h1>
            <input type="text" placeholder='Add Your Task...' value={input} onChange={this.handleChange} />
        </form>

        <ul>
            {Items.map((data,index)=>(
              <li key={index}> {data} <span><i class="fa-solid fa-pen-to-square" onClick={() => this.editItem(index)}></i> &nbsp;<i className="fa-solid fa-trash" onClick={() => this.deleteItem(index)}></i></span></li>
            ))}
        </ul>
      </div>
    )
  }
}
