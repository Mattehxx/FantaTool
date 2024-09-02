import math
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/players/quotes', methods=['GET'])
@cross_origin()
def playersQuotes():
    COLUMN_NAMES = {
        'id': 0,
        'role': 1,
        'name': 3,
        'team': 4,
        'fmv': 11
    }
    FILE_CREDITS = 1000
    GAME_CREDITS = 500
    formattedData = []

    data = pd.read_excel('backend\\assets\\data\\quotes\\Quotes_2024_25.xlsx')
    
    for index, row in data.iterrows():
        if(index == 0):
            continue
        formattedData.append({
            'id': row.iat[COLUMN_NAMES['id']],
            'role': row.iat[COLUMN_NAMES['role']],
            'name': row.iat[COLUMN_NAMES['name']],
            'team': row.iat[COLUMN_NAMES['team']],
            'fmv': math.ceil(row.iat[COLUMN_NAMES['fmv']] * (GAME_CREDITS / FILE_CREDITS))
        })
    
    return formattedData

@app.route('/players/stats', methods=['GET'])
@cross_origin()
def playersStats():
    COLUMN_NAMES = {
        'id': 0,
        'pv': 5,  # presenze
        'mv': 6,  # media voto
        'fm': 7,  # fantamedia
        'gf': 8,  # gol fatti
        'gs': 9,  # gol subiti
        'rp': 10, # rigori parati
        'rc': 11, # rigori calciati
        'rs': 12, # rigori segnati
        'rb': 13, # rigori sbagliati
        'as': 14, # assist
        'am': 15, # ammonizioni
        'es': 16, # espulsioni
        'au': 17  # autogol
    }
    formattedData = []

    data = pd.read_excel('backend\\assets\\data\\stats\\Stats_2023_24.xlsx')
    
    for index, row in data.iterrows():
        if(index == 0):
            continue
        formattedData.append({
            'id': row.iat[COLUMN_NAMES['id']],
            'pv': row.iat[COLUMN_NAMES['pv']],
            'mv': row.iat[COLUMN_NAMES['mv']],
            'fm': row.iat[COLUMN_NAMES['fm']],
            'gf': row.iat[COLUMN_NAMES['gf']],
            'gs': row.iat[COLUMN_NAMES['gs']],
            'rp': row.iat[COLUMN_NAMES['rp']],
            'rc': row.iat[COLUMN_NAMES['rc']],
            'rs': row.iat[COLUMN_NAMES['rs']],
            'rb': row.iat[COLUMN_NAMES['rb']],
            'as': row.iat[COLUMN_NAMES['as']],
            'am': row.iat[COLUMN_NAMES['am']],
            'es': row.iat[COLUMN_NAMES['es']],
            'au': row.iat[COLUMN_NAMES['au']]
        })
    
    return formattedData

if __name__ == '__main__':
    app.run(port=5000)