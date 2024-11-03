document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const emojiList = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍍", "🍑", "🍊", "🥭", "🧁", "🍧", "🍩", "🍟", "🍬", "🍭", "🍿", "🌭", "🍺", "🍷", "🥘"];
    
    // Duplicate the emojis to create pairs
    const cardEmojis = [...emojiList, ...emojiList].slice(0, 36); // 18 pairs for a 6x6 grid

    // Shuffle the emojis
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffle(cardEmojis);

    let flippedCards = [];
    let matches = 0;

    // Assign emojis to each card
    cards.forEach((card, index) => {
        const emoji = cardEmojis[index];
        card.querySelector('.card-back').textContent = emoji; // Display emoji on card back
    });

    function resetGame() {
        cards.forEach(card => card.classList.remove('flip'));
        document.getElementById('winning-message').style.display = 'none';
        flippedCards = [];
        matches = 0;
        shuffle(cardEmojis);

        // Reassign emojis after shuffle
        cards.forEach((card, index) => {
            const emoji = cardEmojis[index];
            card.querySelector('.card-back').textContent = emoji;
        });
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.id === card2.dataset.id) {
            matches++;
            if (matches === 18) {
                document.getElementById('winning-message').style.display = 'block';
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flip');
                card2.classList.remove('flip');
            }, 1000);
        }
        flippedCards = [];
    }

    function flipCard() {
        if (flippedCards.length < 2) {
            this.classList.add('flip');
            flippedCards.push(this);
            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    }

    cards.forEach(card => card.addEventListener('click', flipCard));
    document.getElementById('reset-btn').addEventListener('click', resetGame);

    resetGame();
});
