class Graph:
    def __init__(self):
        self.graph = {}  
        self.parent = {} 
    
    def add_node(self, node, product_info):
        if node not in self.graph: 
            self.graph[node] = []
            self.parent[node] = {
                'info': {
                    'name': product_info['name'],  
                    'price': product_info['price'],  
                    'discount_price': product_info.get('discount_price', None),  
                    'quantity': product_info['quantity'],  
                    'subcategory': product_info['subcategory'],  
                    'category': product_info['category'],  
                    'image': product_info['image_url'], 
                    'absolute_url': product_info['absolute_url'] 
                },
                'parent': node  
            }
            
    def find(self, node):
        if self.parent[node]['parent'] != node:
            self.parent[node]['parent'] = self.find(self.parent[node]['parent']) 
        return self.parent[node]['parent']
    
    def union(self, source, destination):
        source_root = self.find(source)
        destination_root = self.find(destination)
        if source_root != destination_root:
            self.parent[source_root]['parent'] = destination_root  
            
    def quick_union(self):
        for node in self.graph:
            for neighbor in self.graph[node]:
                self.union(node, neighbor) 
        new_graph = {}
        for node in self.graph:
            root = self.find(node)
            if root not in new_graph:
                new_graph[root] = [] 
            if node not in new_graph[root]:
                new_graph[root].append(node) 
        self.graph = new_graph

    def dfs(self, start, visited=None):
        if visited is None:
            visited = set()
        visited.add(start) 
        for neighbor in self.graph.get(start, []):  
            if neighbor not in visited:
                self.dfs(neighbor, visited)
        return visited

        
        
            
        
                    
