import kanban_api from "./api/kanban_api.js";

export default class kanban_dropzone {
    static create_kanban_dropzone() {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropzone = range.createContextualFragment(`
        <div class="kanban__dropzone"></div>`
        ).children[0];

        dropzone.addEventListener("dragover", e => {
            e.preventDefault();
            dropzone.classList.add("kanban__dropzone--active");
        });

        dropzone.addEventListener("dragleave", () => {
            dropzone.classList.remove("kanban__dropzone--active");
        });

        dropzone.addEventListener("drop", e => {
            e.preventDefault();
            dropzone.classList.remove("kanban__dropzone--active");

            const columnElemennt = dropzone.closest(".kanban__column");
            const columnId = Number(columnElemennt.dataset.id);
            const dropZonesInColumn = Array.from(columnElemennt.querySelectorAll(".kanban__dropzone"));
            const droppedIndex = dropZonesInColumn.indexOf(dropzone);
            const itemId = Number(e.dataTransfer.getData("text/plain"));
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
            const insertAfter = dropzone.parentElement.classList.contains("kanban__item") ? dropzone.parentElement : dropzone;
            if (droppedItemElement.contains(dropzone)) {
                return;
            }
            insertAfter.after(droppedItemElement);
            kanban_api.updateItem(itemId, {
                columnId,
                position: droppedIndex
            });
        });

        return dropzone;
    }
}