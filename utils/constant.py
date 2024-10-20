class Constant:
    def __init__(self, resource_path):
        self.BASE_URL = "http://127.0.0.1:8000/api/v1/"
        self.RESOURCE_PATH = resource_path
    
    def get_endpoint(self):
        return self.BASE_URL + self.RESOURCE_PATH