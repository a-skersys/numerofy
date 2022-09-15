const btnCalculate = document.getElementById("calculate");
const spinner = document.getElementById("spinner");
const error = document.getElementById("error");
const lifeNumber1 = document.getElementById("lifeNumber1");
const lifeNumber2 = document.getElementById("lifeNumber2");
const birthday1 = document.getElementById("birthday1");
const birthday2 = document.getElementById("birthday2");
const result = document.getElementById("result");
const compatibility = document.getElementById("compatibility");
const compatibilityText = document.getElementById("compatibilityText");
const strengths1 = document.getElementById("strengths1");
const strengths2 = document.getElementById("strengths2");
const weaknesses1 = document.getElementById("weaknesses1");
const weaknesses2 = document.getElementById("weaknesses2");
const more1Header = document.getElementById("more1Header");
const more1Element = document.getElementById("more1Element");
const more1Solar = document.getElementById("more1Solar");
const more1Color = document.getElementById("more1Color");
const more1Hex = document.getElementById("more1Hex");
const more1Days = document.getElementById("more1Days");
const more1People = document.getElementById("more1People");
const titleName1 = document.getElementById("titleName1");
const comp1 = document.getElementById("comp1");
const comp2 = document.getElementById("comp2");
const more2Header = document.getElementById("more2Header");
const more2Element = document.getElementById("more2Element");
const more2Solar = document.getElementById("more2Solar");
const more2Color = document.getElementById("more2Color");
const more2Hex = document.getElementById("more2Hex");
const more2Days = document.getElementById("more2Days");
const more2People = document.getElementById("more2People");
const titleName2 = document.getElementById("titleName2");
const linkSeventh1 = document.getElementById("linkSeventh1");
const linkGanesha1 = document.getElementById("linkGanesha1");
const linkSage1 = document.getElementById("linkSage1");
const linkSeventh2 = document.getElementById("linkSeventh2");
const linkGanesha2 = document.getElementById("linkGanesha2");
const linkSage2 = document.getElementById("linkSage2");

const toHide = document.querySelectorAll("#toHide");

const person1 = document.querySelector(".person1");
const person2 = document.querySelector(".person2");

let person1Number = 0;
let person2Number = 0;
let birthdaySum = 0;

btnCalculate.addEventListener("click", function() {
    var birthdayFull1 = birthday1.value.replaceAll("-", "");
    lifeNumber1.textContent = lifePathNumber(birthdayFull1);
    person1Index = index(lifeNumber1.textContent);
    person1Number = sumNumber(lifeNumber1.textContent);
    
    var birthdayFull2 = birthday2.value.replaceAll("-", "");
    lifeNumber2.textContent = lifePathNumber(birthdayFull2);
    person2Index = index(lifeNumber2.textContent);
    person2Number = sumNumber(lifeNumber2.textContent);

    if (person1Number == 0) {
        error.style.display = "block";
        result.style.display = "none";
        return;
    } else {
        error.style.display = "none"
    }
    
    if (lifeNumber2.textContent == 0) {
        hidePerson2(toHide);
    } else {
        showPerson2(toHide);
    }

    function hidePerson2(elements) {
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
        }
    }

    function showPerson2(elements) {
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.display = "block";
        }
    }

    btnCalculate.style.display = "none";
    spinner.style.display = "block";
    setTimeout(function() {
        result.style.display = "block";
        spinner.style.display = "none";
        btnCalculate.style.display = "block";
    }, 500)


    if (compatibilityChart[person1Number - 1].good.includes(person2Number)) {
        compatibility.textContent = "❤️ On the same wavelength";
        compatibilityText.textContent = "Numbers that are the most compatible tend to be riding a similar wavelength. When you meet your own number, things instantly click. These connections flow with ease and feel destined and filled with magic. You will never tire with your own number as you are energetically the same frequency.";
    } else if (compatibilityChart[person1Number - 1].bad.includes(person2Number)) {
        compatibility.textContent = "💥 Challenging";
        compatibilityText.textContent = "These are the numbers that have different core values and potential to clash. It's not written in stone that you will experience conflict with these numbers, but you will be challenged to see the world from a new perspective. Though this may feel seemingly negative, these pairings actually have much to teach and learn from each other. When more challenging number combinations come together and are able to accept their differences, they can grow a great deal. Sometimes the greatest teachers we have in life are the ones that challenge us the most.";
    } else {
        compatibility.textContent = "🎁 Neutral";
        compatibilityText.textContent = "These are the numbers that can either be very compatible or not, or that could perhaps be entirely neutral, holding no real charge.";
    }

    renderList(strengths1, qualities[person1Index].strengths);
    renderList(weaknesses1, qualities[person1Index].weaknesses);
    if (lifeNumber2.textContent != 0) {
        renderList(strengths2, qualities[person2Index].strengths);
        renderList(weaknesses2, qualities[person2Index].weaknesses);
    }
    
    function renderList(node, array) {
        removeAllChildNodes(node);
        for (let i = 0; i < array.length; i++) {
            var li = document.createElement('li');
            li.setAttribute('class','list-group-item');
            node.appendChild(li);
            const element = array[i];
            li.innerHTML=li.innerHTML + element;
        }
    }

    titleName1.textContent = qualities[person1Index].name;

    comp1.textContent = lifeNumber1.textContent;
    comp2.textContent = lifeNumber2.textContent;

    more1Header.textContent = lifeNumber1.textContent;
    more1Element.textContent = qualities[person1Index].element;
    more1Solar.textContent = qualities[person1Index].solar;
    more1Color.textContent = qualities[person1Index].color;
    more1Hex.style.background = qualities[person1Index].hex;
    more1Days.textContent = qualities[person1Index].days;
    famousPeople(more1People, qualities[person1Index].people);

    if (lifeNumber2.textContent != 0) {
        titleName2.textContent = qualities[person2Index].name;
        more2Header.textContent = lifeNumber2.textContent;
        more2Element.textContent = qualities[person2Index].element;
        more2Solar.textContent = qualities[person2Index].solar;
        more2Color.textContent = qualities[person2Index].color;
        more2Hex.style.background = qualities[person2Index].hex;
        more2Days.textContent = qualities[person2Index].days;
        famousPeople(more2People, qualities[person2Index].people);
    }

    


    function famousPeople(node, array) {
        removeAllChildNodes(node);
        for (let i = 0; i < array.length; i++) {
            var p = document.createElement('p');
            node.appendChild(p);
            const element = array[i];
            p.innerHTML = p.innerHTML + element;
        }
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    

    linkSeventh1.setAttribute("href", "https://seventhlifepath.com/numerology/life-path-number-" + lifeNumber1.textContent + "/");
    linkGanesha1.setAttribute("href", "https://www.ganeshaspeaks.com/numerology/life-path-numbers/life-path-number-" + lifeNumber1.textContent + "/");
    linkSage1.setAttribute("href", "https://www.astrosage.com/numerology/life-path-number-" + lifeNumber1.textContent + ".asp");

    linkSeventh2.setAttribute("href", "https://seventhlifepath.com/numerology/life-path-number-" + lifeNumber2.textContent + "/");
    linkGanesha2.setAttribute("href", "https://www.ganeshaspeaks.com/numerology/life-path-numbers/life-path-number-" + lifeNumber2.textContent + "/");
    linkSage2.setAttribute("href", "https://www.astrosage.com/numerology/life-path-number-" + lifeNumber2.textContent + ".asp");

    
    
}, false)

function index(number) {
    if (number == 11) {
        return 9;
    } else if (number == 22) {
        return 10;
    } else if (number == 33) {
        return 11;
    } else {
        return number - 1;
    }
}



function sumNumber(birthdayFull) {
    birthdaySum = 0;
    while (birthdayFull) {
        birthdaySum += (birthdayFull % 10);
        birthdayFull = Math.floor(birthdayFull / 10);
    }
    return birthdaySum;
}

function lifePathNumber(birthdayFull) {
    sumNumber(birthdayFull);
    while (birthdaySum > 9) {
        if (birthdaySum == 11 || birthdaySum == 22 || birthdaySum == 33 ) {
            return birthdaySum;
        } else {
            birthdayFull = birthdaySum;
            sumNumber(birthdayFull);
        }
    }
    return birthdaySum;
}

const compatibilityChart = [
    { good: [1, 2, 5], bad: [4, 6] },
    { good: [1, 2, 4, 6, 8], bad: [5, 7] },
    { good: [3, 6, 9], bad: [4, 7, 8] },
    { good: [2, 4, 8], bad: [1, 3, 5, 9] },
    { good: [1, 5, 7], bad: [2, 4, 6] },
    { good: [3, 6, 9], bad: [1, 5, 7] },
    { good: [4, 5, 7], bad: [2, 3, 6, 8] },
    { good: [2, 4, 8], bad: [3, 7, 9] },
    { good: [3, 6, 9], bad: [4, 8] }
]

const qualities = [
    {
        number: 1,
        name: "The Leader",
        strengths: [ "Leadership", "Intelligence", "Courage" ],
        weaknesses: [ "Stubborn", "Selfish", "Tactless" ],
        color: "orange",
        hex: "#e69138",
        solar: "Mercury and Sun",
        element: "🔥 fire",
        days: "1, 10, 19, 28",
        people: ["Martin Luther King, Jr.", "Lady Gaga", "Steve Jobs", "Tom Hanks", "Scarlett Johansson"]
    },
    {
        number: 2,
        name: "The Motivator",
        strengths: [ "Patient", "Tolerant", "Charming" ],
        weaknesses: [ "Shy", "Ambitionless", "Oversensitive" ],
        color: "green",
        hex: "#6aa84f",
        solar: "the Moon",
        element: "💧 water",
        days: "2, 11, 20",
        people: ["Barack Obama", "Madonna", "Ryan Reynolds", "Kanye West", "Jennifer Lopez"]
    },
    {
        number: 3,
        name: "The Communicator",
        strengths: [ "Popular", "Friendly", "Passionate" ],
        weaknesses: [ "Egoistical", "Critical", "Vain" ],
        color: "red",
        hex: "#cc0000",
        solar: "Mars, Jupiter or Mercury",
        element: "🔥 fire",
        days: "3, 12, 21, 30",
        people: ["Jackie Chan", "Hillary Clinton", "John Travolta", "Snoop Dogg", "David Bowie"]
    },
    {
        number: 4,
        name: "The Problem Solver",
        strengths: [ "Patient", "Reliable", "Hard-working" ],
        weaknesses: [ "Stubborn", "Jealous", "Stingy" ],
        color: "blue",
        hex: "#3d85c6",
        solar: "Mercury, Uranus",
        element: "⬛ earth",
        days: "4, 13, 22, 31",
        people: ["Bill Gates", "Brad Pitt", "Oprah Winfrey", "Elton John", "Nicole Kidman"]
    },
    {
        number: 5,
        name: "The Talent",
        strengths: [ "Dramatic", "Adventurous", "Passionate" ],
        weaknesses: [ "Unreliable", "Greedy", "Envious" ],
        color: "purple",
        hex: "#674ea7",
        solar: "Jupiter, Mercury",
        element: "💨 air",
        days: "5, 14, 23",
        people: ["Abraham Lincoln", "Steven Spielberg", "Angelina Jolie", "Mick Jagger", "Catherine Zeta-Jones"]
    },
    {
        number: 6,
        name: "The Responsible One",
        strengths: [ "Peacemaker", "Charming", "Artistic" ],
        weaknesses: [ "Selfish", "Picky", "Nagging" ],
        color: "yellow",
        hex: "#f1c232",
        solar: "Venus",
        element: "⬛ earth",
        days: "6, 15, 24",
        people: ["Albert Einstein", "Michael Jackson", "Ben Affleck", "Robert DeNiro", "John Lennon"]
    },
    {
        number: 7,
        name: "The Source of Knowledge",
        strengths: [ "Quiet", "Analytical", "Thoughtful" ],
        weaknesses: [ "Shy", "Moody", "Critical" ],
        color: "gray",
        hex: "#999999",
        solar: "Saturn, Neptune",
        element: "💧 water",
        days: "7, 16, 25",
        people: ["Princess Diana", "Leonardo DiCaprio", "Taylor Swift", "Ashton Kutcher", "Julia Roberts"]
    },
    {
        number: 8,
        name: "The Material Manifester",
        strengths: [ "Power", "Wise", "Courageous" ],
        weaknesses: [ "Egoistical", "Money-hungry", "Depressed" ],
        color: "azure",
        hex: "#006199",
        solar: "Uranus, Saturn",
        element: "⬛ earth",
        days: "8, 17, 26",
        people: ["Pablo Picasso", "Sandra Bullock", "Neil Armstrong", "Robin Williams", "Bob Dylan"]
    },
    {
        number: 9,
        name: "The Humanitarian",
        strengths: [ "Adventurous", "Inspirational", "Curious" ],
        weaknesses: [ "Unconcerned", "Wastefulness", "Self-pity" ],
        color: "lavander",
        hex: "#b4a7d6",
        solar: "Neptune, Mars",
        element: "🔥 fire",
        days: "9, 18, 27",
        people: ["Bob Marley", "Mother Teresa", "Jim Carrey", "Whitney Houston", "Jimi Hendrix"]
    },
    {
        number: 11,
        name: "The In-the-Moment Intuitive",
        strengths: [ "Intuitive", "Creative", "Mativator" ],
        weaknesses: [ "Stressed", "Indecisive", "Self-conscious" ],
        color: "green",
        hex: "#6aa84f",
        solar: "the Moon",
        element: "💧 water",
        days: "2, 11, 20",
        people: ["Michelle Obama", "Robert Downey Jr.", "Prince William", "Wolfgang Amadeus Mozart", "Michael Jordan"]
    },
    {
        number: 22,
        name: "The Material and Humanity Master",
        strengths: [ "Visionary", "Practical", "Creative" ],
        weaknesses: [ "Controlling", "Manipulative", "Stubborn" ],
        color: "blue",
        hex: "#3d85c6",
        solar: "Mercury, Uranus",
        element: "⬛ earth",
        days: "4, 13, 22, 31",
        people: ["Matthew McConaughey", "Leslie Nielsen", "Paul McCartney", "Will Smith", "Bryan Adams"]
    },
    {
        number: 33,
        name: "The Spiritual Teacher",
        strengths: [ "Compassionate", "Creative", "Determined" ],
        weaknesses: [ "Perfectionist", "Critical", "Moody" ],
        color: "yellow",
        hex: "#f1c232",
        solar: "Venus",
        element: "⬛ earth",
        days: "6, 15, 24",
        people: ["Salma Hayek", "Milla Jovovich", "Meryl Streep", "Francis Ford Coppola", "Patrick Morrissey"]
    },

]






