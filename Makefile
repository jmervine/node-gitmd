test: .PHONY
	NODE_PATH=.:$(NODE_PATH) ./node_modules/.bin/nodeunit ./test/test.js

.PHONY:
