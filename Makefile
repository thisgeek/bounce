all: requirejs
	@@echo "Build complete:"
	@@date

requirejs:
	@@wget http://requirejs.org/docs/release/1.0.7/minified/require.js \
		-P vendor

clean:
	@@rm -r vendor/*
