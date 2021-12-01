import Field from "./Field.js";
import { Form } from "./Form.js";

/**
 * Doctor class used for generating a <select> dropdown with 3 doctors as an options (Cardiologist, Dentist, Therapist)
 * @param {String} value - to preselect the doctor option
 * @returns {Object} - <select><options></options></select> DOM elemenet
 */
export default class Doctor {
	constructor(value) {
		let dropDownSettings = {
			"type": "select",
			"id": "doctor",
			"class": "doctor-select",
			"name":"doctor",
			"options": [{
				"text":"- Please select a doctor -",
				"value":""
			},
			{
				"text":"Cardiologist",
				"value":"cardiologist"
			},{
				"text":"Dentist",
				"value":"dentist"
			},
			{
				"text":"Therapist",
				"value":"therapist"
			}]
		};

		if(value){
			dropDownSettings.value = value;
		}

		let selectDoctorFieldObject = new Field(dropDownSettings);
		let createVisit = selectDoctorFieldObject.field;
	
		createVisit.addEventListener("change", (e)=>{
			e.preventDefault();
			let value = e.target.value;
			let doctorFormContainer = document.querySelector('.doctor-form-container');

			if (value){
				let form = new Form(value);
				doctorFormContainer.innerHTML = '';
				doctorFormContainer.appendChild(form);
			} else {
				doctorFormContainer.innerHTML = '';
			}
		});

		return createVisit;
	}
}