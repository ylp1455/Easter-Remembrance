from flask import Flask, render_template, jsonify
from datetime import datetime

app = Flask(__name__)

# Define the date of the Easter attacks
easter_attack_date = datetime(2019, 4, 21)

@app.route('/')
def count_time():
    return render_template('countdown.html')

@app.route('/get_time')
def get_time():
    # Get the current date and time
    current_date = datetime.now()
    
    # Calculate the time elapsed since the Easter attacks
    elapsed_time = current_date - easter_attack_date
    
    # Extract days, hours, minutes, and seconds from the elapsed time
    days = elapsed_time.days
    seconds = elapsed_time.seconds
    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    
    # Create a dictionary to hold the updated time
    time_data = {
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    }
    
    return jsonify(time_data)

if __name__ == '__main__':
    app.run(debug=True)
