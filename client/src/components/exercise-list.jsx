import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id} >edit</Link> | <a href="/" onClick={()=>{props.deleteExercise(props.exercise._id)}}>delete</a>
    </td>
  </tr>
)



export default class ExerciseList extends React.Component{
    constructor(props){
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state={
            exercises: []
        }
    }
    componentDidMount(){
        axios.get('/exercise/')
            .then(res=>{
                this.setState({ exercises: res.data });
            })
            .catch(err=>console.log(err))
    }
    deleteExercise(id){
      axios.delete('/exercise/'+id)
        .then(res=> console.log(res.data))
        .catch(err=> console.log(err))
      this.setState({
        exercises: this.state.exercises.filter(el=> el._id!==id) //we want those data who don't match with this param
      })
    }
    exerciseList(){
      return this.state.exercises.map(current => {
        return <Exercise exercise={current} deleteExercise={this.deleteExercise} key={current._id} />
      })
    }

    render(){
        return(
            <div className="container">
              <h3>Logged Exercise</h3>
              <div className="table-responsive-md">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.exerciseList()}
                </tbody>
              </table>
              </div>
            </div>
        )
    }
}