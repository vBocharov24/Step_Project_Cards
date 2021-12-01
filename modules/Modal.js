/**
 * Modal class for generating Modal object
 * @constructor
 * @param {String} title - Popup title
 * @param {Object} formClass - Popup content, the expected data type is DOM element
 * @returns {Object} Modal object
 */
 export default class Modal{
	constructor(title, body){
	  let modalHTML = `
	  <div class="js-modal card-modal modal fade show visit-modal">
		  <div class="modal-dialog modal-dialog-centered">
				  <div class="modal-content card-modal-content">
					  <div class="modal-header">
						  <span class="js-modal-title modal-header-text"></span>
						  <a class="js-close modal-header-btn">
							  <img src="./img/Delete-80_icon-icons.com_57340.png" alt="">
						  </a>
					  </div>
					  <div class="js-modal-body modal-body"></div>
				  </div>
		  </div>
	  </div>`;

	  this.container = document.querySelector(".js-modal-container");
	  this.container.innerHTML = "";
	  this.container.innerHTML = modalHTML.trim();
	  this.modalElement = this.container.firstChild;

	  this.titleElement = this.modalElement.querySelector('.js-modal-title');
	  this.titleElement.textContent = title;

	  this.bodyWrapper = this.modalElement.querySelector('.js-modal-body');
	  this.bodyWrapper.appendChild(body);

	  let closeBtn = this.modalElement.querySelector('.js-close');
	  closeBtn.addEventListener('click', (e)=>{
		  e.preventDefault();
		  this.close();
		  this.destroy();
	  });

	  return this;
  }

  /**
	* Method foe setting the title
	* @param {String} title - Popup title
	*/
  setTitle(title){
	  this.titleElement.textContent = title;
  }

  /**
	* Method for set/update popup content
	* @param {Object} body - Popup content DOM element
	*/
  setBody(body){
	  this.bodyElement.innerHTML = body;
  }

  /**
	* Method showing the popup
	*/
  open(){
	  this.modalElement.classList.add('modal-active');
  }

  /**
	* Method hidding the popup
	*/
  close(){
	  this.modalElement.classList.remove('modal-active');
  }

  /**
	* Method removing the popup
	*/
  destroy(){
	  this.modalElement.remove();
  }
}