from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import sklearn

app = Flask(__name__)
CORS(app)  # This will allow requests from any origin. Adjust for production.

model_path = './my-project/Back-End/model.p'
scaler_path = './my-project/Back-End/scaler.p'
encoder_path = './my-project/Back-End/encoder.p'

file1 = open(model_path, 'rb')
file2 = open(encoder_path, 'rb')
file3 = open(scaler_path, 'rb')

model = pickle.load(file1)
encoder = pickle.load(file2)
scaler = pickle.load(file3)

file1.close()
file2.close()
file3.close()

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    district = data.get('district')
    city = data.get('city')
    building_size_m2 = data.get('building_size_m2')
    land_size_m2 = data.get('land_size_m2')

    floors = data.get('floors')
    bedrooms = data.get('bedrooms')
    bathrooms = data.get('bathrooms')
    maid_bathrooms = data.get('maid_bathrooms')
    maid_bedrooms = data.get('maid_bedrooms')
    garages = data.get('garages')
    carports = data.get('carports')
    electricity = data.get('electricity')
    NumOfFacilities = data.get('NumOfFacilities')
    furnishing = data.get('furnishing')
    property_condition = data.get('property_condition')
    certificate = data.get('certificate')
    building_orientation = data.get('building_orientation')
    building_age = data.get('building_age')
    
    input = [{
    "district": district,
    "city": city,
    "bedrooms": bedrooms,
    "bathrooms": bathrooms,
    "land_size_m2": land_size_m2,
    "building_size_m2": building_size_m2,
    "carports": carports,
    "certificate": certificate,
    "electricity": electricity,
    "maid_bedrooms": maid_bedrooms,
    "maid_bathrooms": maid_bathrooms,
    "floors": floors,   
    "building_age": building_age,
    "property_condition": property_condition,
    "building_orientation": building_orientation,
    "garages": garages,
    "furnishing": furnishing,
    "NumOfFacilities": NumOfFacilities,
    }]

    df = pd.DataFrame(input)

    cat_cols = ['district', 'city', 'bedrooms', 'bathrooms', 'carports', 'certificate',
       'electricity', 'maid_bedrooms', 'maid_bathrooms', 'floors',
       'building_age', 'property_condition', 'building_orientation', 'garages',
       'furnishing', 'NumOfFacilities']
    num_cols = ['land_size_m2', 'building_size_m2']
    
    for col in cat_cols:
        enc = encoder[col] 
        df[col] = enc.transform(df[col])
    for col in num_cols:
        df[col] = df[col].astype('float')

    columns = df.columns
    df = scaler.transform(df)
    df = pd.DataFrame(df)   
    df.columns = columns

    prediction = model.predict(df)

    # Return a success response
    print(prediction)
    return jsonify({'Result': prediction[0]}), 200

if __name__ == '__main__':
    app.run(debug=True)


# Notes
# Nilai yang di input ke model uutk di encode dan scale harus sesuai dengan kateogri kateogir di tiap label encoder
# encoders['electricity'].classes_ -> pakai ini di colab unutuk lihat kategori