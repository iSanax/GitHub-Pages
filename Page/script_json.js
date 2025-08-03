const files = [];
fetch('https://api.github.com/repos/iSanax/GitHub-Pages/contents/Page/Data')
  .then(response => response.json())
  .then(data => {
    data.forEach(file => {
      if (file.type === 'file') {
        files.push(file.path);
      }
    });
    console.log('Pliki:', files);
  })
  .catch(err => {
    console.error('Błąd pobierania listy plików:', err);
  });


const allRows = [];

function sortRowsAlphabetically(rows) {
  return rows.sort((a, b) => {
    const nameA = a.cells[0].textContent.toLowerCase();
    const nameB = b.cells[0].textContent.toLowerCase();
    return nameA.localeCompare(nameB);
  });
}

files.forEach(filePath => {
  const fileName = filePath.split('/').pop().split('.').slice(0, -1).join('.');

  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Nie można załadować: ${filePath}`);
      }
      return response.json();
    })
    .then(data => {
      const tableBody = document.querySelector("#data-table tbody");

      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.anime}</td>
          <td>${fileName}</td>
          <td>${item.description}</td>
          <td><button>Kopiuj</button></td>
        `;

        const btn = row.querySelector("button");
        btn.addEventListener("click", () => {
          const textToCopy = `Proszę o upload\nLektor: ${fileName}\nAnime: ${item.anime}`;
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast("Skopiowano do schowka");
          }).catch(err => {
            showToast("Błąd kopiowania: " + err);
          });
        });

        allRows.push(row);
      });

      const sorted = sortRowsAlphabetically(allRows);
      tableBody.innerHTML = '';
      sorted.forEach(row => tableBody.appendChild(row));
    })
    .catch(error => {
      console.error(`Błąd wczytywania ${filePath}:`, error);
    });
});

document.getElementById("search").addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const tableBody = document.querySelector("#data-table tbody");

  const filtered = allRows.filter(row => {
    const nameCell = row.cells[0].textContent.toLowerCase();
    return nameCell.includes(filter);
  });

  const sortedFiltered = sortRowsAlphabetically(filtered);

  tableBody.innerHTML = '';
  sortedFiltered.forEach(row => tableBody.appendChild(row));
});

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
