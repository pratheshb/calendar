let date = new Date();
function createCalendar() {
    const table = document.createElement('table');
    table.append(createTableHead());
    table.append(createTableBody());
    changeDateLabel();
    calendar.append(table);
}

function createTableHead() {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    for (const day of days) {
        const th = document.createElement('th');
        th.textContent = day;
        tr.append(th);
    }
    thead.append(tr);

    return thead;
}

function createTableBody() {
    const prevBody = document.querySelector('table tbody');
    if(prevBody) {
        prevBody.remove();
    }
    const tbody = document.createElement('tbody');
    const year = date.getFullYear();
    const month = date.getMonth();
    const isCurrentMonth  = year === new Date().getFullYear() && month === new Date().getMonth();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const firstDay = [6, 0, 1, 2, 3, 4, 5][new Date(year, month).getDay()];
    let currentDate = 0;
    const nowOfRows = Math.ceil((firstDay + lastDate) / 7)
    for (let i = 0; i < nowOfRows; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const td = document.createElement('td');
            const isEmpty = currentDate >= lastDate || (i == 0 && j < firstDay)
            if(!isEmpty) {
                td.textContent = ++currentDate;
                if(isCurrentMonth && currentDate === new Date().getDate()) {
                    td.className = 'current-date'
                }
            }
            tr.append(td);
        }
        tbody.append(tr);
    }

    return tbody;
}

function changeDateLabel() {
    const year = date.getFullYear();
    const month = date.getMonth();
    const label = document.querySelector('#calendar-label');
    const prefix = month < 9 ? 0 : ''
    label.textContent = `${year} / ${prefix}${month + 1}`
}

function handleChangeDate(yearChange, monthChange) {
    if(yearChange) {
        date.setFullYear(date.getFullYear() + yearChange); 
    } else {
        date.setMonth(date.getMonth() + monthChange);
    }
    const table = document.querySelector('table');
    table.append(createTableBody());
    changeDateLabel();
}

window.addEventListener('load', function () {
    createCalendar();
});

const action = document.querySelector('.action');

action.addEventListener('click', function (e) {
    switch (e.target.id) {
        case 'inc-year':
            handleChangeDate(+1)
            break;
        case 'dec-year':
            handleChangeDate(-1)
            break;
        case 'inc-month':
            handleChangeDate(null, +1)
            break;
        case 'dec-month':
            handleChangeDate(null, -1)
            break;
        default:
    }
});
