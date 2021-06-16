var todo = Object.create(null);
import Ajax from './static/ajax.js';
// Takes a string and reverses the order of its characters.
todo.add = function (newTodo) {
    var obj = {"todo": newTodo};
    var str = JSON.stringify(obj);
    Ajax.ADD(str).then(function (response) {
        return response;
    });
};

export default Object.freeze(todo);
