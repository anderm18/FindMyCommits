from pydantic import BaseModel

class GatherHistory(BaseModel):
	name: str
	link: str
	token: str