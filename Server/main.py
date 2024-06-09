from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

RIOT_API_KEY = 'RGAPI-13979695-5b61-4633-9323-a627e9278de3'
RIOT_TFT_API_BASE_URL = 'https://na1.api.riotgames.com/tft'

RANKED_TFT = 0
RANKED_TFT_DOUBLE_UP = 1
    
@app.route('/player-stats/<puuid>')
def get_player_stats(puuid):
    try:
        # Endpoint to get summoner details using puuid
        summoner_url = f'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}?api_key={RIOT_API_KEY}'
        
        # Fetch summoner details
        summoner_response = requests.get(summoner_url)
        summoner_response.raise_for_status()  # Raise an HTTPError for bad responses
        summoner_data = summoner_response.json()
        
        # Extract summoner ID from the response
        summoner_id = summoner_data['id']
        
        # Endpoint to get summoner stats using summoner ID
        stats_url = f'{RIOT_TFT_API_BASE_URL}/league/v1/entries/by-summoner/{summoner_id}'
        
        # Fetch player stats
        stats_response = requests.get(stats_url, headers={'X-Riot-Token': RIOT_API_KEY})
        stats_response.raise_for_status()
        stats_data = stats_response.json()
        
        return jsonify(stats_data[RANKED_TFT])
    
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": f"HTTP error occurred: {http_err}"}), 500
    except requests.exceptions.RequestException as req_err:
        return jsonify({"error": f"Request error occurred: {req_err}"}), 500

@app.route('/recent-matches/<puuid>')
def get_recent_matches(puuid):
    try:
        # Endpoint to get recent matches
        matches_url = f'https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/{puuid}/ids'
        
        # Fetch recent matches
        matches_response = requests.get(matches_url, headers={'X-Riot-Token': RIOT_API_KEY})
        matches_response.raise_for_status()
        matches_data = matches_response.json()
        
        return jsonify(matches_data)
    
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": f"HTTP error occurred: {http_err}"}), 500
    except requests.exceptions.RequestException as req_err:
        return jsonify({"error": f"Request error occurred: {req_err}"}), 500

@app.route('/riot-api/<gameName>/<tagLine>')
def search_riot_api(gameName, tagLine):
    try:
        # Construct the Riot API URL using the provided gameName and tagLine
        riot_api_url = f'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}'
        
        # Make a request to the Riot API
        response = requests.get(riot_api_url, headers={'X-Riot-Token': RIOT_API_KEY})
        response.raise_for_status()
        data = response.json()
        
        return jsonify(data)
    
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": f"HTTP error occurred: {http_err}"}), 500
    except requests.exceptions.RequestException as req_err:
        return jsonify({"error": f"Request error occurred: {req_err}"}), 500

@app.route('/get_summoner_style', methods=['GET'])
def get_summoner_style():
    try:
        puuid = request.args.get('puuid')
        style_url = f'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}?api_key={RIOT_API_KEY}'

        style_response = requests.get(style_url)
        style_response.raise_for_status()  # Raise an HTTPError for bad responses
        style_data = style_response.json()

        summoner_icon_id = style_data['profileIconId']
        summoner_level = style_data['summonerLevel']

        return jsonify({"summoner_icon_id": summoner_icon_id, "summoner_level": summoner_level})
    
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": f"HTTP error occurred: {http_err}"}), 500
    except requests.exceptions.RequestException as req_err:
        return jsonify({"error": f"Request error occurred: {req_err}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)