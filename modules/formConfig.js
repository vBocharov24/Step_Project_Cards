export default
{
	"login":{
		"id": "login-form",
		"class": "login",
		"fields": [{
			"type": "email",
			"id": "email",
			"name":"email",
			"placeholder": "Type your email",
			"class": "email",
			"label": "Email",
			"value": "dmtrobelinskyi@icloud.com"
		},
		{
			"type": "password",
			"id": "password",
			"name":"password",
			"placeholder": "Type your password",
			"class": "password",
			"label": "Password",
			"value": "dima1234"
		},
		{
			"type": "submit",
			"id": "login-submit",
			"name":"login",
			"class": "btn",
			"value": "Login"
		}]
	},
	"search":{
		"id": "search-form",
		"class": "seach box-filter-form",
		"fields": [
			{
				"type": "text",
				"id": "search-visit",
				"name":"q",
				"placeholder": "Type to search visit",
				"class": "box-filter-input search-visit",
				"label": "Seacrh visit"
			},
			{
				"type": "select",
				"id": "status",
				"name":"status",
				"label": "Status",
				"class":"box-filter-input search-select search-all-done",
				"options": [{
					"text":"- Please select status -",
					"value":""
				},{
					"text":"Open", 
					"value":"open"
				},
				{
					"text":"Done", 
					"value":"done"
				}]
			},
			{
				"type": "select",
				"id": "priority",
				"name":"priority",
				"label": "Priority",
				"class":"box-filter-input search-select serch-priority",
				"options": [{
					"text":"- Please select priority -",
					"value":""
				},{
					"text":"Minor", 
					"value":"3"
				},
				{
					"text":"Major", 
					"value":"2"
				},
				{
					"text":"Critical", 
					"value":"1"
				}]
			},{
				"type": "submit",
				"id": "search",
				"name":"search",
				"class": "btn box-filter-btnsearch",
				"value": "Search"
			}
		]
	},
	"cardiologist": {
		"id": "cardiologist-form",
		"class": "cardiologist-form form",
		"fields":[
			{
				"type": "text",
				"id": "full-name",
				"name":"full-name",
				"label": "Full name"
			},
			{
				"type": "text",
				"id": "visit-goal",
				"name":"visit-goal",
				"label": "Visit goal"
			},
			{
				"type": "text",
				"id": "short-description",
				"name":"short-description",
				"label": "Short description"
			},
			{
				"type": "select",
				"id": "priority",
				"name":"priority",
				"label": "Priority",
				"options": [{
					"text":"Minor", 
					"value":"3"
				},
				{
					"text":"Major", 
					"value":"2"
				},
				{
					"text":"Critical", 
					"value":"1"
				}]
			},
			{
				"type": "number",
				"id": "pressure",
				"name":"pressure",
				"label": "Pressure"
			},
			{
				"type": "number",
				"id": "mass-index",
				"name":"massindex",
				"label": "Mass index"
			},
			{
				"type": "text",
				"id": "past-diseases",
				"name":"pastdiseases",
				"label": "Past diseases"
			},
			{
				"type": "number",
				"id": "age",
				"name":"age",
				"label": "Age"
			},
			{
				"type": "hidden",
				"name":"status",
				"value": "open"
			}
		]
	},
	"dentist":{
		"id": "dentist-form",
		"class": "dentist-form form",
		"fields":[

			{
				"type": "text",
				"id": "full-name",
				"name":"full-name",
				"label": "Full name"
			},
			{
				"type": "text",
				"id": "visit-goal",
				"name":"visit-goal",
				"label": "Visit goal"
			},
			{
				"type": "text",
				"id": "short-description",
				"name":"short-description",
				"label": "Short description"
			},
			{
				"type": "select",
				"id": "priority",
				"name":"priority",
				"label": "Priority",
				"options": [{
					"text":"Minor", 
					"value":"3"
				},
				{
					"text":"Major", 
					"value":"2"
				},
				{
					"text":"Critical", 
					"value":"1"
				}]
			},
			{
				"type": "number",
				"id": "age",
				"name":"age",
				"label": "your age"
			},
			{
				"type": "date",
				"id": "last-vists",
				"name":"lastvists",
				"label": "last Vist"
			},
			{
				"type": "hidden",
				"name":"status",
				"value": "open"
			}
			
		]
	},"therapist":{
		"id": "therapist-form",
		"class": "therapist-form form",
		"fields":[
			{
				"type": "text",
				"id": "full-name",
				"name":"full-name",
				"label": "Full name",
				"required": "required" 
				
			},
			{
				"type": "text",
				"id": "visit-goal",
				"name":"visit-goal",
				"label": "Visit goal",
				
			},
			{
				"type": "texttextArea",
				"id": "short-description",
				"name":"short-description",
				"label": "Short description",
			},
			{
				"type": "select",
				"id": "priority",
				"name":"priority",
				"label": "Priority",
				"options": [{
					"text":"Minor", 
					"value":"3"
				},
				{
					"text":"Major", 
					"value":"2"
				},
				{
					"text":"Critical", 
					"value":"1"
				}]
			},
			{
				"type": "number",
				"id": "age",
				"name":"age",
				"label": "your age"
			},
			{
				"type": "date",
				"id": "date-vists",
				"name":"datevists",
				"label": "date last Vist"
			},
			{
				"type": "hidden",
				"name":"status",
				"value": "open"
			}
		]
	}
}
