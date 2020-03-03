import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Table} from 'react-bootstrap';
//import 'Table' from 'react-bootstrap/Table';
import axios from 'axios';
import {GoPencil} from 'react-icons/go';
 
 
 
 
const Exercise = props => (
    <tr>
        <td className = "text-center">{props.exercise.username}</td>
        <td className = "text-center">{props.exercise.descr}</td>
        <td className = "text-center">{props.exercise.duration}</td>
        <td className = "text-center">{props.exercise.date.substring(0,10)}</td>
        <td className = "text-center">
            <Link to = {"/edit/"+props.exercise._id}>
                <Button variant = "outline-primary"><GoPencil/></Button></Link>
        </td>
    </tr>
 
)
 
export default class ExercisesList extends Component{
    constructor(props){
        super(props);
 
        this.deleteExercise = this.deleteExercise.bind(this);
 
        this.state = {exercises : []}
    }
 
    componentDidMount(){
        axios.get('http://165.227.104.29:6656/exercises/')
            .then(response => {
                this.setState({exercises : response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }
    deleteExercise(id){
        axios.delete('http://165.227.104.29:6656/exercises/'+id)
            .then(res => console.log(res.data));
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }
    exerciseList(){
        return this.state.exercises.map(currentexer => {
            return <Exercise exercise = {currentexer} deleteExercise = {this.deleteExercise} key = {currentexer._id}/>;
        })
    }
    render(){
        return(
            <div>
                <h3>Logged Exercises</h3>
                <Table striped hover>
                    <thead className = "thead-light">
                        <tr>
                            <th className = "text-center">Username</th>
                            <th className = "text-center">Description</th>
                            <th className = "text-center">Duration</th>
                            <th className = "text-center">Date</th>
                            <th className = "text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                    </Table>
            </div>
        );
    }
}