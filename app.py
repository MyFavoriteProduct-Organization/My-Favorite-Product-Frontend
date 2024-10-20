from flask import Flask, render_template
from utils.graph import Graph
from utils.constant import Constant
import requests
import concurrent.futures
import functools

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/product/<int:id>')
def product(id):
    return render_template('product.html', product_id=id)

@app.route('/products/<category>')
def products_by_category(category):
    return render_template('products_category.html', category=category)

@app.route('/products/brand/<brand>')
def products_by_brand(brand):
    return render_template('products_brand.html', brand=brand)

@app.route('/shop')
def shop():
    return render_template('shop.html')

@app.route('/car')
def car():
    return render_template('car_info.html')

@functools.lru_cache(maxsize=1000)
def get_purchases(product_id):
    new_const = Constant(f"product_purchases/get-by-product-id/{product_id}")
    new_endpoint = new_const.get_endpoint()
    new_response = requests.get(new_endpoint)
    return new_response.json()

@app.route('/recommends')
def recommends():
    graph = Graph()
    const = Constant('products/')
    endpoint = const.get_endpoint()
    response = requests.get(endpoint)
    data = response.json()

    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        future_to_product = {executor.submit(get_purchases, product['id']): product for product in data}
        for future in concurrent.futures.as_completed(future_to_product):
            product = future_to_product[future]
            purchases = future.result() 

            product_info = {
                'name': product['name'],
                'price': product['price'],
                'discount_price': product.get('discount_price', None),
                'quantity': product['quantity'],
                'subcategory': product['subcategory'],
                'category': product['category'],
                'image_url': product['image_url'],
                'absolute_url': product['absolute_url']
            }

            graph.add_node(product['id'], product_info)

            for neighbor in purchases:
                graph.add_edge(product['id'], neighbor)

    graph.quick_union()
    recommended = graph.parent
    limited_recommended = dict(list(recommended.items())[:20])
    return render_template('recommends.html', recommended=limited_recommended)

if __name__ == '__main__':
    
    app.run(debug=True)