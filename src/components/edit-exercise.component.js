import React, {Component} from 'react';
import axios from 'axios';
 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
 
export default class EditExercise extends Component{
    constructor(props){
        super(props);
 
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescr = this.onChangeDescr.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
 
        this.state = {
            username: '',
            descr:'',
            duration:0,
            date : new Date(),
            users:[]
        }
    }
    componentDidMount(){
        axios.get('http://165.227.104.29:6656/exercises/'+ this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    descr: response.data.descr,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                    })
                })
            .catch(function(error) {
                console.log(error);
            })
    }
     
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeDescr(e){
        this.setState({
            descr: e.target.value
        });
    }
    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }
    onChangeDate(date){
        this.setState({
            date: date
        });
    }
 
    async onSubmit(e){
        e.preventDefault();
 
        const exercise = {
            username : this.state.username,
            descr : this.state.descr,
            duration : this.state.duration,
            date : this.state.date
        }
        console.log(exercise);
        await axios.post('http://165.227.104.29:6656/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data))
        window.location = '/';
    }
    render(){
        return(
           <div>
               <h3>Edit Exercise Log</h3>
               <form onSubmit = {this.onSubmit}>
                   <div className = "form-group">
                       <label> Username :</label>
                       <input type = "text"
                                required
                                className = "form-control"
                                value = {this.state.username}
                                onChange = {this.onChangeUsername}/>
                   </div>
                   <div className = "form-group">
                       <label>Description:</label>
                       <input type = "text"
                                required
                                className = "form-control"
                                value = {this.state.descr}
                                onChange = {this.onChangeDescr}/>
 
                   </div>
                   <div className = "form-group">
                       <label>Duration (in minutes):</label>
                       <input type = "text"
                                className = "form-control"
                                value = {this.state.duration}
                                onChange = {this.onChangeDuration}/>
                                 
                   </div>
                   <div className = "form-group">
                       <label>Duration (in minutes):</label>
                       <div>
                            <DatePicker
                                selected = {this.state.date}
                                onChange = {this.onChangeDate}
                            />
                       </div>     
                   </div>
                   <div className="form-group">
                       <input type = "submit" value = "Edit Exercise Log" className = "btn btn-primary"/>
                   </div>
               </form>
           </div>
        );
    }
}