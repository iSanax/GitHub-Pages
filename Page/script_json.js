const files = [
  'Data/Adam Jabczyk.json',
  'Data/Jan Kowalski.json'
];

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
        `;
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
