import React, { Component } from 'react'
import './home.css';
class Home extends Component{

    constructor(){
        super();
        this.state = {
            gender: '',
            weight:'',
            age:'',
            heightFeet:'',
            heightInches:'',
            activity:'',
            bmr:'',
            bmrsugg: '',
            pal: '',
            weightType: ''
        }
    }
    handleAgeChange = (event) => {
        this.setState({age: event.target.value})
    }

    handleWeightChange = (event) => {
        this.setState({weight: event.target.value})
    }

    handleheightFeetChange = (event) => {
        this.setState({heightFeet: event.target.value})
    }

    handleheightInchesChange = (event) => {
        this.setState({heightInches: event.target.value})
    }

    handlegenderChange = (event) => {
        this.setState({gender: event.target.value})
    }

    handleactivityChange = (event) => {
        this.setState({activity: event.target.value})
    }

    handleweightTypeChange = (event) => {
        this.setState({weightType: event.target.value})
    }

    calculateBMR(){
        let age = this.state.age;
        let gender = this.state.gender;
        let heightFeet = this.state.heightFeet;
        let heightInches = this.state.heightInches;
        let weight = this.state.weight;
        let weightType = this.state.weightType;

        if(age == '' || gender == '' || heightFeet == '' || heightInches == '' || weight == ''){
            this.setState({error:"All Fields are Required!"});
            return;
        }
        
        let bmrCalc = '';
        let height = ((heightFeet * 30.48) + (heightInches * 2.54));
        if(weightType == 1){
            if (gender == 2) {
                bmrCalc = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age);
            } else if (gender == 1) {
                bmrCalc = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
            }
        } else if(weightType == 2){
            if (gender == 2) {
                bmrCalc = 66.5 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
            } else if (gender == 1) {
                bmrCalc = 655 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
            }
        }
        this.setState({bmr:bmrCalc})

        let activitySug = ';'
        if (bmrCalc <= 1926) {
            activitySug = " not exercise";
        } else if (bmrCalc > 1926 && bmrCalc <= 2207) {
            activitySug = " exercise 1-3 times/week";
        } else if (bmrCalc > 2207 && bmrCalc <= 2351) {
            activitySug = " exercise 4-5 times/week";
        } else if (bmrCalc > 2351 && bmrCalc <= 2488) {
            activitySug = " exercise daily or do intense exercises 3-4 times/week";
        } else if (bmrCalc > 2488 && bmrCalc <= 2796) {
            activitySug = " do intense exercises 6-7 times/week";
        } else if (bmrCalc > 2796) {
            activitySug = " do very intense exercises daily";
        }
        //this.setState({bmrsugg: "Suggestion: You should " +  activitySug + " in order to ?"})

        this.setState({error:""});
        console.log(this.state.weight)
    }

    calculateKCalories() {
        let resultPAL;
        if (this.state.activity){
            resultPAL = <div className="resultPAL">{this.state.bmr * this.state.activity}</div>
        }
        this.setState({pal:resultPAL})
    }

 
    render() {
        let error;
        if (this.state.error){
            error = <div className="error">{this.state.error}</div>
        }

        let resultBMR;
        if (this.state.bmr){
            resultBMR = <div className="resultBMR">{this.state.bmr}</div>
        }

        let resultSug;
        if (this.state.bmrsugg){
            resultSug = <div className="resultSug">{this.state.bmrsugg}</div>
        }

        let resultPAL;
        if (this.state.pal){
            resultPAL = <div className="resultSug">{this.state.pal}</div>
        }

       

        return (
            <div id="bmrcalc">
            <div className="form">
                <h2>BMR &amp; Daily Calorie Calculator</h2>
                {error}
                <div className="inputwrap">
                    <label className="label">Gender</label><label>
                        <input type="radio" checked = {this.state.gender == "1"} onChange={this.handlegenderChange} className="genderM" name="gender" value="1" />Male</label><label>
                        <input type="radio" checked = {this.state.gender == "2"} onChange={this.handlegenderChange} className="genderF" name="gender" value="2" />Female</label>
                </div>
                <div className="inputwrap">
                    <label className="label">Weight</label><label>
                        <input type="radio" checked = {this.state.weightType == "1"} onChange={this.handleweightTypeChange} className="imperial" name="wrightT" value="1" />Imperial (Lbs)</label><label>
                        <input type="radio" checked = {this.state.weightType == "2"} onChange={this.handleweightTypeChange} className="metric" name="wrightT" value="2" />Metric (Kg)</label>
                    <input type="number" value={this.state.weight} onChange={this.handleWeightChange} name="weight" className="weight" min="0" max="999" />
                </div>
                <div className="inputwrap">
                    <label className="label">Height (Feet and inches)</label>
                    <input type="number" value={this.state.heightFeet} onChange={this.handleheightFeetChange} name="heightFeet" className="heightFeet" min="0" max="8" />
                    <input type="number" value={this.state.heightInches} onChange={this.handleheightInchesChange} name="heightInches" className="heightInches" min="0" max="11" />
                </div>
                <div className="inputwrap">
                    <label className="label">Age (Years)</label>
                    <input type="number" value={this.state.age} onChange={this.handleAgeChange} className="age" name="age" min="0" max="120" />
                </div>
                <button type="button" onClick={() => this.calculateBMR()}>Calculate BMR</button>
                {resultBMR}
                {resultSug}
                <div className="workout">
                    <div className="inputwrap">
                        <label className="label">Workout in a Week</label>
                        <select className="activity" value = {this.state.activity} onChange={this.handleactivityChange} name="activity">
                            <option value="">Select your Activity</option>
                            <option value="1.2">Sedentary (Very little or no exercise, and desk job)</option>
                            <option value="1.375">Lightly Active (Light exercise 1 to 3 days per week)</option>
                            <option value="1.55">Moderately Active (Moderate exercise 3 to 5 days per week)</option>
                            <option value="1.725">Very Active (Heavy exercise 6 to 7 days per week)</option>
                            <option value="1.9">Extremely Active (Very intense exercise, physical job, or exercise multiple times per day)</option>
                        </select>
                    </div>
                    <button type="button" onClick = {() => this.calculateKCalories()}>Calculate Calories</button>
                    {resultPAL}
                </div>
            </div>
        </div>
        )
    }
}



export default Home;