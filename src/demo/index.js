import React from 'react';
import HomePageA from './HomePageA/HomePageA';
//import HomePageB from './HomePageB/HomePageB';
import HomePageC from './HomePageC/HomePageC';
//import MessageOptions from './messages/MessageOptions';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";

const ErrorMessage = 'Sorry, Incorrect URL';

const App=()=>{
	return(
		<Router>
			<Switch>
				<Route exact path="/HomePageA" component={HomePageA}/>
				<Route exact path="/HomePageB" component={HomePageB}/>
				<Route exact path="/HomePageC" component={HomePageC}/>
				<Route exact path='/MessageOptions' component={MessageOptionsScreen}/>
				<Route path="/MessageOptions/:theme/:color" children={<MessageOptionsScreen/>} />
				<Route exact path="/" component={Home}/>
				<Route component={NoMatch}/>
			</Switch>
		</Router>
	)
}
function Home(){
	return(
		<div>
			<h2>Concept Validation Screens</h2>
			<ul>
				<li>
				<Link to="/HomePageA">HomeA</Link>
				</li>
				<li>
				<Link to="/HomePageB">HomeB</Link>
				</li>
				<li>
				<Link to="/HomePageC">HomeC</Link>
				</li>
				<li>
				<Link to="/MessageOptions">Message Options</Link>
				</li>
			</ul>
		</div>
	)
}

const NoMatch = () => {
	return(
		<div>
			<p>{ErrorMessage}</p>
		</div>
	)
}

const MessageOptionsScreen = () => {
	const validThemes = ['white', 'dark', 'light'];
	const validColors = ['lightblue', 'monochrome', 'brand'];

	const { theme } = useParams();
	const { color } = useParams();

	console.log(theme);
	console.log(color);

	const ScreenTheme = theme ? theme.toLowerCase() : validThemes[0];
	const ScreenColor = color ? color.toLowerCase() : validColors[0];

	return (validThemes.includes(ScreenTheme) && validColors.includes(ScreenColor)) ?
		<MessageOptions theme={ScreenTheme} color={ScreenColor}></MessageOptions> :
		<NoMatch/>
}

/* dummy Home Page components */
const MessageOptions = (props) => {
	console.log(props);
	return(
		<div>
			<p>{`Theme: ${props.theme}`}</p>
			<p>{`Color: ${props.color}`}</p>
		</div>
	)
}

const HomePageB = () => {
	return(
		<div>
			<h1>Home Page B</h1>
		</div>
	)
}


export default App ;
