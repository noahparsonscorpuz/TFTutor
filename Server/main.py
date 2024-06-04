from flask import Flask, jsonify 
from flask_cors import CORS
import requests

app = Flask(__name__)
cors = CORS(app, origins='*')

RIOT_API_KEY = 'RGAPI-eef02b23-192f-4c88-8b9d-ac5912a899d4'
RIOT_TFT_API_BASE_URL = 'https://na1.api.riotgames.com/tft'

RANKED_TFT = 0
RANKED_TFT_DOUBLE_UP = 1

@app.route('/player-stats/<summoner_id>')
def get_player_stats(summoner_id):
    # URL-encode the summoner name to handle special characters
    summoner_id_encoded = requests.utils.quote(summoner_id)
    
    # Endpoint to get summoner details
    summoner_url = f'{RIOT_TFT_API_BASE_URL}/league/v1/entries/by-summoner/{summoner_id_encoded}'
    
    try:
        # Fetch summoner details
        summoner_response = requests.get(summoner_url, headers={'X-Riot-Token': RIOT_API_KEY})
        summoner_response.raise_for_status()  # Raise an HTTPError for bad responses
        summoner_data = summoner_response.json()
        
        # Endpoint to get Summoner Stats
        stats_url = f'{RIOT_TFT_API_BASE_URL}/league/v1/entries/by-summoner/{summoner_id}'
        
        # Fetch player stats
        stats_response = requests.get(stats_url, headers={'X-Riot-Token': RIOT_API_KEY})
        stats_response.raise_for_status()
        stats_data = stats_response.json()
        
        return jsonify(stats_data[RANKED_TFT])
    
        '''
        EXAMPLE:

        URL: http://localhost:8080/player-stats/1bkqBEIe4j1bE6G4RGQX_e99_u8VMO-kPHbVvH0ID_s4iwdLp8N3zpQYnw
      
          Returning:
                
                {
                    "freshBlood": false,
                    "hotStreak": false,
                    "inactive": false,
                    "leagueId": "11620dac-b83d-45fe-bc93-e262c7eee03d",
                    "leaguePoints": 39,
                    "losses": 31,
                    "puuid": "zJwPuTd2UJmzi49q8VHXNBktMCb_B6ILB_xzRy8MYukS9PzE2cWDVo60BII5tRngGgSRZnLCPSeWYA",
                    "queueType": "RANKED_TFT",
                    "rank": "II",
                    "summonerId": "1bkqBEIe4j1bE6G4RGQX_e99_u8VMO-kPHbVvH0ID_s4iwdLp8N3zpQYnw",
                    "tier": "PLATINUM",
                    "veteran": false,
                    "wins": 40
                }
        '''
    
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

if __name__ == '__main__':
    app.run(debug=True, port=8080)