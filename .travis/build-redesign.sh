REDESIGN_PATH="./theme/redesign/"
DOCS_PATH="./docs"


cd ${REDESIGN_PATH} && npm i && cd ../../
npm run build --prefix ${REDESIGN_PATH}
rm -rf "${DOCS_PATH:?}"/* && cp -R ${REDESIGN_PATH}/build/. ${DOCS_PATH}/
cp ${REDESIGN_PATH}/CNAME ${DOCS_PATH}/
