# sh curl-scripts/json/sign-up.sh

curl "https://tic-tac-toe-wdi.herokuapp.com/sign-up" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD_CONFIRMATION}"'"
    }
  }'
# EMAIL="gogogo@gogogo.com" PASSWORD="password" PASSWORD_CONFIRMATION="password" sh curl-scripts/json/sign-up.sh
echo
