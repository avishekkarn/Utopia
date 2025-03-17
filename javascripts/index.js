document.addEventListener("DOMContentLoaded", function () {
    // Featured Poem of the Day
    const poems = [
        { text: `"The moonlight dances on the silent sea, whispering secrets to the midnight breeze."`, author: "Avishek Karn" },
        { text: `"Each sunset is a promise of another dawn, a story yet to be told."`, author: "Avishek Karn" },
        { text: `"Love is not spoken, it is felt in the spaces between words."`, author: "Avishek Karn" },
        { text: `"A poet's heart beats in rhymes, longing to be heard beyond time."`, author: "Avishek Karn" }
    ];

    let randomPoem = poems[Math.floor(Math.random() * poems.length)];
    document.getElementById("poem-of-the-day").innerHTML = randomPoem.text;
    document.getElementById("poem-author").innerHTML = `— ${randomPoem.author}`;

    // Rotating Quotes
    const quotes = [
        `"Poetry is when an emotion has found its thought and the thought has found words."`,
        `"A poem begins as a lump in the throat, a sense of wrong, a homesickness, a lovesickness."`,
        `"If I read a book and it makes my whole body so cold no fire can ever warm me, I know that is poetry."`,
        `"Poetry is the spontaneous overflow of powerful feelings: it takes its origin from emotion recollected in tranquility."`
    ];

    let quoteElement = document.getElementById("changing-quote");
    let index = 0;

    setInterval(() => {
        quoteElement.innerHTML = quotes[index];
        index = (index + 1) % quotes.length;
    }, 5000);
});
