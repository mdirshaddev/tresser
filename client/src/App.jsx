import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar';
import CreateExercise from './components/exercise-create';
import EditExercise from './components/exercise-edit';
import ExerciseList from './components/exercise-list';
import UserCreate from './components/user-create';

function App() {
  return (
    <Router>
      <NavBar/>
      <br/>
      <Route path="/" exact component={ExerciseList} />
      <Route path="/user" component={UserCreate} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
    </Router>
  );
}

export default App;
