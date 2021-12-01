import request from "./request.js";
import {Form, getFormValues} from "./Form.js";
import Field from "./Field.js";
import Modal from "./Modal.js";

export default class Visit {
	constructor(data){
		const visit = document.createElement('div');
		visit.classList.add('visit-card-box');

		const visitCard = document.createElement('div');
		visit.setAttribute('id', data.id);
		visit.dataset.value = JSON.stringify(data);
		visit.appendChild(visitCard);
	
		const cardBtnClose = document.createElement("a");
		const cardImg = document.createElement('img');
		const cardbtnEdit = document.createElement('button');
		const cardbtnShowMore = document.createElement('button');
		
		const expandedClass = "expanded";
	
	
		// Render Open/Done CTA
		let openDoneSettings = {
			"type": "select",
			"id": "open-done",
			"class": "open-done",
			"name":"status",
			"options": [{
				"text":"Open",
				"value":"open"
			},
			{
				"text":"Done",
				"value":"done"
			}]
		};
		openDoneSettings.value = data.status;
		let cardOpenDoneObject = new Field(openDoneSettings);
		let cardOpenDone = cardOpenDoneObject.field;
		cardOpenDone.classList.add("card-btn-open-done");
	
		if(data.status != 'done'){
			cardOpenDone.addEventListener("change",(e)=> {
				e.preventDefault();
				let value = e.target.value;
				if ( e.target.value == 'done') {
					data.status = 'done';
					request.editCard(data.id, data).then((response)=>{
						let newResponseBox = new Visit(response);
						let oldResponseBox = document.getElementById(data.id);
						oldResponseBox.replaceWith(newResponseBox);
					});
				}	
			});
		} else {
			cardOpenDone.setAttribute("disabled", "disabled");
		}
		visitCard.append(cardOpenDone);
	
		// Render Remove CTA
		cardBtnClose.classList.add("card-btn-close");
		cardBtnClose.addEventListener("click",	(e)=> {
			let confirmation = confirm('are you sure');
			if(confirmation){
				request.deletePost(data.id);
				e.target.closest('.visit-card-box').remove();

				let cardsContainer = document.getElementById('card-visit');
				let noCardsContainer = document.getElementById('no-cards');
				if (cardsContainer.innerHTML.trim() == '') {
					noCardsContainer.classList.remove('hidden');
				}
			}
		});
		visitCard.append(cardBtnClose);
	
		// Render Visit Card Image
		const imagePath = '/img/';
		const src = imagePath + data.doctor + '.jpeg';
		cardImg.setAttribute('src',src);
		cardImg.classList.add("card-img");
		visitCard.append(cardImg);
		
		let j = 1;

		let infoBox = document.createElement('ul');
		infoBox.classList.add('visit-card-list');

		let itemsOrder = [
			'full-name',
			'doctor',
			'visit-goal',
			'short-description',
			'priority',
			'pressure',
			'mass-index',
			'past-diseases',
			'age',
			'last-vists',
			'date-vists'
		];

		for (let i = 0; i < itemsOrder.length; i++){
			let key = itemsOrder[i];
			if(data[key]){
				let expanClass = i > 1 ? "expan" : "";
				let item =  `<li data-name="${key}" data-value="${data[key]}" class="visit-card-item ${expanClass}"><span class="visit-card-item-text">${key} :</span> ${data[key]}</li>`;
				infoBox.insertAdjacentHTML('beforeend', item);
			}
		}

		visitCard.appendChild(infoBox);
	
		// Render Edit
		cardbtnEdit.classList.add("btn");
		cardbtnEdit.textContent = "Edit";
		if(data.status != 'done'){
			cardbtnEdit.addEventListener("click", async () =>{
				request.getPost(data.id).then((datarequest) =>{
					let form = new Form(datarequest.doctor, datarequest);
					let visitCardWrapper = document.createElement('div');
					visitCardWrapper.classList.add('visit-wrapper');
			
					let doctorFormContainer = document.createElement('div');
					doctorFormContainer.classList.add('doctor-form-container');
					doctorFormContainer.appendChild(form);
			
					visitCardWrapper.append(doctorFormContainer);
			
					let modal = new Modal('Edit visit', visitCardWrapper);
					
					modal.open();
					form.addEventListener('submit', (e)=>{
						e.preventDefault();
						let formData = getFormValues(e.target);
		
						formData.doctor = data.doctor;
						request.editCard(data.id, formData).then((response)=>{
							let newResponseBox = new Visit(response);
							let oldResponseBox = document.getElementById(data.id);
							oldResponseBox.replaceWith(newResponseBox);
							modal.close();
						});
					});
				});
			});
		} else {
			cardbtnEdit.setAttribute("disabled", "disabled");
			cardbtnEdit.classList.add("card-btn-edit-disabled");
			cardImg.classList.add('card-img-disabled');
			visit.classList.add('visit-card-list-done');
		}
		visitCard.append(cardbtnEdit);
	
		// Render Show More
		const showMore =  "Show more";
		const showLess =  "Show less";
		cardbtnShowMore.classList.add("btn" , "card-btn-show-more");
		cardbtnShowMore.textContent = showMore;
		cardbtnShowMore.addEventListener("click", ()=> {
			if (visitCard.className.indexOf(expandedClass) > -1){
				visitCard.classList.remove(expandedClass);
				cardbtnShowMore.textContent = showMore;
				cardbtnShowMore.classList.remove('show-less')
			} else {
				visitCard.classList.add(expandedClass);
				cardbtnShowMore.textContent = showLess;
				cardbtnShowMore.classList.add('show-less')
			}
		});
		visitCard.append(cardbtnShowMore);
		
		return visit;
	}
};