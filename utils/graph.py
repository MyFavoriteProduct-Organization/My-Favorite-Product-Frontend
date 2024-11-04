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
                    'parent': node,
                    'connection': 0
                }

    def add_edge(self, node, neighbor_id):
        if node not in self.parent:
            self.parent[node] = {
                'info': {},
                'parent': node,
                'connection': 0
            }

        if neighbor_id not in self.parent:
            self.parent[neighbor_id] = {
                'info': {},
                'parent': neighbor_id,
                'connection': 0
            }

        if neighbor_id not in self.graph[node]:
            self.graph.setdefault(node, []).append(neighbor_id)
            self.graph.setdefault(neighbor_id, []).append(node)
            self.parent[neighbor_id]['connection'] += 1

    def add_edge_weight(self, node, neighbor_id, weight):
        if node not in self.parent:
            self.parent[node] = {
                'info': {},
                'parent': node,
                'connection': 0
            }

        if neighbor_id not in self.parent:
            self.parent[neighbor_id] = {
                'info': {},
                'parent': neighbor_id,
                'connection': 0
            }

        if neighbor_id not in self.graph[node]:
            self.graph.setdefault(node, []).append((neighbor_id, weight))
            self.graph.setdefault(neighbor_id, []).append((node, weight))
            self.parent[neighbor_id]['connection'] += 1


        
    def get_first_node_position(self):
        return list(self.graph.keys())[0]


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

    def dfs(self, start):
        visited = set()
        visited.add(start) 
        for neighbor in self.graph.get(start, []):  
            if neighbor not in visited:
                self.dfs(neighbor)
        return visited

    def dijkstra(self, start):
        import heapq

        distances = {node: float('inf') for node in self.graph}
        distances[start] = 0
        priority_queue = [(0, start)]
        visited = set()

        while priority_queue:
            current_distance, current_node = heapq.heappop(priority_queue)

            if current_node in visited:
                continue

            visited.add(current_node)

            for neighbor, weight in self.graph[current_node]:
                distance = current_distance + weight

                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    heapq.heappush(priority_queue, (distance, neighbor))

        # Crear un diccionario de nodos recomendados con sus distancias
        recommended = {node: self.parent[node]['info'] for node in distances if node != start}
        return recommended

        
        
            
        
                    
