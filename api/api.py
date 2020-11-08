# -*- coding: utf-8 -*-
"""
Created on Sat Nov  7 09:35:46 2020

@author: Lina
"""
import sqlite3
import logging
from logging import Formatter, FileHandler
from flask import Flask

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

def fetchFromDB(sql_query):
    database_file =  'food_data.db'
    conn = sqlite3.connect(database_file)
    c = conn.cursor()
    # fetch id 
    c.execute(sql_query)
    fetchedItem = c.fetchone()
    fetchedItem = fetchedItem[0]
    LOGGER.info('Returning DB Item:')
    LOGGER.info(fetchedItem)
    return (fetchedItem)

@app.route('/food/<name>')
def getFood(name):
    # fetch id 
    sql_query = "SELECT fdc_id FROM food WHERE description = '{}'".format(name)
    fetched_id = fetchFromDB(sql_query)
    LOGGER.info('Returned DB Item:')
    LOGGER.info(fetched_id)
    return {'id':fetched_id}

@app.route('/nutrient/<int:id>')
def getNutrient(id):
    # fetch name
    sql_query = "SELECT name FROM nutrient WHERE id = {}".format(id)
    fetched_name = fetchFromDB(sql_query)
    LOGGER.info('Returned DB Item:')
    LOGGER.info(fetched_name)
    return {'name':fetched_name}

# this is for logging-------------------------
if __name__ == '__main__':
    app.run()


