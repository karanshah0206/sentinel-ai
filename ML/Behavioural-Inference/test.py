import pandas as pd
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense
from sklearn.metrics import accuracy_score

df = pd.read_csv("Test.csv") # Data File
x = pd.get_dummies(df.drop(['id', 'class'], axis = 1)) # Data Without Output
y = df['class'].apply(lambda x : 1 if x == 'deceptive' else 0) # Result

# Train/Test Variables
x_train = x
x_test = x
y_train = y
y_test = y

# Define Model
model = Sequential()
model.add(Dense(units=32, activation='relu', input_dim=len(x_train.columns)))
model.add(Dense(units=64, activation='relu'))
model.add(Dense(units=1, activation='sigmoid'))

# Train Model
model.compile(loss='binary_crossentropy', optimizer='sgd', metrics='accuracy')
model.fit(x_train, y_train, epochs=2000, batch_size=32)

# Export Model
model.save("behavioural_inference")

# Test Model
model = load_model("behavioural_inference")
y_hat = model.predict(x_test)
y_hat = [0 if val < 0.5 else 1 for val in y_hat]
print ("Accuracy")
print (accuracy_score(y_test, y_hat))
