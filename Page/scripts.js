fetch('Data/Test.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("Błąd przy pobieraniu danych");
    }
    return response.json();
  })
  .then(data => {
    const tableBody = document.querySelector("#data-table tbody");

    data.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.email}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Wystąpił błąd:", error);
  });

