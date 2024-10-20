class Graph:
    def __init__(self):
        self.graph = {}
    
    def add_node(self, node):
        if node not in self.graph:
            self.graph[node] = []
                   
    def add_edge(self, edge):
        source, destination = edge
        self.add_node(source)
        self.add_node(destination)
        if destination not in self.graph[source]:
            self.graph[source].append(destination)
            
    def quick_union(self):
        fathers = set()
        graph = self.graph
        for node in graph:
            fathers.add(node)
            for neighbor in graph[node]:
                fathers.add(neighbor)
            for neighbor in graph[node]:
                graph[neighbor] = [father if father!=node else neighbor for father in fathers]
        return graph
    
    def dfs(self, start,visited=None):
        if visited is None:
            visited = set()
        visited.add(start)
        for neighbor in self.graph[start]:
            if neighbor not in visited:
                self.dfs(neighbor,visited)
        return visited
        
        
            
        
                    
