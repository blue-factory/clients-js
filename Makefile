#
# SO variables
#

#
# Internal variables
#
LOCAL_HOST=0.0.0.0
AUTHENTICATION_PORT=5010
USERS_PORT=5020

prepare pre:
	@echo "[prepare] Preparing lib..."
	@npm install

clean c:
	@echo "[clean] Cleaning dist folder..."
	@rm -rf dist-js || true

typescript ts: clean
	@echo "[typescript] Transpiling code..."
	@node_modules/typescript/bin/tsc

test t: 
	@echo "[test] Testing code..."


.PHONY: prepare pre clean c typescript ts test t