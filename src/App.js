import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles({
  root: {
    maxWidth: 445,
    minWidth: 275,
    border: "1px solid",
    padding: "10px",
    boxShadow: "5px 10px lightgrey",
    margin:'auto',
    flexDirection: 'Column',
    // marginLeft: "auto",
    // marginRight: "auto",
     marginTop: "200px",
    
  },
});


const btnstyle = { margin: '8px 0' }
export default function ImgMediaCard(props) {
  const classes = useStyles();

  function refreshPage() {
    window.location.reload(false);
  }
  const handleClick = () => {
    var location = document.getElementById("textfield").value;
    console.log("this is the location " + location)
    alert("hello there");
    axios
    .get(
     
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=29e7e86b38920dac0f01c74288781ca0`
    )
    .then(res => {
console.log(res);
var res=JSON.parse(JSON.stringify(res));
var weathertype=res.data.weather[0].description;
var temp=res.data.main.temp;
var hTemp =temp-273.15  ;

//date
var d = new Date(Date.now());
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


localStorage.setItem("datewithdayandtime", d.toLocaleDateString(undefined, options));
localStorage.setItem("weather",weathertype);
localStorage.setItem("location",location);
localStorage.setItem("temperature",hTemp);
console.log("weather is ",res.data.weather[0].description)

refreshPage();
}).catch(err => alert("Not Found"))




    }

  var localweather=localStorage.getItem("weather");
  var locallocation=localStorage.getItem("location");
  var localtemp=localStorage.getItem("temperature");
  var localdate=localStorage.getItem("datewithdayandtime");

  console.log("method out loc location " + locallocation);
  console.log("method out loc weather " + localweather);
  console.log("method out loc temperature " + localtemp);
  console.log("method out loc temperature " + localdate);


  





  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Image Loading...."
          height="140"
          image="https://play-lh.googleusercontent.com/lPfhsMXmCAVrYe3Im-YEuldaIylbh0-ZMxUSf6sd-alEAphC2iGnsaEc3gJGC1LTE1g"
          title="Weather Forcast"
        />
        <CardContent>
          
          <Typography  gutterBottom variant="h5" component="h2">
          {locallocation}
          </Typography>
          <Typography style={{marginLeft:"220px", marginTop:"-35px"}}variant="body2" color="textSecondary" component="p">
            {localdate}
          </Typography>
          
          <Typography style={{ marginTop:"10px"}} variant="body2" color="textSecondary" component="p">
            {localweather}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
           {localtemp}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>

      <TextField id="textfield" label="Enter Location" variant="standard" />
      

        <Button type='submit' onClick={handleClick} size="small" color="primary">
          Submit
        </Button>

     
      </CardActions>
    </Card>
  );
}