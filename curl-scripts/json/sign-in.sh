# sh curl-scripts/json/sign-in.sh

curl "https://tic-tac-toe-wdi.herokuapp.com/sign-in" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'
#EMAIL="gogogo@gogogo.com" PASSWORD="1234pass" sh curl-scripts/json/sign-in.sh
echo
