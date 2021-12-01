import formConfig from "./formConfig.js";
import Field from "./Field.js";

export { Form, getFormValues }

/**
 * Form class for generating forms HTML using JSON config in formConfig.js
 * @constructor
 * @param {String} formType - the form settings key in formConfig.js object
 * @param {Object} values - The values object {'fieldName': fieldValue}
 * @returns {Object} - <form> DOM element
 */
class Form {
	constructor(formType, values) {
		let formObject = formConfig[formType];
		let submit = false;

		this.id = formObject.id;
		this.class = formObject.class;
		this.fields = formObject.fields;
		this.values = values;

		let form = document.createElement('form');
		form.setAttribute('id', this.id);
		form.setAttribute('class', this.class);

		for (let i = 0; i < this.fields.length; i++){
			let fieldObject = this.fields[i];
			if(this.values){
				fieldObject.value = this.values[fieldObject.name] || "";
			}
			let formFieldObject = new Field(fieldObject, this.class);


			let div = document.createElement('div');
			div.classList.add("form-div-item")

			if(formFieldObject.label){
				div.appendChild(formFieldObject.label);
			}
			div.appendChild(formFieldObject.field);


			form.appendChild(div);

			if(fieldObject.type == "submit"){
				submit = true;
			}
		}

		if(!submit){
			let saveBtn = document.createElement('input');
			saveBtn.setAttribute('id', 'save');
			saveBtn.setAttribute('name', 'save');
			saveBtn.setAttribute('value', 'save');
			saveBtn.setAttribute('type', 'submit');
			saveBtn.classList.add('btn');
			form.appendChild(saveBtn);
		}

		return form;
	}
}

// Create an object with form fields names and values
function getFormValues(form){
	let formData = Object.values(form).reduce((obj,field) => {
		if(field.name != 'save'){
			obj[field.name] = field.value;
		}
		return obj 
	}, {});
	return formData;
}