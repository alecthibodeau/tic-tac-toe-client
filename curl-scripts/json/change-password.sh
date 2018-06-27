# ID=2 sh curl-scripts/json/change-password.sh

curl "https://tic-tac-toe-wdi.herokuapp.com/change-password" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "passwords": {
      "old": "'"${OLD_PASSWORD}"'",
      "new": "'"${NEW_PASSWORD}"'"
    }
  }'
#TOKEN=BAhJIiVlODYzYmUzOGQ3ZTNiNzI2ZTE2ZTlmNjk0ZGNhOWQxMwY6BkVG--4e4119a5383bcf8d69f57d429ff3572d9c11feee OLD_PASSWORD="password" NEW_PASSWORD="1234pass" sh curl-scripts/json/change-password.sh

echo
