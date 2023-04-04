#######################################################################
#
#   Created by @michael
#   GitHub: anderm18
#	
#	Purpose: Use the GitHub GraphQL API to get a user's commit history
#			 by username. Allow function to be accessed through REST, 
#			 using Flask.
#
#######################################################################

from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import flask
from queries import Query
import json
import requests
import git

print(flask.__version__)
print(json.__version__)
print(requests.__version__)

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def homepage():
	return render_template('Homepage.html')


@app.route('/getcommits', methods=['POST'])
def get_commits():
	
	name = request.json.get('name')
	link = request.json.get('link')
	token = request.json.get('token')

	print(name)
	print(link)
	print(token)

	if 'github' not in link:
		return {'error': 'Only GitHub Links Supported'}
	Queries = Query(name, link, token)

	if Queries.get_id() == None:
		return {'error': 'User Not Found'}


		
	response = Queries.get_history()
	#response.headers['Access-Control-Allow-Origin'] = '*'
	#response.headers['Access-Control-Allow-Methods'] = 'POST'
	return response

@app.route('/getsrc', methods=['POST'])
def getsrc():

	# Just triggering a commit to test webhook again
    repo = git.Repo('./mysite')
    origin = repo.remotes.origin
    repo.create_head('master', origin.refs.master).set_tracking_branch(origin.refs.master).checkout()
    origin.pull()
    return 'Success', 200

if __name__ == "__main__":
	app.run(debug=True)