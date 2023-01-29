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

from flask import Flask, request
from queries import Query
import json
import requests

app = Flask(__name__)

@app.route('/getcommits', methods=['POST'])
def get_commits():
	name = request.form.get('name')
	link = request.form.get('link')
	token = request.form.get('token')
	Queries = Query(name, link, token)

	if Queries.get_id() == None:
		return 'Cant Find User'
	
	return Queries.get_history()


if __name__ == "__main__":
	app.run()




















# from flask import Flask, request
# from urllib.parse import parse_qs, urlparse
# import asyncio
# import datetime
# import aiohttp
# import subprocess
# import requests
# import json

# app = Flask(__name__)


# async def fetch_details(username: str, url: str, session) -> list:

# 	async with session.get(url) as response:
# 		if response.status == 200:
# 			return await response.json()
# 		return []

# async def fetch_api(username: str, url_base: str, session) -> list:

# 	async with session.get(url_base + '?author=' + username) as response:

# 		if response.status == 200:

# 			commit_response = await response.json()
# 			response_list = []

# 			if commit_response:

# 				for i in commit_response:
				
# 					detail_response = await fetch_details(username, url_base + '/' + i['sha'], session)
	
# 					response = dict() 
# 					response['link'] = i['html_url']
# 					response['date'] = commit_response[0]['commit']['author']['date']
# 					response['additions'] = detail_response['stats']['additions']
# 					response['deletions'] = detail_response['stats']['deletions']
# 					response_list.append(response)

# 			return response_list
# 		else:
# 			return []



# @app.route('/getcommits', methods=['POST'])
# async def get_commits():

# 	if request.method == 'POST':


# 		name = request.form['name'].strip()
# 		link = request.form.get('link')
# 		link = link[link.find('.com/')+5:len(link)]
# 		owner = link[0:link.find('/')]
# 		repo = link[link.find('/')+1:len(link)]

# 		print(owner)
# 		print(repo)

		
# 		base = f'https://api.github.com/repos/' + owner + '/' + repo + '/commits'
# 		url = base + '?author=' + name + '&since=' + datetime.datetime(year=2000, month=1, day=1).isoformat()

# 		more = True
# 		commit_response = []
# 		detail_response = []

# 		async with aiohttp.ClientSession() as session:
# 			while more:

# 				api_response = await fetch_api(name, base, session)
# 				commit_response.append(api_response)
# 				if session.headers.get('link'):
# 					if 'rel="last"' in session.headers['link']:
# 						break
# 					url = session.headers['link'].split(';')[0][1:-1]
# 				else:
# 					more = False

# 		return commit_response

# 		'''
# 		GitHubAPI returns JSON of notation:
# 				[
# 					{
# 						"sha": "c51a0287f44cd95a34399dd2c7bbabd45677c196",
# 		  				"node_id": "C_kwDOIpufxtoAKGM1MWEwMjg3ZjQ0Y2Q5NWEzNDM5OWRkMmM3YmJhYmQ0NTY3N2MxOTY",
# 		   			    "url": "https://api.github.com/repos/anderm18/FindMyCommits/git/commits/c51a0287f44cd95a34399dd2c7bbabd45677c196",
# 		  		        "html_url": "https://github.com/anderm18/FindMyCommits/commit/c51a0287f44cd95a34399dd2c7bbabd45677c196",
# 		  				"author": {
# 		    						"name": "Michael Anderson",
# 		    						"email": "michael.j.anderson@me.com",
# 		    						"date": "2022-12-21T03:00:53Z"
# 		  						  },
# 			  			"committer": {
# 			    					"name": "Michael Anderson",
# 			    				    "email": "michael.j.anderson@me.com",
# 			    					"date": "2022-12-21T03:00:53Z"
# 			  					  },
# 		  				"tree": {
# 		   						    "sha": "cd8f94dce5187c8c30b6b6914f3d92193cf5b5c0",
# 		    						"url": "https://api.github.com/repos/anderm18/FindMyCommits/git/trees/cd8f94dce5187c8c30b6b6914f3d92193cf5b5c0"
# 		  						},
# 		  				"message": "Restructuring File Tree",
# 		  				"parents": [
# 		    						{
# 		      							"sha": "97910bdacf8113a5d0d58d8daadbd6c4bf1b323f",
# 		      						    "url": "https://api.github.com/repos/anderm18/FindMyCommits/git/commits/97910bdacf8113a5d0d58d8daadbd6c4bf1b323f",
# 		      							"html_url": "https://github.com/anderm18/FindMyCommits/commit/97910bdacf8113a5d0d58d8daadbd6c4bf1b323f"
# 		    						}
# 		  						   ],
# 		  				"verification": {
# 		    			"verified": false,
# 		    			"reason": "unsigned",
# 		    			"signature": null,
# 		    			"payload": null
# 		  }
# 		}
# 		'''

# 		return detail_response

# if __name__ == "__main__":
# 	app.run(debug=True)



