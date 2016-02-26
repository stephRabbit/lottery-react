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
			display : false
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

	displayPurchase: function() {
		var item;

		this.state.names.forEach(function(display) {
			item = '<div><span>Name: ' + display.name + '</span><br><span>Number: ' + display.number + '</span></div>';
		});

		this.refs.displayBuyer.innerHTML = item;
	},

	disableEntry: function() {
		this.refs.displayBuyer.innerHTML = '';
		this.refs.submitForm.disabled = 'disabled';
		this.refs.enterName.disabled = 'disabled';
	},

	showDisplay: function(val) {
		this.setState({ display: val });
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

			this.displayPurchase();
			this.setState({name: ''});
		}
		else {
			this.refs.submitForm.disabled = 'disabled';
			alert('Sorry contest is full.');
		}
	},

	render: function() {
		return (
			<div className="lottoContainer">
				<div>
					<form className="enterDraw" onSubmit={this.submitHandler}>
						<input className="lottoInput" name="username" placeholder="Enter your name" ref="enterName" type="text" value={this.state.name} onChange={this.onChangeName} />
						<button className="button enterButton" ref="submitForm" type="submit">Buy a ticket!</button>
					</form>
					<div className="display" ref="displayBuyer"></div>
				</div>
				<StartDraw count={this.state.count} names={this.state.names} disableEntry={this.disableEntry} showDisplay={this.showDisplay} />
				<DisplayWinners count={this.state.count} names={this.state.names} display={this.state.display} />
			</div>
		);
	}
});

var StartDraw = React.createClass({
	shuffleArray: function(array) {
		for (var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
		return array;
	},

	startHandler: function() {
		if (this.props.count > 2) {
			this.shuffleArray(this.props.names);
			this.refs.startDraw.disabled = 'disabled';
			this.props.showDisplay(true);
			this.props.disableEntry();
			alert('The draw has started!');
		}
		else {
			alert('Not enough entries... Buy a ticket!');
		}
	},

	render: function() {
		return (
			<div className="buttonSection">
				<button ref="startDraw" className="button" onClick={this.startHandler}>Start Draw!</button>
			</div>
		);
	}
});

var DisplayWinners = React.createClass({
	displayHandler: function() {

		if (!this.props.display) alert('Draw is still open!');
=
		var	context 		= this,
			displayText 	= '',
			displayWinnings = '',
			winnings 		= null;

		this.props.names.forEach(function(display, index) {
			winnings = (200 + context.props.names.length * 10) / 2;

			if (index < 3) {
				context.refs.displayResult.disabled = 'disabled';

				switch (index) {
					case 0:
						winnings = winnings * .75;
						displayText = '1st ball';
						break;
					case 1:
						winnings = winnings * .15;
						displayText = '2nd ball';
						break;
					case 2:
						winnings = winnings * .10;
						displayText = '3rd ball';
						break;
				}

				displayWinnings += '<div><div><span>' + displayText +' <strong>( ' + display.number + ' )</strong>' + '</span><br><span>' + display.name + ': $' + Math.floor(winnings) + '</span></div></div>';

				return;
			}
		});

		this.refs.winners.innerHTML = displayWinnings;
		alert('Thanks for playing!');
	},

	render: function() {
		return (
			<div>
				<div className="buttonSection">
					<button className="button" ref="displayResult" onClick={this.displayHandler}>Display Winners!</button>
				</div>
				<div className="display" ref="winners"></div>
			</div>
		);
	}
});

ReactDOM.render(<LotteryFrom />, document.getElementById('lotto'));
