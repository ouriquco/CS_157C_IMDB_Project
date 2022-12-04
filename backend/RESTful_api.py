from bson import json_util
from flask import request, Flask
import flask, json, hashlib
from flask_cors import CORS, cross_origin
from pymongo import MongoClient

app = Flask(__name__)

# the format for client_string: mongodb://<public_DNS_IP>:27017

client_string = "mongodb://ec2-54-158-183-36.compute-1.amazonaws.com:27017/"

client = MongoClient(client_string)

db = client["users"]
collection = db["userinfo"]


db2 = client["movies"]
collection2 = db2["movieinfo"]

#
#Test to list all our database in console
@app.route("/", methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def test_aws_connection():
    try:
        print(client.list_database_names())
    except Exception as e:
        print(f'Error printing db names: {e}')

    return flask.jsonify(message='success')


#
#User login
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


#
#User Registration
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



#
#Deletes a user account given an email
@app.route("/DeleteUser", methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def test_delete():

    if request.method == 'POST':
        my_dict = {}
        data = json.loads(request.data)
        my_dict["email"] = data.get('email')
    
    query = {'email': my_dict['email']}
    collection.delete_one(query)
    
    
    print('s')
    return flask.jsonify(message = 'deleted user')

#
#Test
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

#
#add a User rating or comment to a movie
@app.route("/add_rating", methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def add_user_input():

    data = json.loads(request.data)

    rating = data["rating"]
    comment = data["comment"]
    object_id = data["object_id"]
    print(object_id)

    if add_rating(rating, object_id) | add_comment(comment, object_id):
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

#
#Search by xxx
@app.route("/search", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def search():

    if request.method == 'POST':

        search_data = json.loads(request.data)

        type = search_data["filterType"]
        query = search_data["query"]

        if type == "director":
            return search_director(query)
        elif type == "cast":
            return search_actor(query)
        elif type == "title":
            return search_title(query)
        elif type == "genre":
            return search_genre(query)
        elif type == "imbd":
            return search_imdbRating(query)
        elif type == "plot":
            return search_description(query)
        elif type == "tomato":
            return search_tomatoMeter(query)
        elif type == "user_rating":
            return search_userrating(query)
        elif type == "runtime":
            return search_runtime(query)
        else:
            print("Error: Invalid filter type")

    return flask.jsonify(message='search is active')

#search by movie director(s)
def search_director(q):

    query = {"directors": {"$regex": q}}
    mydoc = list(collection2.find(query,{"title": 1, "directors":1}).limit(15))

    return json.loads(json_util.dumps(mydoc))

#search by movie title
def search_title(q):

    query = {"title": {"$regex" :  q}}
    mydoc = list(collection2.find(query, {"title": 1}))

    return json.loads(json_util.dumps(mydoc))


#Search by Movie Genre
def search_genre(q):

    query = {"genres": {"$regex": q}}
    mydoc = list(collection2.find(query, {"title": 1, "genres": 1}).limit(15))

    return json.loads(json_util.dumps(mydoc))


#Search by Movie Plot
def search_description(q):

    query = {"plot": {"$regex": q}}
    mydoc = list(collection2.find(query, {"title": 1, "plot": 1}).limit(15))

    return json.loads(json_util.dumps(mydoc))


#Search by Actor
def search_actor(q):

    my_list = []
    query = {"cast": {"$regex": q}}
    mydoc = list(collection2.find(query,{"title": 1, "cast": 1}).limit(15))

    return json.loads(json_util.dumps(mydoc))


#Search by IMDB rating

def search_imdbRating(q):

    query = {"imdb.rating": q}
    mydoc = list(collection2.find(query,{"title": 1, "imdb.rating":
        1}).limit(15))

    return json.loads(json_util.dumps(mydoc))

#
#Filter by Runtime
def search_runtime(q):
    query = {"runtime": q}
    mydoc = list(collection2.find(query,{"title": 1, "runtime":
        1}).limit(15))

    return json.loads(json_util.dumps(mydoc))


#
#Search by tomato meter
def search_tomatoMeter(q):

    query = {"tomatoes.viewer.meter":  q}
    mydoc = list(collection2.find(query,{"title": 1, "tomatoes.viewer.meter":
        1}).limit(15))

    return json.loads(json_util.dumps(mydoc))

#
#Search by User Rating
def search_userrating(q):
    query = {"User Rating": q}
    mydoc = list(collection2.find(query,{"title": 1, "User Rating": 1}).limit(15))
    return json.loads(json_util.dumps(mydoc))

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
        deletedDoc = collection2.delete_one(query)
   
        #print(mydoc.deleted_count, " documents deleted")

    return flask.jsonify(message='delete unsuccesful')

#
#Delete a user review with a certain word or phrase (that may be unacceptable language)
@app.route("/DeleteUserReview", methods=['POST', 'GET'])
@cross_origin(supports_credentials = True)
def delete_movie():

    if request.method == 'POST':
        my_dict = {}
        data = json.loads(request.data)
        my_dict["UserReview"] = data.get('UserReview')
        query = {"User Review" : my_dict["UserReview"]}, {"$set": {"User Review" : "Review Removed"}}
        deletedDoc = collection2.update_many(query)
   
        #print(mydoc.deleted_count, " documents deleted")

    return flask.jsonify(message='delete unsuccesful')

#
#Search by runtime range