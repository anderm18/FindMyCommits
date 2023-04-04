import json
import requests
import subprocess
from subprocess import PIPE

class Query:

	def __init__(self, name, link, token):

		self.repo = self.__process_link(link)
		self.header = {
			"Authorization": str("bearer " + token),
			"Content-Type":	"application/json"
		}
		self.email = self.__get_id(name)
		print(self.repo)

	def __process_link(self, repo_link):

		repo_link = repo_link[repo_link.rfind("/", 0, repo_link.rfind("/"))+1:]
		
		return repo_link

	def __get_id(self, name):

		query = {
			"query": f"""
      			query {{
        			user(login:"{name}") {{
          				email
        			}}
      			}}
    		"""
    	}

		response = self.__send_request(query)["data"]["user"]
		
		if response == None:
			return None
		
		return response["email"]

	def __send_request(self, query):
		response = requests.post("https://api.github.com/graphql", json=query, headers=self.header)
		if response.status_code == 200:
			return json.loads(response.text)
		return None

	def get_id(self):
		return self.email

	def __query_history(self):
		child = subprocess.Popen(['gh', 'search', 'commits', '--author-email', self.email, '--repo', self.repo, '--limit', '1000', '--json', 'commit'], \
			stdin=PIPE, stdout=PIPE, stderr=PIPE)
		output, error = child.communicate()
		print(error)
		out = output.decode("utf-8")

		return json.loads(out)

	def get_history(self):

		chunks = [i['commit']['tree']['sha'] for i in self.__query_history()]

		return chunks