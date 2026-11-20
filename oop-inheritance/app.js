/*
Задание 1

Реализовать класс, описывающий простой маркер. В классе должны быть следующие компоненты:

- поле, которое хранит цвет маркета;
- поле, которое хранит количество чернил в маркете (в процентах);
- метод для печати (метод принимает строку и выводит текст соответствующим цветом; текст выводится до тех пор, пока в маркере есть чернила; один не пробельный символ — это 0.5% чернил в маркере).

Реализовать класс, описывающий заправляющийся маркер, унаследовав его от простого маркера и добавив метод для заправки маркера.

Продемонстрировать работу написанных методов.
*/
class Marker {
    constructor(color, inkAmount) {
        this.color = color;
        this.inkAmount = inkAmount;
    }

    print(text) {
        var printedText = "";
        var i;

        for (i = 0; i < text.length; i++) {
            if (text[i] !== " " && this.inkAmount < 0.5) {
                break;
            }

            printedText += text[i];

            if (text[i] !== " ") {
                this.inkAmount -= 0.5;
            }
        }

        return printedText;
    }
}

class RefillableMarker extends Marker {
    refill(inkAmount) {
        this.inkAmount += inkAmount;

        if (this.inkAmount > 100) {
            this.inkAmount = 100;
        }
    }
}

/*
Задание 2

Реализуйте класс ExtendedDate, унаследовав его от стандартного класса Date и добавив следующие возможности:

- метод для вывода даты (числа и месяца) текстом;
- метод для проверки это прошедшая дата или будущая (если прошедшая, то метод возвращает false, если будущая или текущая, то true);
- метод для проверки високосный год или нет;
- метод, возвращающий следующую дату.

Создайте объект класса ExtendedDate и выведите на экран результаты работы новых методов.
*/
class ExtendedDate extends Date {
    getTextDate() {
        var months = [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ];

        return this.getDate() + " " + months[this.getMonth()];
    }

    isFutureOrCurrent() {
        var today = new Date();
        var currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var checkedDate = new Date(this.getFullYear(), this.getMonth(), this.getDate());

        return checkedDate >= currentDate;
    }

    isLeapYear() {
        var year = this.getFullYear();

        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    getNextDate() {
        var nextDate = new ExtendedDate(this.getTime());

        nextDate.setDate(nextDate.getDate() + 1);
        return nextDate;
    }
}

/*
Задание 3

Реализовать класс Employee, описывающий работника, и создать массив работников банка.

Реализовать класс EmpTable для генерации html кода таблицы со списком работников банка. Массив работников необходимо передавать через конструктор, а получать html код с помощью метода getHtml().

Создать объект класса EmpTable и вывести на экран результат работы метода getHtml().
*/
class Employee {
    constructor(fullName, position, salary) {
        this.fullName = fullName;
        this.position = position;
        this.salary = salary;
    }
}

class EmpTable {
    constructor(employees) {
        this.employees = employees;
    }

    getHtml() {
        var html = "<table><thead><tr><th>Full name</th><th>Position</th><th>Salary</th></tr></thead><tbody>";
        var i;

        for (i = 0; i < this.employees.length; i++) {
            html += "<tr><td>" + this.employees[i].fullName + "</td><td>" + this.employees[i].position + "</td><td>" + this.employees[i].salary + "</td></tr>";
        }

        return html + "</tbody></table>";
    }
}

/*
Задание 4

Реализовать класс StyledEmpTable, который наследуется от класса EmpTable. Добавить метод getStyles(), который возвращает строку со стилями для таблицы в тегах style. Переопределить метод getHtml(), который добавляет стили к тому, что возвращает метод getHtml() из родительского класса.

Создать объект класса StyledEmpTable и вывести на экран результат работы метода getHtml().
*/
class StyledEmpTable extends EmpTable {
    getStyles() {
        return "<style>" +
            "#styled-table-result table { border-collapse: collapse; font-family: Arial, sans-serif; }" +
            "#styled-table-result th, #styled-table-result td { border: 1px solid #000; padding: 8px; }" +
            "#styled-table-result th { background-color: #d9ead3; }" +
            "</style>";
    }

    getHtml() {
        return this.getStyles() + super.getHtml();
    }
}

var marker = new Marker("blue", 10);
var refillableMarker = new RefillableMarker("red", 5);
var extendedDate = new ExtendedDate(2030, 1, 28);
var employees = [
    new Employee("Ivan Ivanov", "Manager", 45000),
    new Employee("Petro Petrenko", "Cashier", 32000),
    new Employee("Svitlana Sydorenko", "Analyst", 55000),
    new Employee("Maria Kovalchuk", "Head of department", 70000)
];
var empTable = new EmpTable(employees);
var styledEmpTable = new StyledEmpTable(employees);
var markerText = marker.print("This text is printed until the ink runs out.");
var refillableText = refillableMarker.print("This text is printed before refilling.");

refillableMarker.refill(20);
refillableText += refillableMarker.print(" This text is printed after refilling.");

document.getElementById("marker-result").innerHTML =
    "<p style=\"color: " + marker.color + ";\">" + markerText + "</p>" +
    "<p>Ink left: " + marker.inkAmount + "%</p>" +
    "<p style=\"color: " + refillableMarker.color + ";\">" + refillableText + "</p>" +
    "<p>Ink left after refilling: " + refillableMarker.inkAmount + "%</p>";

document.getElementById("date-result").innerHTML =
    "<p>Date: " + extendedDate.getTextDate() + "</p>" +
    "<p>Future or current date: " + extendedDate.isFutureOrCurrent() + "</p>" +
    "<p>Leap year: " + extendedDate.isLeapYear() + "</p>" +
    "<p>Next date: " + extendedDate.getNextDate().getTextDate() + "</p>";

document.getElementById("table-result").innerHTML = empTable.getHtml();
document.getElementById("styled-table-result").innerHTML = styledEmpTable.getHtml();
