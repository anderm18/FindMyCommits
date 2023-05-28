import json
import httpx
import subprocess
from subprocess import PIPE


def __process_link(repo_link: str):
	return repo_link[repo_link.rfind("/", 0, repo_link.rfind("/"))+1:]

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

async def __query_id(name, token):

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

async def __query_history(repo: str, id: str, token):

	owner, name = repo.split("/")

	query = { "query": f"""
		query {{
			repository(owner: "{owner}", name: "{name}") {{
				refs(first: 100, refPrefix: "refs/heads/") {{
					nodes {{
						name
						target {{
							... on Commit {{
								history(author: {{id: "{id['data']['user']['id']}"}}, since: "2022-10-01T12:00:00Z") {{
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

async def get_history(name: str, link: str, token: str):

	repo = __process_link(link)

	user_id = await __query_id(name, token)

	if 'errors' in user_id:
		return user_id

	commits = dict()

	history = await __query_history(repo, user_id, token)

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


