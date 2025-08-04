// const url = 'https://api.github.com/repos/iSanax/GitHub-Pages/contents/Page/Data';
function createURL() {
    //return 1+1;
    return window.location.pathname;
}
console.log('Path:', createURL();

async function getFileNames() {
    const url = 'https://api.github.com/repos/iSanax/GitHub-Pages/contents/Page/Data';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data
            .filter(item => item.type === 'file' && item.name.endsWith('.csv'))
            .map(file => `Data/${file.name}`);
    } catch (error) {
        console.error('Błąd pobierania listy plików:', error);
        return [];
    }
}

function sortRowsAlphabetically(rows) {
    return rows.sort((a, b) => {
        const textA = a.children[0].textContent.toLowerCase();
        const textB = b.children[0].textContent.toLowerCase();
        return textA.localeCompare(textB);
    });
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(';').map(h => h.trim());

    return lines.slice(1).map(line => {
            const values = line.split(';').map(v => v.trim());
            const obj = {};
            headers.forEach((header, i) => {
            obj[header] = values[i] || '';
        });
        return obj;
    });
}

const allRows = [];
async function generateAnimeTableRows() {
    const files = await getFileNames();
    const tableBody = document.querySelector("#data-table tbody");
    

    console.log('Files:', files);
    files.forEach(filePath => {
        const fileName = filePath.split('/').pop().split('.').slice(0, -1).join('.');

        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Nie można załadować: ${filePath}`);
                return response.text();
            })
            .then(text => {
                const items = parseCSV(text);

                items.forEach(item => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${item.anime}</td>
                        <td>${fileName}</td>
                        <td>${item.description}</td>
                        <td><button id="copy-btn" title="Copy button">📋</button></td>
                    `;

                    const btn = row.querySelector("button");
                    btn.addEventListener("click", () => {
                        const textToCopy = `Proszę o upload\nLektor: ${fileName}\nAnime: ${item.anime}`;
                        navigator.clipboard.writeText(textToCopy)
                        .then(() => showToast("Skopiowano do schowka"))
                        .catch(err => showToast("Błąd kopiowania: " + err));
                    });

                    allRows.push(row);
                });

                tableBody.innerHTML = '';
                allRows.forEach(row => tableBody.appendChild(row));
            })
            .catch(error => {
                console.error(`Błąd wczytywania ${filePath}:`, error);
            });
    });
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.visibility = "visible";
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.visibility = "hidden";
    }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const tableBody = document.querySelector("#data-table tbody");

    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();

        const filteredRows = allRows.filter(row => {
            const anime = row.children[0].textContent.toLowerCase();
            return anime.includes(filter);
        });

        tableBody.innerHTML = '';
        filteredRows.forEach(row => tableBody.appendChild(row));
    });

    generateAnimeTableRows();
});
