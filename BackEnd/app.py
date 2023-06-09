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
from fastapi.middleware.cors import CORSMiddleware
import queries
from models import GatherHistory

app = FastAPI()

origins = [
	"http://localhost",
	"http://localhost:8080",
	"http://127.0.0.1:8000",
	"http://localhost:8000",
	"http://localhost:3000",
	"http://127.0.0.1:3000"
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


@app.post('/getcommits')
async def get_commits(body: GatherHistory):

	print(body.name, body.link, body.token)

	if 'github' not in body.link:
		return {'error': 'Only GitHub Links Supported'}

	response = await queries.get_history(body.name, body.link, body.token)

	return response