set -e
echo "installing server dependencies..."
cd server/
pip3 install --user -r requirements.txt

echo
echo "installing react dependencies..."
cd ../client-chat/
npm install

echo 
echo "building react app..."
npm run build

echo 
echo "setup finished, starting Flask server at $(ipconfig getifaddr en0):5000..."
cd ../server/
python3 app.py
