# In[]

import glob
from os import listdir
from os.path import isfile, join
import pandas as pd
import json

# In[]


def filter_matches():
    print('Filtering...')
    files = [f for f in listdir('./output') if isfile(join('./output', f))]
    for file in files:
        matches = pd.read_json(f"./output/{file}")
        filtered_matches = matches[['match_id', 'duration', 'radiant_win', 'game_mode', 'lobby_type','radiant_score', 'dire_score', 'start_time', 'replay_url', 'patch', 'region']]
        players = matches['players']

        players = [y for x in players for y in x]
        players = pd.DataFrame(players)
        filtered_players = players[["match_id","account_id","deaths","denies","gold","gold_per_min","gold_spent","hero_damage","hero_healing","hero_id","item_0","item_1","item_2","item_3","item_4","item_5","kills","last_hits","level",'obs_placed',"sen_placed","tower_damage","xp_per_min","isRadiant","win",'lose',"total_gold","total_xp","kills_per_min","kda","abandons","rank_tier"]]

        filtered_matches.to_csv(f"./filtered/{file[:-5]}-matches.csv", index=False)
        filtered_players.to_csv(f"./filtered/{file[:-5]}-players.csv", index=False)

def merge():
    print("Merging...")
    matches_files = glob.glob('./filtered/*-matches.csv')
    players_files = glob.glob('./filtered/*-players.csv')
    merged_matches = []
    merged_players = []

    for file in matches_files:
        df = pd.read_csv(file, index_col=None, header=0)
        merged_matches.append(df)
    merged_matches = pd.concat(merged_matches, axis=0, ignore_index=True)
    merged_matches.to_csv('merged_matches.csv', index=False)
    merged_matches = None

    for file in players_files:
        df = pd.read_csv(file, index_col=None, header=0)
        merged_players.append(df)
    merged_players = pd.concat(merged_players, axis=0, ignore_index=True)
    merged_players.to_csv('merged_players.csv', index=False)