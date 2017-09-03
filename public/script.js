var div_active_todos = document.getElementById('div_active_todos');
var div_completed_todos = document.getElementById('div_completed_todos');
var div_deleted_todos = document.getElementById('div_deleted_todos');

var a_active_todos = document.getElementById('a_active_todos');
var a_completed_todos = document.getElementById('a_completed_todos');
var a_deleted_todos = document.getElementById('a_deleted_todos');

var tbl_active_todos = document.getElementById('tbl_active_todos');
var tbl_completed_todos = document.getElementById('tbl_completed_todos');
var tbl_deleted_todos = document.getElementById('tbl_deleted_todos');

const STATUS_ACTIVE = 'ACTIVE';
const STATUS_COMPLETED = 'COMPLETED';
const STATUS_DELETED = 'DELETED';

function inflateTables(todo_json) {
  tbl_active_todos.innerHTML = '';
  tbl_completed_todos.innerHTML = '';
  tbl_deleted_todos.innerHTML = '';
  
  var todo_items = JSON.parse(todo_json);
  Object.keys(todo_items).forEach(key => {
    var tblRow = document.createElement('tr');
    var tdata_desc = document.createElement('td');
    tdata_desc.innerText = todo_items[key].title;

    switch(todo_items[key].status) {
      case STATUS_ACTIVE:
        var tbody = document.createElement('tbody');
        var tdata_check = document.createElement('td');
        tdata_check.innerHTML = '<input type=checkbox></input>';
        tdata_check.onclick = function() { completeTodoAJAX(key); };
        var tdata_del = document.createElement('td');
        tdata_del.innerHTML = '<button type="button" class="close" style="color: red; float: left">&times;</button>';
        tdata_del.onclick = function() { deleteTodoAJAX(key); };
        tblRow.appendChild(tdata_check);
        tblRow.appendChild(tdata_desc);
        tblRow.appendChild(tdata_del);
        tbody.appendChild(tblRow);
        tbl_active_todos.appendChild(tbody);
        break;
      case STATUS_COMPLETED:
        var tbody = document.createElement('tbody');
        var tdata_check = document.createElement('td');
        tdata_check.innerHTML = '<input type=checkbox checked=true></input>';
        tdata_check.onclick = function() { undoCompleteTodoAJAX(key); };
        var tdata_del = document.createElement('td');
        tdata_del.innerHTML = '<button type="button" class="close" style="color: red; float: left">&times;</button>';
        tdata_del.onclick = function() { deleteTodoAJAX(key); };
        tblRow.appendChild(tdata_check);
        tblRow.appendChild(tdata_desc);
        tblRow.appendChild(tdata_del);
        tbody.appendChild(tblRow);
        tbl_completed_todos.appendChild(tbody);
        break;
      case STATUS_DELETED:
        var tbody = document.createElement('tbody');
        tblRow.appendChild(tdata_desc);
        tbody.appendChild(tblRow);
        tbl_deleted_todos.appendChild(tbody);
        break;
    }
  });
}

function updateCount() {
  var active_todo_count = tbl_active_todos.getElementsByTagName('tr').length;
  var completed_todo_count = tbl_completed_todos.getElementsByTagName('tr').length;
  var deleted_todo_count = tbl_deleted_todos.getElementsByTagName('tr').length;
  a_active_todos.getElementsByClassName('elem_count')[0].innerText =
    '( ' + active_todo_count + (active_todo_count == 1 ? ' item' : ' items') + ' )';
  a_completed_todos.getElementsByClassName('elem_count')[0].innerText =
    '( ' + completed_todo_count + (completed_todo_count == 1 ? ' item' : ' items') + ' )';
  a_deleted_todos.getElementsByClassName('elem_count')[0].innerText =
    '( ' + deleted_todo_count + (deleted_todo_count == 1 ? ' item' : ' items') + ' )';
}

function renderList() {
  if(div_active_todos.getAttribute('aria-expanded') == 'false') {
    a_active_todos.getElementsByClassName('drop_indicator')[0].className = 'drop_indicator caret';
    a_active_todos.getElementsByClassName('elem_count')[0].style.visibility = 'visible';
  }
  else {
    a_active_todos.getElementsByClassName('drop_indicator')[0].className = 'drop_indicator caret caret-reversed';
    a_active_todos.getElementsByClassName('elem_count')[0].style.visibility = 'hidden';
  }

  if(div_completed_todos.getAttribute('aria-expanded') == 'false') {
    a_completed_todos.getElementsByClassName('drop_indicator')[0].className = 'drop_indicator caret';
    a_completed_todos.getElementsByClassName('elem_count')[0].style.visibility = 'visible';
  }
  else {
    a_completed_todos.getElementsByClassName('drop_indicator')[0].className = 'drop_indicator caret caret-reversed';
    a_completed_todos.getElementsByClassName('elem_count')[0].style.visibility = 'hidden';
  }

  if(div_deleted_todos.getAttribute('aria-expanded') == 'false') {
    a_deleted_todos.getElementsByClassName('drop_indicator')[0].className = 'drop_indicator caret';
    a_deleted_todos.getElementsByClassName('elem_count')[0].style.visibility = 'visible';
  }
  else {
    a_deleted_todos.getElementsByClassName('drop_indicator')[0].className = 'drop_indicator caret caret-reversed';
    a_deleted_todos.getElementsByClassName('elem_count')[0].style.visibility = 'hidden';
  }
}

$(div_active_todos).on('shown.bs.collapse', renderList)
                   .on('hidden.bs.collapse', renderList);
$(div_completed_todos).on('shown.bs.collapse', renderList)
                      .on('hidden.bs.collapse', renderList);
$(div_deleted_todos).on('shown.bs.collapse', renderList)
                    .on('hidden.bs.collapse', renderList);



/*========================= All AJAX functions are defined here ==========================*/


function getTodosAJAX() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/todos', true);

  xhr.onreadystatechange = function() {
    if(xhr.readyState == XMLHttpRequest.DONE) {
      if(xhr.status = 200) {
        inflateTables(xhr.responseText);
        updateCount();
      }
    }
  }
  xhr.send();
}

function addTodoAJAX() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/todos', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var data = 'todo_title=' + encodeURI(document.getElementById('add_item').value);
  document.getElementById('add_item').value = '';
  
  xhr.onreadystatechange = function() {
    if(xhr.readyState == XMLHttpRequest.DONE) {
      if(xhr.status = 200) {
        getTodosAJAX();
      }
    }
  }
  xhr.send(data);
}

function completeTodoAJAX(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', '/api/todos/' + id, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var data = 'todo_status=' + STATUS_COMPLETED;

  xhr.onreadystatechange = function() {
    if(xhr.readyState == XMLHttpRequest.DONE) {
      if(xhr.status = 200) {
        getTodosAJAX();
      }
    }
  }
  xhr.send(data);
}

function undoCompleteTodoAJAX(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', '/api/todos/' + id, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var data = 'todo_status=' + STATUS_ACTIVE;

  xhr.onreadystatechange = function() {
    if(xhr.readyState == XMLHttpRequest.DONE) {
      if(xhr.status = 200) {
        getTodosAJAX();
      }
    }
  }
  xhr.send(data);
}

function deleteTodoAJAX(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', '/api/todos/' + id, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var data = 'todo_status=' + STATUS_DELETED;

  xhr.onreadystatechange = function() {
    if(xhr.readyState == XMLHttpRequest.DONE) {
      if(xhr.status = 200) {
        getTodosAJAX();
      }
    }
  }
  xhr.send(data);
}

window.onload = getTodosAJAX;
