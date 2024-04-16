#!/bin/bash

echo "********************************************"
echo "Extracting sdk file name from package.json"
echo "********************************************"
SDK_FILE_NAME=$(jq '.dependencies' package.json | jq --arg PACKAGE_SCOPE_NAME "$PACKAGE_SCOPE_NAME" '.[$PACKAGE_SCOPE_NAME]'   | tr -d '"' | cut -d ':' -f 2)
echo "$SDK_FILE_NAME"
echo "********************************************"
echo "Extracting the version from the file name"
echo "********************************************"
VERSION=$(echo "$SDK_FILE_NAME" | grep -oE '\b[0-9]+.[0-9]+.[0-9]+\b' )
echo "$VERSION"
RELEASE_VERSION="v$VERSION"
echo "$RELEASE_VERSION"  
echo "********************************************"
echo Trying to get the release assets by tag name
echo "********************************************"
releaseurl="$SDK_RELEASE_REPO/releases/tags/$RELEASE_VERSION"
echo "release url: $releaseurl"
response=$(curl -L "$releaseurl" -H "Authorization: Bearer $PAT" )
echo "*****************************************"        
url=$(echo "$response" | jq .assets  | jq --arg SDK_FILE_NAME "$SDK_FILE_NAME" '.[] | select(.name == $SDK_FILE_NAME) | .url')
echo "$url"
asset_url=$(echo $url | tr -d '"')
echo "$asset_url"
echo  "***************************************"
echo "Downlaoding the sdk"
echo "********************************************"
curl -o ./"$SDK_FILE_NAME" -w "%{http_code}" -H "Authorization: Bearer $PAT" -H "Accept: application/octet-stream" -L "$asset_url"
echo "********************************************"
echo "Download completed successfully. Verify the file"
echo "********************************************"
ls -ltr
