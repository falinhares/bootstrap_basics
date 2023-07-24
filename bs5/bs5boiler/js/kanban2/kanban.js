import kanban_column from "./kanban_column.js";

export default class kanban {
    constructor(root) {
        this.root = root;
        kanban.columns().forEach(column => {
            const columnView = new kanban_column(column.id, column.title);
            this.root.appendChild(columnView.elements.root);
        });
    }
    static columns() {
        return [
            {
                id: 1,
                title: "Not Started"
            },
            {
                id: 2,
                title: "In Progress"
            },
            {
                id: 3,
                title: "Completed"
            }
        ];
    }
}