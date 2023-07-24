import kanban_api from "./api/kanban_api.js";
import kanban_dropzone from "./kanban_dropzone.js";
import kanban_item from "./kanban_item.js";

export default class kanban_column {
    constructor(id, title) {
        const topdropzone = kanban_dropzone.create_kanban_dropzone();
        // console.log(topdropzone);

        this.elements = {};
        this.elements.root = kanban_column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban__column-title");
        this.elements.items = this.elements.root.querySelector(".kanban__column-items");
        this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(topdropzone);

        this.elements.addItem.addEventListener("click", () => {
            const newItem = kanban_api.insertItem(id, "");
            this.renderItem(newItem);
        });

        kanban_api.getItems(id).forEach(item => {
            // console.log(item);
            this.renderItem(item);
        });
    }
    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`
        <div class="kanban__column">
            <div class="kanban__column-title"></div>
            <div class="kanban__column-items"></div>
            <button class="kanban__add-item" type="button">+ Add</button>
        </div>`).children[0];
    }

    renderItem(data) {
        const item = new kanban_item(data.id, data.content);
        this.elements.items.appendChild(item.elements.root);
    }
}