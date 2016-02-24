var React = require('react');
var ReactDOM = require('react-dom');

/**
 * Lotto From
 * @return Html and form object
 */
var LotteryFrom = React.createClass({
	getInitialState: function() {
		return {
			name 	: '',
			names	: [],
			balls	: [],
			count	: null,
			cash	: 200
		}
	},

	isInArray: function(value, array) {
		return array.indexOf(value) > -1;
	},

	randomNumber: function(array) {
		var number 	= Math.floor(Math.random() * 50 + 1);

		if (!this.isInArray(number, array)) {
			array.push(number);
		}
		else {
			this.randomNumber(array);
		}

		return array[array.length - 1];
	},

	onChangeName: function(el) {
		return this.setState({name: el.target.value});
	},

	submitHandler: function(el) {
		el.preventDefault();

		if (this.state.name == '') return alert('Please enter a name!');

		this.state.count++;

		if (this.state.count <= 50) {
			var randomNumber = this.randomNumber(this.state.balls);

			this.state.names.push({
				name: this.state.name,
				number: randomNumber
			});

			this.setState({name: ''});
		}
		else {
			el.currentTarget.disabled = 'disabled';
			alert('Sorry contest is full.');
		}
	},

	render: function() {
		return (
			<div className="lottoContainer">
				<div>
					<form className="enterDraw">
						<input className="lottoInput" name="username" placeholder="Enter your name" type="text" value={this.state.name} onChange={this.onChangeName} />
						<button className="button enterButton" type="submit" onClick={this.submitHandler}>
							<span>Buy a ticket!</span>
						</button>
					</form>
					<DisplayEntry names={this.state.names} />
				</div>
				<StartDraw count={this.state.count} names={this.state.names} />
			</div>
		);
	}
});

var DisplayEntry = React.createClass({
	render: function() {
		var allNames = this.props.names;
		var displayNames = allNames.map(function(display, index) {
			return <DisplayItems key={index} name={display.name} number={display.number} />
		});

		return <div>{displayNames}</div>;
	}
});

var DisplayItems = React.createClass({
	render: function() {
		return (
			<div className="test">
				<span>Name: {this.props.name}</span>
				<span>Number: {this.props.number}</span>
			</div>
		);
	}
});

var StartDraw = React.createClass({
	startHandler: function() {
		if (this.props.count > 2) {

		}
	},

	render: function() {
		return (
			<div>
				<button onClick={this.startHandler} disabled>
					<span>Start Draw!</span>
				</button>
			</div>
		);
	}
});


ReactDOM.render(<LotteryFrom />, document.getElementById('app'));
