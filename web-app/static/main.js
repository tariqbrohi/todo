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
window.onload = () => {
    Ajax.getTODO().then(function (response) {
        for (let i = 0; i < response.length; i++) {
            if (response[i]["todo"] !== undefined) {
                loadTodo(response[i]["todo"]);
            }
        }
    });
}

function loadTodo(todo) {
    // Build variables
    let listText = todo;
    let li = document.createElement('li');
    let div = document.createElement('div');
    let p = document.createElement('p');
    let div2 = document.createElement('div');
    let span = document.createElement('span');

    // Actions
    let deleteButton = document.createElement('button');
    let doneButton = document.createElement('button');
    let sel = document.createElement('select');
    let statusStatus = document.createElement('option');
    let statusWarten = document.createElement('option');
    let statusBesprechen = document.createElement('option');
    let statusInarbeit = document.createElement('option');
    let statusErledigt = document.createElement('option');

    // Build buttons and lists
    // Classes
    doneButton.className += 'done';
    deleteButton.className += 'delete';
    li.className += 'column';
    div2.className += 'firstContainer'
    div.className += 'secondContainer'
    sel.className += 'status';
    span.className += 'status_anzeige'
    //Text
    doneButton.innerHTML = 'Strikeout';
    deleteButton.innerHTML = 'Delete';
    // Typ

    // p-Tag set text
    p.innerText = listText;
    document.getElementById("js__list").appendChild(li);
    li.prepend(p);

    // Build selection
    statusStatus.value = "0";
    statusStatus.text = "Select status";

    statusWarten.value = "1";
    statusWarten.text = "Wait";

    statusInarbeit.value = "2";
    statusInarbeit.text = "In progress";

    statusBesprechen.value = "3";
    statusBesprechen.text = "Discuss";

    statusErledigt.value = "4";
    statusErledigt.text = "Done";

    sel.add(statusStatus, null);
    sel.add(statusWarten, null);
    sel.add(statusInarbeit, null);
    sel.add(statusErledigt, null);
    sel.add(statusBesprechen, null);


    // Button deletes list item
    doneButton.onclick = function () {
        li.classList.toggle('hide');
    };

    // Button deletes list item
    deleteButton.onclick = function () {
        let obj = {"todo": p.innerText};
        let str = JSON.stringify(obj);
        Ajax.del(str).then(function(response) {
            console.log(response);
        });

        div.parentElement.remove();
    };

    // Output list element with button
    div2.appendChild(span);
    div2.appendChild(p);
    li.appendChild(div2);

    div.appendChild(sel);
    div.appendChild(doneButton);
    div.appendChild(deleteButton);
    li.appendChild(div);
}

function addList() {
    // Build variables
    let listText = document.getElementById("js__input-text").value;
    let obj = { "todo": listText };
    let str = JSON.stringify(obj);
    Ajax.ADD(str).then(function (response) {
        console.log(response);
    });
}