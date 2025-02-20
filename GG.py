import os
import json

def generate_games_json(games_folder, output_file):
    games_list = []
    
    for game_file in os.listdir(games_folder):
        if game_file.endswith(('.exe', '.msi')):
            game_name = os.path.splitext(game_file)[0]
            game_size = os.path.getsize(os.path.join(games_folder, game_file))  # Get the file size
            game_info = {
                "name": game_name,
                "author": "Unknown",  # Replace with actual author information
                "size": game_size,
                "file_path": os.path.join(games_folder, game_file)
            }
            games_list.append(game_info)
    
    with open(output_file, 'w') as json_file:
        json.dump(games_list, json_file, indent=4)

if __name__ == "__main__":
    games_folder = "games"
    output_file = "games.json"
    generate_games_json(games_folder, output_file)
    print(f"Game information has been saved to {output_file}")
