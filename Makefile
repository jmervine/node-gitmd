test: unit functional .PHONY

unit:
	# unit tests
	NODE_PATH=.:$(NODE_PATH) ./node_modules/.bin/nodeunit ./test/test.js

functional:
	# functional tests
	NODE_PATH=.:$(NODE_PATH) node ./test/functional.js

.PHONY:
