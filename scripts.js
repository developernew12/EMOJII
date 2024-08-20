document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultContainer = document.getElementById('search_result_container');
    const buttonContainer = document.getElementById('category-buttons');

 
    const displayResults = (emojis) => {
        resultContainer.innerHTML = ''; 
        emojis.forEach(emoji => {
            const emojiDiv = document.createElement('div');
            emojiDiv.classList.add('emoji');
            emojiDiv.innerText = emoji.emoji;
            resultContainer.appendChild(emojiDiv);
        });
    };
    const createCategoryButtons = () => {
        const categories = [...new Set(emojiList.map(e => e.category))];
        categories.forEach(category =>{
            const button = document.createElement("button");
            button.innerText = category;
            button.addEventListener('mouseover', () => {
                button.classList.add('animate__animated', 'animate__bounce', 'animated-button');
            });

            button.addEventListener('animationend', () => {
                setTimeout(() => {
                    button.classList.remove('animate__bounce');
                }, 1000); 
            });
            button.addEventListener('click', () => {
                const filteredEmojis = emojiList.filter(e => e.category === category);
                displayResults(filteredEmojis);
            });
            
            buttonContainer.appendChild(button);
        })
        const showAllButton = document.createElement('button');
        showAllButton.innerText = "Show All";
        showAllButton.addEventListener('mouseover', () => {
            showAllButton.classList.add('animate__animated', 'animate__bounce', 'animated-button');
        });
        showAllButton.addEventListener('animationend', () => {
            setTimeout(() => {
                showAllButton.classList.remove('animate__bounce');
            }, 1000); 
        });
        showAllButton.addEventListener('click', () => displayResults(emojiList));
        buttonContainer.appendChild(showAllButton);
    };

    const filterEmojis = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredEmojis = emojiList.filter(e =>
            e.description.includes(searchTerm) ||
            e.aliases.some(alias => alias.includes(searchTerm)) ||
            e.tags.some(tag => tag.includes(searchTerm))
        );
        displayResults(filteredEmojis);
    };
    searchInput.addEventListener('input', filterEmojis);

   
    createCategoryButtons();
    displayResults(emojiList);

});


