import json
import requests

class Query:

	def __init__(self, name, link, token):

		self.owner, self.repo = self.__process_link(link)
		self.header = {
			"Authorization": str("bearer " + token),
			"Content-Type":	"application/json"
		}
		self.id = self.__get_id(name)

	def __process_link(self, repo_link):

		repo_link = repo_link[repo_link.find('.com/')+5:len(repo_link)]
		owner = repo_link[0:repo_link.find('/')]
		repo = repo_link[repo_link.find('/')+1:len(repo_link)]

		return (owner, repo)

	def __get_id(self, name):

		query = {
			"query": f"""
      			query {{
        			user(login:"{name}") {{
          				id
        			}}
      			}}
    		"""
    	}

		response = self.__send_request(query)["data"]["user"]
		
		if response != None:
			return response["id"]
		
		return None

	def __send_request(self, query):
		response = requests.post("https://api.github.com/graphql", json=query, headers=self.header)
		if response.status_code == 200:
			return json.loads(response.text)
		return None

	def get_id(self):
		return self.id

	def __query_history(self, end):

		print(self.repo)
		print(self.owner)
		query = {
			"query": f"""
				query {{
					repository(owner: "{self.owner}", name: "{self.repo}") {{
						refs(refPrefix: "refs/heads/", first: 100, {'after: "' + end +  '"' if end else ''}) {{
							nodes {{
								name
								target {{
									... on Commit {{
										history(author: {{id: "{self.id}"}}) {{
											edges {{
												node {{
													message
													additions
													deletions
													url
												}}
											}}
										}}
									}}
								}}
							}} pageInfo {{
								endCursor
								hasNextPage
							}}
						}}
					}}
				}}
			"""
		}

		response = self.__send_request(query)
		# print(response)

		if response: 
			if response['data']['repository']['refs']['nodes'][0]['target']['history']['edges']:
				return response

		return None

	def get_history(self):

		next = True
		end = None
		output = []

		while next:
			history = self.__query_history(end)

			if history == None:
				return dict()

			for node in history["data"]["repository"]["refs"]["nodes"]:
				output.append(node["target"]["history"]["edges"])		

			next = history["data"]["repository"]["refs"]["pageInfo"]["hasNextPage"]
			end = history["data"]["repository"]["refs"]["pageInfo"]["endCursor"]

		return output