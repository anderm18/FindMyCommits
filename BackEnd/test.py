import json
import requests

print(json.__version__)

headers = {
    "Authorization": "bearer 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",
    "Content-Type": "application/json"
}

data = {
    "query": f"""
      query {{
        user(login:"") {{
          id
        }}
      }}
    """
}

response = requests.post("https://api.github.com/graphql", json=data, headers=headers)
user_id = json.loads(response.text)["data"]["user"]["id"]


def get_commits_history(end_cursor=None):
    query = f"""
    query {{
      repository(owner: "anderm18", name: "FindMyCommits") {{
        refs(refPrefix: "refs/heads/", first: 100, {'after: "' + end_cursor + '"' if end_cursor else ''}) {{
            nodes {{
              name
              target {{
                ... on Commit {{
                  history(author: {{ id: "{user_id}" }}) {{
                    edges {{
                      node {{
                        message
                        additions
                        deletions
                      }}
                    }}
                  }}
                }}
              }}
            }}
            pageInfo {{
              endCursor
              hasNextPage
            }}
        }}
      }}
    }}
    """
    data = {"query": query}
    response = requests.post("https://api.github.com/graphql", json=data, headers=headers)
    if response.status_code == 200:
        json_response = json.loads(response.text)
        return json_response
    else:
        raise ValueError(response.text)

data = get_commits_history()
print(data)
has_next = data["data"]["repository"]["refs"]["pageInfo"]["hasNextPage"]
end_cursor = data["data"]["repository"]["refs"]["pageInfo"]["endCursor"]

#     data = get_commits_history(end_cursor)
#     has_next = data["data"]["repository"]["refs"]["pageInfo"]["hasNextPage"]
#     end_cursor = data["data"]["repository"]["refs"]["pageInfo"]["endCursor"]

#print(data)