import DoctorDropDown from './Doctor.js';
import Visit from "./Visit.js";
import request from "./request.js";
import Modal from "./Modal.js";
import { Form , getFormValues } from './Form.js';
import Cookies from './Cookies.js';

function isLoggedIn() {
	return !!Cookies.get('token');
}

function loadHeaderActions(){
	const userNameElement = document.getElementById('username');
	const headerActions = document.getElementById('header-actions');
	headerActions.innerHTML = '';

	if(isLoggedIn()){
		let logoutBtn = document.createElement('button');
		logoutBtn.textContent = 'logout';
		logoutBtn.classList.add('btn', 'btn-login');

		let createVisitBtn = document.createElement('button');
		createVisitBtn.textContent = 'Add new visit';
		createVisitBtn.classList.add('btn', 'btn-create-visit');

		let userName = Cookies.get('username');
		userNameElement.textContent = userName;

		headerActions.append(logoutBtn, createVisitBtn);

		logoutBtn.addEventListener('click', (e)=>{
			e.preventDefault();
			Cookies.remove('token');
			Cookies.remove('username');
			loadHeaderActions();
			loadVisits();
		});

		createVisitBtn.addEventListener('click', (e)=>{
			e.preventDefault();
	
			let visitCardWrapper = document.createElement('div');
			visitCardWrapper.classList.add('visit-wrapper');
	
			let doctor = new DoctorDropDown();
			let selectDoctorContainer = document.createElement('div');
			selectDoctorContainer.classList.add('select-doctor-container');
			selectDoctorContainer.appendChild(doctor);
	
			let doctorFormContainer = document.createElement('div');
			doctorFormContainer.classList.add('doctor-form-container');
	
			visitCardWrapper.append(selectDoctorContainer, doctorFormContainer);
	
			let modal = new Modal('Create visit', visitCardWrapper);
			
			modal.open();
			modal.bodyWrapper.addEventListener('submit', e => {
				e.preventDefault();
				let formData = getFormValues(e.target);
				formData.doctor = document.getElementById('doctor').value;
				request.creatPost(formData).then((response)=>{
					let visitCard = new Visit(response);
					let cardsContainer = document.getElementById('card-visit');
					cardsContainer.append(visitCard);

					let noCardsContainer = document.getElementById('no-cards'); 
					noCardsContainer.classList.add('hidden');

					modal.close();
				});
			});
		});
	} else {
		let loginBtn = document.createElement('button');
		loginBtn.textContent = 'login';
		loginBtn.classList.add('btn', 'btn-login');

		userNameElement.textContent = '';
		headerActions.append(loginBtn);

		loginBtn.addEventListener('click',(e)=> {
			e.preventDefault();
			let loginModal = document.createElement('div');
			loginModal.classList.add('visit-wrapper');
			let loginForm = new Form('login');
			let loginFormContainer = document.createElement('div');
			loginFormContainer.classList.add('login-container');
			loginFormContainer.appendChild(loginForm);
			let modal = new Modal('Please login', loginFormContainer);
			modal.open();
			loginForm.addEventListener('submit', async (e) => {
				e.preventDefault();
				let formData = getFormValues(e.target);
				request.login(formData.email, formData.password).then((response)=>{
					if(!response.error){
						let token = response.data;
						Cookies.set('token', token, 60);
						Cookies.set('username', formData.email, 60);
						modal.close();
						loadHeaderActions();
						loadVisits();
					} else {
						let errorMessage = response.data;
						let errorElement = document.getElementById('login-error');
						if(!errorElement){
							errorElement= document.createElement('span');
							errorElement.id = 'login-error';
							errorElement.classList.add('error');
							errorElement.textContent = errorMessage;
							loginFormContainer.prepend(errorElement);
						} else {
							errorElement.textContent = errorMessage;
						}
					}
				});
				
			});
		});
	}
}

function loadSearchPanel(){
	let searchFormContainer = document.querySelector('.box-filter');
	let searchForm = new Form("search");
	searchForm.addEventListener('submit', (e)=>{
		e.preventDefault();
		let formData = getFormValues(e.target);
		let cards = document.querySelectorAll('.visit-card-box');
		for (let i = 0; i < cards.length; i++){
			let found = false;
			let card = cards[i];
			// let attributes = card.querySelectorAll('.visit-card-item');

			let cardData = JSON.parse(card.dataset.value);
			console.log(cardData);

			if(!formData.q && !formData.priority && !formData.status){
				card.classList.remove('hidden');
				continue;
			}

			for (let name in cardData){
				let value =  cardData[name]

;				if(formData.priority && name == 'priority' && value == formData.priority){
					found = true;
					break;
				}

				console.log('formData.status', formData.status, 'name: ', name, 'value: ', value);
				if(formData.status && name == 'status' && value == formData.status){
					found = true;
					break;
				}

				if(formData.q && value.toString().toLowerCase().indexOf(formData.q.toLowerCase().trim()) > -1){
					found = true;
					break;
				}
			}

			if(!found){
				card.classList.add('hidden');
			} else {
				card.classList.remove('hidden');
			}
		}

	});

	searchFormContainer.appendChild(searchForm);
}

function loadVisits(){
	if (isLoggedIn()){
		request.getPosts().then((data)=>{
			let cardsContainer = document.getElementById('card-visit');
			cardsContainer.innerHTML = '';

			let noCardsContainer = document.getElementById('no-cards'); 
			if(data.length == 0){
				noCardsContainer.classList.remove('hidden');
			} else {
				noCardsContainer.classList.add('hidden');
			}

			for (let i = 0; i < data.length; i++){
				let dataObject = data[i];
				let visitCard = new Visit(dataObject);
				cardsContainer.append(visitCard);
			}
		});
	} else {
		noCards();
	}
}

function noCards(){
	let cardsContainer = document.getElementById('card-visit');
	cardsContainer.innerHTML = '';

	let noCardsContainer = document.getElementById('no-cards'); 
	noCardsContainer.classList.remove('hidden');
}

window.onload = function(){
	loadHeaderActions();
	loadSearchPanel();
	loadVisits();
}