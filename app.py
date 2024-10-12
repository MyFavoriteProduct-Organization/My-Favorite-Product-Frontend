from flask import Flask, render_template

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

@app.route('/recommends')
def recommends():
    return render_template('recommends.html')

if __name__ == '__main__':
    app.run(debug=True)