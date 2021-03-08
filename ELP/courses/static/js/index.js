"use strict"
import {DragAndDrop, ModuleDragAndDrop} from "./drag_and_drop.js";

let contentReorderUrl = 'http://127.0.0.1:8000/courses/content/order/';
let contentList = document.querySelector('#module-contents');
let contentDragAndDrop = new DragAndDrop(contentList, 'content-item', contentReorderUrl);
contentDragAndDrop.dragAndDrop();

let modulesReorderUrl = 'http://127.0.0.1:8000/courses/module/order/'
let modulesMenu = document.querySelector('#modules');
let modulesDragAndDrop = new ModuleDragAndDrop(modulesMenu, 'module-item', modulesReorderUrl);
modulesDragAndDrop.dragAndDrop();

