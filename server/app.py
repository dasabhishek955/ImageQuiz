from flask import Flask, jsonify, request, send_from_directory
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS


app = Flask(__name__,  template_folder="", static_folder="uploads",)
cors = CORS(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    category = request.form.get('category', 'uncategorized')

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        category_folder = os.path.join(app.config['UPLOAD_FOLDER'], category)

        if not os.path.exists(category_folder):
            os.makedirs(category_folder)

        file.save(os.path.join(category_folder, filename))

        return jsonify({'message': 'File uploaded successfully'})


@app.route('/uploads/<filename>')
def serve_uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/list-images')
def list_uploaded_images():
    images = []
    for category in os.listdir(app.config['UPLOAD_FOLDER']):
        category_path = os.path.join(app.config['UPLOAD_FOLDER'], category)
        for filename in os.listdir(category_path):
            images.append(
                {'path': f"{category}/{filename}", 'category': category})
    return jsonify(images)


if __name__ == '__main__':
    app.run(debug=True, port=5005)
