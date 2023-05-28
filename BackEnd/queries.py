#######################################################################
#
#   Created by @michael
#   GitHub: anderm18
#	
#	Purpose: Query, filter, and cleanup commit data from Github
#
#######################################################################

import json
import httpx

"""
	Function: process_link (private)

	Returns the repo owner and name in the format accepted by the GitHub GraphQL API (OWNER/NAME)

		Parameters:
			repo_link (string): A link in the format "https://github.com/subdirs/owner/name"

		Returns: 
			(string) the last part of the link containing owner and name 
"""
def __process_link(repo_link: str) -> str:
	return repo_link[repo_link.rfind("/", 0, repo_link.rfind("/"))+1:]

"""
	Function: send_request (private)

	Sends request to GitHub GraphQL API containing what's given in the params. Bearer token to access
	API. Returns back a JSONified version of the response packet from the API.

		Parameters:
			query (dict): A GraphQL query, in the format {query: "query { ... }"}
			token (string): A classic GitHub API Token with repo and user view access

		Returns:
			response (Coroutine<dict>): Coroutine to be resolved containing the response from query
"""
async def __send_request(query: dict, token: str):

	response = None

	header = {
		"Authorization": str("bearer " + token),
		"Content-Type":	"application/json"
	}

	async with httpx.AsyncClient() as client:
		response = await client.post('https://api.github.com/graphql', headers=header, json=query, timeout=None)
	
	response = response.json()

	return response

"""
	Function: query_id (public)

	Creates and sends request to get user's GitHub ID based on their username. IDs are helpful in making sure
	we can identify who we are querying for.

		Parameters:
			name (string): user's username for GitHub
			token (string): GitHub API token with User view access
		
		Returns:
			response (Coroutine<dict>): Coroutine to be resolved containing user's id from GitHub, or error info.
"""
async def query_id(name: str, token: str):

	query = {
		"query": f"""
	  		query {{
	   			user(login:"{name}") {{
	   				id
	   			}}
	  		}}
		"""
	}	

	response = await __send_request(query, token)

	return response

"""
	Function: query_history (public)

	Creates and sends request to get user's Commit History across all branches in a repo based on their username. 

		Parameters:
			repo (string): Repo we want to find user's commit history in
			id (string): User's GitHub ID
			token (string): GitHub API token with User view and repo view access
		
		Returns:
			response (Coroutine<dict>): Coroutine to be resolved containing user's id from GitHub, or error info.
"""
async def query_history(repo: str, id: str, token):

	owner, name = repo.split("/")

	query = { "query": f"""
		query {{
			repository(owner: "{owner}", name: "{name}") {{
				refs(first: 100, refPrefix: "refs/heads/") {{
					nodes {{
						name
						target {{
							... on Commit {{
								history(author: {{id: "{id['data']['user']['id']}"}}) {{
									nodes {{
										additions
										deletions
										oid
										message
										committedDate
									}}
								}}
							}}
						}}
					}}
				}}
			}}
		}}
	""" }

	response = await __send_request(query, token)

	return response

"""
	Function: get_history (public)

	Driver Function, gets commit data and removes duplicates across all branches and reformats to be easier 
	read by Front End.

		Parameters:
			name (string): name of user we want to filter on
			link (string): Link to a Valid GitHub Repo
			token (string): GitHub API token with User view and repo view access
		
		Returns:
			commits (Coroutine<dict>): Coroutine to be resolved containing all commit history by user.
"""
async def get_history(name: str, link: str, token: str):

	repo = __process_link(link)

	user_id = await query_id(name, token)

	if 'errors' in user_id:
		return user_id

	commits = dict()

	history = await query_history(repo, user_id, token)

	if 'errors' in history:
		return history

	nodes = []

	for i in history['data']['repository']['refs']['nodes']:
		nodes.extend(i['target']['history']['nodes'])

	for i in nodes:
		commits[i['oid']] = {
			'additions': i['additions'],
			'deletions': i['deletions'],
			'message': i['message'],
			'committedDate': i['committedDate']
		}

	return commits


