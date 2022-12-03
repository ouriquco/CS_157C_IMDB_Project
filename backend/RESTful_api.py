from flask import request, Flask
import flask, json, hashlib
from flask_cors import CORS, cross_origin
from pymongo import MongoClient

app = Flask(__name__)

# the format for client_string: mongodb://<public_DNS_IP>:27017
client_string = "mongodb://ec2-54-90-61-33.compute-1.amazonaws.com:27017/"

client = MongoClient(client_string)

db = client["users"]
collection = db["userinfo"]


db2 = client["movies"]
collection2 = db2["movieinfo"]


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


# def search():

    # if request.method == 'POST':
    #
    #     searchData = json.loads(request.data)
    #     if (searchData == director):
    #         search_Director()
    #
    #     if (searchData == name):
    #         search_name()
    #
    #     if (searchData == title):
    #         search_title()
    #
    #     if (searchData == genre):
    #         search_genre()
    #
    #     if (searchData == actor):
    #         search_actor()

# def search_title():
#     searchData = json.loads(request.data)
#     query = {"title": {"$regex": searchData}}
#     mydoc = collection2.find(query)
#     for x in mydoc:
#         print(x)

@app.route("/add_rating", methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def add_user_input():

    data = json.loads(request.data)

    rating = data["rating"]
    comment = data["comment"]

    if add_rating(rating) | add_comment(comment):
        return flask.jsonify(message='add was a success')
    else:
        print("Error: No user input from client")

    return flask.jsonify(message='add user input active')

def add_rating (rating, object_id):

    if object_id and rating:
        collection2.update({"_id": object_id}, {"$set": {"User Rating": {
            "Stars": rating}}})
        return True

    return False
def add_comment (comment, object_id):

    if object_id and comment:
        collection2.update({"_id": object_id}, {"$set": {"User Rating": {
            "Comment": comment}}})
        return True

    return False

"""
@app.route("/searchDirector", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def search():

    if request.method == 'POST':

        searchData = json.loads(request.data)
        if (data == director):
            search_Director()

        if (data == name):
            search_name()

        if (data == title):
            search_title()

        if(data == genre):
            search_genre()

        if(data == actor):
            search_actor()
"""
#
#Search by Movie Director
@app.route("/DirTest", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def search_Director():
    #searchData = json.loads(request.data)
    query = {"directors": {"$regex" :"Hal Roach"}}
    mydoc = collection2.find(query,{"title": 1, "directors": 1}).limit(15)
    for x in mydoc:
        print(x)
    return flask.jsonify(message='search by director successful')

#
#Search by Movie Title
@app.route("/TTest", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def search_title():
    #searchData = json.loads(request.data)
    query = {"title": {"$regex" :  "Test"}}
    mydoc = collection2.find(query, {"title": 1})
    for x in mydoc:
        print(x)

    return flask.jsonify(message='search title successful')

#
#Search by Movie Genre
@app.route("/GTest", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def search_genre():
    #searchData = json.loads(request.data)
    query = {"genres": {"$regex" :"Mystery"}}
    mydoc = collection2.find(query, {"title": 1, "genres": 1}).limit(15)
    for x in mydoc:
        print(x)

    return flask.jsonify(message='search genres successful')

#
#Search by Movie Plot
@app.route("/PTest", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def search_description():
    #searchData = json.loads(request.data)
    query = {"plot": {"$regex" : "dog"}}
    mydoc = collection2.find(query, {"title": 1, "plot": 1}).limit(15)
    for x in mydoc:
        print(x)

    return flask.jsonify(message='search description successful')

#
#Search by Actor
@app.route("/ATest", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def search_actor():
    #searchData = json.loads(request.data)
    query = {"cast": {"$regex" : "Johnny Depp"}}
    mydoc = collection2.find(query,{"title": 1, "cast": 1}).limit(15)
    for x in mydoc:
        print(x)
    return flask.jsonify(message='search by actor successful')

#
#Search by IMDB rating
@app.route("/IMDBTest", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def search_imdbRating():
    #searchData = json.loads(request.data)
    query = {"imdb.rating":  7.7}
    #mydoc = collection2.find(query,{"title": 1, "imdb.rating": 1}).limit(15)
    mydoc = collection2.find().limit(15)
    for x in mydoc:
        print(x)
    return flask.jsonify(message='search by imdb rating successful')

#
#Search by tomato meter
@app.route("/TomatoTest", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def search_tomatoMeter():
    #searchData = json.loads(request.data)
    query = {"tomatoes.viewer.meter":  60}
    mydoc = collection2.find(query,{"title": 1, "tomatoes.viewer.meter": 1}).limit(15)
    for x in mydoc:
        print(x)
    return flask.jsonify(message='search by tomato meter rating successful')


#
#Add a movie to the movies database
@app.route("/AddMovie", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def add_movie():

    if request.method == 'POST':
        my_dict = {}
        data = json.loads(request.data)
        my_dict["MovieTitle"] = data.get('MovieTitle')
        my_dict["Plot"] = data.get('Plot')
        my_dict["Published"] = data.get("Published")
        my_dict["Genre"] = data.get("Genre")

        

    try:
        insertedDoc = collection2.insert_one(my_dict)
    except Exception as e:
        print(f'Error deleting movie: {e}')

    if(not insertedDoc):
        return flask.jsonify(message='insert unsuccesful')
    else:
        return flask.jsonify(message = 'inser successful')


#
#Delete a movie in the movie database based on their Title
@app.route("/DeleteMovie", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def delete_movie():

    if request.method == 'POST':
        my_dict = {}
        data = json.loads(request.data)
        my_dict["MovieTitle"] = data.get('MovieTitle')
        query = {"title" : my_dict["MovieTitle"]}

    try:
        collection2.delete_one(query)
    except Exception as e:
        print(f'Error inserting movie: {e}')

    return flask.jsonify(message='insert succeeded')
