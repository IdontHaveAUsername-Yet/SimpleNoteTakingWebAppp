from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

# Liste für die Notizen
notizen = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def add_note():
    note = request.form['note']
    if note:
        notizen.append(note)
    return redirect(url_for('index'))

@app.route('/delete/<int:index>', methods=['POST'])
def delete_note(index):
    if 0 <= index < len(notizen):
        notizen.pop(index)
    return redirect(url_for('index'))

@app.route('/get_notes', methods=['GET'])
def get_notes():
    return jsonify(notizen)

if __name__ == "__main__":
    app.run(debug=True)
