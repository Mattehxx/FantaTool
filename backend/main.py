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
        'role': 1,
        'name': 3,
        'squad': 4,
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
            'role': row.iat[COLUMN_NAMES['role']],
            'name': row.iat[COLUMN_NAMES['name']],
            'squad': row.iat[COLUMN_NAMES['squad']],
            'fmv': math.ceil(row.iat[COLUMN_NAMES['fmv']] * (GAME_CREDITS / FILE_CREDITS))
        })
    
    return formattedData

if __name__ == '__main__':
    app.run(port=5000)