import kanban_api from "./api/kanban_api.js";
import kanban_dropzone from "./kanban_dropzone.js";
export default class kanban_item {
    constructor(id, content) {
        const bottom_dropzone = kanban_dropzone.create_kanban_dropzone();
		this.elements = {};
		this.elements.root = kanban_item.createRoot();
		this.elements.input = this.elements.root.querySelector(".kanban__item-input");

		this.elements.root.dataset.id = id;
		this.elements.input.textContent = content;
        this.content = content;
        this.elements.root.appendChild(bottom_dropzone);
        
        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();
            // console.log(this.content);
            // console.log(newContent);
            if (newContent == this.content) {
                // console.log('necas');
                return;
            }
            this.content = newContent;
            kanban_api.updateItem(id, {
                content: this.content
            });
            // console.log('atualizou');            
        };
        this.elements.input.addEventListener("blur", onBlur);

        this.elements.input.addEventListener("dblclick", () => {
            const check = confirm("Tem certeza que quer apagar?");
            if (check) {
                this.elements.input.removeEventListener("blur", onBlur);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }
        });

        this.elements.root.addEventListener("dragstart", e => { 
            e.dataTransfer.setData("text/plain", id);    
        });

        this.elements.input.addEventListener("drop", e => {
            e.preventDefault();
        });
    }
	static createRoot() {
		const range = document.createRange();
		range.selectNode(document.body);
		return range.createContextualFragment(`
			<div class="kanban__item" draggable="true">
				<div class="kanban__item-input" contenteditable></div>
			</div>
		`).children[0];
	}
}