from flask import request, Flask
import flask, json, hashlib
from flask_cors import CORS, cross_origin
from pymongo import MongoClient

app = Flask(__name__)

# the format for client_string: mongodb://<public_DNS_IP>:27017
client_string = "mongodb://ec2-3-94-99-140.compute-1.amazonaws.com:27017/"
client = MongoClient(client_string)

db = client["users"]
collection = db["userinfo"]

"""
db2 = client["movies"]
collection2 = db["movieinfo]
"""

@app.route("/", methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def test_aws_connection():
    try:
        print(client.list_database_names())
    except Exception as e:
        print(f'Error printing db names: {e}')

    return flask.jsonify(message='success')


@app.route("/login", methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def login():

    if request.method == 'POST':

        my_dict = {}
        data = json.loads(request.data)

        my_dict["user"] = data.get('user')
        password = data.get('password')
        encrypted = hashlib.sha1(password.encode('utf-8')).hexdigest()

        my_dict["password"] = encrypted
    try:
        result = collection.find_one(my_dict)
    except Exception as e:
        print(f'Error finding user: {e}')

    if result:
        return json.dumps({'user': my_dict["user"]})
    else:
        return flask.jsonify(message='user not found')


@app.route("/registration", methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def registration():

    # we need to add code to check if user has been added and return an
    # error if they have already

    if request.method == 'POST':

        my_dict = {}
        data = json.loads(request.data)

        my_dict["email"] = data.get('email')
        my_dict["user"] = data.get('user')
        password = data.get('password')

        encrypted = hashlib.sha1(password.encode('utf-8')).hexdigest()
        my_dict["password"] = encrypted

    try:
        collection.insert_one(my_dict)
    except Exception as e:
        print(f'Error registering user: {e}')

    return flask.jsonify(message='insert succeeded')


@app.route("/update", methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def test_update():

    try:
        my_query = collection.find_one()
        new_values = {"$set":  {"address": "1 Washington Sq", "city": "San "
                                                                     "Jose","state": "CA", "zip": "95192"}}
        collection.update_one(my_query, new_values)
    except Exception as e:
        print(f'Error updating user: {e}')

    return flask.jsonify(message='update successful')


@app.route("/delete", methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def test_delete():

    try:
        result = collection.find_one()
        collection.delete_one(result)
    except Exception as e:
        print(f'Error deleting user: {e}')

    return flask.jsonify(message='delete successful')

"""
@app.route("/searchDirector", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def search_director():
    
    if request.method == 'POST':

        data = json.loads(request.data)
        director = data.get('director')

    try:
        result = collection2.find({directors: {$regex :data}});
    except Exception as e:
        print(f'Error finding director(s): {e}')

    if result:
        print(result)
        return result
    else:
        return flask.jsonify(message='director not found')


"""