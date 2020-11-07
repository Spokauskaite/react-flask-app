# -*- coding: utf-8 -*-
"""
Created on Sat Nov  7 09:35:46 2020

@author: Lina
"""
import time
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}