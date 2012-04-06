all: requirejs
	@@echo "Build complete:"
	@@date

requirejs:
	@@wget http://requirejs.org/docs/release/0.24.0/comments/require.js \
		-P vendor

clean:
	@@rm -r vendor/*
