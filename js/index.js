import {
	testLengthofTextBoxValue,
	testEmailAddress,
} from './libs/validation.js';

import alert from './components/alert.js';

let form = document.querySelector('.form');
let email = document.querySelector('#email');
let password = document.querySelector('#password');

form.onsubmit = async function (event) {
	event.preventDefault();

	if (
		testLengthofTextBoxValue(password.value, 1) &&
		testEmailAddress(email.value)
	) {
		try {
			const response = await axios.post('http://localhost:1337/auth/local', {
				identifier: email.value,
				password: password.value,
			});

			localStorage.setItem('jwt', response.data.jwt);
			localStorage.setItem('user', JSON.stringify(response.data.user));
			window.location.href = './addCar.html';
		} catch (error) {
			alert('alert-danger', error);
		}
	} else {
		alert('alert-danger', 'Please enter proper values for the inputs');
	}
};

async function getCars() {
	const response = await axios.get('http://localhost:1337/cars');
	console.log(response);
}

getCars();

async function getCarsTwo() {
	const response = await fetch('http://localhost:1337/cars/2');
	const results = await response.json();
	console.log(results);
}
