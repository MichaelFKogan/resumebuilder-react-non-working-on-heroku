import React from 'react'
import NavLink from '../utils/NavLink'

import Search from './children/Search'
import PostAJob from './children/PostAJob'
import SignIn from './children/SignIn'
import CreateAnAccount from './children/CreateAnAccount'

import Results from './children/Results'

import helpers from '../utils/helpers'




var locale = "";
var results = [];


  // GOOGLE PLACES AUTOCOMPLETE
// ============================================

   function initialize() {

    var options = {
  types: ['(cities)'],
  componentRestrictions: {country: "us"}
 };

      var input = document.getElementById('location');
      var autocomplete = new google.maps.places.Autocomplete(input, options);

        autocomplete.addListener('place_changed', fillInAddress);
   

   function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  var address = place.formatted_address.replace(", USA","")

          $('#location').val(address);
        locale = address;

}
}

   google.maps.event.addDomListener(window, 'load', initialize);


// GOOGLE PLACES AUTOCOMPLETE
// ============================================


export default React.createClass({
  
// GETINITIALSTATE
//============================================================
  getInitialState: function() {
    return { location: "", value: "", keyword: "", results: [], history: "" };
  },


// HANDLECHANGE
//============================================================
  handleChange: function(event) {
    
    switch(event.target.id){
        case "keyword":
            this.setState({ keyword: event.target.value });
            break;
    }
  },

// HANDLESUBMIT
//============================================================
  handleSubmit: function(event) {
      event.preventDefault();
      var results = []; 
      var userData = {location: locale, keyword: this.state.keyword};

      // Grab the URL of the website
        var currentURL = window.location.origin;

        // AJAX post the data to the friends API. 
        $.post(currentURL + "/", userData, function(data){
            console.log(data);
          // Grab the result from the AJAX post so that the best match's name and photo are displayed.
          
          // $("#matchName").text(data.name);
          // $('#matchImg').attr("src", data.photo);

          // Show the modal with the best match 
          // $("#resultsModal").modal('toggle');

        });

      // Search Indeed 0-25 Search Results
      // helpers.runQuery()(locale, this.state.keyword)
      // .then(function(data){
      //   if (data !== this.state.results){
      //       for(var i=0;i<=data.length-1;i++){
      //           results.push(data[i]);
      //       }        
      //       this.setState({results: results});
      //   }
      // }.bind(this));  

      this.setState({results: [] });

      $('#keyword').val("");
      $('#location').val("");

  },


  render() {
    return (
<div>


{/* NAVBAR =================================================*/}

<nav className="navbar navbar navbar-fixed-top" id="navbar">
    <div className="container-fluid">
            
        <div className="navbar-header">     
            <NavLink to="/" className="navbar-brand" id="brand">Resume Builder</NavLink>
        </div> 
            
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">

                    <li><NavLink to="/" className="navLinks">HOME</NavLink></li>

                {/*    <li><NavLink to="/Search" className="navLinks">SEARCH</NavLink></li>
                        
                    <li><NavLink to="/PostAJob" className="navLinks">POST A JOB</NavLink></li>

                    <li><NavLink to="/SignIn" className="navLinks">SIGN IN</NavLink></li>

                    <li><NavLink to="/CreateAnAccount" className="navLinks">CREATE AN ACCOUNT</NavLink></li>
                */}

                </ul>
            </div>

    </div> 
</nav>

{/* NAVBAR =================================================*/}



<div className="container">

<div className="jumbotron row">

    <div className="row text-center"> 
        <div id="titleOne">Welcome to </div>
        <div id="titleTwo"> Resume Builder</div>
        <br />
        <div id="subtitle">A place for job seekers to gain work experience. </div>
    </div>



<div className="row text-center center-block">

    <br />

    <form 
        onSubmit={this.handleSubmit}
        className="create-form" 
        // action="/" 
        // method="POST" 
        id="searchForm" >

    <div id="jobSearchDiv">
    
    <span id="searchGlyphicon"> 
    <img id="searchGlyphiconImg" src="./assets/img/glyphicons-search.png"/></span>
        <input 
        onChange={this.handleChange} 
        type="text" 
        className="form-control" 
        placeholder="Job Type or Category..." 
        id="keyword" 
        name="jobType"
        autoComplete="off"
         />
    </div>
      
    <div id="locationSearchDiv">
    <span id="mapGlyphicon"> <img id="mapGlyphiconImg" src="./assets/img/glyphicons-map.png"/> </span>
    <input 
        // onChange={this.handleChange} 
        type="text" 
        className="form-control" 
        placeholder="Location..." 
        id="location" 
        name="location"
        autoComplete="on"
         />
    </div>

    <button 
        className="btn btn-default" 
        type="submit" 
        value="Search" 
        id="searchButton">
        Search
    </button>


</form>

        <p id="message1"><b>Not registered? </b> 
        <NavLink to="/CreateAnAccount">Create an account</NavLink></p>
        
        <p id="message2"><b>Are you an organization? </b>
        <NavLink to="/PostAJob">Post a job</NavLink></p>

        <p id="message3"><b>Already a member? </b>
        <NavLink to="/SignIn">Log In</NavLink></p>


        </div> {/* END ROW */}

    
</div> {/* END JUMBOTRON ROW */}

    
       <Results jobresults={this.state.results} /> 
    </div> {/* END CONTAINER */} 

    <footer className="footer text-center"><p>Copyright @ 2017 Resume Builder</p></footer>

</div>

    )
  }
})


