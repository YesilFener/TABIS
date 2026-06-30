from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from sqlalchemy import text
from datetime import timedelta


app = Flask(__name__)
app.secret_key = 'your_secret_key' 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/muciz/Desktop/TABİS/TABİS/Giriş Kısmı/instance/database.db'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=5)  # Cookie'nin geçerlilik süresi
db = SQLAlchemy(app)

# Flask-Login konfigürasyonu
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    selection = db.Column(db.String(150), nullable=True)  # Kullanıcı seçimleri için alan

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def update_database_schema():
    db.session.execute(text('''CREATE TABLE IF NOT EXISTS user_temp (id INTEGER PRIMARY KEY, name VARCHAR(150) NOT NULL, email VARCHAR(150) UNIQUE NOT NULL, password VARCHAR(150) NOT NULL, selection VARCHAR(150))'''))
    db.session.execute(text('''INSERT INTO user_temp (id, name, email, password) SELECT id, name, email, password FROM user'''))
    db.session.execute(text('DROP TABLE user'))
    db.session.execute(text('ALTER TABLE user_temp RENAME TO user'))
    db.session.commit()

# Eğer kullanıcı giriş yapmışsa /login ve /register sayfalarına erişmesin
@app.before_request
def redirect_if_logged_in():
    if 'user_id' in session and request.endpoint in ['login', 'register']:
        return redirect(url_for('main'))  # Kullanıcı giriş yaptıysa /main sayfasına yönlendir

@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('main'))  # Eğer giriş yapılmışsa main sayfasına yönlendir
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')
    
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name')
        surname = request.form.get('surname')
        email = request.form.get('email')
        phone = request.form.get('phone')
        password = request.form.get('password')
        password_repeat = request.form.get('password_repeat')
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        new_user = User(name=name, email=email, password=hashed_password)
        if password != password_repeat:
            return "Şifreler eşleşmiyor", 400
        try:
            db.session.add(new_user)
            db.session.commit()
            flash('Kayıt başarılı! Giriş yapabilirsiniz.', 'success')
            return redirect(url_for('login'))
        except:
            flash('Bu email adresi zaten kayıtlı!', 'danger')
            return redirect(url_for('register'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            login_user(user)
            session['user_id'] = user.id  # Cookie'yi burada manuel olarak ayarlıyoruz.
            session.permanent = True  # Oturum süresi ayarlanabilir
            flash('Giriş başarılı!', 'success')
            return redirect(url_for('main'))
        else:
            flash('Yanlış email veya şifre!', 'danger')

    return render_template('testloginpage.html')

@app.route('/logout')
@login_required
def logout():
    session.pop('user_id', None)  # Cookie'yi çıkışta temizliyoruz.
    logout_user()
    flash('Çıkış yapıldı!', 'info')
    return redirect(url_for('index'))

@app.route('/main')
@login_required
def main():
    return render_template('main.html')

@app.route('/select', methods=['GET', 'POST'])
@login_required
def select():
    if request.method == 'POST':
        selection = request.form.get('selection')
        current_user.selection = selection
        db.session.commit()
        flash('Seçim kaydedildi!', 'success')
        return redirect(url_for('main'))

    return render_template('select.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Veritabanı ve tablo oluşturma işlemi
        update_database_schema()  # Schema güncelleme
    app.run(debug=False)
