echo "installing server dependencies..."
cd server/
pip3 install -r requirements.txt

echo "installing react dependencies..."
cd ../client-chat/
npm install

echo "building react app..."
npm run build

echo "setup finished, starting Flask server..."
cd ../server/
python3 app.py
