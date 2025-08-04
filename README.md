# FolderReader

`FolderReader` to prosty skrypt w Pythonie, który odczytuje listę katalogów (np. nazw anime) z podanego folderu i generuje na jej podstawie pliki JSON oraz CSV.

---

## Funkcjonalność

- Odczytuje wszystkie podfoldery z określonej ścieżki.
- Sortuje listę folderów alfabetycznie (niezależnie od wielkości liter).
- Tworzy plik JSON z nazwami folderów i pustym polem `description`.
- Tworzy plik CSV z tymi samymi danymi (kolumny: `anime`, `description`).
- Nazwa pliku wynikowego to nazwa folderu źródłowego z odpowiednim rozszerzeniem (`.json` lub `.csv`).

---

## Jak używać FolderReader?

1. W pliku `FolderReader.py` (lub Twoim skrypcie) ustaw zmienną `_PATH` na ścieżkę do folderu, którego podfoldery chcesz przetworzyć:
```python
_PATH = "Author_Lektor"
```

2. Za pomocą `cmd` wejdź do katalogu z skryptem następnie wpisz:
```bash
python FolderReader.py
```

3. Po wykonaniu w katalogu ze skryptem pojawią się pliki:
- Author_Lektor.json
- Author_Lektor.csv

##  Przykład struktury folderu
```
Author_Lektor/
├── Naruto
├── OnePiece
└── Bleach
```
Przykładowo, gdy użyjemy  `folderReader.create_json()` otrzymamy plik z nazwą `Author_Lektor.json` z zawartością:
```json
[
  {
    "anime": "Naruto",
    "description": ""
  },
  {
    "anime": "OnePiece",
    "description": ""
  },
  {
    "anime": "Bleach",
    "description": ""
  }
]
```

---

# GitHub-Pages
Przykładowy szablo strony z wykorzystaniem  `GitHub-Pages` gotowy do wklejenia.
##  Struktura katalogów
```
Main/
├── Data/
|    └── Author_Lektor.json
├── index.html
├── styles.css
└── scripts_json.js / scripts_csv.js
```

##  Własny projekt
Jednie to trzeba zdecydować, którą jest dla ciebie najlepsza. `json` jest przejrzysty, ale gorszy do edytowania można łatwiej popełnić błąd. `csv` mniej przejrzysty łatwiejszy do edytowania dla większości osób, można edytować za pomocą exela.

Zgodnie z powyższym `json` otrzymamy tabele
Anime|Lektor|Komentarz|Szablon
---|---
Naruto|Author_Lektor|  |📋
OnePiece|Author_Lektor|  |📋
Bleach|Author_Lektor|  |📋


1. Utórz *publiczne* repozytrium.
2. Wejdź do `Settings` w `Code and automation` znajdź `Page` ustaw na *Branch* na `main` `/(root)`.
3. Pobierz potrzebne pliki zgodnie z *strukturą katalogów*.
4. Umieść do repozytorium pobrane pliki.
5. Należy wybrać postać zapisywania danych za pomocą zmiany w pliku `index.html`:
```html
    <script src="scripts_json.js"></script> 
    <!-- Usuń niepotrzebny wybierz jeden -->
    <script src="scripts_csv.js"></script>
```
6. Następnie usunąć niepotrzebny plik `scripts_jsson.js` lub `scripts_csv.js`.
7. Wejdź do pliki __.js zmień `url` zgodni z twojim repozytoirum:
```js
const url = 'https://api.github.com/repos/Nick/Nazwa_Repozytrium/contents/Data'
```
9. Dodaj wcześniej utworzony plik za pomocą `FolderReader` do katalogu `Data`.
