import React from 'react';
import axios from 'axios';
export default class UserCreate extends React.Component{
    constructor(props){
        super(props);
        //binding the methods
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        this.state={
            username: ''
        };
    }
    onChangeusername(e){
        this.setState({
                username: e.target.value
            });
    }
    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.username
        };
        console.log(user);
        //sending my data to the backend API
        axios.post('/user/add/', this.state)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        //after submitting the form will become empty
        this.setState({
            username: ''
        })
    }

    render(){
        return(
            <div className="container">
                <h1>Create New User</h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeusername}/>
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary"/>
                  </div>
                </form>
            </div>
        )
    }
}