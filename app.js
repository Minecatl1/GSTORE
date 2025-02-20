document.addEventListener('DOMContentLoaded', () => {
    const gameListView = document.getElementById('game-list-view');
    const gameDetailView = document.getElementById('game-detail-view');
    const gameList = document.getElementById('game-list');
    const gameName = document.getElementById('game-name');
    const gameAuthor = document.getElementById('game-author');
    const gameSize = document.getElementById('game-size');
    const installButton = document.getElementById('install-button');
    const backButton = document.getElementById('back-button');

    let games = [];

    fetch('games.json')
        .then(response => response.json())
        .then(data => {
            games = data;
            data.forEach(game => {
                const li = document.createElement('li');
                li.textContent = game.name;
                li.addEventListener('click', () => showGameDetails(game));
                gameList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching games:', error));

    function showGameDetails(game) {
        gameName.textContent = game.name;
        gameAuthor.textContent = `Author: ${game.author}`;
        gameSize.textContent = `Size: ${(game.size / (1024 * 1024)).toFixed(2)} MB`;
        installButton.onclick = () => installGame(game);

        gameListView.style.display = 'none';
        gameDetailView.style.display = 'block';
    }

    function installGame(game) {
        const fileExtension = game.file_path.split('.').pop();
        const link = document.createElement('a');
        link.href = game.file_path;

        if (fileExtension === 'exe') {
            link.download = `${game.name}.exe`;
        } else if (fileExtension === 'msi') {
            link.download = `${game.name}.msi`;
        }

        link.click();
        alert(`Installing ${game.name}`);
    }

    backButton.addEventListener('click', () => {
        gameListView.style.display = 'block';
        gameDetailView.style.display = 'none';
    });
});
