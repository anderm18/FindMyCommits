#######################################################################
#
#   Created by @michael
#   GitHub: anderm18
#	
#	Purpose: Use the GitHub GraphQL API to get a user's commit history
#			 by username. Allows function to be accessed through REST, 
#			 using Fast.
#
#######################################################################

from fastapi import FastAPI
import queries
from models import GatherHistory

app = FastAPI()

@app.post('/getcommits')
async def get_commits(body: GatherHistory):

	if 'github' not in body.link:
		return {'error': 'Only GitHub Links Supported'}

	response = await queries.get_history(body.name, body.link, body.token)

	return response