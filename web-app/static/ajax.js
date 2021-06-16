var Ajax = Object.create(null);
var fetch = window.fetch;
var json = (response) => response.json();
Ajax.ADD = function (requestObj) {
    const body = JSON.stringify(requestObj);
    return fetch("/add", {
        "method": "POST",
        "body": body,
        "headers": {
            "Content-Type": "application/json"
        }
    }).then(json);
};

Ajax.getTODO = function () {
    return fetch("/getTodo", {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
    }).then(json);
}

Ajax.del = function (todo) {
    const body = JSON.stringify(todo);
    return fetch("/delTodo", {
        "method": "POST",
        "body": body,
        "headers": {
            "Content-Type": "application/json"
        }
    }).then(json);
};
export default Object.freeze(Ajax);
