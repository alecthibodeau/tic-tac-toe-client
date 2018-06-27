# ID=2 sh curl-scripts/sign-out.sh

curl "https://tic-tac-toe-wdi.herokuapp.com/sign-out" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}" \

#TOKEN=BAhJIiUyYmFhODA3MDgwNWYxNTMwNTMzNWJiMTA4ZWZkYjg2YwY6BkVG--c7b9339d4543c5fd0bf7bf74720741779e457d8e sh curl-scripts/json/sign-out.sh

echo
