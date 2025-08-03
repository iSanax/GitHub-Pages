import os, json, csv
from pathlib import Path

_PATH = "Test"

class FolderReader:
    def __init__(self, path):
        self.path = path
    
    def __read(self):
        return [name for name in os.listdir(self.path) if os.path.isdir(os.path.join(self.path, name))]
        
    def __sort_anime(self):
        return sorted(self.__read(), key=str.lower)
        
    def __create_name(self, type: str):
        return f"{Path(self.path).name}.{type}"
        
    def create_json(self):
        folders = self.__sort_anime()
        data = []
        for anime in folders:
            data.append({
                "anime": anime,
                "description": ""
            })
        try:
            with open(self.__create_name("json"), 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print("JSON was created")
        except:
            print("JSON was not created")
        
    def create_csv(self):
        folders = self.__read()
        rows = [[anime, ""] for anime in folders]
        try:
            with open(self.__create_name("csv"), 'w', encoding='utf-8', newline='') as f:
                writer = csv.writer(f, delimiter=';')
                writer.writerow(["anime", "description"])
                writer.writerows(rows)
            print("CSV was created")
        except:
            print("CSV was not created")
    
if __name__ == "__main__":
    folderReader = FolderReader(path=_PATH)
    folderReader.create_json()
    folderReader.create_csv()
