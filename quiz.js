class Quiz{
    constructor(quiz_data){
        this.quiz_data = quiz_data;
        this.buttons = document.getElementsByClassName("answerbutton");
        this.score = 0;
        this.current = 0;
        this.answerId = "";
    }
    update(){
        if (this.quiz_data.length == 0){
            this.results();
        } else {
            this.current++;
            let rand = Math.floor(Math.random() * this.quiz_data.length);
            document.getElementById("question").innerText = this.current + ". " + this.quiz_data[rand].question;
            let rightAnswer = this.quiz_data[rand].answers[0];
            for (let button of this.buttons){
                button.className = "answerbutton button";
                button.innerText = this.quiz_data[rand].answers.splice(Math.floor(Math.random() * this.quiz_data[rand].answers.length), 1);
                if (button.innerText == rightAnswer){
                    this.answerId = button.id;
                }
            }
            this.quiz_data.splice(rand, 1);
            document.getElementById("button_updater").className = "button button_disabled";
        }
    }
    check(choosenId){
        document.getElementById(choosenId).blur();
        if (choosenId == this.answerId){
            document.getElementById(choosenId).className = "answerbutton button button_right";
            this.score++;
        } else{
            document.getElementById(choosenId).className = "answerbutton button button_wrong";
            document.getElementById(this.answerId).className = "answerbutton button button_right";
        }
        for (let button of this.buttons){
            if ((button.id != choosenId) && (button.id != this.answerId)){
                button.className = "answerbutton button button_disabled";
            }
        }
        document.getElementById("button_updater").className = "button";
    }
    init(){
        for (let button of this.buttons){
            button.addEventListener("click", function(){quiz.check(button.id);})
        }
        document.getElementById("porter").hidden = true;
        document.getElementById("quiz").hidden = false;
        this.update();
    }
    results(){
        for (let mark of marks){
            if (this.score / this.current <= mark.coef){
                document.getElementById("results").innerHTML = "<p>Ваш результат: " + this.score + "/" + quiz_data.length + "</p>" + "<p>" + mark.label + "</p>";
                break;
            }
        }
        document.getElementById("quiz").hidden = true;
        document.getElementById("results").hidden = false;
    }
}

const quiz_data = [
    {question:"Как назывался в обиходе кристаллический детектор?",
        answers:["Детектор кошачьего уса", "Детектор собачьего хвоста", "Детектор коровьего вымени", "Детектор козлиного рога"]},
    {question:"Кто первый обнаружил явление полупроводимости?",
        answers:["Майкл Фарадей", "Алессандро Вольта", "Александр Эдмон Беккерель", "Альберт Эйнштейн"]},
    {question:"Каким термином обозначается незаполненная валентная связь, которая проявляет себя как положительный заряд, численно равный заряду электрона?",
        answers:["Дырка", "Отверстие", "Спин", "Щель"]},
    {question:"Название первого в мире коммерчески успешного микропроцессора:",
        answers:["Intel 4004", "Celeron N3050", "Pentium 4", "Intel 8008"]},
];

const marks = [
    {coef:0.25, label:"Вам предстоит узнать ещё многое о полупроводниках"},
    {coef:0.5, label:"Вы неплохо разбираетесь в полупроводниках"},
    {coef:0.75, label:"Ваш уровень знаний о полупроводниках выше среднего"},
    {coef:1, label:"Вы в полной мере овладели знанием о полупроводниках"},
]

const quiz = new Quiz([...quiz_data]);