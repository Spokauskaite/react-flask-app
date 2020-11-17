# -*- coding: utf-8 -*-
"""
Created on Sat Nov  7 09:35:46 2020

@author: Lina
"""
import sqlite3
import logging
from logging import Formatter, FileHandler
from flask import Flask
import pandas as pd

app = Flask(__name__)

# this is for logging ---------------------------
LOGGER = logging.getLogger('whatever')
file_handler = FileHandler('test.log')
handler = logging.StreamHandler()
file_handler.setFormatter(Formatter(
    '%(asctime)s %(levelname)s: %(message)s '
    '[in %(pathname)s:%(lineno)d]'
))
handler.setFormatter(Formatter(
    '%(asctime)s %(levelname)s: %(message)s '
    '[in %(pathname)s:%(lineno)d]'
))
LOGGER.addHandler(file_handler)
LOGGER.addHandler(handler)
LOGGER.setLevel(logging.INFO)
#------------------------------------------------

@app.route('/loadNutrients/<inputValue>')
def getAllNutrients(inputValue):
    database_file =  'food_data.db'
    conn = sqlite3.connect(database_file)
    c = conn.cursor()
    sql_query = "SELECT id, name FROM nutrient WHERE name LIKE '{}%'".format(inputValue)
    c.execute(sql_query)
    fetched_items = c.fetchall()
    if (len(fetched_items)):
        fetched_items = pd.DataFrame(fetched_items)
        fetched_items.columns=['id','title']
        fetched_items = fetched_items.to_json(orient='index')
    return {"nutrient":fetched_items}

@app.route('/loadFood/<int:nutrient_id>')
def getAllFood(nutrient_id):
    database_file =  'food_data.db'
    conn = sqlite3.connect(database_file)
    c = conn.cursor()
    sql_query ='''SELECT DISTINCT
        food.description,
        food_nutrient.amount
        FROM food_nutrient
        LEFT JOIN food
        ON food_nutrient.fdc_id=food.fdc_id
        WHERE food_nutrient.nutrient_id={}
        ORDER BY food_nutrient.amount DESC
        LIMIT 10 '''.format(nutrient_id)
    c.execute(sql_query)
    fetched_items=c.fetchall()
    fetched_items = pd.DataFrame(fetched_items)
    fetched_items.columns=['name','amount']
    fetched_items = fetched_items.to_json(orient='index')
    return fetched_items

# this is for logging-------------------------
if __name__ == '__main__':
    app.run()


