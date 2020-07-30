import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateExercise extends React.Component{
    constructor(props){
        super(props);
        //binding all the input onChange Properties
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //initialising state
        this.state={
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }
    onChangeusername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date){
        this.setState({
            date: date
        })
    }
    onSubmit(e){
        e.preventDefault(); //to make the normal html for behaviour disbaled.
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);
        //sending the data to backend API
        axios.post('/exercise/add/', this.state)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        window.location='/';
    }
    componentDidMount(){
        axios.get('/user/')
          .then(res=>{
            if (res.data.length>0){
              this.setState({
                users: res.data.map(user=>user.username), //this will contain a list of users
                username: res.data[0].username
              })
            }
          })
    }
    render(){
        return(
            <div className="container">
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                        required 
                        className="form-control" 
                        value={this.state.username}
                        onChange={this.onChangeusername}>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                    key={user}
                                    value={user}>
                                        {user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                        type="text"
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}/>
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                        <DatePicker
                        selected={this.state.date} 
                        onChange={this.onChangeDate} />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}